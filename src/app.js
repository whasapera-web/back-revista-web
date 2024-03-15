const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();

let corsOptions = {
    origin: "*"
};

const userRoutes = require("./routes/users.Routes");
const advertisingRoutes = require("./routes/advertising.Routes")

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use("/user", userRoutes);
app.use("/advertising", advertisingRoutes);

const port = 3000;



app.listen(port, () => {
    console.log(`funcionando en el ${port}`)
});
