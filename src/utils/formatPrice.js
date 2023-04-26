//* get the value in group number format
export const groupNumber = (number) => {
  if (number) {
    return parseFloat(number.toFixed(2)).toLocaleString("en", {
      useGrouping: true,
    });
  }
};
