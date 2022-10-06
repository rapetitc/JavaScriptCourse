// Inicio de mi app // Inicio de mi app // Inicio de mi app >>>>
function app() {
  showFilter();
  showProduct(cartDB);
  showCart(cartDB);
}
// Inicio de mi app // Inicio de mi app // Inicio de mi app >>>>

function filterChecked() {
  let filters = document.getElementById("filterCategory").querySelectorAll("input");
  let categories = [];
  filters.forEach((e) => {
    if (e.checked) {
      console.log(e.value);
      categories.push(e.value);
    }
  });

  console.log("=======");
  return categories;
}

let $searchBar = document.querySelector("#searchProduct");
function search() {
  let searchInput = $searchBar.value;

  console.log("searching... (" + searchInput + ")");

  showProduct(cartDB, searchInput, filterChecked());
}

// Funcion para actualizar la pagina principal con los articulos  >>>>
async function showProduct(cartDB, title = "", category = []) {
  // Tomando mi codigo HTML para ser modificado
  let tempHTMLProducts = document.querySelector("#products .products .col");
  // Reseteo de mi codigo HMTL
  tempHTMLProducts.innerHTML = ``;
  // Consulta de API Faltas
  let tempProductDB = await stock.pull({});
  //console.log(tempProductDB);

  const tempProductsDBByCategory = [];
  tempProductDB.forEach((e) => {
    category.forEach((c) => {
      if (e.category == c) {
        tempProductsDBByCategory.push(e);
      }
    });
  });

  let tempFullProducts = [];
  if (tempProductsDBByCategory.length > 0) {
    console.log('si category')
    tempProductsDBByCategory.forEach((item) => {
      if (item.title.toLowerCase().includes(title)) {
        tempFullProducts.push(item);
      }
    });
  } else {
    console.log('no category')
    tempProductDB.forEach((item) => {
      if (item.title.toLowerCase().includes(title)) {
        tempFullProducts.push(item);
      }
    });
  }
  //console.log(tempFullProducts);
  // Midiendo la longitud del carrito
  if (tempFullProducts.length > 0) {
    for (let i = 0; i < tempFullProducts.length; i++) {
      const tempItemFound = () => {
        let tempItemFound = cartDB.filter((e) => {
          if (e.id == tempFullProducts[i].id) {
            return e.quantity;
          }
        });
        if (tempItemFound.length > 0) {
          if (tempItemFound[0].quantity > 1) {
            return `<button class="btn btn-primary"><i class="bi bi-bag-dash"></i></button>
            <input type="text" class="conunter text-center" value="${tempItemFound[0].quantity}">`;
          } else {
            return `<button class="btn btn-primary"><i class="bi bi-trash3"></i></button>
            <input type="text" class="conunter text-center" value="${tempItemFound[0].quantity}">`;
          }
        } else {
          return `<button class="btn btn-primary" disabled><i class="bi bi-trash3"></i></button>
          <input type="text" class="conunter text-center" value="0">`;
        }
      };
      tempPriceToShow = tempFullProducts[i].discount > 0 ? `<span class="h4 text-success">COP ${tempFullProducts[i].price - tempFullProducts[i].discount + tempFullProducts[i].taxes}</span> <del class="text-secondary">COP ${tempFullProducts[i].price + tempFullProducts[i].taxes}</del>` : `<span class="h4">COP ${tempFullProducts[i].price + tempFullProducts[i].taxes}</span>`;
      tempHTMLProducts.innerHTML += `
                    <div class="card m-auto mt-3" style="width: 15rem;" data-id="${tempFullProducts[i].id}">
                        <div class="card-img">
                            <img src="${tempFullProducts[i].imgroute}" alt="${tempFullProducts[i].title}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${tempFullProducts[i].title}</h5>
                            <p class="card-text">${tempPriceToShow}</p>
                            <div class="card-buttons">
                                ${tempItemFound()}
                                <button class="btn btn-primary"><i class="bi bi-bag-plus"></i></button>
                            </div>
                        </div>
                    </div>
                `;
    }
  } else {
    tempHTMLProducts.innerHTML += `
    <div class="card m-1" style="width: 15rem;">
      <div class="card-img">
          <img src="#" alt="No hay imagen para mostrar">
      </div>
      <div class="card-body">
          <h5 class="card-title">Vacio</h5>
          <p class="card-text">Productos fuera de stock</p>
          <div class="card-buttons">
              <button class="btn btn-primary" disabled><i class="bi bi-trash3"></i></button>
              <input type="text" class="conunter text-center" value="0" disabled>
              <button class="btn btn-primary" disabled><i class="bi bi-bag-plus"></i></button>
          </div>
      </div>
    </div>
    `;
  }
}
// Funcion para actualizar la pagina principal con los articulos  >>>>

