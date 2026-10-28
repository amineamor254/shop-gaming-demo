# Seller release checklist

Complete these checks on your release copy before publishing or creating the
customer ZIP.

## Store content and rights

- [ ] Replace the sample legal text in
      [`components/Legal/legal-content.ts`](../components/Legal/legal-content.ts)
      with policies you wrote and had appropriately reviewed.
- [ ] Set `SHOW_TEMPLATE_NOTICE` to `false` in your demo only after you have
      replaced the sample text with your own.
- [ ] Search product, part, preset, and brand-like names in trademark
      databases such as the [WIPO Global Brand Database](https://branddb.wipo.int/)
      and the [USPTO trademark search](https://www.uspto.gov/trademarks/search).
      Names currently present in the requested source files:
  - [`data/products.ts`](../data/products.ts): Pulse Audio Headset; CoreSound
    Studio Headphones; ClearView 27 Monitor; Precision Wireless Mouse;
    Precision Pro Mouse; Mechanical Pro Keyboard; Waveform Gaming Speakers;
    ArcView 27 Monitor; Silent Precision Mouse; Aurora RGB Keyboard; Echo
    Surround Headset; ClearFrame 24 Monitor.
  - [`data/configurator.ts`](../data/configurator.ts): Core Lite 6-Core; Core
    Pro 8-Core; Core Elite 16-Core; Nova 8GB; Nova Pro 12GB; Nova Ultra 16GB;
    Nova Max 24GB; 16GB DDR5; 32GB DDR5; 64GB DDR5; 500GB NVMe; 1TB NVMe
    Gen4; 2TB NVMe Gen4; Dual Tower Air; 240mm Liquid AIO; 360mm Liquid AIO;
    Compact Mesh; Mid-Tower Glass RGB; Full-Tower Panoramic; 550W Bronze;
    750W Gold; 1000W Gold; 1200W Platinum. Preset names: Starter, Pro,
    Ultimate.
  - [`data/hero.ts`](../data/hero.ts): Apex Prime.
  - [`config/site.ts`](../config/site.ts): Your Brand; BRAND; Store.
- [ ] Review the asset list. `public/PC-Gaming.png` is present and was not
      referenced by the source search; confirm it is no longer needed before
      removing it. Review the remaining starter SVGs and any unused images too.
- [ ] Confirm every image, icon, font, and screenshot you ship is yours or
      properly licensed for the intended use.
- [ ] Read the terms of the marketplace where you plan to sell this template.

## Test the release

- [ ] Run `npm run lint`.
- [ ] Run `npx tsc --noEmit`.
- [ ] Run `npm run build`.
- [ ] Test the full storefront-to-checkout flow and cart behavior. Treat checkout
      as a demo until a real payment/order integration is implemented.
- [ ] Test each demo promo code and its expected discount.
- [ ] Test the Shop dropdown, mobile menu, and keyboard navigation.
- [ ] Check the layout and interactions at viewport widths of 390, 768, and
      1440 pixels.
- [ ] Deploy a live demo and take screenshots using images you own.

## Package the sale ZIP

- [ ] Build a fresh ZIP from the release copy. Exclude `node_modules/`, `.next/`,
      `.git/`, and `.env*`. The Git history contains the developer's name and
      email, so do not include `.git/`.
- [ ] Inspect the ZIP contents and verify that it contains the intended source,
      documentation, and assets and no secrets or generated build output.
