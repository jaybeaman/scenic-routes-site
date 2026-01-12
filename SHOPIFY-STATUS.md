# Scenic Routes Shopify Setup - Status

## What's Done
- **Shopify store live** at `shop.scenicroutessf.com`
- **Products imported** from Squarespace (used custom CSV converter)
- **Custom domain** configured via Cloudflare CNAME → `shops.myshopify.com`
- **Main site updated** - Shop link in header.njk points to `https://shop.scenicroutessf.com`
- **Dawn theme** installed (switched from Horizon which was a nightmare)
- **Custom fonts loaded** - DM Sans + Instrument Serif added to theme.liquid
- **Color scheme created** - Scheme 8 with sage (#D4DFD2), pink (#D64799), etc.

## What's NOT Done
- **Lightspeed integration** - Skipped. R-Series doesn't have native Shopify integration. Third-party connectors cost ~$50/month. Not worth it for current volume. Manual sync for now.
- **Theme styling** - Colors partially applied but may need more tweaking per-section in Dawn

## Color Reference
| Name | Hex | Usage |
|------|-----|-------|
| Sage | `#D4DFD2` | Main background |
| Sage Dark | `#b8c7b5` | Nav buttons, accents |
| Pink | `#D64799` | CTAs, links, prices |
| Pink Hover | `#c13d87` | Button hover states |
| Black | `#1a1a1a` | Text |
| White | `#fefefe` | Cards, footer bg |

## Files in This Repo
- `shopify-theme/` - CSS and Liquid snippets (some used, some not)
- `shopify import/shopify-ready.csv` - Cleaned product CSV for Shopify
- `shopify import/convert-to-shopify.cjs` - Converter script (Squarespace → Shopify format)

## Shopify Admin Access
Store URL: `scenic-routes-community-bicycle-center-2.myshopify.com`

## Next Steps
1. Fine-tune Dawn theme colors section-by-section if needed
2. Deploy main site changes (git push to trigger Cloudflare build)
3. Eventually: Build custom POS with Shopify API integration to replace Lightspeed
