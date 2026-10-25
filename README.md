# VOLT Recovery

Arabic, mobile-friendly landing page for home massage and sports recovery in Greater Cairo.

Website: https://voltmsg.store/

## Site files

- `index.html`: homepage, service cards, pricing, coverage, FAQ and booking dialog.
- `style.css` and `design.css`: base styles and responsive visual design.
- `app.js`: booking steps, service selection, date/time pickers and navigation.
- `booking-utils.js`: package prices and WhatsApp request formatting.
- `assets/`: website photography, favicon and social sharing image.
- `robots.txt` and `sitemap.xml`: search engine discovery.
- `CNAME`: custom domain used by GitHub Pages.

## Local preview

Open `index.html` in a browser, or serve the repository with a local static server.
No build step or package installation is required.

## Publishing

GitHub Pages serves the root of the `main` branch at `voltmsg.store`.
Commit the HTML, CSS, JavaScript and referenced assets together.
Keep local screenshots and verification scripts in `previews/`, which is ignored by Git.

## Booking

Visitors choose a service, package and preferred appointment details, then review a
WhatsApp message before sending it to +20 107 095 4997. A request is not a confirmed
appointment; availability is agreed directly with the captain.

Prices and package durations are defined in `booking-utils.js`. Update the matching
homepage cards when changing prices. Social sharing metadata points to
`assets/volt-social.jpg`; browser icons are in `assets/volt-icon.svg` and `.ico`.
