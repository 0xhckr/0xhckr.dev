# 0xhckr.dev

Personal portfolio built with Next.js, React, Tailwind CSS, and GSAP.

## Stack

- **Next.js** — App Router
- **React**
- **Tailwind CSS** — CSS-first config via `@theme inline`
- **GSAP** — animations
- **Biome** — linting and formatting
- **Nix** — dev shell via `flake.nix`
- **pnpm** — package management

## Getting Started

Requires **Node.js 22** and **pnpm**.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Alternatively, enter the Nix dev shell:

```bash
direnv allow
```

This provides `pnpm`, `nodejs_22`, and `biome`.

## Scripts

| Command          | Description            |
| ---------------- | ---------------------- |
| `pnpm dev`       | Start dev server       |
| `pnpm build`     | Production build       |
| `pnpm start`     | Start production server|
| `pnpm lint`      | Run Biome linter       |
| `pnpm format`    | Format with Biome      |

## Project Structure

```
src/
  app/             # App Router pages and layout
  components/      # React components
  lib/             # Utilities
public/            # Static assets
```

Internal imports use the `~/` path alias mapped to `./src/*`.

---

*more things to come~!*
