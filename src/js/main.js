// Data Base // Data Base // Data Base // Data Base // Data Base >>>>
const productsDB = [
  {
    id: 1,
    title: "Harina de Maiz PAN 1000g",
    price: 4500,
    stock: 25,
    imgroute: "src/media/product1.png",
    category: "Harina",
  },
  {
    id: 2,
    title: "Aceite Mazeite 1 Litro",
    price: 11000,
    stock: 36,
    imgroute: "src/media/product9.png",
    category: "Aceite",
  },
  {
    id: 3,
    title: "Mantequilla Mavesa 1000g",
    price: 12000,
    stock: 91,
    imgroute: "src/media/product10.jpg",
    category: "Mantequila",
  },
  {
    id: 4,
    title: "1/2 Carton de Huevos Doñema ",
    price: 6500,
    stock: 33,
    imgroute: "src/media/product11.png",
    category: "Huevo",
  },
  {
    id: 5,
    title: "Leche en Polvo La Campesina 1000g",
    price: 24000,
    stock: 78,
    imgroute: "src/media/product2.png",
    category: "Leche",
  },
  {
    id: 6,
    title: "Chocolate Savoy 430g",
    price: 7000,
    stock: 78,
    imgroute: "src/media/product4.png",
    category: "Chocolate",
  },
  {
    id: 7,
    title: "Chocolate Savoy 55% 180g",
    price: 11000,
    stock: 78,
    imgroute: "src/media/product5.png",
    category: "Chocolate",
  },
  {
    id: 8,
    title: "Cafe Flor de Patria 250g",
    price: 4000,
    stock: 78,
    imgroute: "src/media/product6.png",
    category: "Cafe",
  },
  {
    id: 9,
    title: "Mayonesa Kraft 480g",
    price: 6000,
    stock: 78,
    imgroute: "src/media/product7.png",
    category: "Mayonesa",
  },
  {
    id: 10,
    title: "Atun Margarita 500g",
    price: 4500,
    stock: 78,
    imgroute: "src/media/product8.png",
    category: "Atun",
  },
  {
    id: 11,
    title: "Choclitos de Limon 250g",
    price: 2500,
    stock: 78,
    imgroute: "src/media/product3.png",
    category: "Snacks",
  },
];
const discountsDB = [
  {
    id: 1,
    title: "Descuentos en Chocolates y Snacks",
    discount: "15%",
    applyTo: [6, 7, 11],
    startDate: "01/09/2022",
    expirationDate: "31/12/2022",
  },
  {
    id: 2,
    title: "Descuentos en Mantequilla Mavesa 1000g",
    discount: "20%",
    applyTo: [3],
    startDate: "01/09/2022",
    expirationDate: "31/12/2022",
  },
];
const taxesDB = [
  {
    id: 1,
    title: "Acorde a la ley los taxes 31/12/2021",
    taxes: "12%",
    applyTo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    startDate: "31/12/2021",
    expirationDate: "31/12/2022",
  },
];
let cartDB = [];
let profileDB = [];
// Data Base // Data Base // Data Base // Data Base // Data Base >>>>

// Constructor de perfiles >>>>
class ProfileCreator {
  constructor(
    fullName,
    telephoneNumber,
    email,
    fullAddress,
    dateOfPurchase,
    invoiceNumber
  ) {
    this.fullName = fullName;
    this.telephoneNumber = telephoneNumber;
    this.email = email;
    this.fullAddress = fullAddress;
    this.dateOfPurchase = dateOfPurchase;
    this.invoiceNumber = invoiceNumber;
  }
}
// Constructor de perfiles >>>>

// Constructor de mi carrito >>>>
class MyCart {
  constructor(id, quantity) {
    this.id = id;
    this.quantity = quantity;
  }
}
// Constructor de mi carrito >>>>

