const extractInteger = (num) => {
  if (typeof num === 'number') {
    return Math.trunc(num);
  }
  return 0;
};

const extractDecimal = (num) => {
  if (typeof num === 'number') {
    return Number(num.toFixed(2).split('.')[1]);
  }
  return 0;
};

module.exports = {
  extractInteger,
  extractDecimal,
};
