//#region Check For Prefered Theme
const userPrefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const userPrefersLight =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;
//#endregion

//#region Useful Global Variables:
var todaysDate = new Date();
//#endregion

//#region Logging Functions:
// Test:
console.profile("program-stats"); // NON STANDARD!!!
console.profileEnd("program-stats"); // NON STANDARD!!!
// console.clear();

// Data:
console.debug("%cData Log", (style = "color: lightblue; font-style: normal"));
console.dirxml(document.getElementsByTagName("body"));
console.dir(Object);

// Info:
console.trace(
  "%cFunction: xxx",
  (style = "color: yellow; font-style: normal; font-weight: bold;")
); // Function Call
console.groupCollapsed(
  "%cFunction: xxx => Operations",
  (style = "color: orange; font-style: italic; font-weight: bold;")
); // Function Call Inner
console.trace(
  "%cCurrent Operation Log",
  (style = "color: lightgreen; font-style: normal; font-weight: bold;")
); // Current Operation
console.groupEnd();

console.info("%cInfo Log", (style = "color: pink; font-style: normal")); // Info
console.warn("Warn Log"); // Not Found / Undefined / Null / etc.
console.error("Error Log"); // Error

console.count("count");
console.countReset("count");
console.time("functionCheck");
console.timeLog("functionCheck");
console.timeEnd("functionCheck");
let array = ["apples", "oranges", "bananas"];
let json = { John: "Smith" };
console.table(array);
console.table(json);
let errorMessage = "number not even";
let currentTestSubject = 5;
console.assert(currentTestSubject % 2 == 0, {
  currentTestSubject,
  errorMessage,
});
//#endregion

//#region Formatting
// Dates
let day = String(todaysDate.getDate()).padStart(2, "0");
let month = String(todaysDate.getMonth() + 1).padStart(2, "0");
let year = todaysDate.getFullYear();
let dateToday = day + "." + month + "." + year;

console.info(
  "%cTodays Date:",
  (style = "color: pink; font-style: normal"),
  dateToday
);

// Numbers
let number = 912439172361;

console.log(number);

const eurFormat = Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  useGrouping: true,
});

console.log(eurFormat.format(number));
//#endregion
