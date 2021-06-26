const express = require("express");
const cors = require("cors");

const app = express();
const port = 4050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        message: "Welcome To Restful API Gabut!"
    })
})

require('./app/routes/post.routes')(app);

const db = require('./app/models');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
}).then(() => {
    console.log('Database berhasil terkoneksi!');

    app.listen(port, () => {
        console.log("Server is running on http://localhost:" + port);
    });
}).catch((err) => {
    console.log('Database gagal terkoneksi');
    console.log(err);
    process.exit();
});