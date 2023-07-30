const express = require('express')
const mongoose = require('mongoose')
const Alien = require('../work7-api/models/alien.js')
const app = express()

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/learn-api', { useNewUrlParser: true })

const con = mongoose.connection
con.on('open', () => {
    console.log('connected to database...')
})

app.get('/', async (req, res) => {
    try {
        const aliens = await Alien.find()
        res.json(aliens)
    } catch (err) {
        res.send('Error ' + err)
    }
})


app.post('/', async (req, res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })

    try {
        const a1 = await alien.save()
        res.json(a1)
    } catch (err) {
        res.send('Error')
    }
})

app.get('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id)
        res.json(alien)
    } catch (err) {
        res.send('Error ' + err)
    }
})

app.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Alien.findByIdAndUpdate(
            id, updatedData, options
        )

        res.json(result)
    } catch (err) {
        res.send('Error ' + err)
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const alien = await Alien.findByIdAndDelete(id)
        res.send(`Document with ${alien.name} has been deleted...`)
    } catch (err) {
        res.send('Error ' + err)
    }
})


app.listen(4000, () => {
    console.log("listening port 4000...")
})