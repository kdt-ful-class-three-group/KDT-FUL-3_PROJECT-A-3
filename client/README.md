This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
client
├─ .next
│  ├─ app-build-manifest.json
│  ├─ build
│  │  └─ chunks
│  │     ├─ [root-of-the-server]__04d7a048._.js
│  │     ├─ [root-of-the-server]__04d7a048._.js.map
│  │     ├─ [root-of-the-server]__05f88b00._.js
│  │     ├─ [root-of-the-server]__05f88b00._.js.map
│  │     ├─ [turbopack]_runtime.js
│  │     ├─ [turbopack]_runtime.js.map
│  │     ├─ postcss_config_mjs_transform_ts_f0ffbaad._.js
│  │     └─ postcss_config_mjs_transform_ts_f0ffbaad._.js.map
│  ├─ build-manifest.json
│  ├─ cache
│  │  └─ .rscinfo
│  ├─ fallback-build-manifest.json
│  ├─ package.json
│  ├─ server
│  │  ├─ app
│  │  │  ├─ _not-found
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-build-manifest.json
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ favicon.ico
│  │  │  │  ├─ route
│  │  │  │  │  ├─ app-build-manifest.json
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  └─ build-manifest.json
│  │  │  │  ├─ route.js
│  │  │  │  └─ route.js.map
│  │  │  ├─ find
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-build-manifest.json
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ login
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-build-manifest.json
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ page
│  │  │  │  ├─ app-build-manifest.json
│  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  ├─ build-manifest.json
│  │  │  │  ├─ next-font-manifest.json
│  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  └─ server-reference-manifest.json
│  │  │  ├─ page.js
│  │  │  ├─ page.js.map
│  │  │  ├─ page_client-reference-manifest.js
│  │  │  └─ signup
│  │  │     ├─ page
│  │  │     │  ├─ app-build-manifest.json
│  │  │     │  ├─ app-paths-manifest.json
│  │  │     │  ├─ build-manifest.json
│  │  │     │  ├─ next-font-manifest.json
│  │  │     │  ├─ react-loadable-manifest.json
│  │  │     │  └─ server-reference-manifest.json
│  │  │     ├─ page.js
│  │  │     ├─ page.js.map
│  │  │     └─ page_client-reference-manifest.js
│  │  ├─ app-paths-manifest.json
│  │  ├─ chunks
│  │  │  ├─ [root-of-the-server]__48b32c58._.js
│  │  │  ├─ [root-of-the-server]__48b32c58._.js.map
│  │  │  ├─ [turbopack]_runtime.js
│  │  │  ├─ [turbopack]_runtime.js.map
│  │  │  └─ ssr
│  │  │     ├─ [externals]_next_dist_compiled_next-server_app-page-turbo_runtime_dev_30fa57d5.js
│  │  │     ├─ [externals]_next_dist_compiled_next-server_app-page-turbo_runtime_dev_30fa57d5.js.map
│  │  │     ├─ [root-of-the-server]__00b45d58._.js
│  │  │     ├─ [root-of-the-server]__00b45d58._.js.map
│  │  │     ├─ [root-of-the-server]__0a46983d._.js
│  │  │     ├─ [root-of-the-server]__0a46983d._.js.map
│  │  │     ├─ [root-of-the-server]__11894b2c._.js
│  │  │     ├─ [root-of-the-server]__11894b2c._.js.map
│  │  │     ├─ [root-of-the-server]__2b9207e8._.js
│  │  │     ├─ [root-of-the-server]__2b9207e8._.js.map
│  │  │     ├─ [root-of-the-server]__4a0c80c2._.js
│  │  │     ├─ [root-of-the-server]__4a0c80c2._.js.map
│  │  │     ├─ [root-of-the-server]__4c58c055._.js
│  │  │     ├─ [root-of-the-server]__4c58c055._.js.map
│  │  │     ├─ [root-of-the-server]__6302eb5e._.js
│  │  │     ├─ [root-of-the-server]__6302eb5e._.js.map
│  │  │     ├─ [root-of-the-server]__646d2877._.js
│  │  │     ├─ [root-of-the-server]__646d2877._.js.map
│  │  │     ├─ [root-of-the-server]__6c08e6c1._.js
│  │  │     ├─ [root-of-the-server]__6c08e6c1._.js.map
│  │  │     ├─ [root-of-the-server]__768b0a21._.js
│  │  │     ├─ [root-of-the-server]__768b0a21._.js.map
│  │  │     ├─ [root-of-the-server]__86e7898f._.js
│  │  │     ├─ [root-of-the-server]__86e7898f._.js.map
│  │  │     ├─ [root-of-the-server]__bf454160._.js
│  │  │     ├─ [root-of-the-server]__bf454160._.js.map
│  │  │     ├─ [root-of-the-server]__c75c51b7._.js
│  │  │     ├─ [root-of-the-server]__c75c51b7._.js.map
│  │  │     ├─ [root-of-the-server]__c8d26c55._.js
│  │  │     ├─ [root-of-the-server]__c8d26c55._.js.map
│  │  │     ├─ [root-of-the-server]__d44daf34._.js
│  │  │     ├─ [root-of-the-server]__d44daf34._.js.map
│  │  │     ├─ [root-of-the-server]__e1815691._.js
│  │  │     ├─ [root-of-the-server]__e1815691._.js.map
│  │  │     ├─ [root-of-the-server]__e33e2318._.js
│  │  │     ├─ [root-of-the-server]__e33e2318._.js.map
│  │  │     ├─ [root-of-the-server]__ead6ff22._.js
│  │  │     ├─ [root-of-the-server]__ead6ff22._.js.map
│  │  │     ├─ [root-of-the-server]__fa7568fa._.js
│  │  │     ├─ [root-of-the-server]__fa7568fa._.js.map
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_0759203e._.js
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_0759203e._.js.map
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_56de5e0b._.js
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_56de5e0b._.js.map
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_59fa4ecd._.js
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_59fa4ecd._.js.map
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_5a65cd6c._.js
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_5a65cd6c._.js.map
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_6867e15e._.js
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_6867e15e._.js.map
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_7d504456._.js
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_7d504456._.js.map
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_d97cca7d._.js
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_d97cca7d._.js.map
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_d99d6b06._.js
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_d99d6b06._.js.map
│  │  │     ├─ [turbopack]_runtime.js
│  │  │     ├─ [turbopack]_runtime.js.map
│  │  │     ├─ _5f904819._.js
│  │  │     ├─ _5f904819._.js.map
│  │  │     ├─ _7f587881._.js
│  │  │     ├─ _7f587881._.js.map
│  │  │     ├─ _9f86be57._.js
│  │  │     ├─ _9f86be57._.js.map
│  │  │     ├─ _a301df66._.js
│  │  │     ├─ _a301df66._.js.map
│  │  │     ├─ _dfbfff75._.js
│  │  │     ├─ _dfbfff75._.js.map
│  │  │     ├─ _fffc2109._.js
│  │  │     ├─ _fffc2109._.js.map
│  │  │     ├─ src_app_a4430781._.js
│  │  │     └─ src_app_a4430781._.js.map
│  │  ├─ interception-route-rewrite-manifest.js
│  │  ├─ middleware-build-manifest.js
│  │  ├─ middleware-manifest.json
│  │  ├─ next-font-manifest.js
│  │  ├─ next-font-manifest.json
│  │  ├─ pages
│  │  │  ├─ _app
│  │  │  │  ├─ build-manifest.json
│  │  │  │  ├─ next-font-manifest.json
│  │  │  │  ├─ pages-manifest.json
│  │  │  │  └─ react-loadable-manifest.json
│  │  │  ├─ _app.js
│  │  │  ├─ _app.js.map
│  │  │  ├─ _document
│  │  │  │  ├─ next-font-manifest.json
│  │  │  │  ├─ pages-manifest.json
│  │  │  │  └─ react-loadable-manifest.json
│  │  │  ├─ _document.js
│  │  │  ├─ _document.js.map
│  │  │  ├─ _error
│  │  │  │  ├─ build-manifest.json
│  │  │  │  ├─ next-font-manifest.json
│  │  │  │  ├─ pages-manifest.json
│  │  │  │  └─ react-loadable-manifest.json
│  │  │  ├─ _error.js
│  │  │  └─ _error.js.map
│  │  ├─ pages-manifest.json
│  │  ├─ server-reference-manifest.js
│  │  └─ server-reference-manifest.json
│  ├─ static
│  │  ├─ chunks
│  │  │  ├─ [next]_internal_font_google_geist_e531dabc_module_css_f9ee138c._.single.css
│  │  │  ├─ [next]_internal_font_google_geist_e531dabc_module_css_f9ee138c._.single.css.map
│  │  │  ├─ [next]_internal_font_google_geist_mono_68a01160_module_css_f9ee138c._.single.css
│  │  │  ├─ [next]_internal_font_google_geist_mono_68a01160_module_css_f9ee138c._.single.css.map
│  │  │  ├─ [root-of-the-server]__49fd8634._.js
│  │  │  ├─ [root-of-the-server]__49fd8634._.js.map
│  │  │  ├─ [root-of-the-server]__8df7605f._.js
│  │  │  ├─ [root-of-the-server]__8df7605f._.js.map
│  │  │  ├─ [root-of-the-server]__8ebb6d4b._.css
│  │  │  ├─ [root-of-the-server]__8ebb6d4b._.css.map
│  │  │  ├─ [root-of-the-server]__923cb372._.js
│  │  │  ├─ [root-of-the-server]__923cb372._.js.map
│  │  │  ├─ [root-of-the-server]__e2c08166._.js
│  │  │  ├─ [root-of-the-server]__e2c08166._.js.map
│  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_61dcf9ba._.js
│  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_61dcf9ba._.js.map
│  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_66796270._.js
│  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_fd44f5a4._.js
│  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_fd44f5a4._.js.map
│  │  │  ├─ _052f4e48._.js
│  │  │  ├─ _052f4e48._.js.map
│  │  │  ├─ _251fe1cf._.js
│  │  │  ├─ _251fe1cf._.js.map
│  │  │  ├─ _34710520._.js
│  │  │  ├─ _34710520._.js.map
│  │  │  ├─ _42b863e9._.js
│  │  │  ├─ _42b863e9._.js.map
│  │  │  ├─ _4469f6db._.js
│  │  │  ├─ _4469f6db._.js.map
│  │  │  ├─ _5dea48aa._.js
│  │  │  ├─ _5dea48aa._.js.map
│  │  │  ├─ _7d35590f._.js
│  │  │  ├─ _7d35590f._.js.map
│  │  │  ├─ _82ac2559._.js
│  │  │  ├─ _82ac2559._.js.map
│  │  │  ├─ _93808211._.js
│  │  │  ├─ _93808211._.js.map
│  │  │  ├─ _9fa1b564._.js
│  │  │  ├─ _9fa1b564._.js.map
│  │  │  ├─ _a05b4d6d._.js
│  │  │  ├─ _a05b4d6d._.js.map
│  │  │  ├─ _a5e07c80._.js
│  │  │  ├─ _a5e07c80._.js.map
│  │  │  ├─ _cf0fdfc9._.js
│  │  │  ├─ _cf0fdfc9._.js.map
│  │  │  ├─ _e69f0d32._.js
│  │  │  ├─ _eb2ac812._.js
│  │  │  ├─ _eb2ac812._.js.map
│  │  │  ├─ pages
│  │  │  │  ├─ _app.js
│  │  │  │  └─ _error.js
│  │  │  ├─ pages__app_5771e187._.js
│  │  │  ├─ pages__app_9114105e._.js
│  │  │  ├─ pages__app_9114105e._.js.map
│  │  │  ├─ pages__error_5771e187._.js
│  │  │  ├─ pages__error_ec6747c0._.js
│  │  │  ├─ pages__error_ec6747c0._.js.map
│  │  │  ├─ src_app_favicon_ico_mjs_8a7a8fdc._.js
│  │  │  ├─ src_app_find_page_tsx_8450df25._.js
│  │  │  ├─ src_app_globals_css_f9ee138c._.single.css
│  │  │  ├─ src_app_globals_css_f9ee138c._.single.css.map
│  │  │  ├─ src_app_layout_tsx_c0237562._.js
│  │  │  ├─ src_app_login_page_tsx_8450df25._.js
│  │  │  ├─ src_app_page_tsx_8450df25._.js
│  │  │  └─ src_app_signup_page_tsx_8450df25._.js
│  │  ├─ development
│  │  │  ├─ _buildManifest.js
│  │  │  ├─ _clientMiddlewareManifest.json
│  │  │  └─ _ssgManifest.js
│  │  └─ media
│  │     ├─ favicon.45db1c09.ico
│  │     ├─ gyByhwUxId8gMEwSGFWNOITddY4-s.81df3a5b.woff2
│  │     ├─ gyByhwUxId8gMEwYGFWNOITddY4-s.b7d310ad.woff2
│  │     ├─ gyByhwUxId8gMEwcGFWNOITd-s.p.da1ebef7.woff2
│  │     ├─ or3nQ6H_1_WfwkMZI_qYFrMdmhHkjkotbA-s.cb6bbcb1.woff2
│  │     ├─ or3nQ6H_1_WfwkMZI_qYFrcdmhHkjko-s.p.be19f591.woff2
│  │     └─ or3nQ6H_1_WfwkMZI_qYFrkdmhHkjkotbA-s.e32db976.woff2
│  ├─ trace
│  ├─ transform.js
│  ├─ transform.js.map
│  └─ types
├─ README.md
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ src
│  ├─ app
│  │  ├─ favicon.ico
│  │  ├─ find
│  │  │  └─ page.tsx
│  │  ├─ globals.css
│  │  ├─ home
│  │  │  └─ page.tsx
│  │  ├─ hooks
│  │  ├─ layout.tsx
│  │  ├─ login
│  │  │  └─ page.tsx
│  │  ├─ mypage
│  │  │  └─ page.tsx
│  │  ├─ page.tsx
│  │  ├─ signup
│  │  │  └─ page.tsx
│  │  ├─ simulation
│  │  │  ├─ [id]
│  │  │  │  └─ page.tsx
│  │  │  ├─ guide
│  │  │  │  └─ page.tsx
│  │  │  └─ page.tsx
│  │  └─ voca
│  │     └─ page.tsx
│  └─ components
│     ├─ common
│     │  ├─ Button.tsx
│     │  ├─ Input.tsx
│     │  └─ Select.tsx
│     ├─ find
│     │  ├─ IdFindForm.tsx
│     │  └─ PwFindForm.tsx
│     ├─ login
│     │  └─ LoginForm.tsx
│     └─ signup
│        ├─ SignupForm.tsx
│        └─ fields
│           ├─ BirthField.tsx
│           ├─ EmailField.tsx
│           ├─ IdField.tsx
│           └─ PasswordField.tsx
└─ tsconfig.json

```