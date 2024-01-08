const express = require("express");
const zod = require("zod");
const app = express();
app.use(express.json());
const schema = zod.array(zod.number());
app.post("/health-checkup", function (req, res) {
    const kidneys = req.body.kidneys;
    // const kidneysLength = kidneys.length;
    const response = schema.safeParse(kidneys);
    res.send({
        response
    })
})
//error handling middleware
app.use(function (err, req, res, next) {
    res.json({
        msg: "Sorry, something is up with our server"
    })
})

app.listen(3000, () => { console.log("Global Catches is Ready") });
