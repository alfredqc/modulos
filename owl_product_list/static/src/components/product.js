/**@odoo-module**/

import { Component, onWillStart, useState, useRef } from "@odoo/owl";

export class Product extends Component{
    setup(){
        super.setup()
        console.log("Componente Hijo instaciado")
    }
    delProduct(ev){
        /** pasa el ID del producto al método del PRoduct del Componente Padre */
        this.props.onDelete(ev, this.props.id)
    }
}
Product.template = "owl_product_list.Product"