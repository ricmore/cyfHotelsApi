const hotelsPool = require('../config');

const newHotel = async (hotelName, numberOfRooms, postalCode) => {
    return await hotelsPool.query(
        'insert into hotels(name, rooms, postcode) values ($1, $2, $3)',
        [hotelName, numberOfRooms, postalCode]
    ).then(
        result => {
            return result.rowCount >= 1;
        }
    )
}

const hotelNameExist = async (hotelName) => {
    return await hotelsPool.query(
        'select name from hotels where name = $1',
        [hotelName]
    ).then(
        result => {
            console.log("Rowcount ", result.rowCount)
            return result.rowCount >= 1;
        }
    )
}

const updateHotel = async (hotelId, hotelName, numberOfRooms, postalCode) => {
    return await hotelsPool.query(
        'update hotels set name = $1, rooms = $2, postcode = $3 where hotels.id = $4',
        [hotelName, numberOfRooms, postalCode, hotelId]
    ).then(
        result => {
            return result.rowCount >= 1;
        }
    )
}

const selectHotelsByPostCode = async (postalCode) => {
    return await hotelsPool.query(
        'select * from hotels where postcode = $1',
        [postalCode]
    ).then(resultSet => {
        return resultSet;
    })
}

module.exports = {
    newHotel,
    hotelNameExist,
    updateHotel,
    selectHotelsByPostCode
}