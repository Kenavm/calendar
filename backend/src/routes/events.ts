import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
const router = express.Router();

router.use(bodyParser.json());

type Event = {
  id: number;
  name: string;
  date: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
  category: number | string;
};

router.get("/", (req, res) => {
  let events = JSON.parse(fs.readFileSync("./src/data/event.json", "utf-8"));

  if (
    req.query["from"] !== undefined &&
    req.query["to"] === undefined &&
    req.query["category"] === undefined
  ) {
    const fromQuery: string = req.query["from"] as string;
    const dateFrom: Date = createDateToCompare(fromQuery) as Date;
    if (req.query["from"] !== "now") {
      events = events.filter(
        (event: Event) =>
          new Date(event.date.year, event.date.month - 1, event.date.day + 1) >=
          dateFrom
      );
    } else {
      events = events.filter(
        (event: Event) =>
          new Date(event.date.year, event.date.month - 1, event.date.day + 1) >
          new Date()
      );
    }
  }

  if (req.query["from"] !== undefined && req.query["to"] !== undefined) {
    const fromQuery: string = req.query["from"] as string;
    const dateFrom = createDateToCompare(fromQuery);
    const toQuery: string = req.query["to"] as string;
    const dateTo = createDateToCompare(toQuery);
    if (req.query["from"] !== "now") {
      events = events.filter(
        (event: Event) =>
          new Date(event.date.year, event.date.month - 1, event.date.day + 1) >
            dateFrom &&
          new Date(event.date.year, event.date.month - 1, event.date.day + 1) <
            dateTo
      );
    } else {
      events = events.filter(
        (event: Event) =>
          new Date(event.date.year, event.date.month - 1, event.date.day + 1) >
            new Date() &&
          new Date(event.date.year, event.date.month - 1, event.date.day + 1) <
            dateTo
      );
    }
  }
  if (req.query["category"] !== undefined && req.query["from"] !== undefined) {
    const fromQuery: string = req.query["from"] as string;
    const dateFrom: Date = createDateToCompare(fromQuery) as Date;

    let categoryQuery: string = req.query["category"] as string;
    if (categoryQuery === "work") {
      events = events.filter(
        (event: Event) =>
          event.category === 2 &&
          new Date(event.date.year, event.date.month - 1, event.date.day + 1) >=
            dateFrom
      );
    } else if (categoryQuery === "personal") {
      events = events.filter(
        (event: Event) =>
          event.category === 3 &&
          new Date(event.date.year, event.date.month - 1, event.date.day + 1) >=
            dateFrom
      );
    } else {
      events = events.filter(
        (event: Event) =>
          event.category === 1 &&
          new Date(event.date.year, event.date.month - 1, event.date.day + 1) >=
            dateFrom
      );
    }
  }

  res.json(events);
});

const createDateToCompare = (query: string) => {
  const year: string = query.substring(0, 4);
  const month: string = query.split("-")[1];
  const day: string = query.substring(query.lastIndexOf("-") + 1, query.length);
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day) + 1);
};

router.get("/:id", (req, res) => {
  const events = JSON.parse(fs.readFileSync("./src/data/event.json", "utf-8"));
  const event = events.find(
    (event: Event) => event.id.toString() === req.params.id
  );
  res.json(event);
});

router.post("/", (req, res) => {
  const event: Event = req.body;
  const url: string = "./src/data/event.json";
  let events: Array<Event> = JSON.parse(
    fs.readFileSync("./src/data/event.json", "utf-8")
  );
    if(event.category === "work") {
      event.category = 2;
    } else if (event.category === "personal") {
      event.category = 3;
    } else {
      event.category = 1;
    }
  events = [...events, event];
  fs.writeFile(url, JSON.stringify(events), (e) => {
    console.error(e);
  });

  res.send("done");
});

router.put("/:id", (req, res) => {
  const newEvent: Event = req.body;
  const id: number = parseInt(req.params.id);
  const url: string = "./src/data/event.json";
  let events: Array<Event> = JSON.parse(
    fs.readFileSync("./src/data/event.json", "utf-8")
  );

  events = events.map((event: Event) => {
    return event.id === id ? newEvent : event;
  });
  fs.writeFile(url, JSON.stringify(events), (e) => {
    console.error(e);
  });
  res.send("done");
});

router.patch("/:id", (req, res) => {
  const newData: Event = req.body;
  const id: number = parseInt(req.params.id);
  const url: string = "./src/data/event.json";
  let events: Array<Event> = JSON.parse(
    fs.readFileSync("./src/data/event.json", "utf-8")
  );

  events = events.map((oldEvent: Event) => {
    return oldEvent.id === id ? { ...oldEvent, ...newData } : oldEvent;
  });

  fs.writeFile(url, JSON.stringify(events), (e) => {});

  res.send("done");
});

router.delete("/:id", (req, res) => {
  const id: number = parseInt(req.params.id);
  let events: Array<Event> = JSON.parse(
    fs.readFileSync("./src/data/event.json", "utf-8")
  );
  const url: string = "./src/data/event.json";
  events = events.filter((event: Event) => event.id !== id);
  fs.writeFile(url, JSON.stringify(events), (e) => {});

  res.send("done");
});

export default router;
