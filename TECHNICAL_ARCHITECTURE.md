# Technical Architecture

## Overview

Occulta is a client-side Next.js App Router application for hiding arbitrary files inside PNG images and recovering them later. The currently implemented steganography mode is PNG least-significant-bit embedding across RGB channels.

All encode and decode work runs in the browser. The app does not upload selected files or images to a server.

## Application Structure

```text
src/
  app/
    page.tsx             Home route with links to encode and decode flows
    encode/page.tsx      Client-side encode workflow
    decode/page.tsx      Client-side decode workflow
    about/page.tsx       Static project information
    layout.tsx           Shared app shell, theme provider, header, footer
    globals.css          Global Tailwind styles
  components/
    header.tsx           Navigation and theme toggle placement
    footer.tsx           Shared footer
    themeProvider.tsx    Theme provider wrapper
    ui/
      card.tsx           Card primitives
      dragDrop.tsx       File dropzone component
      template.tsx       Page layout wrapper
      themeToggle.tsx    Dark/light mode toggle
  utils/
    StegoUtils.ts        PNG LSB steganography implementation
  lib/
    utils.ts             Shared utility helpers
```

## Runtime Model

The encode and decode pages are marked with `"use client"` because they depend on browser-only APIs:

- `File` and `FileReader`
- `Blob`
- `URL.createObjectURL`
- `HTMLCanvasElement`
- `CanvasRenderingContext2D`
- `Image`
- `ImageData`

The steganography utility in `src/utils/StegoUtils.ts` is also browser-oriented. It loads images into a canvas, reads pixel data with `getImageData`, modifies or reads RGB channel bits, and exports output as a PNG blob.

## Encode Flow

Implemented in `src/app/encode/page.tsx` and `src/utils/StegoUtils.ts`.

1. User selects a file to hide.
2. User selects a PNG cover image.
3. The encode page creates a preview of the cover image with `FileReader`.
4. On submit, `StegoEncoder.encode(coverImage, fileToHide)` runs.
5. The encoder validates that the cover image MIME type is `image/png`.
6. Empty payload files are rejected.
7. The cover image is loaded into a canvas.
8. The payload file is read into a `Uint8Array`.
9. A JSON metadata header is created.
10. A packet is built as:

```text
4-byte big-endian header length
UTF-8 JSON header bytes
raw payload bytes
```

11. The packet is converted to a bitstream.
12. Capacity is calculated as `width * height * 3` bits, using one least-significant bit from each RGB channel.
13. If the packet does not fit, encoding is blocked with an error.
14. Bits are embedded into RGB channel LSBs.
15. Changed pixel count is tracked.
16. The canvas is exported with `canvas.toBlob(..., "image/png")`.
17. The page shows required size, capacity, changed pixels, and a download link.

## Decode Flow

Implemented in `src/app/decode/page.tsx` and `src/utils/StegoUtils.ts`.

1. User selects a PNG stego image.
2. The decode page creates an image preview with `FileReader`.
3. On submit, `StegoDecoder.decode(stegoImage)` runs.
4. The decoder validates that the stego image MIME type is `image/png`.
5. The image is loaded into a canvas.
6. The first 32 embedded bits are read from RGB LSBs and converted to a 4-byte header length.
7. The header length is validated.
8. Header bytes are read from subsequent embedded bits and decoded from UTF-8 JSON.
9. The header is validated for:

```text
magic: "OCCULTA"
version: 1
mode: "PNG_LSB"
```

10. The payload length from the header determines how many payload bits to extract.
11. Payload bits are converted back into bytes.
12. The recovered size is checked against the original size recorded in the header.
13. A `Blob` is created with the original MIME type.
14. The page shows the recovered file details and a download link.

## Payload Header

The implemented header is JSON encoded as UTF-8.

```ts
interface PayloadHeader {
    magic: "OCCULTA";
    version: 1;
    mode: "PNG_LSB";
    filename: string;
    mimeType: string;
    originalSize: number;
    payloadLength: number;
}
```

The header is prefixed by a 4-byte big-endian unsigned integer that stores the encoded header length.

## Bitstream Encoding

Bytes are converted to bits most-significant-bit first.

For each byte:

```text
bit 7, bit 6, bit 5, bit 4, bit 3, bit 2, bit 1, bit 0
```

Embedding writes each bit to the least-significant bit of the next available RGB channel:

```ts
nextValue = (previousValue & 0xfe) | bit;
```

Alpha channels are not used for embedding.

## Capacity Model

The current capacity model is:

```text
available bits = image width * image height * 3
available bytes = floor(available bits / 8)
```

This reflects one embedded bit per red, green, and blue channel. The packet size includes the 4-byte header length, JSON header, and payload bytes.

## UI Components

`DragDrop` wraps `react-dropzone` and is used by both encode and decode pages for file selection. The encode page restricts cover image input to PNG files. The decode page restricts stego image input to PNG files.

Both encode and decode pages use inline status state:

- `isEncoding` / `isDecoding`
- `error`
- `encodeResult` / `decodedFile`

## Implemented Validation

The current implementation validates:

- Cover image must be PNG for encoding.
- Stego image must be PNG for decoding.
- Payload file cannot be empty.
- Payload packet must fit within RGB LSB capacity.
- Header length must be greater than zero and at most 64 KB.
- Header magic, version, and mode must match the expected format.
- Recovered payload length must match `originalSize`.

## Current Limitations

The current implementation does not yet include:

- Password-based encryption.
- Compression.
- Authenticated payload integrity checks.
- A binary payload format.
- Web Workers for large encode/decode jobs.
- Header repetition or error correction.
- Automated tests.
- JPEG DCT steganography.
- Object URL cleanup for generated download URLs.

The current PNG LSB output is expected to survive exact PNG file transfer. It is not expected to survive image resizing, JPEG conversion, social media recompression, or other pixel-altering transformations.

## Known Validation Status

At the time this document was written:

- `npm.cmd run lint` passed with no ESLint warnings or errors.
- `npx.cmd tsc --noEmit` reported a type error in `src/app/decode/page.tsx` because the UI references `decodedFile.name`, while `DecodeResult` exposes `fileName`.
- `npm.cmd run build` was blocked by `next/font/google` network access for Geist font fetching.

