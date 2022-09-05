/* Esta es mi base de datos */
const products = [
    {id: 1, title: "Harina de Maiz PAN 1000g", price: 4500, stock: 25, imgroute: "src/media/product1.png", category: "Harina"},
    {id: 2, title: "Aceite Mazeite 1 Litro", price: 11000, stock: 36, imgroute: "src/media/product9.jpg", category: "Aceite"},
    {id: 3, title: "Mantequilla Mavesa 1000g", price: 12000, stock: 91, imgroute: "src/media/product10.jpg", category: "Mantequila"},
    {id: 4, title: "1/2 Carton de Huevos Doñema ", price: 6500, stock: 33, imgroute: "src/media/product11.jpg", category: "Huevo"},
    {id: 5, title: "Leche en Polvo La Campesina 1000g", price: 24000, stock: 78, imgroute: "src/media/product2.png", category: "Leche"},
    {id: 6, title: "Chocolate Savoy 430g", price: 7000, stock: 78, imgroute: "src/media/product4.jpg", category: "Chocolate"},
    {id: 7, title: "Chocolate Savoy 55% 180g", price: 11000, stock: 78, imgroute: "src/media/product5.jpg", category: "Chocolate"},
    {id: 8, title: "Cafe Flor de Patria 250g", price: 4000, stock: 78, imgroute: "src/media/product6.png", category: "Cafe"},
    {id: 9, title: "Mayonesa Kraft 480g", price: 6000, stock: 78, imgroute: "src/media/product7.jpeg", category: "Mayonesa"},
    {id: 10, title: "Atun Margarita 500g", price: 4500, stock: 78, imgroute: "src/media/product8.jpg", category: "Atun"},
    {id: 11, title: "Choclitos de Limon 250g", price: 2500, stock: 78, imgroute: "src/media/product3.jpg", category: "Snacks"},
];
const discounts = [
    {id: 1, title: "Descuentos en Chocolates y Snacks", discount: "15%", applyTo : [6,7,11], startDate: "01/09/2022", expirationDate: "31/12/2022"},
    {id: 2, title: "Descuentos en Mantequilla Mavesa 1000g", discount: "20%", applyTo : [3], startDate: "01/09/2022", expirationDate: "31/12/2022"}
];
const legal = [
    {id: 1, title: "Acorde a la ley los taxes 31/12/2021", taxes: "12%", applyTo : [1,2,3,4,5,6,7,8,9,10,11,12], startDate: "31/12/2021", expirationDate: "31/12/2022"}
];
const myCart = [];

/* Este es mi constructor para mi carrito */
class MyCart{
    constructor(id, quantity){
        this.id =  id;
        this.quantity = quantity;
    }
}

