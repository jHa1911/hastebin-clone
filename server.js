const express = require('express');
const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // parse form submissions


const Document = require( './models/document' );
// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dev_db_url = "mongodb+srv://surajdb:WVaX03fy1hjiGk1p@cluster0.qmfbepu.mongodb.net/code_documents?retryWrites=true&w=majority&appName=Cluster0";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

// Routes
app.get('/', (req, res) => {
    const code = `welcome to Wastebin!

Paste your code here and share it with others!`
    res.render('index', { code });
});

app.get('/new', (req, res) => {
    res.render('new');
}); 

app.post('/save', async (req, res) => {
    const value = req.body.value
    try {
        const document = await  Document.create({value});
        res.redirect(`/${document.id}`)
    } catch(e) {
        res.render('new', {value})
    }

});

/*app.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const document = await Document.findById(id)
        res.render('index', { code: document.value })
    } catch (e) {
        res.redirect('/')
    }
}) */








app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

module.exports = app;