# Hein Soe Oo — Personal portfolio

A responsive, buildless website. No package installation or build step is required.

## Run locally

From this folder, run:

```sh
python3 -m http.server 8080
```

Open http://localhost:8080. You can also open index.html directly; copying email requires HTTPS or localhost.

## Customize

- `content.js`: contact links, project placeholders, skills, and employment history.
- `index.html`: name, biography, headline, metadata, and section copy.
- `style.css`: colors, typography, layout, responsive styles.
- `app.js`: theme persistence, case-study dialogs, and copy-email behavior.

Project images are CSS illustrations, clearly labeled as placeholders. Replace them with approved screenshots and add only verified outcomes. Legacy FA employment and the Team Lead role were confirmed by the user on 14 October 2026. EDKA and Legacy dates overlap; preserve if both were concurrent, otherwise correct after checking.

Contact details come from the supplied CV. Telephone is deliberately omitted from this public-facing page. Fonts load from Google Fonts with system fallbacks.

## Deploy

Upload the contents of `` to any static host. For Cloudflare Pages or Netlify use no build command and set the publish directory to `.`. For GitHub Pages, place the website files in the chosen publishing folder or deploy them using a Pages artifact workflow. All asset paths are relative so subdirectory hosting works.

Live website: https://engineering-portfolio-hein-1014.softdell64.chatgpt.site

The Sites deployment is public. Changes pushed to this repository do not automatically update Sites; redeploy after editing, or connect this repository to a static host.

## Content provenance

Employment, contact details, and most technologies: CV supplied by the user, updated 20 March 2025. Team lead, integrations, and architecture: explicit user-provided context. No invented achievements or performance statistics. Illustrative project cards are not claims of delivered projects.
