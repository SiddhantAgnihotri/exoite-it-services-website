# Exoite IT Services

Latest visual phase: [reference analysis and plan](docs/reference-design-analysis.md) and [premium redesign report](docs/premium-redesign-report.md). The editorial design retains all 22 routes and working enquiry behaviour. Build/lint and 62 tests pass; rendered responsive review remains pending because browser access is unavailable.

Company enhancement: [implementation report](docs/company-enhancement-report.md) lists the six service pages, three solution studies, Insights guides and legal review drafts. There are now 22 prerendered content routes (20 indexable); privacy and terms remain noindex until approved. Enquiries support an optional timeline as well as budget.

Latest changes: [visual correction report](docs/visual-correction-report.md), including the service-led hero, restored full-colour imagery and the missing genuine project screenshots/demo URLs.

Existing React 19 / Vite / Tailwind marketing website. Public routes: `/`, `/about`, `/services`, `/products`, `/portfolio`, `/training`, `/contact`.

The premium minimal design uses shared CSS tokens, reusable headings, native disclosure controls and an illustrative product preview. See the [redesign report](docs/redesign-report.md) for the changed files, checks and remaining visual verification. The social media platform is in development, with no launch or completed-feature claims.

```text
npm ci
npm run dev
```

Production verification:

```text
npm run build
npm run lint
npm test
npm audit
npm run preview
```

Build generates static route HTML plus a 404 page into `dist` and hydrates it with React. Deploy `dist` using the checked-in Vercel route configuration; Vite preview does not emulate all Vercel redirects/status codes. Tests inspect generated artifacts, so build first. Keep generated WebP assets checked in; run `npm run images:optimize` when changing original illustrations. Local verification used Node 22.17.0.

See [audit](docs/website-audit.md), [SEO](docs/seo-implementation.md), [performance](docs/performance-report.md) and [release checklist](docs/deployment-checklist.md). No deployment is authorized by running these local commands. Web3Forms uses its existing public form identifier; do not put private server credentials in `VITE_` environment variables.

<!-- Original starter notes retained below for reference. -->

## Original Vite starter notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
