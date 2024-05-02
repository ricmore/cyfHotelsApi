const express = require("express");
const app = express();
const {newHotelEndpoint, updateHotelEndpoint, getHotelsByPostcode} = require("./controller/hotel_controller")
const hotelsPool = require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CRUD
//  C -> Create  -> INSERT -> POST
//  U -> Update  -> UPDATE -> PUT
//  R -> Read    -> SELECT -> GET

// TODO To implement
//  D -> Delete  -> DELETE -> DELETE

app.post('/hotels', newHotelEndpoint);

app.put('/hotels/:hotelId', updateHotelEndpoint)

app.get('/hotels', getHotelsByPostcode)

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());


app.listen(3000, function () {
    console.log("Hotels server is listening on port 3000. Ready to accept requests!");
});