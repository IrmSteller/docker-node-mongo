const sql = require('./db.js');

const SqlBook = function(book){
    this.id = book.id;
    this.name = book.name;
    this.price = book.price;
};

SqlBook.create = (newBook, result) => {
    sql.query('INSERT INTO books SET ?', newBook, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created book: ", { id: res.insertId, ...newBook });
        result(null, { id: res.insertId, ...newBook });
    });
};

SqlBook.findById = (customer, result)=>{
    sql.query(`SELECT * FROM books WHERE id = ${book.id}`, (err, res) =>{
        if(err){
            console.log("found books: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "not_found"}, null);
    });
};

SqlBook.getAll = result => {
    sql.query("SELECT * FROM books", (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("books: ", res);
        result(null, res);
    });
};

module.exports = SqlBook;