// Conjunto de funciones para mostrar los articulos agregados al carrito >>>>
const cart = {
  // Retorna todos los articulos agregados al carrito con todos los detalles.
  pull: (cartDB, productsDB, discountsDB, taxesDB) => {
    let tempInfoToPull = [];
    if (cartDB.length > 0) {
      for (let i = 0; i < cartDB.length; i++) {
        let temp = productsDB.filter((item) => {
          if (item.id == cartDB[i].id) {
            return item;
          }
        });
        tempInfoToPull.push({
          id: temp[0].id,
          title: temp[0].title,
          price: temp[0].price,
          discount: stock.checkDiscount(discountsDB, temp[0].id, temp[0].price),
          taxes: stock.checkTaxes(
            taxesDB,
            temp[0].id,
            temp[0].price -
              stock.checkDiscount(discountsDB, temp[0].id, temp[0].price)
          ),
          quantity: cartDB[i].quantity,
          imgroute: temp[0].imgroute,
          category: temp[0].category,
        });
      }
    }
    return tempInfoToPull;
  },
  update: (cartDB, productsDB, id, quantity) => {
    let itemOnCartFound;
    //Chequea si el carrito esta vacio
    if (cartDB.length > 0) {
      //console.log("Si hay 1");
      let itemOnProductFound = [];
      //Chequear si el item esta agregado al carrito
      //console.log(itemOnCartFound.length);
      itemOnCartFound = cartDB.find((item) => item.id == id);
      //console.log(itemOnCartFound);
      if (itemOnCartFound != undefined) {
        //Ajustando quantity
        if (quantity == +1 || quantity == -1) {
          quantity = quantity + itemOnCartFound.quantity;
        } else {
          quantity = quantity;
        }
        //Check Stock
        itemOnProductFound = productsDB.find(
          (item) => item.id == itemOnCartFound.id
        );
        //console.log(itemOnCartFound.quantity, quantity);
        if (
          (itemOnCartFound.quantity == 1 && quantity == 0) ||
          isNaN(quantity)
        ) {
          console.log(cartDB.indexOf(itemOnCartFound));
          let index = cartDB.indexOf(itemOnCartFound);
          if (index > -1) {
            // only splice array when item is found
            cartDB.splice(index, 1); // 2nd parameter means remove one item only
          }
          itemOnCartFound.quantity = 0;
          return 0;
        } else if (itemOnProductFound.stock < quantity) {
          itemOnCartFound.quantity = itemOnProductFound.stock;
          return itemOnCartFound.quantity;
        } else {
          itemOnCartFound.quantity = quantity;
          return itemOnCartFound.quantity;
        }
      }
    }
    //Esto pasa si el carrito tiene articulos y no se consigue, lo cual se agrega como nuevo
    if (itemOnCartFound == undefined) {
      //console.log("Nuevo",quantity)
      if (quantity > 0) {
        for (let i = 0; i < productsDB.length; i++) {
          if (productsDB[i].id == id) {
            const element = new MyCart(productsDB[i].id, quantity);
            cartDB.push(element);
            return quantity;
          }
        }
      } else {
        return 0;
      }
    }
  },
};
// Conjunto de funciones para mostrar los articulos agregados al carrito >>>>

