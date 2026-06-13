# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router project. Route pages live in `src/app`, including `src/app/page.tsx`, `src/app/encode/page.tsx`, `src/app/decode/page.tsx`, and `src/app/about/page.tsx`. Shared layout styles are in `src/app/globals.css` and `src/app/layout.tsx`. Reusable components live in `src/components`, with primitive UI pieces under `src/components/ui`. Steganography helpers are in `src/utils/StegoUtils.ts`, while general utilities are in `src/lib/utils.ts`. Static assets belong in `public`.

## Build, Test, and Development Commands

- `npm run dev`: start the local Next.js development server, normally at `http://localhost:3000`.
- `npm run build`: create a production build and catch TypeScript or Next.js build errors.
- `npm run start`: serve the last production build locally.
- `npm run lint`: run the configured Next.js ESLint checks.

Use `npm install` to restore dependencies from `package-lock.json`.

## Coding Style & Naming Conventions

Write TypeScript and React components with clear, small modules. Use the `@/` path alias for imports from `src` when it improves readability, for example `@/components/ui/card`. Components should use PascalCase filenames only when the existing pattern does; current UI component files are mostly lowercase, such as `themeToggle.tsx` and `dragDrop.tsx`, so follow nearby conventions. Prefer Tailwind utility classes for styling and keep class lists readable. Run `npm run lint` before submitting changes.

## Testing Guidelines

No automated test framework is currently configured. For now, validate changes with `npm run lint` and `npm run build`, then manually exercise affected routes in the browser. For steganography changes, test both encode and decode flows with representative small files and images. If tests are added later, place them near the code they cover or in a clearly named test directory, and document the new command here.

## Commit & Pull Request Guidelines

Recent commits use short, imperative summaries such as `fix typo` and `added drag and drop and footer`. Keep commit messages concise but specific: `fix decode image validation` is better than `changes`. Pull requests should include a brief summary, testing performed, linked issues when relevant, and screenshots or screen recordings for UI changes. Mention any limitations, follow-up work, or manual verification steps.

## Security & Configuration Tips

Keep secrets and environment-specific values out of the repository. Do not commit generated build output from `.next` or dependency folders such as `node_modules`. Treat uploaded files and decoded payloads as untrusted input, and preserve client-side validation around file type and size.
