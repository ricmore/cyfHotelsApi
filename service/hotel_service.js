const {newHotel, hotelNameExist, updateHotel, selectHotelsByPostCode} = require('../repository/hotels_repo');


const createNewHotel = async (hotelName, numberOfRooms, postalCode) => {
    let exist = await hotelNameExist(hotelName);

    if (exist) {
        return false;
    }
    return await newHotel(hotelName, numberOfRooms, postalCode)
        .then(
            created => {
                return created
            }
        );
}

const updateExistingHotel = async (hotelId, hotelName, numberOfRooms, postalCode) => {
    // TODO check that updated name does not exist

    return await updateHotel(hotelId, hotelName, numberOfRooms, postalCode)
        .then(
            updated => {
                return updated
            }
        );
}

const readHotelsByPostcode = async (postalCode) => {
    return await selectHotelsByPostCode(postalCode)
        .then(resultSet => {
            return resultSet.rows;
        })
}

module.exports = {
    createNewHotel,
    updateExistingHotel,
    readHotelsByPostcode
}