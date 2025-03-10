// Funtion takes the currency name and returns it's symbol.
// Ex : USD => $

const currencySymbols = {
  btc: "₿",
  eth: "Ξ",
  ltc: "Ł",
  bch: "Ƀ",
  bnb: "Ƀ",
  eos: "ε",
  xrp: "✕",
  xlm: "✕",
  link: "Ł",
  dot: "●",
  aed: "D",
  ars: "$",
  aud: "$",
  bdt: "৳",
  brl: "$",
  cad: "$",
  clp: "$",
  cny: "¥",
  czk: "Kč",
  dkk: "Kr.",
  hkd: "$",
  huf: "Ft",
  idr: "Rp",
  kwd: "KD",
  lkr: "௹",
  mmk: "K",
  mxn: "$",
  myr: "RM",
  ngn: "₦",
  nok: "kr",
  nzd: "$",
  pkr: "₨",
  pln: "zł",
  rub: "₽",
  sar: "SR",
  sek: "kr",
  sgd: "$",
  thb: "฿",
  try: "₺",
  uah: "₴",
  vef: "Bs.",
  zar: "R",
  bits: "b",
  sats: "ȿ",
};

export const convertCurrency = (currencyName) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyName,
  });
  const formatted = formatter.format(0).slice(0, 1);
  if (formatted.toLowerCase() === currencyName.slice(0, 1)) {
    // Currency not recognized
    return (
      currencySymbols[currencyName] || currencyName.slice(0, 1).toUpperCase()
    );
  } else {
    return formatted;
  }
};
