# March for Jesus Belfast

Static website for [marchforjesus.co.uk](https://marchforjesus.co.uk) — March for Jesus Belfast, 16th May 2026.

## Tech Stack

- Static HTML, CSS, JavaScript
- Google Fonts (Playfair Display + Inter)
- Hosted on GitHub Pages

## Local Development

Open `index.html` in a browser. No build tools required.

## Deployment

This site is deployed via GitHub Pages. Push to `main` and GitHub Pages will serve the site automatically.

### Custom Domain Setup

To point `marchforjesus.co.uk` to GitHub Pages:

1. **A Records** (apex domain) — point to GitHub Pages IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

2. **CNAME Record** — point `www` to `<username>.github.io`

3. In GitHub repo Settings → Pages → Custom domain, enter `marchforjesus.co.uk`

4. Enable "Enforce HTTPS"

## Adding Photos

Replace the SVG placeholder files in `images/` with real JPG/PNG photos. Update the `src` attributes in `index.html` accordingly.
