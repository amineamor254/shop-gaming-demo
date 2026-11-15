# Gaming PC Store Template

A one-page gaming PC storefront built with the Next.js App Router, TypeScript and
Tailwind CSS. It includes a product shop with filters, a PC configurator with
compatibility checks, offers with a countdown, a blog with sample articles, a
contact form, and separate cart, checkout, login and legal pages.

The sample content and forms are starting points: connect real commerce and
account services before you launch (see [what is simulated](docs/integrations.md)).

## Features

- Responsive storefront with sections for the shop, PC builder, blog, offers and contact
- Shop with category, price, color and availability filters, sorting and pagination
- PC configurator with presets, live price, performance estimates and
  compatibility checks (power supply wattage, cooler size)
- Cart saved in the browser, quantity controls, promo codes, free-shipping progress,
  shipping and tax calculation
- Checkout with field validation, delivery options and an order summary (demo)
- Login, sign-up and password reset screens (demo)
- Blog cards and article pages generated from simple data
- Editable sample legal pages: privacy, terms, shipping, returns and warranty
- Brand settings, catalog data and brand color tokens in dedicated files

## What is not included

- **Real payments, orders, accounts and emails.** These are demo screens. See
  [the integrations guide](docs/integrations.md) for how to connect your own services.
- **Demo images.** The live demo uses images that are not part of this download.
  The template ships with built-in placeholders, and
  [the image guide](public/images/README.md) explains how to add your own.
- **Final legal text.** The legal pages contain sample text only.

## Tech stack

| Technology | Version in `package.json` |
| --- | --- |
| Next.js | `16.3.5` |
| React | `19.2.8` |
| TypeScript | `^5` |
| Tailwind CSS | `^4` |
| lucide-react | `^1.54.0` |
| ESLint | `^9` |

## Requirements

- Node.js `>=20.9.0` (the minimum required by the installed Next.js package)
- npm, for the included `package-lock.json`

The VS Code extensions **Tailwind CSS IntelliSense** and **Prettier** are
recommended. Prettier is not included as a project dependency.

## Quick start

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To make and serve a
production build:

```bash
npm run build
npm run start
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Check TypeScript types; this is a command, not a package script |

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Storefront with its shop, configurator, blog, offers and contact sections |
| `/blog/[slug]` | Article page for every blog post that has a `content` array |
| `/cart` | Shopping cart |
| `/checkout` | Checkout demo |
| `/login` | Login and account demo |
| `/legal/[slug]` | Legal content for `privacy`, `terms`, `shipping`, `returns` or `warranty` |

## Project structure

```text
app/                  App Router pages, global CSS and root layout
components/           Storefront sections and cart, checkout, auth and legal UI
config/               Store identity and navigation
data/                 Products, hero, configurator, blog, offers and promo data
docs/                 Customization, integrations and launch guidance
lib/                  Shared formatting helpers
public/               Static assets
public/images/        Place product, blog and hero images here
.vscode/              Workspace settings and extension recommendations
```

## Customize

Start with [the customization guide](docs/customization.md) for brand details,
catalog data, offers, images, legal content, and adding sections or pages.

Before you accept orders, read [the integrations guide](docs/integrations.md):
payments, order creation, authentication and several form submissions are
simulated rather than connected to services.

When you are ready to publish your own store, follow
[the launch checklist](docs/launch-checklist.md).

## Deployment

### Vercel

Import the repository into Vercel, keep the Next.js framework preset, and deploy
the production build. Set any integration secrets in the Vercel project
environment settings when you add server-side integrations; this template
currently reads no environment variables.

### Netlify

Connect the repository to a Netlify site and use its current Next.js runtime
support and deployment instructions. Verify the deployed routes and forms on a
preview deploy before publishing, and do not configure this app as a static
export without first confirming that your final features support it.

## FAQ

**Can I accept real payments as-is?** No. The checkout is a demo. Connect a
server-side order flow and use provider-hosted card fields, as explained in
[the integrations guide](docs/integrations.md).

**Where do I change products or the brand colors?** Products are in
`data/products.ts`; the brand color tokens are in `app/globals.css`. See
[the customization guide](docs/customization.md) for the exact steps.

**Why do the products and posts show placeholders instead of pictures?** The
demo images are not included. Add your own files and set each item's `image`
field, as described in [the image guide](public/images/README.md).

**Do I need an `.env` file?** Not for this template as shipped. Add secrets only
when you implement integrations, and keep them out of source control.

**Is the legal text ready to use?** No. Replace the sample legal pages with your
own text, reviewed for your business and locations. The pages show a notice until
you set `SHOW_TEMPLATE_NOTICE` to `false`.

## License

See [LICENSE](LICENSE.md).

## Support

Support contact: **devamine224@gmail.com**
