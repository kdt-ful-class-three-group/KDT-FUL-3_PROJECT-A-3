## 폴더 구조 설계

```
KDT-FUL-3_PROJECT-A-3
├─ README.md
├─ client
│  ├─ .next
│  │  ├─ app-build-manifest.json
│  │  ├─ build
│  │  │  └─ chunks
│  │  │     ├─ [root-of-the-server]__04d7a048._.js
│  │  │     ├─ [root-of-the-server]__04d7a048._.js.map
│  │  │     ├─ [root-of-the-server]__05f88b00._.js
│  │  │     ├─ [root-of-the-server]__05f88b00._.js.map
│  │  │     ├─ [turbopack]_runtime.js
│  │  │     ├─ [turbopack]_runtime.js.map
│  │  │     ├─ postcss_config_mjs_transform_ts_f0ffbaad._.js
│  │  │     └─ postcss_config_mjs_transform_ts_f0ffbaad._.js.map
│  │  ├─ build-manifest.json
│  │  ├─ cache
│  │  │  └─ .rscinfo
│  │  ├─ fallback-build-manifest.json
│  │  ├─ package.json
│  │  ├─ server
│  │  │  ├─ app
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
│  │  │  ├─ app-paths-manifest.json
│  │  │  ├─ chunks
│  │  │  │  └─ ssr
│  │  │  │     ├─ [externals]_next_dist_compiled_next-server_app-page-turbo_runtime_dev_30fa57d5.js
│  │  │  │     ├─ [externals]_next_dist_compiled_next-server_app-page-turbo_runtime_dev_30fa57d5.js.map
│  │  │  │     ├─ [root-of-the-server]__0a46983d._.js
│  │  │  │     ├─ [root-of-the-server]__0a46983d._.js.map
│  │  │  │     ├─ [root-of-the-server]__4c58c055._.js
│  │  │  │     ├─ [root-of-the-server]__4c58c055._.js.map
│  │  │  │     ├─ [root-of-the-server]__6302eb5e._.js
│  │  │  │     ├─ [root-of-the-server]__6302eb5e._.js.map
│  │  │  │     ├─ [turbopack]_runtime.js
│  │  │  │     ├─ [turbopack]_runtime.js.map
│  │  │  │     ├─ _dfbfff75._.js
│  │  │  │     ├─ _dfbfff75._.js.map
│  │  │  │     ├─ src_app_a4430781._.js
│  │  │  │     └─ src_app_a4430781._.js.map
│  │  │  ├─ interception-route-rewrite-manifest.js
│  │  │  ├─ middleware-build-manifest.js
│  │  │  ├─ middleware-manifest.json
│  │  │  ├─ next-font-manifest.js
│  │  │  ├─ next-font-manifest.json
│  │  │  ├─ pages-manifest.json
│  │  │  ├─ server-reference-manifest.js
│  │  │  └─ server-reference-manifest.json
│  │  ├─ static
│  │  │  ├─ chunks
│  │  │  │  ├─ [next]_internal_font_google_geist_e531dabc_module_css_f9ee138c._.single.css
│  │  │  │  ├─ [next]_internal_font_google_geist_e531dabc_module_css_f9ee138c._.single.css.map
│  │  │  │  ├─ [next]_internal_font_google_geist_mono_68a01160_module_css_f9ee138c._.single.css
│  │  │  │  ├─ [next]_internal_font_google_geist_mono_68a01160_module_css_f9ee138c._.single.css.map
│  │  │  │  ├─ [root-of-the-server]__8ebb6d4b._.css
│  │  │  │  ├─ [root-of-the-server]__8ebb6d4b._.css.map
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_61dcf9ba._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_61dcf9ba._.js.map
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_66796270._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_fd44f5a4._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_fd44f5a4._.js.map
│  │  │  │  ├─ _93808211._.js
│  │  │  │  ├─ _93808211._.js.map
│  │  │  │  ├─ _e69f0d32._.js
│  │  │  │  ├─ src_app_favicon_ico_mjs_8a7a8fdc._.js
│  │  │  │  ├─ src_app_globals_css_f9ee138c._.single.css
│  │  │  │  ├─ src_app_globals_css_f9ee138c._.single.css.map
│  │  │  │  ├─ src_app_layout_tsx_c0237562._.js
│  │  │  │  └─ src_app_page_tsx_8450df25._.js
│  │  │  ├─ development
│  │  │  │  ├─ _buildManifest.js
│  │  │  │  ├─ _clientMiddlewareManifest.json
│  │  │  │  └─ _ssgManifest.js
│  │  │  └─ media
│  │  │     ├─ favicon.45db1c09.ico
│  │  │     ├─ gyByhwUxId8gMEwSGFWNOITddY4-s.81df3a5b.woff2
│  │  │     ├─ gyByhwUxId8gMEwYGFWNOITddY4-s.b7d310ad.woff2
│  │  │     ├─ gyByhwUxId8gMEwcGFWNOITd-s.p.da1ebef7.woff2
│  │  │     ├─ or3nQ6H_1_WfwkMZI_qYFrMdmhHkjkotbA-s.cb6bbcb1.woff2
│  │  │     ├─ or3nQ6H_1_WfwkMZI_qYFrcdmhHkjko-s.p.be19f591.woff2
│  │  │     └─ or3nQ6H_1_WfwkMZI_qYFrkdmhHkjkotbA-s.e32db976.woff2
│  │  ├─ trace
│  │  ├─ transform.js
│  │  ├─ transform.js.map
│  │  └─ types
│  ├─ README.md
│  ├─ eslint.config.mjs
│  ├─ next-env.d.ts
│  ├─ next.config.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ public
│  │  ├─ file.svg
│  │  ├─ globe.svg
│  │  ├─ next.svg
│  │  ├─ vercel.svg
│  │  └─ window.svg
│  ├─ src
│  │  └─ app
│  │     ├─ favicon.ico
│  │     ├─ globals.css
│  │     ├─ layout.tsx
│  │     └─ page.tsx
│  └─ tsconfig.json
└─ server
   ├─ .prettierrc
   ├─ README.md
   ├─ dist
   │  ├─ app.controller.d.ts
   │  ├─ app.controller.js
   │  ├─ app.controller.js.map
   │  ├─ app.module.d.ts
   │  ├─ app.module.js
   │  ├─ app.module.js.map
   │  ├─ app.service.d.ts
   │  ├─ app.service.js
   │  ├─ app.service.js.map
   │  ├─ main.d.ts
   │  ├─ main.js
   │  ├─ main.js.map
   │  └─ tsconfig.build.tsbuildinfo
   ├─ eslint.config.mjs
   ├─ nest-cli.json
   ├─ package-lock.json
   ├─ package.json
   ├─ src
   │  ├─ app.controller.spec.ts
   │  ├─ app.controller.ts
   │  ├─ app.module.ts
   │  ├─ app.service.ts
   │  └─ main.ts
   ├─ test
   │  ├─ app.e2e-spec.ts
   │  └─ jest-e2e.json
   ├─ tsconfig.build.json
   └─ tsconfig.json

```