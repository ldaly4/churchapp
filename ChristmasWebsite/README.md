# Lucy & Patrick’s Christmas cards

A single-page site for requesting a posted card or an e-card. The page uses plain HTML, CSS and JavaScript. Open `index.html` to preview it locally, or run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Personalise the page

- **Deadline** — Set `POSTED_CARD_DEADLINE` near the top of `script.js` using `YYYY-MM-DD`. The sample date is 10 December 2026.
- **Personal links and events** — Update the two example URLs and the three placeholder events in the About us and Events sections of `index.html`.
- **Fireplace** — The two `fireplace-placeholder*.webp` images are an interim embers-only edit of the attached reference painting. When your final artwork is ready, place `fireplace.png` in `images/`, set the `.room` image’s `src` in `index.html` to `images/fireplace.png`, remove the placeholder `srcset` and `sizes`, and update `width` and `height` to the new image’s dimensions. For a smaller mobile download, you can supply a resized copy using `srcset`.
- **Flames** — The three transparent `images/flame-*.png` files are placeholders. Replace them using the same names. Keep every frame on an equally sized transparent canvas so the fire stays anchored. If the canvas ratio changes, update `.fire`’s `aspect-ratio` in `styles.css` and the first frame’s dimensions in `index.html`. Set `--flame-top`, `--flame-left` and `--flame-width` at the top of `styles.css` to align the fire. To add a fourth frame, put `flame-4.png` in `images/` and add its path to `EXTRA_FLAME_FRAMES` in `script.js`. People using reduced motion see the first frame.
- **Post boxes** — Replace the illustrated placeholders `images/postbox-letter.png` and `images/postbox-email.png` with your artwork using the same names. Update the image dimensions in `index.html` if the new aspect ratios differ.

## Connect a private Google Sheet

1. Create a Google Sheet and name its tab `Christmas cards`. Keep its general access **Restricted** and grant access to Lucy and Patrick only.
2. Paste this tab-separated header into cell A1.

   ```text
   timestamp	type	name	email	address1	address2	town	county	country	eircode	irish	note
   ```

3. From the Sheet, open **Extensions → Apps Script**, replace the starter code with `apps-script.gs` and paste the Sheet ID into `SPREADSHEET_ID`. It’s the part of the Sheet URL between `/d/` and `/edit`.
4. Choose **Deploy → New deployment → Web app**. Under **Execute as**, choose **Me**. Allow **Anyone**, including signed-out visitors, to access the web app. Authorise and deploy it. The web app accepts submissions while Sheet access stays restricted. [Google Apps Script web app guide](https://developers.google.com/apps-script/guides/web)
5. Copy the URL ending in `/exec` into `APPS_SCRIPT_URL` at the top of `script.js`. If you subsequently edit the Apps Script, use **Deploy → Manage deployments** and update the deployment to a new version.
6. Before sharing the site, use a signed-out browser to submit a test through each form and verify both rows directly in the Sheet. The browser sends a `FormData` POST using `no-cors`, which makes the response opaque. The acknowledgement means the request was sent, and the Sheet confirms whether it was saved. [MDN on opaque Fetch responses](https://developer.mozilla.org/en-US/docs/Web/API/Response/type)

## Deploy

The web files are `index.html`, `styles.css`, `script.js` and `images/`. Keep those files together and publish them as static files.

- **GitHub Pages** — Put the web files at the root of a dedicated repository, with `index.html` at the top level. In **Settings → Pages**, choose **Deploy from a branch**, select your branch and **/(root)**, then save. If you already publish the parent repository’s root through Pages, the folder can also be served at `/ChristmasWebsite/` under that project’s Pages URL. [GitHub Pages publishing guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- **Netlify** — Put the web files in a folder and drag it onto Netlify Drop. For a Git-connected deployment of the parent repository, use `ChristmasWebsite` as the publish directory and leave the build command blank. [Netlify deployment guide](https://docs.netlify.com/deploy/create-deploys/)
