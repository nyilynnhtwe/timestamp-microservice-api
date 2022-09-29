let express = require('express');
let bodyParser = require('body-parser');
const {
    log
} = require('console');
let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/src/index.html");
});

app.get("/api/:dateVar", (req, res) => {
    let re = /^\d{4}-\d{2}-\d{1,2}\d*$/;
    let parameter = req.params.dateVar;
    let resJson,date;
    if (parameter.match(re)) {
        date = new Date(parameter);
    } else {
        date = new Date(parseInt(parameter));
    }
    let unixVar = date.getTime();
    let gmtVar = date.toGMTString();
    resJson = {
        "unix": unixVar,
        "utc" : gmtVar
    }
    res.json(resJson);
})

app.listen(process.env.port || 3000);
