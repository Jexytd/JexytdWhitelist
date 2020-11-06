// create an express app
const express = require("express")
const app = express()

const Keys = ["123", "simplewhitelist"]; // our key database of course you can replace it with a query prepared request to a mysql data base or mongodb
const secretKey2 = "E);{Q6_<bkrEo;KEKWzlFoopANJai?}5vyus3l@>+?=>O}uL-(A}M/PJ`w";
const Crypto = require("crypto");

function hmac(secret, data){
    const hash = Crypto.createHash("sha512");
    hash.update(secret + data + secret);
    return hash.digest("hex").toString();
};

app.get("/checkWhitelist", (request, response) => {
    const Key = request.query.Key;
    const Gamer = request.query.gamer;

    if(Key && Gamer){
        const isKeyValid = Keys.find((key) => key !== null && Key == key);

        if(isKeyValid){
            response.send(hmac(secretKey2, Key + Gamer)) // we'll send the data of the whitelist response to the client once the key is valid
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
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));