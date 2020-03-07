const express = require("express");
let port = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('index.html');
});

app.listen(port, function () {
    console.log(`Example app listening on port !`);
});