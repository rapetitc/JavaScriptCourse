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
// Data Base // Data Base // Data Base // Data Base // Data Base >>>>

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
      itemOnCartFound = cartDB.find(item => item.id == id);
      //console.log(itemOnCartFound);
      if (itemOnCartFound != undefined) {
        //Ajustando quantity
        if (quantity == +1 || quantity == -1) {
          quantity = quantity + itemOnCartFound.quantity;
        } else {
          quantity = quantity;
        }
        //Check Stock
        itemOnProductFound = productsDB.find((item) => item.id == itemOnCartFound.id);
        //console.log(itemOnCartFound.quantity, quantity);
        if (itemOnCartFound.quantity == 1 && quantity == 0 || isNaN(quantity)){
          console.log(cartDB.indexOf(itemOnCartFound));
          let index = cartDB.indexOf(itemOnCartFound);
          if (index > -1) { // only splice array when item is found
            cartDB.splice(index, 1); // 2nd parameter means remove one item only
          };
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
        return 0
      }
    }
  },
};
// Conjunto de funciones para mostrar los articulos agregados al carrito >>>>

// Conjunto de funciones para validar stock en mi base de datos >>>>
const stock = {
  //search: () => {},
  pull: (productsDB, discountsDB, taxesDB) => {
    let tempInfoToPull = [];
    if (productsDB.length > 0) {
      for (let i = 0; i < productsDB.length; i++) {
        tempInfoToPull.push({
          id: productsDB[i].id,
          title: productsDB[i].title,
          price: productsDB[i].price,
          discount: stock.checkDiscount(
            discountsDB,
            productsDB[i].id,
            productsDB[i].price
          ),
          taxes: stock.checkTaxes(
            taxesDB,
            productsDB[i].id,
            productsDB[i].price -
              stock.checkDiscount(
                discountsDB,
                productsDB[i].id,
                productsDB[i].price
              )
          ),
          stock: productsDB[i].stock,
          imgroute: productsDB[i].imgroute,
          category: productsDB[i].category,
        });
      }
    }
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
  }
};
// Conjunto de funciones para validar stock en mi base de datos >>>>

// Inicio de mi app // Inicio de mi app // Inicio de mi app >>>>
function app() {
  showCart(cartDB);
  showProduct(productsDB, discountsDB, taxesDB);
}
// Inicio de mi app // Inicio de mi app // Inicio de mi app >>>>

// Funcion para actualizar la pagina principal con los articulos  >>>>
function showProduct(productsDB, discountsDB, taxesDB) {
  // Tomando mi codigo HTML para ser modificado
  let tempHTMLProducts = document.querySelector("#products .products .col");
  //Reseteo de mi codigo HMTL
  tempHTMLProducts.innerHTML = ``;
  //Midiendo la longitud del carrito
  let tempFullProducts = stock.pull(productsDB, discountsDB, taxesDB);
  if (tempFullProducts.length > 0) {
    for (let i = 0; i < tempFullProducts.length; i++) {
      tempHTMLProducts.innerHTML += `
                    <div class="card m-1" style="width: 15rem;" data-id="${tempFullProducts[i].id}">
                        <div class="card-img">
                            <img src="${tempFullProducts[i].imgroute}" alt="${tempFullProducts[i].title}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${tempFullProducts[i].title}</h5>
                            <p class="card-text">COP ${
                              tempFullProducts[i].price -
                              tempFullProducts[i].discount +
                              tempFullProducts[i].taxes
                            }, COP ${tempFullProducts[i].price}</p>
                            <div class="card-buttons">
                                <button class="btn btn-primary"><i class="bi bi-trash3"></i></button><input type="text" class="conunter text-center" value="0"><button class="btn btn-primary"><i class="bi bi-bag-plus"></i></button>
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
  let tempHTML = document.querySelector(".modal .modal-body tbody ");
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
                    <td>${
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
                <td colspan="8">Carrito vacio</td>
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
}
// Funcion para actualizar mi carrito  >>>>

// Funcion para comprar >>>>
//function purchase() {}
// Funcion para comprar >>>>


// Eventos del DOM  >>>>
document.addEventListener("click", (e) => {
  let tempTarget = e.target,
    tempCard = tempTarget.closest(".card");
    
    if (tempCard != null) {
    //console.log(parseInt(tempCard.dataset.id));
    tempButtonBox = tempCard.lastElementChild.lastElementChild;
    if (tempButtonBox.children[0] == tempTarget || tempButtonBox.children[0].children[0] == tempTarget) {
      //console.log("entre a restar");
      tempButtonBox.children[1].value = cart.update(cartDB, productsDB, parseInt(tempCard.dataset.id), -1)
    } else if (tempButtonBox.children[2] == tempTarget || tempButtonBox.children[2].children[0] == tempTarget) {
      //console.log("entre a sumar");

      tempButtonBox.children[1].value = cart.update(cartDB, productsDB, parseInt(tempCard.dataset.id), +1)
    } else {
      console.warn("No estoy ajustando valores con los botones");
    }
  }
  
  let tempCartButton = document.querySelector("#modal-cart");
  if ( tempCartButton == tempTarget ) {
    showCart(cartDB);
  }

});

document.onkeyup = function (e) {
  let tempTarget = e.target,
  tempCard = tempTarget.closest(".card");

  if (tempCard != null) {
    tempButtonBox = tempCard.lastElementChild.lastElementChild;

    if (tempButtonBox.children[1] == tempTarget) {
      tempButtonBox.children[1].value = cart.update(cartDB, productsDB, parseInt(tempCard.dataset.id), parseInt(tempButtonBox.children[1].value))
    } else {
      console.warn("No estoy ajustando valores dentro del input");
    }
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
};

window.addEventListener("beforeunload", (e) => {
  let temp = JSON.stringify(cartDB)
  localStorage.setItem("cartDB", temp)
});
window.onload = (e) => {
  let tempStorage = localStorage.getItem("cartDB");
  if (JSON.parse(tempStorage).length > 0) {
    console.log("Hay items");
    cartDB = JSON.parse(tempStorage)
  } else {
    cartDB = [];
  }
};

// Eventos del DOM  >>>>

// Ejecucion de mi app  >>>>
app();
// Ejecucion de mi app  >>>>