import express from "express";
import fs from "fs";

const router = express.Router();

type Category = {
  id: number;
  name: string;
  color: number;
};

router.get("/", (req, res) => {
  const categories: Array<Category> = JSON.parse(
    fs.readFileSync("./src/data/category.json", "utf-8")
  );
  res.json(categories);
});

router.get("/:id", (req, res) => {
  const categories: Array<Category> = JSON.parse(
    fs.readFileSync("./src/data/category.json", "utf-8")
  );
  const category: Category | undefined = categories.find(
    (category: Category) => category.id.toString() === req.params.id
  );
  res.json(category);
});

router.post("/", (req, res) => {
  const category: Category = req.body;
  const url: string = "./src/data/category.json";
  let categories: Array<Category> = JSON.parse(
    fs.readFileSync("./src/data/category.json", "utf-8")
  );

  categories = [...categories, category];
  fs.writeFile(url, JSON.stringify(categories), (e) => {
    console.error(e);
  });

  res.send("done");
});

router.put("/:id", (req, res) => {
  const newCategory: Category = req.body;
  const id: number = parseInt(req.params.id);
  const url: string = "./src/data/category.json";
  let categories: Array<Category> = JSON.parse(
    fs.readFileSync("./src/data/category.json", "utf-8")
  );

  categories = categories.map((category: Category) => {
    return category.id === id ? newCategory : category;
  });
  fs.writeFile(url, JSON.stringify(categories), (e) => {
    console.error(e);
  });
  res.send("done");
});

router.patch("/:id", (req, res) => {
  const newData: Category = req.body;
  const id: number = parseInt(req.params.id);
  const url: string = "./src/data/category.json";
  let categories: Array<Category> = JSON.parse(
    fs.readFileSync("./src/data/category.json", "utf-8")
  );

  categories = categories.map((oldCategory: Category) => {
    return oldCategory.id === id ? { ...oldCategory, ...newData } : oldCategory;
  });

  fs.writeFile(url, JSON.stringify(categories), (e) => {});

  res.send("done");
});

router.delete("/:id", (req, res) => {
  const id: number = parseInt(req.params.id);
  let categories: Array<Category> = JSON.parse(
    fs.readFileSync("./src/data/category.json", "utf-8")
  );
  const url: string = "./src/data/event.json";
  categories = categories.filter((category: Category) => category.id !== id);
  fs.writeFile(url, JSON.stringify(categories), (e) => {});

  res.send("done");
});

export default router;
