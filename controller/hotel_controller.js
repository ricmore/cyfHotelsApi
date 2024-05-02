const {createNewHotel, updateExistingHotel, readHotelsByPostcode} = require('../service/hotel_service');
const {request, response} = require("express");
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

const newHotelEndpoint = async (request, response) => {
    const hotelName = request.body.name;
    const rooms = request.body.rooms;
    const postcode = request.body.postcode;

    if (rooms <= 0) {
        response.status(303).send("Rooms number must be positive")
    } else {
        await createNewHotel(hotelName, rooms, postcode)
            .then(created => {
                if (created) {
                    response.status(200).send("Hotel added successfully")
                } else {
                    response.status(303).send("Unable to add a new hotel")
                }
            })
    }
}

const updateHotelEndpoint = async (request, response) => {
    const hotelName = request.body.name;
    const rooms = request.body.rooms;
    const postcode = request.body.postcode;
    const hotelId = request.params.hotelId;

    // TODO add validation for numberOfRooms

    await updateExistingHotel(hotelId, hotelName, rooms, postcode)
        .then(updated => {
            if (updated) {
                response.status(200).send("Hotel successfully updated")
            } else {
                response.status(303).send("Unable to update hotel")
            }
        })

}

const getHotelsByPostcode = async (request, response) => {
    const postalCode = request.query.postcode;

    await readHotelsByPostcode(postalCode)
        .then(hotels => response.json(hotels));
}


module.exports = {
    newHotelEndpoint,
    updateHotelEndpoint,
    getHotelsByPostcode
}