// Conjunto de funciones para validar stock en mi base de datos >>>>
const stock = {
  //search: () => {},
  pull: (productsDB, discountsDB, taxesDB, filter) => {
    let tempInfoToPull = [],
      tempProdDBFormat = [...productsDB];

    // Haciendo el fitro por ID
    if (filter.length > 0) {
      tempProdDBFormat = [];
      productsDB.forEach((item) => {
        filter.forEach((fil) => {
          //console.log(fil)
          if (item.id == fil) {
            tempProdDBFormat.push(item);
          }
        });
      });
    }
    //console.log(tempProdDBFormat);

    if (tempProdDBFormat.length > 0) {
      for (let i = 0; i < tempProdDBFormat.length; i++) {
        tempInfoToPull.push({
          id: tempProdDBFormat[i].id,
          title: tempProdDBFormat[i].title,
          price: tempProdDBFormat[i].price,
          discount: stock.checkDiscount(
            discountsDB,
            tempProdDBFormat[i].id,
            tempProdDBFormat[i].price
          ),
          taxes: stock.checkTaxes(
            taxesDB,
            tempProdDBFormat[i].id,
            tempProdDBFormat[i].price -
              stock.checkDiscount(
                discountsDB,
                tempProdDBFormat[i].id,
                tempProdDBFormat[i].price
              )
          ),
          stock: tempProdDBFormat[i].stock,
          imgroute: tempProdDBFormat[i].imgroute,
          category: tempProdDBFormat[i].category,
        });
      }
    }
    //console.log(tempInfoToPull)
    return tempInfoToPull;
  },
  checkDiscount: (discountsDB, id, price) => {
    let tempValueToReturn = 0;
    discountsDB.forEach((x) => {
      x.applyTo.forEach((y) => {
        if (y == id) {
          tempValueToReturn = (parseInt(x.discount) / 100) * price;
        }
      });
    });
    //console.log(tempValueToReturn);
    return tempValueToReturn;
  },
  checkTaxes: (taxesDB, id, price) => {
    let tempValueToReturn = price;
    taxesDB.forEach((x) => {
      x.applyTo.forEach((y) => {
        if (y == id) {
          tempValueToReturn = (parseInt(x.taxes) / 100) * price;
        }
      });
    });
    //console.log(tempValueToReturn);
    return tempValueToReturn;
  },
};
// Conjunto de funciones para validar stock en mi base de datos >>>>

// Inicio de mi app // Inicio de mi app // Inicio de mi app >>>>
function app() {
  showFilter(productsDB);
  showCart(cartDB);
  showProduct(productsDB, discountsDB, taxesDB, cartDB);

  setInterval(() => {
    console.clear()
    console.log(moment().format("DD/MMM/YYYY, hh:mm:ss a"))
  }, 1000)
}
// Inicio de mi app // Inicio de mi app // Inicio de mi app >>>>

// Funcion para actualizar la pagina principal con los articulos  >>>>
function showProduct(productsDB, discountsDB, taxesDB, cartDB, filter = []) {
  // Tomando mi codigo HTML para ser modificado
  let tempHTMLProducts = document.querySelector("#products .products .col");
  //Reseteo de mi codigo HMTL
  tempHTMLProducts.innerHTML = ``;
  //Midiendo la longitud del carrito
  let tempFullProducts = stock.pull(productsDB, discountsDB, taxesDB, filter);
  if (tempFullProducts.length > 0) {
    for (let i = 0; i < tempFullProducts.length; i++) {
      let tempItemFound = cartDB.filter((e) => {
        if (e.id == tempFullProducts[i].id) {
          return e.quantity;
        }
      });
      if (tempItemFound.length > 0) {
        tempItemFound = tempItemFound[0].quantity;
      } else {
        tempItemFound = 0;
      }

      tempHTMLProducts.innerHTML += `
                    <div class="card m-1" style="width: 15rem;" data-id="${
                      tempFullProducts[i].id
                    }">
                        <div class="card-img">
                            <img src="${tempFullProducts[i].imgroute}" alt="${
        tempFullProducts[i].title
      }">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${
                              tempFullProducts[i].title
                            }</h5>
                            <p class="card-text">COP ${
                              tempFullProducts[i].price -
                              tempFullProducts[i].discount +
                              tempFullProducts[i].taxes
                            }, COP ${tempFullProducts[i].price}</p>
                            <div class="card-buttons">
                                <button class="btn btn-primary"><i class="bi bi-trash3"></i></button>
                                <input type="text" class="conunter text-center" value="${tempItemFound}">
                                <button class="btn btn-primary"><i class="bi bi-bag-plus"></i></button>
                            </div>
                        </div>
                    </div>
                `;
    }
  } else {
    tempHTMLProducts.innerHTML += `
            <div class="article">Sin Stock<div>
            `;
  }
}
// Funcion para actualizar la pagina principal con los articulos  >>>>

