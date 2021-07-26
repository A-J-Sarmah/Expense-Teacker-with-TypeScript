//get Data method
let getData = () => {
  let arr: any[] = [];
  if (localStorage.length === 0) {
    return arr;
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      const data: any = localStorage.getItem(`${i}`);
      arr.push(JSON.parse(data));
    }
    return arr;
  }
};

interface Expense {
  amount: string;
  to: string;
  person: string;
}

class expense implements Expense {
  constructor(public amount: string, public to: string, public person: string) {
    (this.amount = amount), (this.to = to), (this.person = person);
  }
}

//grabbing the add button
const addExpenseButton = document.getElementById(
  "add-expense"
) as HTMLButtonElement;

//taking the data values and adding them to local storage
addExpenseButton.addEventListener("click", () => {
  const amount = document.getElementById("amount") as HTMLInputElement;
  const to = document.getElementById("to") as HTMLInputElement;
  const person = document.getElementById("for") as HTMLInputElement;
  if (!isNaN(parseInt(amount.value))) {
    const exp = new expense(amount.value, to.value, person.value);
    const data: any = getData();
    data.push(exp);
    localStorage.clear();
    for (let i = 0; i < data.length; i++) {
      localStorage.setItem(i.toString(), JSON.stringify(data[i]));
    }
  }
  amount.value = "";
  to.value = "";
  person.value = "";
  displayExpense();
});

console.log(getData());

//remove one expense
const removeExpense = () => {
  let exp = getData();
  exp.splice(0, 1);
  localStorage.clear();
  for (let i = 0; i < exp.length; i++) {
    localStorage.setItem(i.toString(), JSON.stringify(exp[i]));
  }
  displayExpense();
};

//displaying the expenses
const displayExpense = (): void => {
  const exp = getData();
  const displayArea = document.getElementById("display-area") as HTMLDivElement;
  displayArea.innerHTML = "";
  exp.forEach((expense) => {
    const removeButton = document.getElementById(
      "remove-button-container"
    ) as HTMLButtonElement;
    if (!removeButton) {
      displayArea.innerHTML += `
        <div class="col-12 container">
          <div class="border row text-center">
            <p class="col-xl-4 col-12 my-2">
              <span class="h5">For:</span> ${expense.to}
            </p>
            <p class="col-xl-4 col-12 my-2"><span class="h5">To:</span>${expense.person}</p>
            <p class="col-xl-4 col-12 my-2">
              <span class="h5">Amount:</span>${expense.amount}
            </p>
          </div>
        </div> `;
      displayArea.innerHTML += `
      <div class="row justify-content-center" id="remove-button-container">
        <div class="col-xl-4 col-12 mt-5 mb-5 text-center">
          <button class="btn btn-danger" onclick="removeExpense()">Remove Expense</button>
        </div>`;
    } else {
      displayArea.removeChild(removeButton);
      displayArea.innerHTML += `
          <div class="col-12 container">
            <div class="border row text-center">
              <p class="col-xl-4 col-12 my-2">
                <span class="h5">For:</span> ${expense.to}
              </p>
              <p class="col-xl-4 col-12 my-2"><span class="h5">To:</span>${expense.person}</p>
              <p class="col-xl-4 col-12 my-2">
                <span class="h5">Amount:</span>${expense.amount}
              </p>
            </div>
          </div>
          <div class="row justify-content-center" id="remove-button-container">
            <div class="col-xl-4 col-12 mt-5 mb-5 text-center">
              <button class="btn btn-danger" onclick="removeExpense()">Remove Expense</button>
            </div>
        </div>`;
    }
  });
};

displayExpense();
console.log("editing in branch")