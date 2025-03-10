// function returns the 6 equidistant data points for displaying datapoints on charts
// rather than displaying 1000s of data points.
export const filteredData = (data) => {
  if (data) {
    const interval = Math.floor(data.length / 6);
    let currentIndex = 0;
    const selectedItems = [];
    for (let i = 0; i < 6; i++) {
      selectedItems.push(data[currentIndex]);
      currentIndex += interval;
    }
    return selectedItems;
  } else {
    return [];
  }
};
