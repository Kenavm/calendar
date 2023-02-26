import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
const router = express.Router();

router.use(bodyParser.json());

router.get("/", (req, res) => {
  let events = JSON.parse(fs.readFileSync("./src/data/event.json", "utf-8"));

  const fromQuery: any = req.query["from"];
  const dateFrom = createDateToCompare(fromQuery);
  const toQuery: any = req.query["to"];
  const dateTo = createDateToCompare(toQuery);

  if (req.query["from"] !== undefined && req.query["to"] === undefined) {
    if (req.query["from"] !== "now") {
      events = events.filter(
        (event: any) =>
          new Date(event.date.year, event.date.month - 1, event.date.day + 1) <=
          dateFrom
      );
    } else {
      events = events.filter(
        (event: any) =>
          new Date(event.date.year, event.date.month - 1, event.date.day + 1) >
          new Date()
      );
    }
  }

  if (req.query["from"] !== undefined && req.query["to"] !== undefined) {
    if (req.query["from"] !== "now") {
      events = events.filter(
        (event: any) =>
          new Date(event.date.year, event.date.month - 1, event.date.day + 1) >
            dateFrom &&
          new Date(event.date.year, event.date.month - 1, event.date.day + 1) <
            dateTo
      );
    } else {
      events = events.filter(
        (event: any) =>
          new Date(event.date.year, event.date.month - 1, event.date.day + 1) >
            new Date() &&
          new Date(event.date.year, event.date.month - 1, event.date.day + 1) <
            dateTo
      );
    }
  }

  // /api/events?category=work&from=2023-03-01

  res.json(events);
});

const createDateToCompare = (query: string) => {
  const year: any = query.substring(0, 4);
  const month: any = query.split("-")[1];
  const day: any = query.substring(query.lastIndexOf("-") + 1, query.length);
  return new Date(year, parseInt(month) - 1, parseInt(day) + 1);
};

router.get("/:id", (req, res) => {
  const events = JSON.parse(fs.readFileSync("./src/data/event.json", "utf-8"));
  const event = events.find((e: any) => e.id.toString() === req.params.id);
  res.json(event);
});

router.post("/", (req, res) => {
  const event = req.body;
  const url = "./src/data/event.json";
  let events = JSON.parse(fs.readFileSync("./src/data/event.json", "utf-8"));

  events.push(event);
  fs.writeFile(url, JSON.stringify(events), (e) => {
    console.error(e);
  });

  res.send("done");
});

router.put("/:id", (req, res) => {
  const newEvent = req.body;
  const id = parseInt(req.params.id);
  const url = "./src/data/event.json";
  let events = JSON.parse(fs.readFileSync("./src/data/event.json", "utf-8"));

  events = events.map((e: any) => {
    return e.id === id ? newEvent : e;
  });
  fs.writeFile(url, JSON.stringify(events), (e) => {
    console.error(e);
  });
  res.send("done");
});

router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newData = req.body;
  const url = "./src/data/event.json";
  let events = JSON.parse(fs.readFileSync("./src/data/event.json", "utf-8"));
  
  events = events.map((oldEvent: any) => {
    return oldEvent.id === id
      ? { ...oldEvent, ...newData }
      : oldEvent;
  });

  fs.writeFile(url, JSON.stringify(events), (e) => {});

  res.send("done");
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  let events = JSON.parse(fs.readFileSync("./src/data/event.json", "utf-8"));
  const url = "./src/data/event.json";
  events = events.filter((e: any) => e.id.toString() !== id);
  fs.writeFile(url, JSON.stringify(events), (e) => {});

  res.send("done");
});

export default router;
