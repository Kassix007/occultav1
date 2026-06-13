export interface EncodeResult {
    blob: Blob;
    url: string;
    fileName: string;
    capacityBytes: number;
    requiredBytes: number;
    changedPixels: number;
    totalPixels: number;
}

export interface DecodeResult {
    blob: Blob;
    url: string;
    fileName: string;
    mimeType: string;
    size: number;
}

interface PayloadHeader {
    magic: "OCCULTA";
    version: 1;
    mode: "PNG_LSB";
    filename: string;
    mimeType: string;
    originalSize: number;
    payloadLength: number;
}

const HEADER_LENGTH_BYTES = 4;
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function bytesToBits(bytes: Uint8Array): number[] {
    const bits: number[] = [];

    for (const byte of bytes) {
        for (let shift = 7; shift >= 0; shift--) {
            bits.push((byte >> shift) & 1);
        }
    }

    return bits;
}

function bitsToBytes(bits: number[]): Uint8Array {
    const bytes = new Uint8Array(Math.ceil(bits.length / 8));

    bits.forEach((bit, index) => {
        if (bit) {
            bytes[Math.floor(index / 8)] |= 1 << (7 - (index % 8));
        }
    });

    return bytes;
}

function uint32ToBytes(value: number): Uint8Array {
    const bytes = new Uint8Array(4);
    new DataView(bytes.buffer).setUint32(0, value, false);
    return bytes;
}

function bytesToUint32(bytes: Uint8Array): number {
    return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(0, false);
}

function concatBytes(parts: Uint8Array[]): Uint8Array {
    const totalLength = parts.reduce((sum, part) => sum + part.length, 0);
    const output = new Uint8Array(totalLength);
    let offset = 0;

    for (const part of parts) {
        output.set(part, offset);
        offset += part.length;
    }

    return output;
}

async function loadImageToCanvas(imageFile: File): Promise<{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}> {
    const url = URL.createObjectURL(imageFile);
    const image = new Image();

    try {
        image.src = url;
        await image.decode();

        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Could not get canvas context.");
        }

        ctx.drawImage(image, 0, 0);
        return { canvas, ctx };
    } finally {
        URL.revokeObjectURL(url);
    }
}

function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error("Could not export PNG image."));
                return;
            }

            resolve(blob);
        }, "image/png");
    });
}

function buildPayloadPacket(file: File): Promise<Uint8Array> {
    return file.arrayBuffer().then((buffer) => {
        const payload = new Uint8Array(buffer);
        const header: PayloadHeader = {
            magic: "OCCULTA",
            version: 1,
            mode: "PNG_LSB",
            filename: file.name,
            mimeType: file.type || "application/octet-stream",
            originalSize: file.size,
            payloadLength: payload.length,
        };
        const headerBytes = textEncoder.encode(JSON.stringify(header));

        return concatBytes([
            uint32ToBytes(headerBytes.length),
            headerBytes,
            payload,
        ]);
    });
}

function readBitsFromImageData(data: Uint8ClampedArray, bitCount: number, startBit = 0): number[] {
    const bits: number[] = [];
    let currentBit = 0;

    for (let pixelIndex = 0; pixelIndex < data.length && bits.length < bitCount; pixelIndex += 4) {
        for (const channelOffset of [0, 1, 2]) {
            if (currentBit >= startBit && bits.length < bitCount) {
                bits.push(data[pixelIndex + channelOffset] & 1);
            }

            currentBit++;
        }
    }

    if (bits.length !== bitCount) {
        throw new Error("Image does not contain enough embedded data.");
    }

    return bits;
}

function parseHeader(data: Uint8ClampedArray): {
    header: PayloadHeader;
    payloadStartBit: number;
} {
    const headerLengthBits = readBitsFromImageData(data, HEADER_LENGTH_BYTES * 8);
    const headerLength = bytesToUint32(bitsToBytes(headerLengthBits));

    if (headerLength <= 0 || headerLength > 1024 * 64) {
        throw new Error("Unsupported or damaged stego header.");
    }

    const headerBits = readBitsFromImageData(data, headerLength * 8, HEADER_LENGTH_BYTES * 8);
    const header = JSON.parse(textDecoder.decode(bitsToBytes(headerBits))) as PayloadHeader;

    if (header.magic !== "OCCULTA" || header.version !== 1 || header.mode !== "PNG_LSB") {
        throw new Error("Unsupported stego format.");
    }

    return {
        header,
        payloadStartBit: (HEADER_LENGTH_BYTES + headerLength) * 8,
    };
}

export class StegoEncoder {
    static capacityBytes(width: number, height: number): number {
        return Math.floor((width * height * 3) / 8);
    }

    async encode(coverImage: File, fileToHide: File): Promise<EncodeResult> {
        if (coverImage.type !== "image/png") {
            throw new Error("PNG cover images are required for this mode.");
        }

        if (fileToHide.size === 0) {
            throw new Error("Cannot hide an empty file.");
        }

        const { canvas, ctx } = await loadImageToCanvas(coverImage);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const packet = await buildPayloadPacket(fileToHide);
        const bits = bytesToBits(packet);
        const capacityBits = canvas.width * canvas.height * 3;

        if (bits.length > capacityBits) {
            const capacityBytes = Math.floor(capacityBits / 8);
            throw new Error(`Payload too large. This image can hold about ${capacityBytes.toLocaleString()} bytes before overhead.`);
        }

        let bitIndex = 0;
        let changedPixels = 0;
        const changedPixelIndexes = new Set<number>();

        for (let pixelIndex = 0; pixelIndex < imageData.data.length && bitIndex < bits.length; pixelIndex += 4) {
            for (const channelOffset of [0, 1, 2]) {
                if (bitIndex >= bits.length) {
                    break;
                }

                const dataIndex = pixelIndex + channelOffset;
                const previousValue = imageData.data[dataIndex];
                const nextValue = (previousValue & 0xfe) | bits[bitIndex];

                if (previousValue !== nextValue) {
                    imageData.data[dataIndex] = nextValue;
                    changedPixelIndexes.add(pixelIndex / 4);
                }

                bitIndex++;
            }
        }

        changedPixels = changedPixelIndexes.size;
        ctx.putImageData(imageData, 0, 0);

        const blob = await canvasToPngBlob(canvas);
        const url = URL.createObjectURL(blob);
        const baseName = coverImage.name.replace(/\.png$/i, "");

        return {
            blob,
            url,
            fileName: `stego-${baseName}.png`,
            capacityBytes: StegoEncoder.capacityBytes(canvas.width, canvas.height),
            requiredBytes: packet.length,
            changedPixels,
            totalPixels: canvas.width * canvas.height,
        };
    }
}

export class StegoDecoder {
    async decode(stegoImage: File): Promise<DecodeResult> {
        if (stegoImage.type !== "image/png") {
            throw new Error("PNG stego images are required for this mode.");
        }

        const { canvas, ctx } = await loadImageToCanvas(stegoImage);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const { header, payloadStartBit } = parseHeader(imageData.data);
        const payloadBits = readBitsFromImageData(imageData.data, header.payloadLength * 8, payloadStartBit);
        const payload = bitsToBytes(payloadBits).slice(0, header.payloadLength);

        if (payload.length !== header.originalSize) {
            throw new Error("Recovered payload size does not match the stego header.");
        }

        const blob = new Blob([payload], { type: header.mimeType });

        return {
            blob,
            url: URL.createObjectURL(blob),
            fileName: header.filename,
            mimeType: header.mimeType,
            size: payload.length,
        };
    }
}
