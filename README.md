# Neri

The Neri launch website introduces the planned parish platform and invites Irish parishes to a pilot conversation.

Website: https://ldaly4.github.io/churchapp/

## Edit and publish

The live website source is in [docs/](docs/). Edit `index.html`, `styles.css`, `script.js` or the files in `assets/`, then commit and push to `main`. GitHub Pages publishes the `docs/` directory automatically. The `.nojekyll` file keeps these static files unchanged.

No build, package installation, accounts or payment services are required. Pilot contact links open an email addressed to `hello@neri.ie`; the page does not store signup submissions. Product previews use fictional parish content.

## Local preview

From the repository root, run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory docs
```

Open http://localhost:4173. Google Fonts load externally, with system font fallbacks.

The earlier clickable parish app prototype remains at the root `index.html`.
