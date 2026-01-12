const fs = require('fs');
const path = require('path');

// Read the input CSV
const inputPath = path.join(__dirname, 'Untitled spreadsheet - products_Jan-11_07-19-53PM (1).csv');
const outputPath = path.join(__dirname, 'shopify-ready.csv');

const input = fs.readFileSync(inputPath, 'utf8');
const lines = input.split('\n');

// Parse CSV (handling quoted fields with commas)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// Parse header and rows
const header = parseCSVLine(lines[0]);
const rows = lines.slice(1).filter(line => line.trim()).map(parseCSVLine);

// Map old column indices
const colIndex = {};
header.forEach((col, i) => colIndex[col.trim()] = i);

// Shopify output rows
const shopifyRows = [];

// Track current product for variants
let currentHandle = '';
let currentTitle = '';

for (const row of rows) {
  const productId = row[colIndex['Product ID [Non Editable]']] || '';
  const title = row[colIndex['Title']] || '';
  const productUrl = row[colIndex['Product URL']] || '';
  const description = row[colIndex['Description']] || '';
  const variantSku = row[colIndex['variant sku']] || '';
  const option1Name = row[colIndex['Option Name 1']] || '';
  const option1Value = row[colIndex['Option Value 1']] || '';
  const option2Name = row[colIndex['Option Name 2']] || '';
  const option2Value = row[colIndex['Option Value 2']] || '';
  const price = row[colIndex['Price']] || '';
  const stock = row[colIndex['Stock']] || '';
  const visible = row[colIndex['Visible']] || '';
  const imageSrc = row[colIndex['Image Src']] || '';

  // Determine if this is a new product or variant
  const isNewProduct = productId && title;

  if (isNewProduct) {
    currentHandle = productUrl;
    currentTitle = title;
  }

  // Split multiple image URLs
  const imageUrls = imageSrc.trim().split(/\s+/).filter(url => url.startsWith('http'));

  // Create the main row
  const shopifyRow = {
    Handle: currentHandle,
    Title: isNewProduct ? currentTitle : '',
    'Body (HTML)': isNewProduct ? description : '',
    Vendor: 'Scenic Routes',
    'Product Category': '',
    Type: '',
    Tags: '',
    Published: visible === 'Yes' ? 'TRUE' : 'FALSE',
    'Option1 Name': option1Name || 'Title',
    'Option1 Value': option1Value || 'Default Title',
    'Option2 Name': option2Name,
    'Option2 Value': option2Value,
    'Option3 Name': '',
    'Option3 Value': '',
    'Variant SKU': variantSku,
    'Variant Grams': '',
    'Variant Inventory Tracker': 'shopify',
    'Variant Inventory Qty': stock === 'Unlimited' ? '' : (stock || '0'),
    'Variant Inventory Policy': 'deny',
    'Variant Fulfillment Service': 'manual',
    'Variant Price': price,
    'Variant Compare At Price': '',
    'Variant Requires Shipping': 'TRUE',
    'Variant Taxable': 'TRUE',
    'Variant Barcode': '',
    'Image Src': imageUrls[0] || '',
    'Image Position': imageUrls[0] ? '1' : '',
    'Image Alt Text': '',
    'Gift Card': 'FALSE',
    'SEO Title': '',
    'SEO Description': '',
    'Variant Image': '',
    'Variant Weight Unit': 'lb',
    'Variant Tax Code': '',
    'Cost per item': '',
    'Status': visible === 'Yes' ? 'active' : 'draft'
  };

  shopifyRows.push(shopifyRow);

  // Add additional rows for extra images (only for new products)
  if (isNewProduct && imageUrls.length > 1) {
    for (let i = 1; i < imageUrls.length; i++) {
      const imageRow = {
        Handle: currentHandle,
        Title: '',
        'Body (HTML)': '',
        Vendor: '',
        'Product Category': '',
        Type: '',
        Tags: '',
        Published: '',
        'Option1 Name': '',
        'Option1 Value': '',
        'Option2 Name': '',
        'Option2 Value': '',
        'Option3 Name': '',
        'Option3 Value': '',
        'Variant SKU': '',
        'Variant Grams': '',
        'Variant Inventory Tracker': '',
        'Variant Inventory Qty': '',
        'Variant Inventory Policy': '',
        'Variant Fulfillment Service': '',
        'Variant Price': '',
        'Variant Compare At Price': '',
        'Variant Requires Shipping': '',
        'Variant Taxable': '',
        'Variant Barcode': '',
        'Image Src': imageUrls[i],
        'Image Position': String(i + 1),
        'Image Alt Text': '',
        'Gift Card': '',
        'SEO Title': '',
        'SEO Description': '',
        'Variant Image': '',
        'Variant Weight Unit': '',
        'Variant Tax Code': '',
        'Cost per item': '',
        'Status': ''
      };
      shopifyRows.push(imageRow);
    }
  }
}

// Generate output CSV
const shopifyHeader = Object.keys(shopifyRows[0]);
const csvLines = [shopifyHeader.join(',')];

for (const row of shopifyRows) {
  const values = shopifyHeader.map(col => {
    const val = row[col] || '';
    // Escape quotes and wrap in quotes if contains comma or quote
    if (val.includes(',') || val.includes('"') || val.includes('\n')) {
      return '"' + val.replace(/"/g, '""') + '"';
    }
    return val;
  });
  csvLines.push(values.join(','));
}

fs.writeFileSync(outputPath, csvLines.join('\n'));

console.log(`Converted ${rows.length} source rows to ${shopifyRows.length} Shopify rows`);
console.log(`Output saved to: ${outputPath}`);
