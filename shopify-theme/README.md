# Scenic Routes Shopify Theme Customizations

Custom styling to make your Shopify store match the main Scenic Routes website.

## Files Included

- `assets/scenic-routes-custom.css` - Main CSS overrides
- `snippets/scenic-header.liquid` - Custom header matching main site
- `snippets/scenic-footer.liquid` - Custom footer matching main site
- `config/settings_data.json` - Color scheme presets

## Quick Setup (Recommended)

The easiest way to apply these customizations:

### Step 1: Add Custom CSS

1. Go to **Shopify Admin > Online Store > Themes**
2. Click **Customize** on your current theme
3. Click **Theme Settings** (gear icon at bottom left)
4. Scroll down to **Custom CSS**
5. Copy the contents of `assets/scenic-routes-custom.css` and paste it there
6. Click **Save**

### Step 2: Set Colors in Theme Editor

1. In the theme customizer, go to **Theme Settings > Colors**
2. Set these colors:
   - **Background**: `#D4DFD2` (sage)
   - **Text**: `#1a1a1a` (near-black)
   - **Buttons/Accents**: `#D64799` (pink)
   - **Secondary Background**: `#fefefe` (white)

### Step 3: Set Fonts

Note: Shopify's built-in font picker doesn't include Instrument Serif or DM Sans. The custom CSS imports these fonts automatically.

## Advanced Setup (Full Theme Edit)

If you want full control with the custom header/footer:

### Step 1: Edit Theme Code

1. Go to **Shopify Admin > Online Store > Themes**
2. Click **... > Edit code** on your theme
3. Upload the files:
   - Add `scenic-routes-custom.css` to the `assets` folder
   - Add `scenic-header.liquid` to the `snippets` folder
   - Add `scenic-footer.liquid` to the `snippets` folder

### Step 2: Include the CSS

In `layout/theme.liquid`, add before `</head>`:
```liquid
{{ 'scenic-routes-custom.css' | asset_url | stylesheet_tag }}
```

### Step 3: Replace Header/Footer (Optional)

To use the custom header that links back to your main site:

In your theme's header section, you can include:
```liquid
{% render 'scenic-header' %}
```

For the footer:
```liquid
{% render 'scenic-footer' %}
```

## Color Reference

| Name | Hex | Usage |
|------|-----|-------|
| Sage | `#D4DFD2` | Main background |
| Sage Dark | `#b8c7b5` | Nav buttons, accents |
| Sage Light | `#e8ede7` | Highlights |
| Pink | `#D64799` | CTAs, links, prices |
| Pink Hover | `#c13d87` | Button hover states |
| Black | `#1a1a1a` | Text |
| White | `#fefefe` | Cards, footer bg |

## Typography

- **Headings**: Instrument Serif (400 weight)
- **Body**: DM Sans (400, 500, 600 weights)

Both fonts are loaded from Google Fonts via the custom CSS.

## Custom Domain Setup

To use `shop.scenicroutessf.com`:

1. In Shopify Admin, go to **Settings > Domains**
2. Click **Connect existing domain**
3. Enter `shop.scenicroutessf.com`
4. In Cloudflare DNS, add a CNAME record:
   - Name: `shop`
   - Target: `shops.myshopify.com`
5. Wait for DNS propagation (can take up to 48 hours)

## Lightspeed Integration

1. In Shopify Admin, go to **Settings > Apps and sales channels**
2. Visit the Shopify App Store
3. Search for "Lightspeed Retail" and install the official integration
4. Follow the setup wizard to connect your Lightspeed account
5. Configure inventory sync settings
