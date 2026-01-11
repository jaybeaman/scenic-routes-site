# Scenic Routes Website

Built with [Eleventy](https://www.11ty.dev/) v3.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher

## Installation

```bash
npm install
```

## Development

Start the local dev server with live reload:

```bash
npm run dev
```

The site will be available at `http://localhost:8080`.

## Build

Generate the production site:

```bash
npm run build
```

Output is written to the `_site/` directory.

## Project Structure

```
src/
├── _includes/
│   ├── layouts/
│   │   └── base.njk        # Main HTML template
│   └── partials/
│       ├── header.njk      # Site header and navigation
│       └── footer.njk      # Site footer
├── css/
│   └── styles.css          # Stylesheet
├── js/
│   └── main.js             # JavaScript
├── images/                 # Image assets
├── index.njk               # Homepage
├── about.njk               # About page
└── membership.njk          # Membership page
```

## Deployment

Configured for Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `_site`