// Funcion para actualizar mi carrito  >>>>
function showCart(cartDB) {
  // Tomando mi codigo HTML para ser modificado
  let tempHTML = document.querySelector("#cartItems");
  let tempButtonHTML = document.querySelector(
    ".modal .modal-footer .btn-primary"
  );
  let tempTotalPriceHTML = document.querySelector("#inputTotalPrice");

  //Reseteo de mi codigo HMTL
  tempHTML.innerHTML = ``;
  // Variable que almacena el calculo del precio total
  let tempTotalDiscount = 0;
  let tempTotalTaxes = 0;
  let tempTotalPrice = 0;
  //Midiendo la longitud del carrito
  let tempFullCart = cart.pull(cartDB, productsDB, discountsDB, taxesDB);
  if (tempFullCart.length > 0) {
    for (let i = 0; i < tempFullCart.length; i++) {
      tempTotalDiscount += tempFullCart[i].discount;
      tempTotalTaxes += tempFullCart[i].taxes;
      tempTotalPrice +=
        (tempFullCart[i].price -
          tempFullCart[i].discount +
          tempFullCart[i].taxes) *
        tempFullCart[i].quantity;
      tempHTML.innerHTML += `
                <tr>
                    <td>${tempFullCart[i].id}</td>
                    <td>${tempFullCart[i].title}</td>
                    <td>COP ${tempFullCart[i].price}</td>
                    <td>COP ${tempFullCart[i].discount}</td>
                    <td>COP ${tempFullCart[i].taxes}</td>
                    <td>${tempFullCart[i].quantity}</td>
                    <td>COP ${
                      (tempFullCart[i].price -
                        tempFullCart[i].discount +
                        tempFullCart[i].taxes) *
                      tempFullCart[i].quantity
                    }</td>
                <tr>
                `;
    }
  } else {
    tempHTML.innerHTML += `
            <tr>
                <td colspan="7" class="text-center">Carrito vacio</td>
            <tr>
            `;
  }
  tempHTML.innerHTML += `
        <tr>
            <td colspan="6">Total Discount</td>
            <td>COP ${tempTotalDiscount}</td>
        </tr>
        <tr>
            <td colspan="6">Total IVA</td>
            <td>COP ${tempTotalTaxes}</td>
        </tr>
        <tr>
            <td colspan="6">Precio Total</td>
            <td>COP ${tempTotalPrice}</td>
        </tr>
        `;
  //console.log(tempButtonHTML);
  tempFullCart.length > 0
    ? tempButtonHTML.removeAttribute("Disabled")
    : tempButtonHTML.setAttribute("Disabled", "Disabled");
  tempTotalPriceHTML.value = "COP " + tempTotalPrice;
}
// Funcion para actualizar mi carrito  >>>>

// Funcion para actualizar mi filtro  >>>>
function showFilter(productsDB) {
  let $tempFilterCatHTML = document.querySelector("#filterCategory"),
    $minFilterPrice = document.querySelector("#minFilterPrice"),
    $maxFilterPrice = document.querySelector("#maxFilterPrice"),
    uniqueCategory = [],
    prices = [];
  (maxPrice = 0), (minPrice = 0);

  productsDB.forEach((item) => {
    if (!uniqueCategory.includes(item.category)) {
      uniqueCategory.push(item.category);
    }
    if (!prices.includes(item.price)) {
      prices.push(item.price);
    }
  });

  uniqueCategory.forEach((item) => {
    $tempFilterCatHTML.innerHTML += `
    <div class="form-check mx-2">
        <input class="form-check-input" type="checkbox" value="" id="${item}">
        <label class="form-check-label" for="${item}">
            ${item}
        </label>
    </div>
    `;
  });
  maxPrice = Math.max(...prices);
  minPrice = Math.min(...prices);
  $maxFilterPrice.placeholder = `COP ${maxPrice}`;
  $minFilterPrice.placeholder = `COP ${minPrice}`;
}
// Funcion para actualizar mi filtro  >>>>

