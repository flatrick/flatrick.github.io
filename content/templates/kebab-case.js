module.exports = async (params) => {
  // Object destructuring. We pull inputPrompt out of the QuickAdd API in params.
  const {
    quickAddApi: { inputPrompt },
  } = params;
  // This opens a prompt with the header "New note name". val will be whatever you enter.
  const val = await inputPrompt("New note name");
};

// https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-123.php

function toKebabCase(name) {
  return name
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");
}
