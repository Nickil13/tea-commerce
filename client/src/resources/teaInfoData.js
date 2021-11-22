export const teaInfo = [
    {
        id: 1,
        type: "black",
        image: "/images/chai.jpg",
        caffeine: "high",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione laboriosam inventore temporibus id et qui numquam optio iusto eveniet! Deserunt consectetur hic sit dolorem voluptates ut. Reiciendis, corrupti dignissimos?",
        brewingInstructions: [
            {type: "temperature", text: "heat 375mL of 80ºC water"},
            {type: "duration", text: "steep tea for 5 minutes"}
        ],
    },
    {
        id: 2,
        type: "green",
        image: "/images/green-tea.jfif",
        caffeine: "medium",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione laboriosam inventore temporibus id et qui numquam optio iusto eveniet! Deserunt consectetur hic sit dolorem voluptates ut.",
        brewingInstructions: [
            {type: "temperature", text: "heat 375mL of 80ºC water"},
            {type: "duration", text: "steep tea for 4 minutes"}
        ],
    }
    ,
    {
        id: 3,
        type: "red",
        image: "/images/tea-rooibos.jfif",
        caffeine: "caffeine-free",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt consectetur hic sit dolorem voluptates ut. Reiciendis, corrupti dignissimos?",
        brewingInstructions: [
            {type: "temperature", text: "heat 375mL of 80ºC water"},
            {type: "duration", text: "steep tea for 5 minutes"}
        ],
    },
    {
        id: 4,
        type: "white",
        image: "/images/white-tea.jfif",
        caffeine: "medium",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione laboriosam inventore temporibus id et qui numquam optio iusto eveniet! Deserunt consectetur hic sit dolorem voluptates ut. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        brewingInstructions: [
            {type: "temperature", text: "heat 375mL of 75ºC water"},
            {type: "duration", text: "steep tea for 4 minutes"}
        ],
    },
    {
        id: 5,
        type: "herbal",
        image: "/images/herbal-tea.jfif",
        caffeine: "caffeine-free",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, corrupti dignissimos?Odit ratione laboriosam inventore temporibus id et qui numquam optio iusto eveniet! Deserunt consectetur hic sit dolorem voluptates ut. Reiciendis, corrupti dignissimos?",
        brewingInstructions: [
            {type: "temperature", text: "heat 375mL of 75ºC water"},
            {type: "duration", text: "steep tea for 4 minutes"}
        ],
    },
    {
        id: 6,
        type: "oolong",
        image: "/images/oolong-tea.jfif",
        caffeine: "high",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione laboriosam inventore temporibus id et qui numquam optio iusto eveniet! ",
        brewingInstructions: [
            {type: "temperature", text: "heat 375mL of 75ºC water"},
            {type: "duration", text: "steep tea for 4 minutes"}
        ],
    },
    {
        id: 7,
        type: "matcha",
        image: "/images/matcha-banner.jfif",
        caffeine: "high",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione laboriosam inventore temporibus id et qui numquam optio iusto eveniet! ",
        brewingInstructions: [
            {type: "measure", text: "2 tbsp of matcha"},
            {type: "temperature", text: "heat 375mL of 75ºC water"},
            {type: "mix", text: "mix matcha with hot water using a matcha whisk"}
        ],
    },
    {
        id: 8,
        type: "mixes",
        image: "/images/teaparty.jfif",
        caffeine: "varies",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione laboriosam inventore temporibus id et qui numquam optio iusto eveniet! ",
        brewingInstructions: [
            {type: "temperature", text: "heat 375mL of 75ºC water"},
            {type: "mix", text: "add mix to hot water and stir until dissolved"},
            {type: "add", ingredient: "ice", text: "add 2 cups of ice"},
            {type: "add", ingredient: "fruit", text: "add fresh fruit or alcohol"}
        ],
    }

]
export const teaProductTypes = [
    {
        id: 1,
        type: "black tea",
        image:"/images/hero-loosetea.jfif",
        bannerColor: "#b2d2f7",
        description: "Black tea consists of tea leaves have been fully oxidized, resulting in a darker colour. It has a strong flavour and is high in caffeine.",
    },
    {
        id: 2,
        type: "green tea",
        image:"/images/green-tea.jfif",
        bannerColor: "#d9d980",
        description: "Green tea leaves are steamed or fired in order to halt the oxidation process. They have a light flavour and colour.",
    },
    {
        id: 3,
        type: "white tea",
        image:"/images/white-tea.jfif",
        bannerColor: "#b6e0c1",
        description: "Delicately flavoured tea relatively low in caffeine.",
    },
    {
        id: 4,
        type: "red tea",
        image:"/images/tea-rooibos.jfif",
        bannerColor: "#fcbfae",
        description: "A caffeine-free herbal tea similar to black tea but with a natural sweetness and light flavour.",
    },
    {
        id: 5,
        type: "oolong tea",
        image:"/images/oolong-tea.jfif",
        bannerColor: "#d3edb9",
        description: "Partially oxidized tea, experty crafted and rolled to create unique flavours.",
    },
    {
        id: 6,
        type: "herbal tea",
        image:"/images/herbal-tea.jfif",
        bannerColor: "#fae8be",
        description: "Herbal infusions made with a variety of herbs, fruits and spices.",
    },
    {
        id: 7,
        type: "classic mixes",
        image:"/images/classic-mixes.jfif",
        bannerColor: "#ffccd5",
        description: "Our classic mixes, from the fruity blueberry black tea to our creamy chai.",
    },
    {
        id: 8,
        type: "cocktail mixes",
        image:"/images/cocktail-mixes2.jfif",
        bannerColor: "#e4d0f7",
        description: "Mixes to remind you of your favourite cocktails.",
    },
    {
        id: 9,
        type: "ceremonial matcha",
        image:"/images/ceremonial-matcha.jfif",
        bannerColor: "#8FBC8F",
        description: "Pure, natural matcha.",
    },
    {
        id: 10,
        type: "flavoured matcha",
        image:"/images/merry-matcha.jfif",
        bannerColor: "#DEB887",
        description: "Classical matcha is perfect with fruity flavours, spices and chocolate. Try our Maple Matcha and Gingerbread Matcha!",
    },
]
export const teaProductCategories = [
    {
        id: 1,
        type: "all",
        image:"/images/all-tea.jfif",
        bannerColor: "#a4e3fc",
        description: "All teas!",
        items: ["loose leaf","tea mixes", "matcha"],
    },
    {
        id: 2,
        type: "loose leaf",
        image:"/images/hero-tealeaves.jfif",
        bannerColor: "#E6E6FA",
        description: "Classic tea. Measure and steep for the perfect cup!",
        items: ["black tea", "green tea", "white tea", "red tea", "oolong tea","herbal tea"],
    },
    {
        id: 3,
        type: "tea mixes",
        image:"/images/cocktails-2.jfif",
        bannerColor: "#fcb3cb",
        description: "Sweet powdered tea blends perfect for tea lovers who are on the go or for brewing large quantities of tea.",
        items: ["classic mixes","cocktail mixes"],
    },
    {
        id: 4,
        type: "matcha",
        image:"/images/matcha-banner.jfif",
        bannerColor: "#6FC597",
        description: "Ground green tea known for its health benefits. Energize your day with our ceremonial blend or one of our flavoured matchas.",
        items: ["ceremonial matcha","flavoured matcha"],
    }
]


/* Tea info reference:
https://www.artfultea.com/tea-wisdom-1/types-of-tea-a-comprehensive-guide
 */