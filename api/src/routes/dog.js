const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize")
const { Dog, Temperament } = require("../db")
const axios = require("axios")

let config = {
    "headers": {
        "x-api-key": "661b8e09-1474-4ca0-8723-05c6e10693d6",
    }
}
router.get("/life_span", async (req, res, next) => {
    let life_span = req.query.life_span;
    let dog
    let response = await axios.get("https://api.thedogapi.com/v1/breeds?api_key=661b8e09-1474-4ca0-8723-05c6e10693d6")
    dog = response.data
    res.send(dog)

    let vidass = dog.map()
})

router.get("/", async (req, res, next) => {
    let name = req.query.name;
    let dogApi
    let dogDb
    if (name) {
        dogApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?api_key=661b8e09-1474-4ca0-8723-05c6e10693d6&name=${name}`)
        dogDb = await Dog.findAll({
            where: {
                name:{ [Op.iLike]: "%" + name + "%" }
            },
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {attributes: []}
            },
            order: [
                ["name", "ASC"]
            ],
        })
    } else {
        dogApi = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=661b8e09-1474-4ca0-8723-05c6e10693d6')
        dogDb = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {attributes: []}
            },
        })
    }
    let filteredDogApi = []
    for await (let dog of dogApi.data) {
        let image
        if (name) {
            if (dog.reference_image_id) {
                image = await axios.get("https://api.thedogapi.com/v1/images/" + dog.reference_image_id)
                image = image.data.url
            } else {
                image = null
            }
        } else {
            image = dog.image.url
        }
        let dogjson = {
            id: dog.id,
            name: dog.name,
            weight: dog.weight.metric,
            height: dog.height.metric,
            bred_for: dog.bred_for,
            life_span: dog.life_span,
            image: image,
           temperament: dog.temperament ? dog.temperament : null,
        }
        filteredDogApi.push(dogjson)
    }
    console.log(filteredDogApi)
    let allDog = [...filteredDogApi, ...dogDb]
    res.status(200).send(allDog)
})
router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        let dog
        if (typeof id === "string" && id.length > 8) {
            dog = await Dog.findByPk(id, {include: {
                model: Temperament,
                attributes: ["name"],
                through: {attributes: []}
            }})
            res.send(dog)
        } else {
            response = await axios.get('https://api.thedogapi.com/v1/breeds/' + id)
            dog = response.data
            image = await axios.get("https://api.thedogapi.com/v1/images/" + dog.reference_image_id)
            dog["image"] = image.data.url
        }
        return res.send(dog)
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { name, weight, height, life_span, image, temperament } = req.body;
        if(!name || !weight || !height || !life_span || !image || !temperament){
            return "falta informacion"
        }
        const newDog = await Dog.create({
            name,
            weight,
            height,
            life_span,
            image,
        })
        let temperamento = await Temperament.findAll({
            where: {
                name: temperament
            }
        })
        newDog.addTemperament(temperamento)
        res.status(200).send("se creo el juego")
    } catch (error) {
        next(console.log("error en la ruta del post"))
    }
})






module.exports = router;