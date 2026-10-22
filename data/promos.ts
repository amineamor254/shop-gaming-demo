export const PROMOS = {
  FLASH25: 25,
  BUNDLE15: 15,
  STUDENT10: 10,
} as const;

export type PromoCode = keyof typeof PROMOS;
