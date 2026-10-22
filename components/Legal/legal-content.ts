/**
 * Legal page content (Privacy, Terms, Shipping, Returns, Warranty).
 *
 * IMPORTANT: this is SAMPLE TEXT for a template. It is not legal advice.
 * Replace it with your own policies and have a qualified lawyer review it
 * before you launch a real store.
 */

/* ===================== Types ===================== */

export type LegalSlug = "privacy" | "terms" | "shipping" | "returns" | "warranty";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type LegalDoc = {
  slug: LegalSlug;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

/* ===================== Placeholders (edit these) ===================== */

export const LEGAL_COMPANY = {
  name: "Your Brand",
  email: "hello@example.com",
  address: "123 Main Street, Your City, Country",
  country: "Your Country",
};

// TODO: Set to false once you have replaced the sample text with your own policies.
export const SHOW_TEMPLATE_NOTICE = true;

const { name, email, country } = LEGAL_COMPANY;
const UPDATED = "October 22, 2026";

/* ===================== Documents ===================== */

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: `How ${name} collects, uses and protects your personal information.`,
    updated: UPDATED,
    intro: `This Privacy Policy explains how ${name} ("we", "us") collects, uses and protects your personal information when you visit our website or place an order.`,
    sections: [
      {
        title: "Information we collect",
        paragraphs: ["We only collect the information we need to run our store and serve you."],
        items: [
          "Contact details such as your name, email address and phone number.",
          "Delivery and billing addresses.",
          "Order details, including the products and custom PC configurations you buy.",
          "Messages you send us through the contact form or by email.",
          "Technical data such as your browser type and the pages you visit.",
        ],
      },
      {
        title: "How we use your information",
        items: [
          "To process and deliver your orders.",
          "To provide customer support and handle warranty claims.",
          "To send order updates and, if you agree, news and offers.",
          "To keep our website secure and to prevent fraud.",
          "To meet our legal and tax obligations.",
        ],
      },
      {
        title: "Sharing your information",
        paragraphs: ["We do not sell your personal information. We only share it with:"],
        items: [
          "Payment providers that process your payment.",
          "Couriers that deliver your order.",
          "Service providers for hosting, email and analytics.",
          "Authorities, when the law requires us to do so.",
        ],
      },
      {
        title: "Cookies and local storage",
        paragraphs: [
          "Our website stores your shopping cart and promo code in your browser (local storage), so they are still there when you come back. This data stays on your device.",
          "We may also use cookies for security and analytics. You can block cookies in your browser settings, but some parts of the site may stop working.",
        ],
      },
      {
        title: "How long we keep your data",
        paragraphs: [
          "We keep your information only as long as needed for the purposes above, including legal, tax and warranty requirements.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: ["Depending on where you live, you may have the right to:"],
        items: [
          "Access the personal data we hold about you.",
          "Correct data that is inaccurate.",
          "Ask us to delete your data.",
          "Object to or restrict how we use your data.",
          "Withdraw your consent at any time.",
        ],
      },
      {
        title: "Security",
        paragraphs: [
          "We use reasonable technical and organizational measures to protect your data. No system is completely secure, so we cannot guarantee absolute security.",
        ],
      },
      {
        title: "Children",
        paragraphs: ["Our store is not intended for children under 16, and we do not knowingly collect their data."],
      },
      {
        title: "Contact us",
        paragraphs: [`For any privacy question or request, write to us at ${email}.`],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms & Conditions",
    description: `The terms that apply when you use the ${name} website and buy from us.`,
    updated: UPDATED,
    intro: `These Terms & Conditions apply to your use of the ${name} website and to every order you place with us. Please read them carefully.`,
    sections: [
      {
        title: "Acceptance of these terms",
        paragraphs: ["By using our website or placing an order, you agree to these terms. If you do not agree, please do not use the site."],
      },
      {
        title: "Orders and pricing",
        paragraphs: [
          "An order is accepted when we send you a confirmation. We may refuse or cancel an order, for example if a product is out of stock or a price was published by mistake.",
          "All prices are shown in US dollars and may include taxes depending on your location. Prices and offers can change without notice.",
        ],
      },
      {
        title: "Payment",
        paragraphs: [
          "You can pay by the methods shown at checkout. Card payments are processed by our payment provider. For cash on delivery, payment is due when the order arrives.",
        ],
      },
      {
        title: "Custom PC builds",
        paragraphs: [
          "Our configurator checks basic compatibility, but final compatibility is confirmed by our technicians before assembly.",
          "Build times depend on part availability. We will contact you if a delay is expected.",
        ],
      },
      {
        title: "Delivery, returns and warranty",
        paragraphs: ["Delivery, returns and warranty are covered by our Shipping, Returns and Warranty policies, which are part of these terms."],
      },
      {
        title: "Promo codes",
        paragraphs: ["Promo codes are valid for the period shown, cannot be combined unless stated, and have no cash value."],
      },
      {
        title: "Intellectual property",
        paragraphs: ["All content on this website, including text, graphics and logos, belongs to us or our licensors and may not be copied without permission."],
      },
      {
        title: "Limitation of liability",
        paragraphs: [
          "To the maximum extent permitted by law, we are not liable for indirect or consequential losses. Nothing in these terms limits your legal rights as a consumer.",
        ],
      },
      {
        title: "Governing law",
        paragraphs: [`These terms are governed by the laws of ${country}.`],
      },
      {
        title: "Changes to these terms",
        paragraphs: ["We may update these terms from time to time. The date at the top shows when they were last changed."],
      },
      {
        title: "Contact us",
        paragraphs: [`Questions about these terms? Write to us at ${email}.`],
      },
    ],
  },
  {
    slug: "shipping",
    title: "Shipping Info",
    description: `Delivery options, costs and times at ${name}.`,
    updated: UPDATED,
    intro: `Here is everything you need to know about how ${name} prepares and delivers your order.`,
    sections: [
      {
        title: "Processing time",
        paragraphs: [
          "In-stock accessories ship within 1 to 2 business days. Custom PC builds are assembled and tested before dispatch, which usually takes 3 to 7 business days.",
        ],
      },
      {
        title: "Delivery options",
        items: [
          "Standard delivery: 3 to 5 business days.",
          "Express delivery: 1 to 2 business days.",
        ],
      },
      {
        title: "Shipping costs",
        items: [
          "Standard delivery is free on orders over $100, otherwise $9.",
          "Express delivery costs $19.",
        ],
        paragraphs: ["The exact cost is shown at checkout before you pay."],
      },
      {
        title: "Order tracking",
        paragraphs: ["When your order ships, we email you a tracking number so you can follow your parcel."],
      },
      {
        title: "Damaged or missing parcels",
        paragraphs: [
          `Please check your parcel when it arrives. If it is damaged or something is missing, contact us at ${email} within 48 hours with photos and your order number.`,
        ],
      },
      {
        title: "International shipping",
        paragraphs: ["We ship to the countries available at checkout. Customs fees, duties and taxes may apply and are the responsibility of the buyer."],
      },
    ],
  },
  {
    slug: "returns",
    title: "Returns & Refunds",
    description: `How to return a product or ask for a refund at ${name}.`,
    updated: UPDATED,
    intro: "We want you to be happy with your purchase. If you are not, you can return it within 30 days.",
    sections: [
      {
        title: "30-day returns",
        paragraphs: ["You can return most products within 30 days of delivery, as long as they are in their original condition and packaging."],
      },
      {
        title: "How to start a return",
        items: [
          `Email ${email} with your order number and the reason for the return.`,
          "We will send you return instructions and a return address.",
          "Pack the product securely with all accessories and documents.",
        ],
      },
      {
        title: "Refunds",
        paragraphs: [
          "After we receive and inspect your return, we refund the original payment method within 5 to 10 business days. Original shipping costs are not refunded unless the product was faulty.",
        ],
      },
      {
        title: "Custom PC builds",
        paragraphs: [
          "Custom builds can be returned within 30 days if they are undamaged and have not been modified. A restocking fee may apply to opened components.",
        ],
      },
      {
        title: "Faulty or damaged items",
        paragraphs: ["If a product arrives faulty or damaged, we will repair, replace or refund it at no cost to you."],
      },
      {
        title: "Exchanges",
        paragraphs: ["To exchange a product, return it and place a new order for the item you want."],
      },
    ],
  },
  {
    slug: "warranty",
    title: "Warranty",
    description: `The 24-month warranty on every ${name} build.`,
    updated: UPDATED,
    intro: `Every custom build from ${name} includes a 24-month warranty covering parts and labour.`,
    sections: [
      {
        title: "What is covered",
        items: [
          "Manufacturing defects in components.",
          "Faults caused by our assembly work.",
          "Parts that stop working under normal use.",
        ],
      },
      {
        title: "What is not covered",
        items: [
          "Damage from accidents, drops, liquids or misuse.",
          "Unauthorized repairs or modifications.",
          "Normal wear and tear and cosmetic damage.",
          "Software problems and data loss.",
        ],
      },
      {
        title: "How to make a claim",
        items: [
          `Email ${email} with your order number and a description of the problem.`,
          "Our team will help you troubleshoot and confirm if the product needs repair.",
          "If needed, we will arrange collection or ask you to send the product to us.",
        ],
      },
      {
        title: "Repair or replacement",
        paragraphs: ["We will repair or replace the faulty part. If it cannot be repaired, we may replace it with an equivalent or better part."],
      },
      {
        title: "Manufacturer warranties",
        paragraphs: ["Many components also carry their own manufacturer warranty. We will help you use it when it is the faster option."],
      },
      {
        title: "Your legal rights",
        paragraphs: ["This warranty is in addition to your legal rights as a consumer and does not affect them."],
      },
    ],
  },
];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((d) => d.slug === slug);
}