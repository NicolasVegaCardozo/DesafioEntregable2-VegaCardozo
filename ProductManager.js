import { promises as fs } from 'fs'

class ProductManager {
    constructor() {
        this.path = './productos.txt'
    }

    addProduct = async (product) => {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        if (products.some(prod => prod.code === product.code)) {
            console.log(`Ya existe un producto con ese código: ${product.code}`)
            return
        }

        if (product.title === "" || product.description === "" || product.price === "" || product.thumbnail === "" || product.code === "" || product.stock < 0) {
            console.log("Algunos campos están vacíos, por favor complete todos los campos")
            return
        }

        else {
            products.push(product)
        }

        await fs.writeFile(this.path, JSON.stringify(products))
    }

    getProducts = async () => {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        console.log(products)
    }

    getProductById = async (id) => {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const product = products.find(prod => prod.id === id)

        if (product) {
            console.log(product)
        } else {
            console.log(`ID de producto: ${id} No existe este producto`)
        }
    }

    updateProduct = async (id, { title, description, price, thumbnail, code, stock }) => {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const index = products.findIndex(prod => prod.id === id)

        if (index !== -1) {
            const product = products[index]
            product.title = title ?? product.title
            product.description = description ?? product.description
            product.price = price ?? product.price
            product.thumbnail = thumbnail ?? product.thumbnail
            product.code = code ?? product.code
            product.stock = stock ?? product.stock

            await fs.writeFile(this.path, JSON.stringify(products))
        }

        else {
            console.log(`ID de producto: ${id} producto no encontrado`)
        }
    }


    deleteProduct = async (id) => {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prods = products.filter(prod => prod.id != id)

        await fs.writeFile(this.path, JSON.stringify(prods))
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.incrementID()
    }

    static incrementID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}

const product1 = new Product("Producto 1", "Este es un producto 1", 200, "Image 1", "abc123", 25)
const product2 = new Product("Producto 2", "Este es un producto 2", 400, "Image 2", "def456", 50)

const productManager = new ProductManager()

productManager.getProducts()