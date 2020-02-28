const express = require("express");
const app = express();


app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/scripts', express.static(__dirname + 'public/scripts'));
app.use('/images', express.static(__dirname + 'public/images'));

let server = app.listen(8081, function () {
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
})