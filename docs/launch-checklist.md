# Launch checklist

Use this list before you publish your own store built from this template.

## Make it yours

- [ ] Set your store name, logo text, title, description and contact details in
      [`config/site.ts`](../config/site.ts).
- [ ] Replace the sample products, categories and prices in
      [`data/products.ts`](../data/products.ts) and the featured PC in
      [`data/hero.ts`](../data/hero.ts).
- [ ] Replace the sample configurator parts and presets in
      [`data/configurator.ts`](../data/configurator.ts), and check their prices.
- [ ] Replace the sample blog posts and offers in
      [`data/posts.ts`](../data/posts.ts) and [`data/offers.ts`](../data/offers.ts).
- [ ] Replace or remove the demo promo codes in
      [`data/promos.ts`](../data/promos.ts).
- [ ] Set your brand colors in [`app/globals.css`](../app/globals.css).
- [ ] Replace the placeholder site icon `app/icon.svg`.
- [ ] Add your own images (see [the image guide](../public/images/README.md)).

## Legal and rights

- [ ] Replace the sample legal text in
      [`components/Legal/legal-content.ts`](../components/Legal/legal-content.ts)
      with policies written or reviewed for your business and locations.
- [ ] Set `SHOW_TEMPLATE_NOTICE` to `false` only after replacing the sample text.
- [ ] Check that your store name, product names and images do not infringe
      trademarks or copyrights.
- [ ] Use only images, icons and fonts you own or are licensed to use.

## Connect real services

- [ ] Payments and orders: see [the integrations guide](integrations.md).
      Checkout is a demo until you connect a provider.
- [ ] Login and accounts, contact form, newsletter and confirmation emails.
- [ ] Recalculate prices, discounts, shipping, tax and totals on your server.
- [ ] Verify that no secret keys are committed to your repository.

## Test before launch

- [ ] Run `npx tsc --noEmit` and `npm run build`.
- [ ] Test the full purchase flow, including promo codes and each delivery option.
- [ ] Test the shop filters, the configurator, the mobile menu and keyboard
      navigation.
- [ ] Check the layout on a phone, a tablet and a desktop.
- [ ] Check every link in the header and footer.

## Deploy

- [ ] Add the environment variables your integrations need (see `.env.example`).
- [ ] Deploy to your hosting provider and test the live site.
- [ ] Add your site to a search console and set up analytics if you need them.