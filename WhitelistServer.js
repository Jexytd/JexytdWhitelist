// create an express app
const express = require("express")
const app = express()

const Keys = ["LrFdO8", "Ta67uk", "2Y0zpu", "n9kGCD"]; // our key database of course you can replace it with a query prepared request to a mysql data base or mongodb
const secretKey2 = "E);{Q6_<bkrEo;KEKWzlFoopANJai?}5vyus3l@>+?=>O}uL-(A}M/PJ`w";
const Crypto = require("crypto");

function hmac(secret, data){
    const hash = Crypto.createHash("sha512");
    hash.update(secret + data + secret);
    return hash.digest("hex").toString();
};

app.get("/checkWhitelist", (request, response) => {
    const Key = request.query.Key;
    const user = request.query.user;

    if(Key && user){
        const isKeyValid = Keys.find((key) => key !== null && Key == key);

        if(isKeyValid){
            response.send(hmac(secretKey2, Key + user)) // we'll send the data of the whitelist response to the client once the key is valid
        }
        else{
            response.send("Not Whitelisted");
        }
    }
    else{
        response.send("Not Whitelisted");
    }
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => {
    console.log("App started.")
});