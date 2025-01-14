const display = document.querySelector(".display");
const calculator = document.querySelector(".calculator");
// membuat array yg berisi operator
const specialChar = ["%", "-", "*", "+", "/", "="];
// variabel buat menyimpan angka pertama:
let previousValue = "";
// variabel buat menyimpan angka kedua:
let currentValue = "";
let operator = "";

const calculate = function () {
  let result = 0;
  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);

  if (!Number.isFinite(prev) || !Number.isFinite(curr)) return;

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "/":
      result = prev / curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "%":
      break;
    default:
      return;
  }
  currentValue = result.toString();
  // console.log("current :" + currentValue);
  previousValue = "";
  operator = "";
};

const handleInput = function (btnValue) {
  if (btnValue === "=" && operator !== "") {
    calculate();
  } else if (btnValue === "AC") {
    currentValue = "";
    previousValue = "";
    operator = "";
  } else if (btnValue === "DEL") {
    currentValue = currentValue.slice(0, -1);
  } else if (btnValue === "%" && currentValue !== "") {
    currentValue = (
      parseFloat(previousValue) *
      (parseFloat(currentValue) / 100)
    ).toString();
    display.value = currentValue;
  } else if (specialChar.includes(btnValue)) {
    if (currentValue === "") return;
    if (currentValue !== "") {
      calculate();
    }
    operator = btnValue;
    previousValue = currentValue;
    currentValue = "";
  } else {
    currentValue += btnValue;
  }
  display.value = currentValue;
};

const targetElement = function (e) {
  {
    const button = e.target.closest("button");
    if (button) {
      const value = button.dataset.value;
      if (value !== undefined) {
        // console.log(value);
        handleInput(value);
      }
    }
  }
};

calculator.addEventListener("click", targetElement);
