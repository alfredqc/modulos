/**@odoo-module**/

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks"

import { Component, onWillStart, useState, useRef } from "@odoo/owl";
import { Product } from "./product";

console.log("Owl cargado y listo")

export class ProductList extends Component{

    setup(){
        super.setup()
        this.rpc = useService("rpc") // usando servicio RPC
        this.inputRef = useRef("input") // declaramos el campo de texto INPUT
        this.orm = useService("orm") // usando servicio ORM que tiene la misma función de PRC
        this.products = useState([])
        this.notify = useService("notification")
        this.next_id = 10000
        console.log("Hello from Product List")
        onWillStart(async()=>{
            const domain_products = []
            const products_fields = ["name", "list_price", "code", "detailed_type"]
            const products = await this.orm.searchRead("product.product", domain_products, products_fields, {limit:50} )
            products.forEach(product => {
                this.products.push(product)
            });
            console.log("Products: ", this.products)
            /** el siguiente fragmento solo se muestra en consola de Javascript con fines demostrativos */
            /*** ================================================== */
            const partners = await this.orm.call(
                "res.partner",
                "search_read",
                [],
                {
                    "fields": ["name", "email", "company_type"],
                    "limit": 30
                },
            );
            console.log("Contactos: ", partners)
            /*** ================================================== */
        })
    }
    /** Método para eliminar elemento */
    delProduct(ev, product_id){
        ev.stopPropagation()
        // console.log("Borrando", ev)
        const index = this.products.findIndex(
            p=>p.id === product_id
            // p=>p.id === Number(ev.target.id) // ESsta línea es importante si no se trabaja con Subcomponentes.
        );
        // función SPLICE ADICIONA, REEMPLAZA O BORRA ELEMENTOS a un array.
        const del_item = this.products.splice(index, 1); // borra un elemento del INDICE, 1 elemento

        // console.log(typeof(this.products[0].id, "zzzzzz", typeof(ev.target.id)))
        // console.log(`Borrando ${ev.target.id} ${index}`)
        // console.log(`Producto Borrado ${this.products[0].name}`)
        const msg = "Elemento borrado..."
        this.notify.add(msg, {
            title: `Borrado: ${this.products[0].name} - [${this.products[0].code}]`,
            type: "danger", // tiene las siguientes opciones INFO,WARNING, DANGER, SUCCES se deben escribir en minúsculas
            sticky: true, // Este parametro espera que cierre el usuario cierre el mensaje.
            className: "notificaciones", // tambien se puede modificar en archivo css
        })
    }
    addProduct(ev){
        ev.stopPropagation()
        console.log(this.inputRef.el.value)
        const [name, price] = this.inputRef.el.value.split(" ")
        this.products.push({"id": this.next_id, "name": name, "list_price": Number(price)})
        this.next_id++
    }
}

/** Llama al template creado static/src/components/product_list.xml */
ProductList.template="owl_product_list.ProductList"

/** Agregamos los subcomponentes */
/** en este caso solo tenemos un subcomponente PRODUCT de static/src/components.xml */
ProductList.components = {Product}

/** Registra el tag de la actions  creada en views/actions.xml, con el objeto creado*/
registry.category("actions").add("owl_product_list", ProductList)
