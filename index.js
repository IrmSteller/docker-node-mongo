const express = require('express');
const mongoose = require('mongoose');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/books',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/Item');
const Book = require('./models/Book');

// app.get('/', (req, res) => {
//   Item.find()
//     .then(items => res.render('index', { items }))
//     .catch(err => res.status(404).json({ msg: 'No items found' }));
// });

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save().then(item => res.redirect('/'));
});

app.get('/book/getAll', (req, res) => {
  console.log('getBooks');
  Book.find()
    .then(items => res.json(items))
    .catch(err => res.send("not found"))
    
});
 
app.delete('/book/:id', async (req, res) =>{
  console.log("delete", req.params.id);
  await Book.deleteOne({_id: req.params.id})
  .then(res.send("Ok"))
  .catch(err => res.send("not found"))
});

app.post('/book/add', (req,res) =>{
  console.log(req.body.name + " " + req.body.price);
  const newBook = new Book({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity
  });
  console.log(newBook.name + " " + newBook.price);
  newBook.save().then(res.json("OK")).catch("NOK");
  
});

app.put('(book/:id', (req, res) =>{
    Book.findOneAndUpdate(
    {_id: req.params.id},
    {
      $set:{
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
      }
    },
    {
      upsert: ture
    }
  ).then(result=> {console.log(result)})
  .catch(error => console.error(error));
});
const port = 3000;

app.listen(port, () => console.log(`Server running...${port}`));
