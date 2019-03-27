const express = require('express')
const uuid = require('uuid')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json());

const listArray = [
  {
    id: uuid(),
    title: "My to do list",
    items: [
      {
        id: uuid(),
        description: "Collect all Infinity Stones",
        isDone: true
      },
      {
        id: uuid(),
        description: "Destroy half of the universe",
        isDone: false
      }
    ]
  }
];

app.get("/list", (req, res) => res.json(listArray))

app.get("/list/:id", (req, res) => {
  const list = listArray.find(list => list.id === req.params.id)
  if (!list) {
    res.sendStatus(404)
  }
  res.json(list)
})

app.post("/list", (req, res) => {
  if (
    typeof req.body.title !== "string" ||
    !Array.isArray(req.body.items) ||
    req.body.items.some(item => typeof item.id !== "string" || typeof item.description !== "string" || typeof item.isDone !== "boolean")
  ) {
    res.sendStatus(400)
  } else {
    const newList = {
      id: uuid(),
      title: req.body.title,
      items: req.body.items.map(item => ({
        id: item.id,
        description: item.description,
        isDone: item.isDone
      }))
    }
    listArray.push(newList)
    res.json(newList)
  }
})

app.put('/list/:id', (req, res) => {
  if (
    typeof req.body.title !== "string" ||
    !Array.isArray(req.body.items) ||
    req.body.items.some(item => typeof item.id !== "string" || typeof item.description !== "string" || typeof item.isDone !== "boolean")
  ) {
    res.sendStatus(400)
  } else {
    const listIndex = listArray.findIndex(list => list.id === req.params.id)
    if (listIndex === -1) {
      res.sendStatus(404)
    } else {
      const list = listArray[listIndex]
      listArray[listIndex].title = req.body.title
      listArray[listIndex].items = req.body.items
      res.sendStatus(200)
    }
  }
})

app.delete("/list/:id", (req, res) => {
  const listIndex = listArray.findIndex(list => list.id === req.params.id)
  if (listIndex === -1) {
    res.sendStatus(404)
  } else {
    listArray.splice(listIndex, 1)
    res.sendStatus(200)
  }
})

const port = 3003;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
