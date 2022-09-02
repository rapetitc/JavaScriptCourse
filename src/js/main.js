console.clear();

/* Esta es mi base de datos */
const products = [
    {id: 1, name: "harina", price: 3000, stock: 19},
    {id: 2, name: "aceite", price: 7000, stock: 24},
    {id: 3, name: "mantequilla", price: 1500, stock: 53},
    {id: 4, name: "huevo", price: 5000, stock: 76},
    {id: 5, name: "leche", price: 5000, stock: 7}
];
const myCart = [];

/* Este es mi constructor para mi carrito */
class MyCart{
    constructor(id, name, price, quantity){
        this.id =  id;
        this.name = name;
        this.price = price;
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
            message += items[i].id + ") " + items[i].name + " (COP "+ items[i].price + ") \t\t Disponibles: "+ items[i].stock +"\n";
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
    getName : (items, id) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                const element = items[i].name;
                console.log("Se encontro: "+ element);
                return element;
            }            
        }
    },
    pullToMyCart : (items, id, q) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                const element = new MyCart(products[i].id, products[i].name, products[i].price, q);
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

/* Inicio de mi app */
function app(){
    console.clear()
    /* Menu */
    let cont = true;
    while(cont == true){
        let option = prompt('Bienvenido a la tienda online! \n\nMenu:\n\t1) Ver productos\n\t2) Ver Carrito\n\n\t9) Salir');
        switch (option) {
            case "1":
                prod();
                break;
            case "2":
                showingCart(myCart);
                break;
            case "9":
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

/* En esta funcion le mostramos una lista de productos a cliente */
function prod() {
    // Mostrar los productos 
    let cont = true;
    while(cont == true){
        let seleccionados = prompt('Agrega tus productos\n\n'+ stock.alertIt(products) +'\n\t8) Buscar por nombre\n\t9) Atras');
        if (seleccionados != "1" && seleccionados != "2" && seleccionados != "3" && seleccionados != "4" && seleccionados != "5" && seleccionados != "8" && seleccionados != "9") {
            alert("Escoje una opcion valida");
        } else if(seleccionados == "8"){
            const toSearched = prompt("Introduce el nombre del producto");
            if (stock.getElemetByName(products, toSearched) == 0) {
                alert("No se han encontrado elementos");
            }else{
                alert(stock.getElemetByName(products, toSearched));
            }
        } else if(seleccionados == "9"){
            cont = false;
        } else {
            addingToCart(parseInt(seleccionados));
        }
    }
}

function addingToCart(id){
    console.log(stock.getName(products, id));
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
        console.clear();
        console.log("Carrito vacio y procediendo a agregar un item");
        stock.pullToMyCart(products, id, q);
        console.log('myCart se ha actualizado');
        if (q > 1) {
            alert('Se han agregado '+ q +' articulos a tu carrito satisfactoriamente');
        } else {
            alert('Se ha agregado '+ q +' articulo a tu carrito satisfactoriamente');
        }
        console.log(myCart);
    } else {
        console.clear();
        console.log("Carrito no vacio("+myCart.length+" items) y procediendo a agregar un item");
        //Validando que el articulo que sera agregado no este ya en el cart
        let iValve = false;
        for (let i = 0; i < myCart.length; i++) {
            if (myCart[i].name == stock.getName(products, id)) {
                iValve = true;
            }
        }
        if (iValve == true) {
            console.log('Se encuentra repetido');
            /*
            Validar stock nuevamente y actualizar quantity en my cart AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
            */
           console.log(cart.getQuantityById(id));
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
            console.log('No se encuentra repetido');
            stock.pullToMyCart(products, id, q);
            console.log('myCart se ha actualizado');
            if (q > 1) {
                alert('Se han agregado '+ q +' articulos a tu carrito satisfactoriamente');
            } else {
                alert('Se ha agregado '+ q +' articulo a tu carrito satisfactoriamente');
            }
            console.log(myCart);
        }

    }
}

function showingCart(items) {
    console.clear();
    console.log(myCart);
    let message = '';
    if (items.length != 0) {
        for (let i = 0; i < items.length; i++) {
            message += (i+1) + ") " + items[i].name + " (COP "+ items[i].price + ") \t\t Cantidad: "+ items[i].quantity +" \t\t Total: COP"+ (items[i].price * items[i].quantity) +"\n";
        }
    } else {
        message = 'Carrito Vacio \n';
    }
    let totalPrice = 0;
    for (const element of items) {
        totalPrice += element.price * element.quantity;
    }
    let cont = true;
    while(cont == true){
        let option = prompt("Carrito de compra\n\n"+message+"\nTotal a pagar: COP "+ totalPrice +"\n\n(8 Comprar \n(9 Volver");
        switch (option) {
            case "8":
                purchase();
                cont = false;
                break;
            case "9":
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
}

app();

