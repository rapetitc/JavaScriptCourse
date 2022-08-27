console.clear();
const products = [
    {id: 1, name: "Harina", price: 3000, stock: 19},
    {id: 2, name: "Aceite", price: 7000, stock: 24},
    {id: 3, name: "Mantequilla", price: 1500, stock: 53},
    {id: 4, name: "Huevo", price: 5000, stock: 76},
    {id: 5, name: "Leche", price: 5000, stock: 7}
];
const myCart = [];

class MyCart{
    constructor(id, name, price, quantity){
        this.id =  id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

function app(){
    /* Menu */
    let cont = true;
    while(cont == true){
        let option = prompt('Bienvenido a la tienda online! \n\nMenu:\n\t1) Ver productos\n\t2) Ver Carrito\n\n\t9) Salir');
        switch (option) {
            case "1":
                prod();
                break;
            case "2":
                cart(myCart);
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

const stock = {
    searchById : (items, id) => {
        //console.log(items[id+1].name);
        return items[id].name;
    },
    alertIt : (items) => {
        let message = '';
        for (let i = 0; i < items.length; i++) {
            message += items[i].id + ") " + items[i].name + " (COP "+ items[i].price + ") \t\t Disponibles: "+ items[i].stock +"\n";
        }
        return message;
    },
    alertName : (items, id) => {
        let message = items[id].name;
        return message;
    },
    //Revisa la cantidad disponible de un articulo
    check : (items, id, quantity) => {
        let valve;
        if (quantity > items[id].stock) {
            valve = false;
        } else {
            valve = true;
        }
        return valve;
    }
}

function prod() {
    // Mostrar los productos 
    let cont = true;
    while(cont == true){
        let seleccionados = prompt('Agrega tus productos\n\n'+ stock.alertIt(products) +'\n\t9) Atras');
        if (seleccionados != "1" && seleccionados != "2" && seleccionados != "3" && seleccionados != "4" && seleccionados != "5" && seleccionados != "9") {
            alert("Escoje una opcion valida");
        } else if(seleccionados == "9"){
            cont = false;
        } else {
            addingToCart(parseInt(seleccionados));
        }
    }
}

function addingToCart(id){
    id = id - 1;
    let q = 0;
    q = parseInt(prompt('Cuantos articulos desearias agregar de ' + stock.alertName(products,id)));
    //Validar Stock antes de agregar un articulo
    while (q <= 0 || stock.check(products, id, q) == false || isNaN(q) == true) {
        if (q <= 0 || isNaN(q) == true) {
            alert('Escoge un valor mayor o igual uno');
        };
        if (stock.check(products, id, q) == false) {
            alert('Lo sentimos, no poseemos tanto stock para tus requisitos, escoge un valor menor');
        }
        q = parseInt(prompt('Cuantos articulos desearias agregar de ' + stock.alertName(products,id)));
    }

    //Agregar al carro
    if (myCart.length == 0) {
        console.clear();
        console.log("Carrito vacio y procediendo a agregar un item");
        const element = new MyCart(products[id].id, products[id].name, products[id].price, q);
        myCart.push(element);
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
            if (myCart[i].name == stock.searchById(products, id)) {
                iValve = true;
            }
        }
        if (iValve == true) {
            console.log('Se encuentra repetido');
            /*
            Validar stock nuevamente y actualizar quantity en my cart
            */
            while (q <= 0 || stock.check(products, id, (myCart[id].quantity + q)) == false || isNaN(q) == true) {
                if (q <= 0 || isNaN(q) == true) {
                    alert('Escoge un valor mayor o igual uno');
                };
                if (stock.check(products, id, q) == false) {
                    alert('Lo sentimos, no poseemos tanto stock para tus requisitos, escoge un valor menor');
                }
                q = parseInt(prompt('Cuantos articulos desearias agregar de ' + stock.alertName(products,id)));
            }
            myCart[id].quantity += q;
            if (q > 1) {
                alert('Se han agregado '+ q +' articulos a tu carrito satisfactoriamente, para un total de '+ myCart[id].quantity +' articulos agregados');
            } else {
                alert('Se ha agregado '+ q +' articulo a tu carrito satisfactoriamente, para un total de '+ myCart[id].quantity +' articulos agregados');
            }   
        } else {
            console.log('No se encuentra repetido');
            myCart.push(new MyCart(products[id].id, products[id].name, products[id].price, q));
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

function cart(items) {
    console.clear();
    console.log(myCart);
    let message = '';
    if (items.length != 0) {
        for (let i = 0; i < items.length; i++) {
            message += items[i].id + ") " + items[i].name + " (COP "+ items[i].price + ") \t\t Cantidad: "+ items[i].quantity +" \t\t Total: COP"+ (items[i].price * items[i].quantity) +"\n";
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

