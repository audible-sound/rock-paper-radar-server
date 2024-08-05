const express = require('express');
const cors = require('cors');
const router = require('./routers/index');

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors());
app.use('/', router);

const server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
});