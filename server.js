const express = require('express');
const app = express();


// view engine setup
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    const code = `welcome to Wastebin!
Paste your code here and share it with others!`
    res.render('index', { code });
});


app.use(express.static('public'));





app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

module.exports = app;