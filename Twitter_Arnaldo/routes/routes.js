const express = require('express');
const router = express.Router()
const orderby = require("lodash/orderBy");

const model = require('../models/user');
const modeltweet = require('../models/tweet');
const modelseguidor = require('../models/seguidor');
const modellike = require('../models/like');

const { request, response } = require('express');

module.exports = router;


//Post Method
router.post('/newUser', async (req, res) => {
    const data = new model({
        username: req.body.username,
        email: req.body.email,
        age: req.body.age,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        gender: req.body.gender,
        nacionalidad: req.body.nacionalidad,
    })

    try {
        const dataToSave = await data.save();
        console.log("usuario añadido correctamente")
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAllusers', async (req, res) => {
    try{
        const data = await model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOneuser/:id', async (req, res) => {
    try{
        const data = await model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await model.findByIdAndDelete(id)
        res.send(`User ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// **********************************************************************

//Post Method For Tweets
router.post('/newTweet', async (req, res) => {
    const data = new modeltweet({
        cuerpo: req.body.cuerpo,
        autor: req.body.autor,
        fecha: req.body.fecha
    })

    try {
        const dataToSave = await data.save();
        console.log("tweet añadido correctamente")
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all tweets
router.get('/getAlltweets', async (req, res) => {
    try{
        const data = await modeltweet.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by autor id
router.get('/getAutorTweet/:id', async (req, res) => {
    try{
        const data = await modeltweet.find({autor: req.params.id})
        const tweetsordenados = orderby(data, ["fecha"], ["desc"])
        res.json(tweetsordenados)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID tweet
router.patch('/updateTweet/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body.cuerpo;
        const options = { new: true };

        const result = await modeltweet.findByIdAndUpdate(
            id, {cuerpo:updatedData}, options
        )
        
        console.log("tweet actualizado correctamente")
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID tweet
router.delete('/deleteTweet/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await modeltweet.findByIdAndDelete(id)
        res.send(`Tweet ${data._id} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//************************************************************************

//Post Method For Seguidores
router.post('/newSeguidor', async (req, res) => {
    const data = new modelseguidor({
        seguidor: req.body.seguidor,
        seguido: req.body.seguido,
    })

    try {
        const dataToSave = await data.save();
        console.log("seguidor añadido correctamente")
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//seguidores de un id user
router.get('/getSeguidores/:id', async (req, res) => {
    try{
        const data = await modelseguidor.find({seguido: req.params.id})
        const seguidoressordenados = orderby(data, ["fecha"], ["desc"])
        res.json(seguidoressordenados)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Seguidos por un usuario
router.get('/getSeguidos/:id', async (req, res) => {
    try{
        const data = await modelseguidor.find({seguidor: req.params.id})
        const seguidosordenados = orderby(data, ["fecha"], ["desc"])
        res.json(seguidosordenados)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Delete by ID vinculo
router.delete('/deleteVinculo/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await modelseguidor.findByIdAndDelete(id)
        res.send(`Vinculo ${data._id} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//************************************************************************

//timeline un id user
router.get('/getTimeline/:id', async (req, respuesta) => {
    try{
        const data = await modelseguidor.find({seguidor: req.params.id})
        var aux = []

        for (let index = 0; index < data.length; index++) {
            const element = await modeltweet.find({autor: data[index].seguido})
            aux.push(element)
        }

        const ordenados = orderby(aux.flat(), ["fecha"], ["desc"])
        respuesta.json(ordenados)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//************************************************************************

//Post Method For likes
router.post('/newLike', async (req, res) => {
    const data = new modellike({
        tweetliked: req.body.tweetliked,
        autor: req.body.autor,
    })

    try {
        const dataToSave = await data.save();
        console.log("like añadido correctamente")
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Delete by ID like
router.delete('/deletelike/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await modellike.findByIdAndDelete(id)
        res.send(`Like ${data._id} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Publicaciones likeadas por un usuario
router.get('/getTweetsLiked/:id', async (req, res) => {
    try{
        const data = await modellike.find({autor: req.params.id})
        var aux = []

        for (let index = 0; index < data.length; index++) {
            const element = await modeltweet.find({_id: data[index].tweetliked})
            aux.push(element)
        }

        const ordenados = orderby(aux.flat(), ["fecha"], ["desc"])
        res.json(ordenados)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})