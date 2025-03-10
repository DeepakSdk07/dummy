// function takes a number and returns its compact value
// Ex : 1500000 => 1.5M

export const compactNumbers = (number) => {
  const f = new Intl.NumberFormat("en-us", {
    notation: "compact",
  });

  return f.format(number);
};
