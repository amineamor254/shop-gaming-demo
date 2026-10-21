"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { useCart, type NewCartItem } from "./CartContext";

type Props = {
  item: NewCartItem;
  qty?: number;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
  /** المحتوى الافتراضي للزر */
  children: React.ReactNode;
  /** يظهر لثانيتين بعد الإضافة (الافتراضي: علامة ✓) */
  addedContent?: React.ReactNode;
};

/**
 * زر "أضف إلى السلة" قابل لإعادة الاستخدام.
 * مرّر له بيانات المنتج في `item` والتنسيق في `className`.
 */
export default function AddToCartButton({
  item,
  qty = 1,
  className,
  disabled,
  children,
  addedContent = <Check className="h-4 w-4" />,
  "aria-label": ariaLabel,
}: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleClick = () => {
    addItem(item, qty);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={className}
    >
      {added ? addedContent : children}
      <span className="sr-only" role="status" aria-live="polite">
        {added ? "Added to cart" : ""}
      </span>
    </button>
  );
}
