const express = require("express");
const app = express();

const hotelsPool = require('./config');

app.get('/hotels', (request, response) => {
    hotelsPool.query('select * from hotels', (error, resultSet) => {
        response.json(resultSet.rows)
    });
})

// CRUD
//  C -> Create  -> INSERT -> POST
//  R -> Read    -> SELECT -> GET
//  U -> Update  -> UPDATE -> PUT
//  D -> Delete  -> DELETE -> DELETE

app.get('/hotels2', (request, response) => {
    if (request.query.postcode) {
        hotelsPool.query('select * from hotels where postcode = $1',
            [request.query.postcode], async (error, resultSet) => {
                // Postgres
                let hotelInfo = []
                for (let i = 0; i < resultSet.rows.length; i++) {
                    let currentRow = resultSet.rows[i];
                    console.log(" Getting hotel row ", currentRow);
                    hotelInfo.push({...currentRow})
                    await hotelNights(currentRow.id)
                        .then(
                            numberOfNights => {
                                console.log(" Nights for hotel " + currentRow.name + ", " + numberOfNights);
                                hotelInfo[i].booked_nights = numberOfNights;
                                delete hotelInfo[i].id;
                            }
                        );
                }
                response.json(hotelInfo);
            })
    } else {
        hotelsPool.query('select * from hotels', (error, resultSet) => {
            // Postgres
            response.json(resultSet.rows);
        })
    }
})

const hotelNights = async (hotelId) => {
    const resultSet = await
        hotelsPool.query("select sum(nights) as total_nights from bookings where hotel_id = $1",
            [hotelId]);
    return resultSet.rows[0].total_nights;
}


app.get('/customers', (request, response) => {
    // Express level
    hotelsPool.query('select * from customers',
        [cityName, countryName],
        (error, resultSet) => {
            // Postgres
            response.json(resultSet.rows);
        })
})


app.listen(3000, function () {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});