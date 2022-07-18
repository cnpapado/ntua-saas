const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.json({
        meta: {
            msg: "Hello World",
            code: 200
        }
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;