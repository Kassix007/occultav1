# Implementation Todo

## Review Summary

`idea.txt` recommends a browser-only steganography app with two modes: a practical PNG LSB MVP first, then JPEG DCT as an advanced research feature. The current app already has encode/decode pages and a basic `StegoEncoder`, but the encoder embeds raw bits into pixels and exports JPEG, which can corrupt LSB data during re-encoding. Decode is currently mocked. The implementation should be rebuilt around a versioned payload format, PNG output for the MVP, capacity checks, and real extraction.

## Phase 1: Core Binary Pipeline

- [ ] Create `src/core/bitstream.ts` for `Uint8Array` to bit helpers and reverse conversion.
- [ ] Create `src/core/payloadFormat.ts` with a versioned header: magic bytes, version, mode, filename, MIME type, original size, payload length, salt, nonce, and encrypted payload.
- [ ] Create `src/core/crypto.ts` using Web Crypto AES-GCM and PBKDF2.
- [ ] Add password fields to encode and decode forms.
- [ ] Add compression support with `CompressionStream` or a small dependency such as `fflate`.
- [ ] Build a no-image round trip test path: file to compressed/encrypted bytes to decrypted/decompressed file.

## Phase 2: PNG LSB MVP

- [ ] Replace `src/utils/StegoUtils.ts` with PNG-focused encode/decode utilities.
- [ ] Embed into RGB channel LSBs instead of only the red channel.
- [ ] Export stego images as PNG with `canvas.toBlob("image/png")`, not JPEG.
- [ ] Add capacity calculation: `width * height * 3` available bits minus safety overhead.
- [ ] Block encode when payload exceeds capacity and show the maximum supported size.
- [ ] Implement real decode: load PNG, extract header, read payload length, decrypt, decompress, and download the restored file.

## Phase 3: UI and UX

- [ ] Update encode page copy to say PNG is the supported MVP format.
- [ ] Restrict cover image input to PNG for the MVP.
- [ ] Show file size, estimated required bits, available capacity, and encode progress.
- [ ] Replace `alert()` and mock decode output with inline success/error states.
- [ ] Use a neutral failure message: wrong password, wrong image, modified image, or unsupported format.
- [ ] Add before/after preview and changed-pixel percentage.

## Phase 4: Reliability and Performance

- [ ] Move heavy encode/decode work into `src/workers/encode.worker.ts` and `src/workers/decode.worker.ts`.
- [ ] Add header repetition or another simple robustness mechanism.
- [ ] Validate magic bytes and version before attempting decrypt/decompress.
- [ ] Revoke object URLs after downloads/previews to avoid memory leaks.
- [ ] Handle empty files, very small images, alpha-channel PNGs, and unsupported formats.

## Phase 5: Testing

- [ ] Add a test framework, preferably Vitest for core utilities.
- [ ] Test bitstream conversion, payload serialization, crypto round trips, and capacity checks.
- [ ] Add manual QA cases for wrong password, payload too large, empty file, small PNG, and exact encode/decode round trip.
- [ ] Run `npm run lint` and `npm run build` before every PR.

## Phase 6: JPEG DCT Research Mode

- [ ] Defer until PNG MVP is stable.
- [ ] Research a JS/WASM JPEG coefficient parser/encoder.
- [ ] Implement selected non-zero mid-frequency AC coefficient embedding.
- [ ] Add lower-capacity estimates and stronger warnings for recompression failures.

## Documentation and Launch

- [ ] Update `README.md` with supported formats, privacy model, limitations, and examples.
- [ ] Avoid claims like "undetectable" or "military-grade".
- [ ] Add deployment instructions for a static host such as GitHub Pages, Cloudflare Pages, Netlify, or Vercel.
