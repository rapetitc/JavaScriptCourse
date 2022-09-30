// Data Base // Data Base // Data Base // Data Base // Data Base >>>>
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
  pull: async (cartDB) => {
    let { products, discounts, taxes } = await stock.searchData({ table: "*" });
    let tempInfoToPull = [];
    if (cartDB.length > 0) {
      for (let i = 0; i < cartDB.length; i++) {
        let temp = products.filter((item) => {
          if (item.id == cartDB[i].id) {
            return item;
          }
        });
        tempInfoToPull.push({
          id: temp[0].id,
          title: temp[0].title,
          price: temp[0].price,
          discount: await stock.checkDiscount(discounts, temp[0].id, temp[0].price),
          taxes: await stock.checkTaxes(temp[0].id, temp[0].price - await stock.checkDiscount(discounts, temp[0].id, temp[0].price)),
          quantity: cartDB[i].quantity,
          imgroute: temp[0].imgroute,
          category: temp[0].category,
        });
      }
    }
    return tempInfoToPull;
  },
  update: async (cartDB, id, quantity) => {
    //console.log("me ejecuto");

    let products = await stock.searchData({ table: "products" });
    let itemFoundInCart; //Variable para futuro uso
    if (cartDB.length > 0) {
      //Chequea si el carrito esta vacio
      let itemFoundInProducts = []; //Variable para futuro uso
      itemFoundInCart = cartDB.find((item) => item.id == id); //Chequear si el item esta agregado al carrito
      if (itemFoundInCart != undefined) {
        //En caso de encontrar un item agregado al carrito
        if (quantity == +1 || quantity == -1) {
          //Ajustando y validamos quantity
          quantity = quantity + itemFoundInCart.quantity <= 0 ? 0 : quantity + itemFoundInCart.quantity; //Si se cambia quantity de a un valor o usando los botones
        } else {
          quantity = quantity <= 0 ? 0 : quantity; //Si se cambia quantity de a un valor o usando el input
        }
        //console.log("Cantidad a agregar", quantity);

        //Check Stock
        itemFoundInProducts = products.find((item) => item.id == itemFoundInCart.id);
        if (quantity <= 0 || isNaN(quantity)) {
          //console.log(cartDB.indexOf(itemOnCartFound));
          let index = cartDB.indexOf(itemFoundInCart);
          if (index > -1) {
            // only splice array when item is found
            cartDB.splice(index, 1); // Remover this item
          }
          itemFoundInCart.quantity = 0;
          return 0;
        } else if (itemFoundInProducts.stock < quantity) {
          itemFoundInCart.quantity = itemFoundInProducts.stock;
          return itemFoundInCart.quantity;
        } else {
          itemFoundInCart.quantity = quantity;
          return itemFoundInCart.quantity;
        }
      } else {
        //En caso de no encontrar un item agregado al carrito, igualamos la variable a undefined
        itemFoundInCart = undefined;
      }
    }
    //console.log(itemFoundInCart);
    //Esto pasa si el carrito tiene articulos y no se consigue, lo cual se agrega como nuevo
    if (itemFoundInCart == undefined) {
      if (quantity > 0) {
        //console.log("Cantidad a agregar", quantity);
        for (let i = 0; i < products.length; i++) {
          if (products[i].id == id) {
            const element = new MyCart(products[i].id, quantity);
            //console.log(element);
            cartDB.push(element);
            return quantity;
          }
        }
      } else {
        //console.log("aqui ");
        return 0;
      }
    }
  },
};
// Conjunto de funciones para mostrar los articulos agregados al carrito >>>>

// Conjunto de funciones para validar stock en mi base de datos >>>>
const stock = {
  fetching: async () => {
    //Obteniendo la informacion de la API Falsa Local
    try {
      let data = await fetch("./src/db/db.json");
      let db = await data.json();
      return db;
    } catch (error) {
      console.log("Error:", error);
    }
    //Obteniendo la informacion de la API Falsa Local
  },
  searchData: async ({ table, id, title, category }) => {
    db = await stock.fetching();
    if (table == "*") {
      //console.log("SELECT * FROM DATABASE");
      return db;
    } else {
      if (db.hasOwnProperty(table)) {
        let tempTableFound = [...db[table]];
        if (id || title || category) {
          let tempItemFound = [];
          let tempInfoToPrint = "";
          if (id) {
            tempTableFound.forEach((e) => {
              if (e.id == id) {
                tempItemFound.push(e);
              }
            });
            tempInfoToPrint += "ID { " + id + " }";
          }
          if (title) {
            tempTableFound.forEach((e) => {
              if (e.title.toLowerCase().includes(title.toLowerCase())) {
                tempItemFound.push(e);
              }
            });
            tempInfoToPrint += ", TITLE { " + title + " }";
          }
          if (category) {
            tempTableFound.forEach((e) => {
              if (e.category.toLowerCase().includes(category.toLowerCase())) {
                tempItemFound.push(e);
              }
            });
            tempInfoToPrint += ", CATEGORY { " + category + " }";
          }
          //console.log("SELECT", tempInfoToPrint, "FROM", table);
          //console.log(tempItemFound);
          return tempItemFound;
        } else {
          //console.log("SELECT * FROM", table);
          //console.log(tempTableFound);
          return tempTableFound;
        }
      } else {
        return [];
      }
    }
  },
  pull: async ({ filter }) => {
    let tempProdDBFormat,
      tempInfoToPull = [];
    if (filter) {
      tempProdDBFormat = await stock.searchData({ table: "products" });
    } else {
      tempProdDBFormat = await stock.searchData({ table: "products", title: filter });
    }
    // Haciendo el fitro por ID
    /* if (filter.length > 0) {
      tempProdDBFormat = [];
      productsDB.forEach((item) => {
        filter.forEach((fil) => {
          //console.log(fil)
          if (item.id == fil) {
            tempProdDBFormat.push(item);
          }
        });
      });
    } */
    //console.log(tempProdDBFormat);

    if (tempProdDBFormat.length > 0) {
      for (let i = 0; i < tempProdDBFormat.length; i++) {
        tempInfoToPull.push({
          id: tempProdDBFormat[i].id,
          title: tempProdDBFormat[i].title,
          price: tempProdDBFormat[i].price,
          discount: await stock.checkDiscount(tempProdDBFormat[i].id, tempProdDBFormat[i].price),
          taxes: await stock.checkTaxes(tempProdDBFormat[i].id, tempProdDBFormat[i].price - await stock.checkDiscount(tempProdDBFormat[i].id, tempProdDBFormat[i].price)),
          stock: tempProdDBFormat[i].stock,
          imgroute: tempProdDBFormat[i].imgroute,
          category: tempProdDBFormat[i].category,
        });
      }
    }
    //console.log(await stock.checkDiscount(tempProdDBFormat[5].id, tempProdDBFormat[5].price) - tempProdDBFormat[5].price)
    return tempInfoToPull;
  },
  checkDiscount: async (id, price) => {
    //console.log(id, price);
    let discounts = await stock.searchData({ table: "discounts" }),
      tempValueToReturn = 0;
    discounts.forEach((x) => {
      x.applyTo.forEach((y) => {
        if (y == id) {
          tempValueToReturn = (parseInt(x.discount) / 100) * price;
        }
      });
    });

    return tempValueToReturn;
  },
  checkTaxes: async (id, price) => {
    //console.log(id, price);
    let taxes = await stock.searchData({ table: "taxes" });
    let tempValueToReturn = 0;
    taxes.forEach((x) => {
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
