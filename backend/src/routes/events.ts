import express from 'express'
import fs from 'fs'

const router = express.Router();

router.get("/", (req, res) => {
    const events =  JSON.parse(fs.readFileSync("./src/data/event.json", "utf-8"));

    const query = req.query.from;

    if(query === req.query["from"]) {
        events.map(events.filter((event:any) => {
            if(event.date.month<10) {
                const date = `${event.date.year.toString()}-${event.date.month.toString().padStart(2, '0')}-${event.date.day.toString()}`
                
            }
           
        }))
    }

   

    res.json(events)
})

router.get("/:id", (req, res) => {
    const events =  JSON.parse(fs.readFileSync("./src/data/event.json", "utf-8"));
    const event = events.find((e:any) => e.id.toString() === req.params.id)
    res.json(event)
})

router.post("/", (req, res) => {
 
})

router.put("/:id", (req, res) => {
 
})

router.patch("/:id", (req, res) => {
 
})


router.delete("/:id", (req, res) => {
 
})
/*

/api/events?from=2023-03-01 (only events on or later than this date)
/api/events?from=now (only future events)
/api/events?from=2023-03-01&to=2023-03-31
/api/events?category=work&from=2023-03-01
*/
export default router