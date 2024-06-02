// app.js or index.js
const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const { timeStamp } = require("console");




const app = express();
const PORT = 7000;

connectToMongoDB("mongodb+srv://santoshsaroj0032:dTlE2ZNxnWhQPALr@cluster0.mkmko1i.mongodb.net/URL_SHORTNER")
    .then(() => console.log("MongoDB Connected"));


app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timeStamp: Date.now(),
            },
        },
    }
    );
    res.redirect(entry.redirectURL);

});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
