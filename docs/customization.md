# Customization guide

Edit the data and configuration files below to make the storefront your own.
After changing product or configurator data, run `npx tsc --noEmit` and
`npm run build` to catch type and build errors.

## What do you want to change?

| What do you want to change? | Which file |
| --- | --- |
| Store name, logo text, title, contact details, hours, or currency symbol | [`config/site.ts`](../config/site.ts) |
| Products, categories, filters, colors and product images | [`data/products.ts`](../data/products.ts) |
| Hero featured PC, price, specs, or image | [`data/hero.ts`](../data/hero.ts) |
| Blog posts, article text and images | [`data/posts.ts`](../data/posts.ts) |
| Offers and sale copy | [`data/offers.ts`](../data/offers.ts) |
| Promo code values | [`data/promos.ts`](../data/promos.ts) |
| Configurator parts, compatibility values, and presets | [`data/configurator.ts`](../data/configurator.ts) |
| Shipping, tax, and supported countries | [`components/Cart/cart-config.ts`](../components/Cart/cart-config.ts) |
| Header navigation and footer links | [`config/navigation.ts`](../config/navigation.ts) |
| Legal page text and template notice | [`components/Legal/legal-content.ts`](../components/Legal/legal-content.ts) |
| Fonts | [`app/layout.tsx`](../app/layout.tsx) and [`app/globals.css`](../app/globals.css) |
| Brand color tokens | [`app/globals.css`](../app/globals.css) |
| Home page section order | [`app/page.tsx`](../app/page.tsx) |
| Site icon (browser tab) | [`app/icon.svg`](../app/icon.svg) |

## Store identity and contact details

1. Open [`config/site.ts`](../config/site.ts).
2. Set `SITE.name`, `SITE.logoText`, `SITE.tagline`, `SITE.description`,
   `SITE.footerDescription`, and `SITE.titleTemplate` to your store's identity.
   The sample title template currently contains the text `Your Brand`; update it
   along with the name.
3. Replace the placeholder `contact.email`, `contact.phone`, `contact.address`,
   and `contact.country`.
4. Edit each entry in `hours` for the days and hours you actually support.
5. Fill in the social `href` URLs in [`config/site.ts`](../config/site.ts); social
   entries with empty URLs are hidden.

The logo is text configured through `logoText`; this project does not include a
separate logo-image setting.

## Currency

Change `SITE.currencySymbol` in [`config/site.ts`](../config/site.ts). Prices in
the sample data are numeric values, not converted currency amounts. Review all
catalog and configurator prices, formatting, tax, shipping, and your checkout
integration when changing currency; changing the symbol alone does not convert
prices or update exchange rates.

## Products and categories

1. Edit the `PRODUCTS` entries in [`data/products.ts`](../data/products.ts).
   Each product has an `id`, `name`, `category`, `price`, `rating`, `reviews`,
   `colors`, and `inStock`; `oldPrice` and `image` are optional.
2. Use one of the current `ProductCategory` values (`Audio`, `Monitors`,
   `Mice`, or `Keyboards`) or update the category type and the related category
   filter data in the same file.
3. If you add a product color, check `COLOR_FILTERS` in that file so shoppers
   can filter for it.
4. Keep each product ID unique. Product images can be added as described in
   [the image guide](../public/images/README.md).

## Product images

Put image files under `public/` (a suggested organization is
`public/images/products/`) and set the corresponding product's `image` field to
its URL path, such as `/images/products/headset.webp`. The file's URL starts
with `/`; do not include `public` in the URL. See
[the image guide](../public/images/README.md) for product, blog, and hero images.

Use lowercase letters, digits and hyphens in image file names, with no spaces
(for example `wireless-headset.webp`). Hosting on Linux, including Vercel, is
case-sensitive, so `Headset.webp` and `headset.webp` are different files.


## Blog posts

1. Edit or add entries in [`data/posts.ts`](../data/posts.ts).
2. Provide a unique `id` and `slug`, plus the displayed category, title,
   excerpt, date, read time, icon, and gradient. `tags`, `featured`, `image`,
   and `content` are optional.
3. Add a `content` array (one string per paragraph) to turn a card into a
   clickable article page at `/blog/<slug>`. Posts without `content` stay as
   plain cards with no link.
4. Set `image` to a public URL path (for example,
   `/images/blog/build-guide.webp`) to show an image instead of the card's icon
   and gradient.

The included article text is sample content. Replace it with your own before
launching the store.

## Offers and promo codes

