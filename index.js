const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");

const app = express();
const PORT = 7000;

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Connect to MongoDB
connectToMongoDB("mongodb+srv://santoshsaroj0032:dTlE2ZNxnWhQPALr@cluster0.mkmko1i.mongodb.net/URL_SHORTNER")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({extended:false}));




// Routes
app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timeStamp: Date.now(),
                    },
                },
            },
            { new: true }
        );

        if (!entry) {
            return res.status(404).send("URL not found");
        }

        res.redirect(entry.redirectURL);
    } catch (err) {
        console.error("Error in finding and updating URL:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
