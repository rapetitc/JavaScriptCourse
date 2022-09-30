let profileDB = [],
  invoiceForm = document.querySelector(".requires-validation");

// Constructor de perfiles >>>>
class ProfileCreator {
  constructor(fullName, telephoneNumber, email, fullAddress, dateOfPurchase, invoiceNumber) {
    this.fullName = fullName;
    this.telephoneNumber = telephoneNumber;
    this.email = email;
    this.fullAddress = fullAddress;
    this.dateOfPurchase = dateOfPurchase;
    this.invoiceNumber = invoiceNumber;
  }
}
// Constructor de perfiles >>>>

// Funciones de validadoras

function checkValidity(generalValidation, tempTarget) {
  let inputs = invoiceForm.querySelectorAll("input"),
    selects = invoiceForm.querySelectorAll("select"),
    tempArray=[],
    i = 0;

  function inputValid(element) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    tempArray.push(element.value)
    i++;
  }
  function inputInvalid(element) {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    i = 0;
  }

  if (tempTarget == document.getElementById("inputState") || generalValidation) {
    if (selects[0].value != "") {
      inputValid(selects[0]);
    } else {
      inputInvalid(selects[0]);
    }
  }
  for (let i = 0; i < inputs.length; i++) {
    if (tempTarget == inputs[0] || generalValidation) {
      if (inputs[0].value.length > 3) {
        inputValid(inputs[0]);
      } else {
        inputInvalid(inputs[0]);
      }
    }
    if (tempTarget == inputs[1] || generalValidation) {
      if (inputs[1].value.length > 3) {
        inputValid(inputs[1]);
      } else {
        inputInvalid(inputs[1]);
      }
    }
    if (tempTarget == inputs[2] || generalValidation) {
      if (inputs[2].value.length == 10) {
        inputValid(inputs[2]);
      } else {
        inputInvalid(inputs[2]);
      }
    }
    if (tempTarget == inputs[3] || generalValidation) {
      if (inputs[3].validity.valid) {
        inputValid(inputs[3]);
      } else {
        inputInvalid(inputs[3]);
      }
    }
    if (tempTarget == inputs[4] || generalValidation) {
      if (inputs[4].value.length >= 5) {
        inputValid(inputs[4]);
      } else {
        inputInvalid(inputs[4]);
      }
    }
    if (tempTarget == inputs[6] || generalValidation) {
      if (inputs[6].value.length >= 4) {
        inputValid(inputs[6]);
      } else {
        inputInvalid(inputs[6]);
      }
    }
    if (tempTarget == inputs[7] || generalValidation) {
      if (inputs[7].value.length >= 6) {
        inputValid(inputs[7]);
      } else {
        inputInvalid(inputs[7]);
      }
    }
    if (tempTarget == inputs[8] || generalValidation) {
      if (inputs[8].value.length >= 10) {
        inputValid(inputs[8]);
      } else {
        inputInvalid(inputs[8]);
      }
    }
    if (tempTarget == inputs[9] || generalValidation) {
      if (inputs[9].value.length >= 16) {
        inputValid(inputs[9]);
      } else {
        inputInvalid(inputs[9]);
      }
    }
    if (tempTarget == inputs[10] || generalValidation) {
      if (inputs[10].value >= inputCardExpirationDate.min && inputs[10].value <= inputCardExpirationDate.max) {
        inputValid(inputs[10]);
      } else {
        inputInvalid(inputs[10]);
      }
    }
    if (tempTarget == inputs[11] || generalValidation) {
      if (inputs[11].value.length >= 3) {
        inputValid(inputs[11]);
      } else {
        inputInvalid(inputs[11]);
      }
    }
  }
  console.log(i);

  if (i >= 12) {
    





    let tempProfile = new ProfileCreator(document.getElementById('inputFirstName').value + " " + document.getElementById('inputLastName').value, document.getElementById('inputTelephoneNumber').value, document.getElementById('inpuEmail').value, document.getElementById('inputAddress').value + " " + document.getElementById('inputAddress2').value + " " + document.getElementById('inputCity').value + " " + document.getElementById('inputState').value + " " + document.getElementById('inputZip').value, moment().format("DD/MMM/YYYY, hh:mm:ss a"), parseInt(Math.random() * 999999));
    console.log(tempProfile)
    profileDB.push(tempProfile);
    return true;
  } else {
    return false;
  }
}
function setExpirationDate() {
  let inputCardExpirationDate = document.getElementById("inputCardExpirationDate");
  inputCardExpirationDate.value = moment().format("YYYY-MM-DD");
  inputCardExpirationDate.min = moment().format("YYYY-MM-DD");
  inputCardExpirationDate.max = moment().add("5", "year").format("YYYY-MM-DD");
}

// Funciones de validadoras

//Eventos del form
invoiceForm.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    async function submittting(params) {
      let tempFullCart = JSON.stringify( await cart.pull(cartDB));
      localStorage.setItem("fullCartDB", tempFullCart);
      console.log("aqui");
      invoiceForm.submit();
    }
    if (checkValidity(true)) {
      let tempItem = JSON.stringify(profileDB);
      localStorage.setItem("invoiceInfo", tempItem);

      submittting();
    }
  },
  false
);

invoiceForm.addEventListener("change", (e) => {
  let tempTarget = e.target;

  if (tempTarget.closest("#invoice")) {
    checkValidity(false, tempTarget);
  }
});

invoiceForm.onkeyup = function (e) {
  let tempTarget = e.target;

  if (tempTarget.closest("#invoice")) {
    checkValidity(false, tempTarget);
  }
};

invoiceForm.onkeydown = function (e) {
  let tempTarget = e.target;

  if (tempTarget.closest("#invoice")) {
    if (e.key == "Backspace" || e.key == "Delete" || e.key == "Tab") {
      return true;
    }
  }
  if (tempTarget.matches("#inputFirstName") || tempTarget.matches("#inputLastName")) {
    if (tempTarget.value.length >= 15 || !isNaN(parseInt(e.key))) {
      return false;
    }
  }
  if (tempTarget.matches("#inputTelephoneNumber")) {
    if (tempTarget.value.length > 9 || isNaN(parseInt(e.key))) {
      return false;
    }
  }
  if (tempTarget.matches("#inpuEmail") || tempTarget.matches("#inputAddress") || tempTarget.matches("#inputAddress2")) {
    if (tempTarget.value.length >= 50) {
      return false;
    }
  }
  if (tempTarget.matches("#inputCity")) {
    if (tempTarget.value.length >= 25) {
      return false;
    }
  }
  if (tempTarget.matches("#inputZip")) {
    if (tempTarget.value.length >= 6) {
      return false;
    }
  }
  if (tempTarget.matches("#inputCardName")) {
    if (tempTarget.value.length >= 30 || !isNaN(parseInt(e.key))) {
      return false;
    }
  }
  if (tempTarget.matches("#inputCardNumber")) {
    if (tempTarget.value.length >= 16 || isNaN(parseInt(e.key))) {
      return false;
    }
  }
  if (tempTarget.matches("#inputCardSecurityCode")) {
    if (tempTarget.value.length >= 3 || isNaN(parseInt(e.key))) {
      return false;
    }
  }
};
