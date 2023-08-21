// update to veggies.js model
// create array of veggies
const express = require('express');
// connect to MongoDB
const mongoose = require('mongoose');
// Existing veggies array

const veggies = [
    {
      name: "spinach",
      color: "green",
      readyToEat: true,
    },
    {
      name: "onion",
      color: "yellow",
      readyToEat: true,
    },
    {
      name: "eggplant",
      color: "purple",
      readyToEat: false,
    }
  ];

// fruit schema for mongoDB
const veggiesSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  color:  { type: String, required: true },
  readyToEat: Boolean
  
});
const Veggie = mongoose.model('Veggie', veggiesSchema);
// Export fruits array and Fruit schema
module.exports =  Veggie;
