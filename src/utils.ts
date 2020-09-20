import { useLocation } from "react-router-dom";

export function priceFormatterFactory(
  lang: string,
  options: Omit<Intl.NumberFormatOptions, "style"> = {}
): Intl.NumberFormat {
  return new Intl.NumberFormat(lang, {
    currencyDisplay: "symbol",
    style: "currency",
    useGrouping: true,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    ...options,
  });
}

export function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}
