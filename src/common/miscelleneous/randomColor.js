// it generates the random color hexcode used in charts

export const getRandomColor = () => {
  let letters = "0123456789ABCDEF".split("");
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
