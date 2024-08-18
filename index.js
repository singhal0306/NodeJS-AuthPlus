const port = 8000;

const express = require("express");
const cookieParser =require("cookie-parser");
const fileUpload = require("express-fileupload");

const app = express();

app.set("view engine", "hbs")
app.set("views", "./templates")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload())
app.use(cookieParser());

app.use(express.static("./public"));
app.use(express.static("./upload"));

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server is running at port: ", port);
})