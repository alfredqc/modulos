
import {name, greeting} from './module1.js';
import Product from './products.js'

greeting();
console.log(name);

const prod = new Product("Computer ASUS", 1295.59);
//console.log('Producto: ${prod.nombre} , Precio: ${prod.getPrice()}');
console.log(`Producto: ${prod.nombre}  , Precio:  ${prod.getPrice()}`);
