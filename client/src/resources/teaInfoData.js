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

export const teaProductCategories = [
    {
        id: 1,
        type: "all",
        image:"/images/all-tea.jfif",
        bannerColor: "skyblue",
        description: "All teas!",
        items: ["loose leaf","tea mixes", "matcha"],
    },
    {
        id: 2,
        type: "loose leaf",
        image:"/images/hero-tealeaves.jfif",
        bannerColor: "lavender",
        description: "Classic tea. Measure and steep for the perfect cup!",
        items: ["black tea", "green tea", "white tea", "red tea", "oolong tea","herbal tea"],
    },
    {
        id: 3,
        type: "tea mixes",
        image:"/images/party-pitcher.jfif",
        bannerColor: "palevioletred",
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
