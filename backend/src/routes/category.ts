import express from 'express'
import fs from 'fs'

const router = express.Router();

router.get("/", (req, res) => {
    const categories =  JSON.parse(fs.readFileSync("./src/data/category.json", "utf-8"));
    res.json(categories)
})

router.get("/:id", (req, res) => {
    const categories =  JSON.parse(fs.readFileSync("./src/data/category.json", "utf-8"));
    const category = categories.find((e:any) => e.id.toString() === req.params.id)
    res.json(category)
})

router.post("/", (req, res) => {
 
})

router.put("/:id", (req, res) => {
 
})

router.patch("/:id", (req, res) => {
 
})


router.delete("/:id", (req, res) => {
 
})

export default router