// Funcion para comprar >>>>
function purchase() {
  let invoice = document.getElementById("invoice");
  if (validateForm() == true) {
    let tempItem = JSON.stringify(profileDB);
    localStorage.setItem("invoiceInfo", tempItem);

    let tempFullCart = JSON.stringify(cart.pull(cartDB, productsDB, discountsDB, taxesDB));
    localStorage.setItem("fullCartDB", tempFullCart);

    invoice.submit();
  } else {
    console.log("Faltan datos");
  }
}
// Funcion para comprar >>>>

// Funcion para validar invoice >>>>
function validateForm() {
  let inputFirstName = document.getElementById("inputFirstName").value,
    inputLastName = document.getElementById("inputLastName").value,
    inputTelephoneNumber = document.getElementById(
      "inputTelephoneNumber"
    ).value,
    inpuEmail = document.getElementById("inpuEmail").value,
    inputAddress = document.getElementById("inputAddress").value,
    inputAddress2 = document.getElementById("inputAddress2").value,
    inputCity = document.getElementById("inputCity").value,
    inputState = document.getElementById("inputState").value,
    inputZip = document.getElementById("inputZip").value,
    inputCardName = document.getElementById("inputCardName").value,
    inputCardNumber = document.getElementById("inputCardNumber").value,
    inputCardSecurityCode = document.getElementById(
      "inputCardSecurityCode"
    ).value;
  //console.log(inputFirstName, inputLastName, inputTelephoneNumber, inpuEmail, inputAddress, inputAddress2, inputCity, inputZip, inputCardName, inputCardNumber, inputCardSecurityCode)
  if (
    inputFirstName.length > 3 &&
    inputLastName.length > 3 &&
    inputTelephoneNumber.length == 10 &&
    inpuEmail.length > 7 &&
    inputAddress.length > 7 &&
    inputAddress2.length > 7 &&
    inputCity.length > 5 &&
    inputZip.length == 6 &&
    inputCardName.length > 10 &&
    inputCardNumber.length == 16 &&
    inputCardSecurityCode.length == 3
  ) {
    let tempProfile = new ProfileCreator(
      inputFirstName + " " + inputLastName,
      inputTelephoneNumber,
      inpuEmail,
      inputAddress + " " + inputAddress2 + " " + inputCity + " " + inputState + " " + inputZip,
      moment().format("DD/MMM/YYYY, hh:mm:ss a"),
      parseInt(Math.random() * 999999)
    );
    profileDB.push(tempProfile);
    return true;
  } else {
    return false;
  }
}
// Funcion para validar invoice >>>>

// Eventos del DOM  >>>>
document.addEventListener("click", (e) => {
  let tempTarget = e.target,
    tempCard = tempTarget.closest(".card");

  if (tempCard != null) {
    //console.log(parseInt(tempCard.dataset.id));
    tempButtonBox = tempCard.lastElementChild.lastElementChild;
    if (
      tempButtonBox.children[0] == tempTarget ||
      tempButtonBox.children[0].children[0] == tempTarget
    ) {
      //console.log("entre a restar");
      tempButtonBox.children[1].value = cart.update(
        cartDB,
        productsDB,
        parseInt(tempCard.dataset.id),
        -1
      );
    } else if (
      tempButtonBox.children[2] == tempTarget ||
      tempButtonBox.children[2].children[0] == tempTarget
    ) {
      //console.log("entre a sumar");
      tempButtonBox.children[1].value = cart.update(
        cartDB,
        productsDB,
        parseInt(tempCard.dataset.id),
        +1
      );
    } else {
      console.warn("No estoy ajustando valores con los botones");
    }
  }

  let tempCartButton = document.querySelector("#modal-cart");
  if (tempCartButton == tempTarget) {
    showCart(cartDB);
  }

  if (tempTarget.matches("#purchase")) {
    purchase();
  }
});

