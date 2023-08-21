// update to fruits.js model
// create array of fruits
const express = require('express');
// connect to MongoDB
const mongoose = require('mongoose');
// Existing fruits array
const fruits = [
    {
        name: 'apple',
        color: 'red',
        readyToEat: true
    },
    {
        name: 'banana',
        color: 'yellow',
        readyToEat: true
    },
    {
        name: 'pear',
        color: 'green',
        readyToEat: false
    }
];
// fruit schema for mongoDB
const fruitSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    readyToEat: Boolean,
    
});
const Fruit = mongoose.model('Fruit', fruitSchema);
// Export fruits array and Fruit schema
module.exports =  Fruit;












