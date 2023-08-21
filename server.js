const express = require('express');
const app = express();

// const fruits = require('./models/fruits.js');
// const veggies = require('.models/veggies.js');

const jsxViewEngine = require('jsx-view-engine');
require('dotenv' ).config();

const Fruit = require('./models/fruits.js');
const veggie = require('./models/veggies.js');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

// Set up view engine
app.engine('jsx', jsxViewEngine());
app.set('view engine', 'jsx');
app.use(express.urlencoded({extended:false}));
//***************************************************************************** *

app.use((req, res, next) => {
  console.log('I run for all routes');
  next();
});

// ********************home page of fruits adn veggies******************************************************
app.get('/', (req, res) => {
  res.render('This is the homepage for Fruits and Veggies');
});
// ************************fruit page*****************************
app.get('/fruits', async (req, res)=> {
  try{
    await Fruit.find({}).then((allFruits)=>{
        res.render('Index', {
            fruits: allFruits
        });
    });
     }
    catch(error){
      console.error('error fetching fruits', error);
      res.render('ErrorPage', {error: 'Failed to fetch fruits'})
  }
});

app.post('/fruits', async (req, res)=>{
  try{
  if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true;
  } else { //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false;
  }
  const createdFruit = await Fruit.create(req.body);
        res.redirect('/fruits');
    } catch (error) {
        console.error('Error creating fruit:', error);
        res.redirect('/fruits'); // or handle the error in another way
    }
});

// Define route for creating new fruits
app.get('/fruits/new', (req, res) => {
  res.render('New');
});

// app.get('/fruits', (req, res) => {
//   res.render('Index', { fruits: fruits });
// });

// app.post('/fruits', (req, res)=>{
//     console.log(req.body);
//     res.send('data received');
// });
// app.post('/fruits', (req, res)=>{
//     if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
//         req.body.readyToEat = true; //do some data correction
//     } else { //if not checked, req.body.readyToEat is undefined
//         req.body.readyToEat = false; //do some data correction
//     }
//     fruits.push(req.body);
//     console.log(fruits);
//     res.send('data received');
// });
// app.post('/fruits', (req, res)=>{
//     if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
//         req.body.readyToEat = true;
//     } else { //if not checked, req.body.readyToEat is undefined
//         req.body.readyToEat = false;
//     }
//     fruits.push(req.body);
//     console(fruits)
//     res.redirect('/fruits'); //send the user back to /fruits
// });
// app.get('/fruits/:indexOfFruitsArray', (req, res) => {
//   const index = parseInt(req.params.indexOfFruitsArray);
//   if (index >= 0 && index < fruits.length) {
//     res.render('Show', { fruits: fruits[index] });//"fruits" is the name of the variable we set equal to the fruits array from fruit.js
//   } else {
//     res.render('Invalid index');
//   }
// });
//new show route
app.get('/fruits/:id', async (req, res)=>{
  try{
    const foundFruit= await Fruit.findById(req.params.id);
    if(foundFruit){
      res.render('Show', {
          Fruit:foundFruit
      });
    }
      else{
        res.render('ErrorPage', { error: 'Fruit not found' });
            return;
      }
  }
   catch(error){
    console.log('Can not find fruit ID', error);
    res.render('ErrorPage', {error: 'Failed to fetch fruit ID'})
   }
  });

  // ***********************page for veggies*********************************************************
  app.get('/veggies', async (req, res)=> {
    try{
       await veggie.find({}).then((allVeggies) => {
          res.render('Indexveggies', {
              veggies: allVeggies,
          });
        }
      )}
      catch(error){
        console.error('error fetching veggies', error);
        res.render('ErrorPage', {error: 'Failed to fetch veggies'})
    }
  });


  // trying to post veggies using app.post
  app.post('/veggies', async (req, res)=>{
    try{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    const createdVeggie = await veggie.create(req.body);
          res.redirect('/veggies');
      } catch (error) {
          console.error('Error creating veggies:', error);
          res.redirect('/veggies'); // or handle the error in another way
      }
  });

// define routes for creating new veggies
app.get('/veggies/new', (req, res) => {
  res.render('Newveggies');
});

// app.get('/veggies/:indexOfVeggiesArray', (req, res) => {
//   const index = parseInt(req.params.indexOfVeggiesArray);
//   if (index >= 0 && index < veggies.length) {
//     res.render(veggies[index]);
//   } else {
//     res.render('Invalid index');
//   }
// });

app.get('/veggies/:id', async (req, res)=>{
  try{
    const foundVeggie= await veggies.findById(req.params.id);
    if(foundVeggies){
      res.render('Showveggies', {
          Veggie:foundVeggie
      });
    }
      else{
        res.render('ErrorPage', { error: 'veggie not found' });
            return;
      }
  }
   catch(error){
    console.log('Can not find veggie ID', error);
    res.render('ErrorPage', {error: 'Failed to fetch veggie ID'})
   }
  });

app.listen(3000, function () {
  console.log('Server started on port 3000');
});











