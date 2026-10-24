# chrisphua.github.io

Static files in `site/`, published to GitHub Pages by `.github/workflows/ci.yml` on every
push to `main`. No build step.

- `site/index.html` — the home page.
- `site/apps/<App>/` — each app's landing, privacy and support pages. App Store and Google
  Play listings link to these addresses, so keep the paths stable.

Releases of this repo host app downloads (the `MyDownloader` release is replaced in place by
MyDownloader's own release workflow). Support questions arrive as this repo's issues.
