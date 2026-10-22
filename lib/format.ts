import { SITE } from "@/config/site";

export const formatCartMoney = (amount: number) =>
  `${SITE.currencySymbol}${amount.toFixed(2)}`;

export const formatConfiguratorMoney = (amount: number) =>
  `${SITE.currencySymbol}${amount.toLocaleString("en-US")}`;

export const formatProductMoney = (amount: number) =>
  `${SITE.currencySymbol}${amount.toFixed(2)}`;
