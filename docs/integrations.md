# Integrations: what is simulated

This project is a front-end template, not a live commerce backend. The forms and
calculations below do not create secure orders or connect to outside services.
The source TODOs are called out here so you can plan the real implementations.

| Area | Current behavior | What to connect |
| --- | --- | --- |
| Payment and order creation | Checkout displays a simulated completion and delay; it does not create a real order or charge. The card inputs are demo UI only. | Add a server-side order endpoint and payment provider. Replace the card inputs with a provider-hosted payment form such as Stripe Elements. Card numbers must never be sent to or stored on your own server. |
| Authentication and account | The login/account screen is UI only; no identity provider verifies credentials or manages sessions. | Connect an authentication provider, such as Auth.js, Clerk, or Supabase, and protect any account and order data on the server. |
| Contact form | Submitting the form uses a local simulated delay; messages are not delivered. | Submit validated data to your own server endpoint or a form service, with spam protection and appropriate privacy disclosures. |
| Newsletter signup | The footer signup is not connected to a mailing list. | Validate consent and the address, then send it to your newsletter provider. |
| Order confirmation email | Checkout contains a TODO for sending an email; no confirmation email is sent. | Send email from a trusted server process after the payment/order provider confirms the order. |
| Promo code validation | Promo codes are checked in client-side code and can be changed by a browser user. | Re-check the code, eligibility, and discount on the server when creating the order. Never trust the discount amount supplied by the browser. |
| Cart prices and totals | Product prices, shipping, tax, discounts, and totals are calculated in client-side code. | Load trusted product prices and availability and recalculate discount, shipping, tax, and total on the server before accepting payment. |
| Footer payment badges | The badges are generic placeholders, not a statement of the payment methods configured for a merchant. | Replace them with accurate payment methods after connecting a provider. |
| Blog article links | Blog cards are previews; individual article pages have not been created. | Add article routes before linking cards to them. |
| Policy links | Footer destinations exist, but their legal text is sample content and must be replaced and reviewed. | Publish your own policies and verify each linked legal route before launch. |

## Source TODO locations

- Checkout order endpoint, provider fields, simulated request, and confirmation
  email: [`components/Checkout/page.tsx`](../components/Checkout/page.tsx)
- Login and account provider: [`components/Auth/page.tsx`](../components/Auth/page.tsx)
  and [`components/Header/page.tsx`](../components/Header/page.tsx)
- Contact submission: [`components/Contact/page.tsx`](../components/Contact/page.tsx)
- Newsletter signup, generic payment badges, and policy-link reminder:
  [`components/Footer/page.tsx`](../components/Footer/page.tsx)
- Client-side cart, promo, shipping, tax, and total calculations:
  [`components/Cart/page.tsx`](../components/Cart/page.tsx),
  [`components/Cart/CartContext.tsx`](../components/Cart/CartContext.tsx), and
  [`components/Cart/cart-config.ts`](../components/Cart/cart-config.ts)
- Blog article routes: [`components/Blog/page.tsx`](../components/Blog/page.tsx)
- Sample legal notice: [`components/Legal/legal-content.ts`](../components/Legal/legal-content.ts)

## Payment safety

The card-number, expiration, and security-code fields currently shown at
checkout are demo UI only. Do not collect or post card numbers to an endpoint
you control. Use the payment provider's hosted checkout or secure client-side
elements so sensitive card data goes directly to the provider; create orders
and verify payment status on your server using the provider's documented flow.

The app currently reads no environment variables. When adding integrations,
keep secret credentials on the server and out of committed files. The
[`../.env.example`](../.env.example) file is a commented guide only; its
illustrative names are not read by this template.
