# Neri

The Neri launch website introduces the planned parish platform and invites parishes to a pilot conversation.

Website: https://neri.ie/

## Edit and publish

The live website source is in [docs/](docs/). Edit `index.html`, `styles.css`, `script.js` or the files in `assets/`, then commit and push to `main`. GitHub Pages publishes the `docs/` directory automatically. The `.nojekyll` file keeps these static files unchanged.

The custom domain is declared in [docs/CNAME](docs/CNAME), at the root of the published source. It contains only `neri.ie`. Site and demo assets use relative paths and do not depend on a `/churchapp/` URL prefix. The domain's DNS must point to GitHub Pages for the custom URL to work.

No build, package installation, accounts or payment services are required. Tester signup links open the [Neri survey on Tally](https://tally.so/r/bZZr1g) for the faithful, clergy and parish staff. Signup responses are collected by that survey; this static page does not store submissions. General contact remains `lucy@neri.ie`. Product previews use fictional parish content.

## Embedded parish app

The phone on the homepage embeds [docs/demo/index.html](docs/demo/index.html), adapted from the supplied Delvin prototype. It keeps its own navigation, scrolling, candle animation, novenas and simulated enquiry and donation flows. The homepage includes a “Start again” control that reloads the demo.

The prototype uses St Brigid's as a clearly labelled sample parish, with illustrative meet-ups, a Christmas crib invitation and a four-week Advent journey. Times, events and parish information are illustrative. Nothing is sent to a parish and no payments are taken. Use made-up details when testing. The photo picker can save a chosen church image locally in the visitor's browser; prayer and enquiry interactions remain simulated. External sharing links open separately.

## Local preview

From the repository root, run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory docs
```

Open http://localhost:4173. Google Fonts load externally, with system font fallbacks.

The earlier clickable parish app prototype remains at the root `index.html`.
