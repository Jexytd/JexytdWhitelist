// create an express app
const express = require("express")
const app = express()

const Keys = ["free", "2470661BCF881451194B6B461AF34A01118A9E84FAE2578D4196DAA7F34CC2A1D554FEE53BB3AE17E2DD01F6C04B985316BF303503E8275A9B947855A37BDF02"]; // our key database of course you can replace it with a query prepared request to a mysql data base or mongodb
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