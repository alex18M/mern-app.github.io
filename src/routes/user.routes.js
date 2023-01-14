const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Modelo para hacer consultas a la base de datos

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();// Busca todos los usuarios
    res.json(users);  
    
});

//Get a user
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);// Busca un usuario por su id
    res.json(user);
});

//Post a new user
router.post('/', async(req, res) => {
    const { name, APaterno, AMaterno, age, dateN, maritalStatus, phoneN, country, state, city, town, zipcode, lenguage, hobby, preference } = req.body;// Recibe los datos del usuario
    const user = new User({name, APaterno, AMaterno, age, dateN, maritalStatus, phoneN, country, state, city, town, zipcode, lenguage, hobby, preference});// Crea un nuevo usuario
    await user.save();// Guarda el usuario en la base de datos
    res.json({status: 'User Saved'});
});

//Update a user
router.put('/:id', async (req, res) => {
    const { name, APaterno, AMaterno, age, dateN, maritalStatus, phoneN, country, state, city, town, zipcode, lenguage, hobby, preference } = req.body;// Recibe los datos del usuario
    const newUser = {name, APaterno, AMaterno, age, dateN, maritalStatus, phoneN, country, state, city, town, zipcode, lenguage, hobby, preference};// Crea un nuevo usuario
    await User.findByIdAndUpdate(req.params.id, newUser);// Actualiza el usuario
    res.json({status: 'User Updated'});
});

//Delete a user
router.delete('/:id', async (req, res) => {// Elimina un usuario
    await User.findByIdAndRemove(req.params.id);// Elimina el usuario
    res.json({status: 'User Deleted'});// Muestra el mensaje de usuario eliminado
});

module.exports = router ;