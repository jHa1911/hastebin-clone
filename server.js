const express = require('express');
const mongoose = require('mongoose');
const Document = require('./models/Document');

const app = express();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGODB_URI || 'mongodb+srv://surajdb:WVaX03fy1hjiGk1p@cluster0.qmfbepu.mongodb.net/wastebin';

// Connect to MongoDB
mongoose.connect(mongoURL)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));




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
        const document = await Document.create({ value })
        res.redirect(`/${document.id}`)
    } catch (e) {
        res.render('new', { value })
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









    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

module.exports = app;