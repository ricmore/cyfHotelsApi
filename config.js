const { Pool } = require('pg');

const hotelsPool = new Pool({
    user: 'ricard.more',
    host: 'localhost',
    database: 'cyf_hotels',
    password: '',
    port: 5432
});

module.exports = hotelsPool;