document.onkeyup = function (e) {
  let tempTarget = e.target,
    tempCard = tempTarget.closest(".card");

  if (tempCard != null) {
    tempButtonBox = tempCard.lastElementChild.lastElementChild;

    if (tempButtonBox.children[1] == tempTarget) {
      tempButtonBox.children[1].value = cart.update(
        cartDB,
        productsDB,
        parseInt(tempCard.dataset.id),
        parseInt(tempButtonBox.children[1].value)
      );
    } else {
      console.warn("No estoy ajustando valores dentro del input");
    }
  }

  if (tempTarget.matches("#searchProduct")) {
    let searchInput = document.getElementById("searchProduct").value;
    let searched = [];

    for (let i = 0; i < productsDB.length; i++) {
      let tempItem = productsDB[i].title.toLowerCase();
      if (tempItem.includes(searchInput)) {
        searched.push(productsDB[i].id);
      }
    }
    showProduct(productsDB, discountsDB, taxesDB, cartDB, searched);
    //console.log("Soy search y encontre: ",searched)
  }
};

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
  //console.log(e.key)
  if (
    tempTarget.matches("#inputFirstName") ||
    tempTarget.matches("#inputLastName")
  ) {
    if (e.key == "Backspace" || e.key == "Delete" || e.key == "Tab") {
      return true;
    } else if (tempTarget.value.length >= 15 || !isNaN(parseInt(e.key))) {
      return false;
    }
  }
  if (tempTarget.matches("#inputTelephoneNumber")) {
    if (e.key == "Backspace" || e.key == "Delete" || e.key == "Tab") {
      return true;
    } else if (tempTarget.value.length > 9 || isNaN(parseInt(e.key))) {
      return false;
    }
  }
  if (
    tempTarget.matches("#inpuEmail") ||
    tempTarget.matches("#inputAddress") ||
    tempTarget.matches("#inputAddress2")
  ) {
    if (e.key == "Backspace" || e.key == "Delete" || e.key == "Tab") {
      return true;
    } else if (tempTarget.value.length >= 50) {
      return false;
    }
  }
  if (tempTarget.matches("#inputCity")) {
    if (e.key == "Backspace" || e.key == "Delete" || e.key == "Tab") {
      return true;
    } else if (tempTarget.value.length >= 25) {
      return false;
    }
  }
  if (tempTarget.matches("#inputZip")) {
    if (e.key == "Backspace" || e.key == "Delete" || e.key == "Tab") {
      return true;
    } else if (tempTarget.value.length >= 6) {
      return false;
    }
  }
  if (tempTarget.matches("#inputCardName")) {
    if (e.key == "Backspace" || e.key == "Delete" || e.key == "Tab") {
      return true;
    } else if (tempTarget.value.length >= 30 || !isNaN(parseInt(e.key))) {
      return false;
    }
  }
  if (tempTarget.matches("#inputCardNumber")) {
    if (e.key == "Backspace" || e.key == "Delete" || e.key == "Tab") {
      return true;
    } else if (tempTarget.value.length >= 16 || isNaN(parseInt(e.key))) {
      return false;
    }
  }
  if (tempTarget.matches("#inputCardSecurityCode")) {
    if (e.key == "Backspace" || e.key == "Delete" || e.key == "Tab") {
      return true;
    } else if (tempTarget.value.length >= 3 || isNaN(parseInt(e.key))) {
      return false;
    }
  }
};

window.addEventListener("beforeunload", (e) => {
  localStorage.setItem("cartDB", JSON.stringify(cartDB));
});

window.onload = (e) => {
  let tempStorage = localStorage.getItem("cartDB");
  JSON.parse(tempStorage) != null
    ? (cartDB = [...JSON.parse(tempStorage)])
    : (cartDB = []);

  // Ejecucion de mi app  >>>>
  app();
  // Ejecucion de mi app  >>>>
};
// Eventos del DOM  >>>>
