const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    jwt = require('jsonwebtoken'),
    screte_config = require('./common/screte_config'),
    urouter = require('./routes/userrou'),
    app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/api', urouter);
app.listen(3000, () => {
    console.log('server is running')
})