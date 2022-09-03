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
const myCart = [];

/* Este es mi constructor para mi carrito */
class MyCart{
    constructor(id, quantity){
        this.id =  id;
        this.quantity = quantity;
    }
}

/* Conjunto de funciones para validar stock en mi base de datos */
const cart = {
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
        /* for (let i = 0; i < myCart.length; i++) {
            if (id == myCart[i].id) {
                myCart[i].quantity += q;
            }
        } */
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
    pullToMyCart : (items, id, q) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                const element = new MyCart(products[i].id, q);
                myCart.push(element);
            }            
        }
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
    console.clear()
    showProduct();
    showCart();
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
function showCart(){
    let elements = document.querySelector(".cart-content table tbody");
    elements.innerHTML = ``;
    let totalPrice = 0;
    if (myCart.length > 0) {
        myCart.forEach(element => {
            let valveDiscount = [false,0];
            let idSearched = stock.getElemetById(products,element.id);
            discounts.forEach(disc => {
                disc.applyTo.forEach(id => {
                    if (id == element.id) {
                        valveDiscount = [true, disc.discount]
                    }
                });
            });
            let priceToShow = 0;
            let priceToCalculate = 0;
            if (valveDiscount[0] == true) {
                //console.log("Discount");
                priceToCalculate = idSearched.price - (idSearched.price * (parseInt(valveDiscount[1]) / 100));
                priceToShow = '<td class="newPrice">COP '+ priceToCalculate + '</td><td class="oldPrice">COP ' + idSearched.price + '</td>' ;
            }else{
                //console.log("No Discounts");
                priceToCalculate = idSearched.price;
                priceToShow = '<td class="newPrice">COP ' + priceToCalculate + '</td><td class="oldPrice"></td>';
            }
            elements.innerHTML += `
                <tr>
                    <td><img src="${idSearched.imgroute}" alt="${idSearched.title}"></td>
                    <td>${idSearched.title}</td>
                    ${priceToShow}
                    <td>${element.quantity}</td>
                    <td>$0</td>
                    <td>COP ${priceToCalculate * element.quantity}</td>
                </tr>
            `;
            totalPrice += (priceToCalculate * element.quantity);
        });
    }else{
        elements.innerHTML += `
            <tr>
            <td colspan="8">Carrito vacio</td>`;
    }
    elements.innerHTML += `
        <tr>
        <td colspan="6">Total Iva</td>
        <td>COP 0</td>
        </tr>
        <tr>
            <td colspan="6">Precio Total</td>
            <td>COP ${totalPrice}</td>
        </tr>`;
}
/* En esta funcion le mostramos una lista de productos a cliente */
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
function addingToCart(id){
    //console.log(stock.getName(products, id));
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
        //console.clear();
        //console.log("Carrito vacio y procediendo a agregar un item");
        stock.pullToMyCart(products, id, q);
        //console.log('myCart se ha actualizado');
        if (q > 1) {
            alert('Se han agregado '+ q +' articulos a tu carrito satisfactoriamente');
        } else {
            alert('Se ha agregado '+ q +' articulo a tu carrito satisfactoriamente');
        }
        //console.log(myCart);
    } else {
        //console.clear();
        //console.log("Carrito no vacio("+myCart.length+" items) y procediendo a agregar un item");
        //Validando que el articulo que sera agregado no este ya en el cart
        let iValve = false;
        for (let i = 0; i < myCart.length; i++) {
            if (myCart[i].id == id) {
                iValve = true;
            }
        }
        if (iValve == true) {
            //console.log('Se encuentra repetido');
            /*
            Validar stock nuevamente y actualizar quantity en my cart AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
            */
           //console.log(cart.getQuantityById(id));
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
            //console.log('No se encuentra repetido');
            stock.pullToMyCart(products, id, q);
            //console.log('myCart se ha actualizado');
            if (q > 1) {
                alert('Se han agregado '+ q +' articulos a tu carrito satisfactoriamente');
            } else {
                alert('Se ha agregado '+ q +' articulo a tu carrito satisfactoriamente');
            }
            //console.log(myCart);
        }
    }
    showCart();
}
function showingCart(items) {
    //console.clear();
    const articlesAdded = [];
    /* 
    let priceDiscounted = 0; */
    items.forEach(item => {
        articlesAdded.push(stock.getElemetById(products,item.id))
    });
    /* 
                                                                                        TRABAJAR EN EL DISCOUNT
    */
    let valveDiscount = [false,0];
    let message = '';
    let totalPrice = 0;
    
    if (items.length != 0) {
        for (let i = 0; i < items.length; i++) {
            discounts.forEach(disc => {
                disc.applyTo.forEach(id => {
                    if (id == items[i].id) {
                        //console.log("applying disocunt")
                        valveDiscount = [true, disc.discount]
                    }else{
                        //console.log("no applying disocunt")
                    }
                });
            });
            
            if (valveDiscount[0] == true) {
                //console.log('discount ' + (articlesAdded[i].price - (articlesAdded[i].price * parseInt(valveDiscount[1]) /100)))
                totalPrice += ((articlesAdded[i].price - (articlesAdded[i].price * parseInt(valveDiscount[1]) /100))) * items[i].quantity;
                message += (i+1) + ") " + articlesAdded[i].title + " (COP "+ articlesAdded[i].price + ") > Cantidad: "+ items[i].quantity +" > Total: COP "+ ((articlesAdded[i].price - (articlesAdded[i].price * parseInt(valveDiscount[1]) /100))) * items[i].quantity +"\n";
            } else {
                //console.log('no discount'+parseInt(valveDiscount[1]))
                totalPrice += articlesAdded[i].price * items[i].quantity;
                message += (i+1) + ") " + articlesAdded[i].title + " (COP "+ articlesAdded[i].price + ") > Cantidad: "+ items[i].quantity +" > Total: COP "+ (articlesAdded[i].price * items[i].quantity ) +"\n";
            }
        }
    } else {
        message = 'Carrito Vacio \n';
    }
    let cont = true;
    while(cont == true){
        let option = prompt("Carrito de compra\n\n"+message+"\nTotal a pagar: COP "+ totalPrice +"\n\n\tP) Comprar \n\tESC) Volver");
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
function purchase() {
    alert("Gracias por comprar en mi tienda online !");
    globalCont = false;
}
//console.clear();
app();