Edit offer copy, badges, and notes in [`data/offers.ts`](../data/offers.ts).
The optional `code` on an offer must match a key in
[`data/promos.ts`](../data/promos.ts), where each value is the percentage
discount. TypeScript checks this relationship: a code displayed by an offer
that is not registered in the promo table causes a type error.

The demo promo codes currently defined in `data/promos.ts` are:

| Code | Discount |
| --- | ---: |
| `FLASH25` | 25% |
| `BUNDLE15` | 15% |
| `STUDENT10` | 10% |

These are client-side demo discounts, not secure validation. Validate codes and
recalculate the final amount on your server before accepting an order; details
are in [the integrations guide](integrations.md).

## Configurator parts and presets

1. Edit the `CATEGORIES` array in [`data/configurator.ts`](../data/configurator.ts)
   to change part names, specs, prices, and optional scores or compatibility
   values.
2. Each category key is part of the `CategoryKey` type. If you add or rename a
   category, update the type and the `Selection` shape as well as all preset
   selections.
3. Update `PRESETS` in the same file. Every preset's `picks` must refer to
   existing part IDs for all category keys.
4. Review the `METRICS` and `BASE_POWER` values if the new components should
   change the configurator's performance estimates.

## Shipping, tax, and countries

Open [`components/Cart/cart-config.ts`](../components/Cart/cart-config.ts).
Adjust `TAX_RATE`, `FREE_SHIPPING_MIN`, and `FLAT_SHIPPING`, and update
`EXPRESS_SHIPPING` for the express rate. Edit `SHIPPING_METHODS` to change the
available delivery labels or estimates, and `COUNTRIES` to change the address
country list. These values currently run in client-side code; a real checkout
must calculate and validate the final charges on a server.

## Navigation and footer links

Edit [`config/navigation.ts`](../config/navigation.ts). `NAV_ITEMS` and
`SHOP_CATEGORIES` configure the header and shop menu. `COMPANY_LINKS`,
`SERVICE_LINKS`, and `BOTTOM_LINKS` configure footer links. Check that every
destination exists: many current links point to section IDs on `/`, and legal
links use `/legal/<slug>`.

## Legal pages

The editable sample documents and their supported slugs are in
[`components/Legal/legal-content.ts`](../components/Legal/legal-content.ts).
Replace the sample text with your own policies and have them reviewed for your
business and locations. The text is not legal advice.

Set `SHOW_TEMPLATE_NOTICE` to `false` only after you have replaced the sample
text with your own content. Do not remove the notice to present sample policies
as final legal documents.

## Fonts

The root layout loads Geist, Geist Mono, and Orbitron using `next/font/google`
in [`app/layout.tsx`](../app/layout.tsx). To change the fonts, update the
imports and font setup there, then update any font-family references or CSS
variables used by the app. Keep the relevant font variables available on the
root element.

## Add a home page section or a route

To add a section to the home page, create a component under `components/` using
the project's existing component conventions, then import and render it in
[`app/page.tsx`](../app/page.tsx) at the desired position. If it needs a
navigation link, add a matching section ID and update
[`config/navigation.ts`](../config/navigation.ts).

To add a page, create a route segment under `app/` with a `page.tsx` file (for
example, `app/about/page.tsx` for `/about`). Add links to that route where
appropriate and check it in both development and production builds.

## Change the brand color

The supported brand tokens are in the `@theme` block in
[`app/globals.css`](../app/globals.css). The current values are:

| Shade | `brand-primary` | `brand-accent` |
| ---: | --- | --- |
| 200 | `#a5f3fc` | `#fed7aa` |
| 300 | `#67e8f9` | `#fdba74` |
| 400 | `#22d3ee` | `#fb923c` |
| 500 | `#06b6d4` | `#f97316` |

The exact token names are `--color-brand-primary-200`,
`--color-brand-primary-300`, `--color-brand-primary-400`,
`--color-brand-primary-500`, and the corresponding
`--color-brand-accent-200`, `--color-brand-accent-300`,
`--color-brand-accent-400`, and `--color-brand-accent-500`.

Replace the hex values for the shades you want to recolor. These tokens do not
control the separate sky and amber gradient ends, semantic red, emerald, amber,
or pink colors, or the dark surface colors used elsewhere in the UI. A brand
palette needing additional shades can add more `--color-brand-primary-*` or
`--color-brand-accent-*` entries to the `@theme` block.


## Change the site icon

Replace `app/icon.svg` with your own icon (SVG, PNG or ICO). You can also add
`app/favicon.ico`. Next.js picks these files up automatically. The placeholder
icon uses fixed colors and does not follow the brand color tokens.