// Conjunto de funciones para mostrar los articulos agregados al carrito
const cart = {
    //Retorna todos los articulos agregados al carrito con todos los detalles.
    //NO ELIMINAR, PERFECTA CONSTRUCCION, NO ELIMINAR, PERFECTA CONSTRUCCION, NO ELIMINAR, PERFECTA CONSTRUCCION
    //NO ELIMINAR, PERFECTA CONSTRUCCION, NO ELIMINAR, PERFECTA CONSTRUCCION, NO ELIMINAR, PERFECTA CONSTRUCCION
    pull : (cartDB, productsDB, discountDB, taxesDB) => {
        let tempInfoToPull = [];
        if (cartDB.length > 0) {
            for (let i = 0; i < cartDB.length; i++) {
                let temp = productsDB.filter(item => { if (item.id == cartDB[i].id) { return item; }});
                tempInfoToPull.push({
                    id          : temp[0].id,
                    title       : temp[0].title,
                    price       : temp[0].price,
                    discount    : cart.checkDiscount(discountDB, temp[0].id, temp[0].price),
                    taxes       : cart.checkTaxes(taxesDB, temp[0].id, temp[0].price),
                    quantity    : cartDB[i].quantity,
                    imgroute    : temp[0].imgroute,
                    category    : temp[0].category
                });
                
            }
        }
        console.log(tempInfoToPull);
        return tempInfoToPull;
    },
    checkDiscount : (discountsDB, id, price) => {
        let tempValueToReturn = 0;
        discountsDB.forEach(x => {
            x.applyTo.forEach(y =>{
                if (y == id) {
                    tempValueToReturn = ((parseInt(x.discount)/100) * price);
                }
            });
        });
        //console.log(tempValueToReturn);
        return tempValueToReturn;
    },
    checkTaxes : (taxesDB, id, price) => {
        let tempValueToReturn = price;
        taxesDB.forEach(x => {
            x.applyTo.forEach(y =>{
                if (y == id) {
                    tempValueToReturn = ((parseInt(x.taxes)/100) * price);
                }
            });
        });
        //console.log(tempValueToReturn);
        return tempValueToReturn;
    },
    //OBSOLETOO OBSOLETOO OBSOLETOO OBSOLETOO OBSOLETOO OBSOLETOO OBSOLETOO OBSOLETOO
    //OBSOLETOO OBSOLETOO OBSOLETOO OBSOLETOO OBSOLETOO OBSOLETOO OBSOLETOO OBSOLETOO
    //OBSOLETOO OBSOLETOO OBSOLETOO OBSOLETOO OBSOLETOO OBSOLETOO OBSOLETOO OBSOLETOO
    getQuantityById : (id) => {
        for (let i = 0; i < myCart.length; i++) {
            if (id == myCart[i].id) {
                return myCart[i].quantity
            }
        }
    },
    updatingQuantity : (id, q) => {
        myCart.map((item)=>{
            if (item.id == id) {
                item.quantity += q;
            }
        });
    }
}
/* Conjunto de funciones para validar stock en mi base de datos */
const stock = {
    alertIt : (items) => {
        let message = '';
        for (let i = 0; i < items.length; i++) {
            message += items[i].id + ") " + items[i].title + " (COP "+ items[i].price + ") \t\t Disponibles: "+ items[i].stock +"\n";
        }
        return message;
    },
    getElemetByName : (items, name) => {
        const element = items.filter((x) => {
            return x.name == name;
        });
        /* return element; */
        if (element.length > 0) {
            for (let i = 0; i < element.length; i++) {
                return element[i].id + ") " + element[i].name + " (COP "+ element[i].price + ") \t\t Disponibles: "+ element[i].stock +"\n";
            }
        } else {
            return 0;
        }
    },
    /* Procesa una base de datos y devuelve un arreglo basado en ID a buscar */
    getElemetById : (items, id) => {
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            if (element.id == id) {
                return element;
            }
        }
    },
    getName : (items, id) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                const element = items[i].title;
                //console.log("Se encontro: "+ element);
                return element;
            }            
        }
    },
    pullToMyCart : (productsDB, id, q) => {
        for (let i = 0; i < productsDB.length; i++) {
            if (productsDB[i].id == id) {
                const element = new MyCart(products[i].id, q);
                myCart.push(element);
            }            
        }
    },
    checkDiscount : (productsDB, discountsDB, id) => {
        let tempItem = productsDB.filter(x => x.id == id);
        let valveDiscount = [false, tempItem[0].price, 0];
        discountsDB.forEach(x => {
            x.applyTo.forEach(y =>{
                if (y == tempItem[0].id) {
                    valveDiscount = [true, tempItem[0].price, (tempItem[0].price - ((parseInt(x.discount)/100) * tempItem[0].price))];
                }
            });
        });
        return valveDiscount;
    },
    checkTaxes : (productsDB, taxesDB, id) => {
        let tempItem = productsDB.filter(x => x.id == id);
        let tempTaxes = [false, tempItem[0].price, 0];
        taxesDB.forEach(x => {
            x.applyTo.forEach(y =>{
                if (y == tempItem[0].id) {
                    tempTaxes = [true, tempItem[0].price, (tempItem[0].price + ((parseInt(x.taxes)/100) * tempItem[0].price))];
                }
            });
        });
        return tempTaxes;
    },
    //Revisa la cantidad disponible de un articulo
    check : (items, id, quantity) => {
        let valve;
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                if (quantity > items[i].stock) {
                    valve = false;
                } else {
                    valve = true;
                }
            }
        }
        return valve;
    }
}

