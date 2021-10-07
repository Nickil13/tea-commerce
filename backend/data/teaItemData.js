const teaList = [
    {
        name: "earl gray",
        category: "loose leaf",
        productType:"black tea",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/earl-grey.jpg",
        price: 9.25,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "chai",
        category: "loose leaf",
        productType:"black tea",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/chai.jpg",
        price: 10.00,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "orange pekoe",
        category: "loose leaf",
        productType:"black tea",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/orange-pekoe.jpg",
        price: 9.50,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "jasmine",
        category: "loose leaf",
        productType:"green tea",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/jasmine.jpg",
        price: 12.00,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "caramel rooibos",
        category: "loose leaf",
        productType:"red tea",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/caramel-rooibos.jpg",
        price: 10.50,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "classic matcha",
        category: "matcha",
        productType:"ceremonial matcha",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/matcha.jpg",
        price: 12.00,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "pink iced tea",
        category: "tea mixes",
        productType:"classic mixes",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/pink-iced-tea.jpg",
        price: 8.50,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "orange dream",
        category: "loose leaf",
        productType:"black tea",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/orange-dream.jpg",
        price: 9.00,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "chocolate oolong",
        category: "loose leaf",
        productType:"oolong tea",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/chocolate-oolong.jpg",
        price: 10.25,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "white rose",
        category: "loose leaf",
        productType:"white tea",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/white-rose.jpg",
        price: 10.50,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "chamomile",
        category: "loose leaf",
        productType:"herbal tea",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/chamomile.jpg",
        price: 9.80,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "maple",
        category: "matcha",
        productType:"flavoured matcha",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/matcha-2.jfif",
        flavourImage: "/images/maple.jfif",
        price: 12.50,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "strawberry",
        category: "matcha",
        productType:"flavoured matcha",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/matcha-2.jfif",
        flavourImage: "/images/strawberries.jfif",
        price: 12.50,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "peach",
        category: "matcha",
        productType:"flavoured matcha",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/matcha-2.jfif",
        flavourImage: "/images/peaches.jfif",
        price: 12.50,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "blueberry",
        category: "matcha",
        productType:"flavoured matcha",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/matcha-2.jfif",
        flavourImage: "/images/blueberry.jfif",
        price: 12.50,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "chocolate",
        category: "matcha",
        productType:"flavoured matcha",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/matcha-2.jfif",
        flavourImage: "/images/chocolate.jfif",
        price: 12.50,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "white chocolate",
        category: "matcha",
        productType:"flavoured matcha",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/matcha-2.jfif",
        flavourImage: "/images/white-chocolate.jfif",
        price: 12.50,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "apple",
        category: "loose leaf",
        productType:"herbal tea",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/apple-tea.jfif",
        price: 9.80,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "hibiscus",
        category: "loose leaf",
        productType:"herbal tea",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/hibiscus-tea.jfif",
        price: 9.80,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "sleepy",
        category: "loose leaf",
        productType:"herbal tea",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/sleepy-tea.jfif",
        price: 9.80,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1

    },
    {
        name: "white tea margarita",
        category: "tea mixes",
        productType:"cocktail mixes",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/white-margarita.jfif",
        price: 9.50,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1
    },
    {
        name: "strawberry green tea daiquiri",
        category: "tea mixes",
        productType:"cocktail mixes",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/green-daiquiri.jfif",
        price: "9.50",
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1
    },
    {
        name: "irish cream tea",
        category: "tea mixes",
        productType:"cocktail mixes",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/irish-cream-tea.jfif",
        price: 9.50,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1
    },
    {
        name: "blue dragonfruit",
        category: "tea mixes",
        productType:"classic mixes",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/blue-dragonfruit.jfif",
        price: 9.50,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1
    },
    {
        name: "blueberry black tea",
        category: "tea mixes",
        productType:"classic mixes",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/blueberry-black-tea.jfif",
        price: 9.50,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1
    },
    {
        name: "creamy chai",
        category: "tea mixes",
        productType:"classic mixes",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eaque consequuntur, accusamus ab, ex, autem alias ullam itaque doloremque quisquam hic ipsa deleniti. Temporibus, voluptatum!",
        image: "/images/chai-mix.jfif",
        price: 9.50,
        ingredients: ["apple","orange","banana","cinnamon","tea"],
        countInStock: 1
    }
]
module.exports = teaList;