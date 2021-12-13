module.exports.debounce = (func, timeout) => {
  let timeoutID;
  return function () {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(func, timeout);
  };
};
