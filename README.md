# Gaming PC Store Template

A one-page gaming PC storefront built with the Next.js App Router. It includes a
product catalog, a PC configurator, offers, a blog preview, contact UI, and
separate cart, checkout, login, and legal pages. The sample content and forms
are starting points: connect real commerce and account services before launch.

## Features

- Responsive storefront sections for products, PC building, blog, offers, and contact
- Product categories, cart state, promo codes, shipping, and tax calculations
- Configurator with component choices and Starter, Pro, and Ultimate presets
- Cart, checkout, login, and editable legal routes
- Brand settings, catalog data, and CSS theme tokens in dedicated files

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
| `/` | Storefront and its product, configurator, blog, offers, and contact sections |
| `/cart` | Shopping cart |
| `/checkout` | Checkout demo |
| `/login` | Login and account demo |
| `/legal/[slug]` | Legal content for `privacy`, `terms`, `shipping`, `returns`, or `warranty` |

The blog is currently a preview on the home page; individual article routes are
not included.

## Project structure

```text
app/                  App Router pages, global CSS, and root layout
components/           Storefront sections and cart, checkout, auth, and legal UI
config/               Store identity and navigation
data/                 Products, hero, configurator, blog, offers, and promo data
docs/                 Customization, integrations, and release guidance
lib/                  Shared formatting helpers
public/               Static assets
public/images/        Place product, blog, and hero images here
.vscode/              Workspace settings and extension recommendations
```

## Customize

Start with [the customization guide](docs/customization.md) for brand details,
catalog data, offers, images, legal content, and adding sections or pages.
Review [the integrations guide](docs/integrations.md) before accepting orders:
payments, order creation, authentication, and several form submissions are
simulated rather than connected to services.

## Deployment

### Vercel

Import the repository into Vercel, keep the Next.js framework preset, and deploy
the production build. Set any integration secrets in the Vercel project
environment settings when you add server-side integrations; this starter
currently reads no environment variables.

### Netlify

Connect the repository to a Netlify site and use its current Next.js runtime
support and deployment instructions. Verify the deployed routes and forms on a
preview deploy before publishing; do not configure this app as a static export
without first confirming that your final features support it.

## FAQ

**Can I accept real payments as-is?** No. The checkout UI is a demo. Connect a
server-side order flow and use provider-hosted card fields, as explained in
[the integrations guide](docs/integrations.md).

**Where do I change products or the brand colors?** Products are in
`data/products.ts`; the brand color tokens are in `app/globals.css`. See
[customization](docs/customization.md) for the exact steps.

**Do I need an `.env` file?** Not for this template as shipped. Add secrets only
when implementing integrations, and keep them out of source control.

**Is legal or license text ready to use?** No. Replace the sample legal content
with your own reviewed content and write your own license terms before sale.

## Support

Support contact: **[add your support email or channel before publishing]**.
