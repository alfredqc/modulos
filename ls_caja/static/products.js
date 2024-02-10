// crear un fichero product.js
class Product {
    constructor(nombre, price) {
      this.nombre = nombre;
      this.price = price;
    }
  
    getPrice() {
      return this.price
    }
  }
  
  export default Product;