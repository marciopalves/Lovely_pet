const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json());

//solve CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Public folder for images
app.use(express.static('public'));

//Routes 
const UserRoutes = require('./routes/UserRoutes');
app.use('users', UserRoutes);



app.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Rota teste Ok'
    });
});


module.exports = app;