let globalCont = true;
/* Inicio y menu de mi app */
function app(){
    /* Menu */
    let cont = true;
    while(cont == true && globalCont == true){
        let option = prompt('Bienvenido a la tienda online! \n\nMenu:\n\t1) Ver productos\n\t2) Ver Carrito\n\n\tESC) Salir');
        //console.log(option);
        switch (option) {
            case "1":
                prod();
                break;
            case "2":
                showingCart(myCart);
                break;
            case null:
                cont = false;
                break;
            default:
                alert('Escoge una opcion valida');
                cont = true;
                break;
        }
    }
    alert('Saliendo . . . ');
}
function showProduct(){
    let elements = document.querySelector(".store-articles");
    products.forEach(element => {
        let valveDiscount = false;
        discounts.forEach(disc => {
            disc.applyTo.forEach(id => {
                if (id == element.id) {
                    valveDiscount = [true, disc.discount]
                }
            });
        });
        let priceToShow = 0;
        if (valveDiscount[0] == true) {
            priceToShow = '<p class="newPrice">COP '+ (element.price - (element.price * (parseInt(valveDiscount[1]) / 100))) + '</p><p class="oldPrice">COP ' + element.price + '</p>' ;
        }else{
            priceToShow = '<p class="newPrice">COP ' + element.price + '</p><p class="oldPrice"></p>';
        }
        elements.innerHTML += `
        <div class="article">
            <div class="article-img">
                <img src="${element.imgroute}" alt="${element.title}">
            </div>
            <div class="article-title">
                <h3>${element.title}</h3>
            </div>
            <div class="article-description">
                ${priceToShow}
            </div>
        </div>
        `;
    });
    elements = document.querySelector(".filter-group");
    let filter = '';
    for (let i = 0; i < products.length; i++) {
        filter += `<label for="${products[i].category}">${products[i].category}</label>
        <input type="checkbox" name="${products[i].category}" id="${products[i].category}">`
    }
    elements.innerHTML += filter;
}
function showCart(cartDB){
    // Tomando mi codigo HTML para ser modificado
    let tempHTML = document.querySelector(".cart-content table tbody");
    //Reseteo de mi codigo HMTL
    tempHTML.innerHTML = ``;
    // Variable que almacena el calculo del precio total
    let tempTotalDiscount = 0;
    let tempTotalTaxes = 0;
    let tempTotalPrice = 0;
    //Midiendo la longitud del carrito
    let tempFullCart = cart.pull(cartDB, products, discounts, legal);
    if (tempFullCart.length > 0) {
        for (let i = 0; i < tempFullCart.length; i++) {
            tempTotalDiscount += tempFullCart[i].discount;
            tempTotalTaxes += tempFullCart[i].taxes;
            tempTotalPrice += ((tempFullCart[i].price - tempFullCart[i].discount) + tempFullCart[i].taxes) * tempFullCart[i].quantity;
            tempHTML.innerHTML += `
                <tr>
                    <td><img src="${tempFullCart[i].imgroute}" alt="${tempFullCart[i].title}"></td>
                    <td>${tempFullCart[i].title}</td>
                    <td>COP ${tempFullCart[i].price}</td>
                    <td>COP ${tempFullCart[i].discount}</td>
                    <td>COP ${tempFullCart[i].taxes}</td>
                    <td>${tempFullCart[i].quantity}</td>
                    <td>${((tempFullCart[i].price - tempFullCart[i].discount) + tempFullCart[i].taxes) * tempFullCart[i].quantity}</td>
                <tr>
                `;
        }
    }else{
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
// En esta funcion le mostramos una lista de productos a cliente 
function prod() {
    // Mostrar los productos 
    let cont = true;
    while(cont == true){
        let option = prompt('Agrega tus productos\n\n'+ stock.alertIt(products) +'\n\tS) Buscar por nombre\n\tESC) Atras');
        let valveOption = false;
        for (let i = 0; i < products.length; i++) {
            if (option == products[i].id) {
                valveOption = true;
            }
        }
        if (valveOption != true && option != "s" && option != "S" && option != null) {
            alert("Escoje una opcion valida");
        } else if(option == "s" || option == 'S'){
            const toSearched = prompt("Introduce el nombre del producto");
            if (stock.getElemetByName(products, toSearched) == 0) {
                alert("No se han encontrado elementos");
            }else{
                alert(stock.getElemetByName(products, toSearched));
            }
        } else if(option == null){
            cont = false;
        } else {
            addingToCart(parseInt(option));
        }
    }
}
// 
function showingCart(cartDB) {
    // Tomando mi codigo HTML para ser modificado
    let tempMessage = '';
    // Variable que almacena el calculo del precio total
    let tempTotalDiscount = 0;
    let tempTotalTaxes = 0;
    let tempTotalPrice = 0;
    //Midiendo la longitud del carrito
    let tempFullCart = cart.pull(cartDB, products, discounts, legal);
    if (tempFullCart.length > 0) {
        for (let i = 0; i < tempFullCart.length; i++) {
            tempTotalDiscount += tempFullCart[i].discount;
            tempTotalTaxes += tempFullCart[i].taxes;
            tempTotalPrice += ((tempFullCart[i].price - tempFullCart[i].discount) + tempFullCart[i].taxes) * tempFullCart[i].quantity;
            tempMessage += `${i+1}) ${tempFullCart[i].title} (COP ${tempFullCart[i].price}) > (- ${tempFullCart[i].discount} + ${tempFullCart[i].taxes}) * ${tempFullCart[i].quantity} = COP ${((tempFullCart[i].price - tempFullCart[i].discount) + tempFullCart[i].taxes) * tempFullCart[i].quantity} \n`;
        }
    }else{
        tempMessage = 'Carrito Vacio \n';
    }

    let cont = true;
    while(cont == true){
        let option = prompt("Carrito de compra\n\n"+ tempMessage +"\nDescuentos: COP "+ tempTotalDiscount +"\nImpuestos: COP "+ tempTotalTaxes +"\nTotal a pagar: COP "+ tempTotalPrice +"\n\n\tP) Comprar \n\tESC) Volver");
        switch (option) {
            case "P":
                purchase();
                cont = false;
                break;
            case "p":
                purchase();
                cont = false;
                break;
            case null:
                cont = false;
                break;
            default:
                alert('Escoge una opcion valida');
                cont = true;
                break;
        }
    }
}

function addingToCart(id){
    let q = 0;
    q = parseInt(prompt(`Cuantos articulos desearias agregar de ${stock.getName(products,id)}`));
    //Validar Stock antes de agregar un articulo
    while (q <= 0 || stock.check(products, id, q) == false || isNaN(q) == true) {
        if (q <= 0 || isNaN(q) == true) {
            alert('Escoge un valor mayor o igual uno');
        };
        if (stock.check(products, id, q) == false) {
            alert('Lo sentimos, no poseemos tanto stock para tus requisitos, escoge un valor menor');
        }
        q = parseInt(prompt('Cuantos articulos desearias agregar de ' + stock.getName(products,id)));
    }

    //Agregar al carro
    if (myCart.length == 0) {
        stock.pullToMyCart(products, id, q);
        if (q > 1) {
            alert('Se han agregado '+ q +' articulos a tu carrito satisfactoriamente');
        } else {
            alert('Se ha agregado '+ q +' articulo a tu carrito satisfactoriamente');
        }
    } else {
        //Validando que el articulo que sera agregado no este ya en el cart
        let iValve = false;
        for (let i = 0; i < myCart.length; i++) {
            if (myCart[i].id == id) {
                iValve = true;
            }
        }
        if (iValve == true) {
            while (q <= 0 || stock.check(products, id, (cart.getQuantityById(id) + q)) == false || isNaN(q) == true) {
                if (q <= 0 || isNaN(q) == true) {
                    alert('Escoge un valor mayor o igual uno');
                };
                if (stock.check(products, id, q) == false) {
                    alert('Lo sentimos, no poseemos tanto stock para tus requisitos, escoge un valor menor');
                }
                q = parseInt(prompt('Cuantos articulos desearias agregar de ' + stock.getName(products,id)));
            }
            cart.updatingQuantity(id, q);
            if (q > 1) {
                alert('Se han agregado '+ q +' articulos a tu carrito satisfactoriamente, para un total de '+ cart.getQuantityById(id) +' articulos agregados');
            } else {
                alert('Se ha agregado '+ q +' articulo a tu carrito satisfactoriamente, para un total de '+ cart.getQuantityById(id) +' articulos agregados');
            }   
        } else {
            stock.pullToMyCart(products, id, q);
            if (q > 1) {
                alert('Se han agregado '+ q +' articulos a tu carrito satisfactoriamente');
            } else {
                alert('Se ha agregado '+ q +' articulo a tu carrito satisfactoriamente');
            }
        }
    }
    showCart(myCart);
}

function purchase() {
    alert("Gracias por comprar en mi tienda online !");
    globalCont = false;
}

window.onload = (event) => {
    console.clear()
    showCart(myCart);
    showProduct();
    setTimeout(app,100);
};