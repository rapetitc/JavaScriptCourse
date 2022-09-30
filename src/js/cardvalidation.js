// Validaciones para cada tarjeta
document.addEventListener("click", (e) => {
  let tempTarget = e.target,
    tempCard = tempTarget.closest(".card");

  if (tempCard != null) {
    tempButtonBox = tempCard.lastElementChild.lastElementChild;
    let tempValue = 0;
    async function parser() {
      if (tempButtonBox.children[0] == tempTarget || tempButtonBox.children[0].children[0] == tempTarget) {
        tempValue = await cart.update(cartDB, parseInt(tempCard.dataset.id), -1);
      } else if (tempButtonBox.children[2] == tempTarget || tempButtonBox.children[2].children[0] == tempTarget) {
        tempValue = await cart.update(cartDB, parseInt(tempCard.dataset.id), +1);
      } else {
        console.warn("No estoy ajustando valores con los botones");
      }
      //console.log("termine", await cart.update(cartDB, parseInt(tempCard.dataset.id), 1));
      tempButtonBox.children[1].value = tempValue;
      //Deshabilitar los botones segun condiciones
      if (tempButtonBox.children[1].value <= 0) {
        tempButtonBox.children[0].innerHTML = `<i class="bi bi-trash3"></i>`;
        tempButtonBox.children[0].setAttribute("disabled", "disabled");
      } else if (tempButtonBox.children[1].value == 1) {
        tempButtonBox.children[0].innerHTML = `<i class="bi bi-trash3"></i>`;
        tempButtonBox.children[0].removeAttribute("disabled");
      } else {
        tempButtonBox.children[0].removeAttribute("disabled");
        tempButtonBox.children[0].innerHTML = `<i class="bi bi-bag-dash"></i>`;
      }
      // Actualizar carrito despues del cambio
      showCart(cartDB);
    }
    parser();
  }
});

document.onkeydown = function (e) {
  let tempTarget = e.target;
  //console.log(e.key);
  if (tempTarget.matches(".products .card input")) {
    //console.log(parseInt(tempTarget.value));
    if (e.key == "Backspace" || e.key == "Delete") {
      //console.log("Removing");
      return true;
    } else if (parseInt(e.key) >= 0 || parseInt(e.key) <= 9) {
      //console.log("Numbers");
      return true;
    } else {
      //console.log("Others");
      return false;
    }
  }
};

document.onkeyup = function (e) {
  let tempTarget = e.target,
    tempCard = tempTarget.closest(".card");

  if (tempCard != null) {
    tempButtonBox = tempCard.lastElementChild.lastElementChild;

    if (tempButtonBox.children[1] == tempTarget) {
      tempButtonBox.children[1].value = cart.update(cartDB, parseInt(tempCard.dataset.id), parseInt(tempButtonBox.children[1].value));
    } else {
      console.warn("No estoy ajustando valores dentro del input");
    }

    //Deshabilitar los botones segun condiciones
    if (tempButtonBox.children[1].value <= 0) {
      tempButtonBox.children[0].innerHTML = `<i class="bi bi-trash3"></i>`;
      tempButtonBox.children[0].setAttribute("disabled", "disabled");
    } else if (tempButtonBox.children[1].value == 1) {
      tempButtonBox.children[0].innerHTML = `<i class="bi bi-trash3"></i>`;
      tempButtonBox.children[0].removeAttribute("disabled");
    } else {
      tempButtonBox.children[0].removeAttribute("disabled");
      tempButtonBox.children[0].innerHTML = `<i class="bi bi-bag-dash"></i>`;
    }
  }
};
