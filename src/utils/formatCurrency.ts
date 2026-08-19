const price = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const priceCompact = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
});

export { price, priceCompact };
