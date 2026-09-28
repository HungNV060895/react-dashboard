import { preview } from "vite"

const products = [
    { name: "Laptop", price: 1500 },
    { name: "Mouse", price: 200 },
    { name: "Keyboard", price: 500 },
]


const totalPrice = products.reduce((acc, currentValu) => {
    return acc + currentValu.price;
}, 0)


const filtedProduct = products.filter((item) => item.price > 500)


const map = products.map((item) => item.name)