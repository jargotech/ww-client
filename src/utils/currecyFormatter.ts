export const currencyFormatter = (num: any) => {
  // return '₹' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  if (!num) return;
  const str = num.toString().split(".");
  const convertedValue =
    str[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") + (str[1] ? "." + str[1] : "");
  return `₹ ${convertedValue}`;
};

export const convertToNum = (str: any) => {
  let value;
  if (str) {
    value = str?.replaceAll(",", "");
  }
  return Number(value);
};