// Funcion para actualizar mi carrito  >>>>
async function showCart(cartDB) {
  // Tomando mi codigo HTML para ser modificado
  let tempHTML = document.querySelector("#cartItems");
  let tempButtonHTML = document.querySelector(".modal .modal-footer .btn-primary");
  let tempTotalPriceHTML = document.querySelector("#inputTotalPrice");

  //Reseteo de mi codigo HMTL
  tempHTML.innerHTML = ``;
  // Variable que almacena el calculo del precio total
  let tempTotalDiscount = 0;
  let tempTotalTaxes = 0;
  let tempTotalPrice = 0;

  //Midiendo la longitud del carrito
  let tempFullCart = await cart.pull(cartDB);
  //console.log(tempFullCart)
  if (tempFullCart.length > 0 && tempFullCart != undefined) {
    for (let i = 0; i < tempFullCart.length; i++) {
      tempTotalDiscount += tempFullCart[i].discount;
      tempTotalTaxes += tempFullCart[i].taxes;
      tempTotalPrice += (tempFullCart[i].price - tempFullCart[i].discount + tempFullCart[i].taxes) * tempFullCart[i].quantity;
      tempHTML.innerHTML += `
                <tr>
                    <td>${tempFullCart[i].id}</td>
                    <td>${tempFullCart[i].title}</td>
                    <td>COP ${tempFullCart[i].price}</td>
                    <td>COP ${tempFullCart[i].discount}</td>
                    <td>COP ${tempFullCart[i].taxes}</td>
                    <td>${tempFullCart[i].quantity}</td>
                    <td>COP ${(tempFullCart[i].price - tempFullCart[i].discount + tempFullCart[i].taxes) * tempFullCart[i].quantity}</td>
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
  tempFullCart.length > 0 ? tempButtonHTML.removeAttribute("Disabled") : tempButtonHTML.setAttribute("Disabled", "Disabled");
  tempTotalPriceHTML.value = "COP " + tempTotalPrice;
}
// Funcion para actualizar mi carrito  >>>>

// Funcion para actualizar mi filtro  >>>>
async function showFilter() {
  let productsDB = await stock.searchData({ table: "products" });
  //console.log(productsDB);
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
        <input class="form-check-input" type="checkbox" value="${item}" id="${item}">
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
  getFilters();
}
// Funcion para actualizar mi filtro  >>>>
function getFilters() {
  let filters = document.getElementById("filterCategory").querySelectorAll("input");
  console.log(filters);
  for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener("change", (e) => {
      search();
    });
  }
}

//Esperando a escuchar de search bar
$searchBar.onkeyup = (e) => {
  search();
};
//Esperando a escuchar de search bar

// Guardar cart con los items seleccionados
window.addEventListener("beforeunload", (e) => {
  localStorage.setItem("cartDB", JSON.stringify(cartDB));
});

// Guardar cart con los items seleccionados
window.onload = (e) => {
  setExpirationDate();
  //En caso de que haya, descargar carrito anteriormente guardado
  let tempStorage = localStorage.getItem("cartDB");
  JSON.parse(tempStorage) != null ? (cartDB = [...JSON.parse(tempStorage)]) : (cartDB = []);

  // Ejecucion de mi app  >>>>
  app();
  // Ejecucion de mi app  >>>>
};
// Eventos del DOM  >>>>
