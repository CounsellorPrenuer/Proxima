const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(value: number): string {
  try {
    return INR_FORMATTER.format(value);
  } catch {
    return `Rs. ${value.toLocaleString("en-IN")}`;
  }
}
