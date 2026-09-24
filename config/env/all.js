"use strict";

// Default application configuration

const port = process.env.PORT || 4000;

const requiredVariables = [
    "MONGODB_URI",
    "COOKIE_SECRET",
    "CRYPTO_KEY"
];

const missingVariables = requiredVariables.filter(function(variableName) {
    return !process.env[variableName];
});

if (missingVariables.length > 0) {
    throw new Error(
        "Missing required environment variables: " +
        missingVariables.join(", ")
    );
}

module.exports = {
    port: port,
    db: process.env.MONGODB_URI,
    cookieSecret: process.env.COOKIE_SECRET,
    cryptoKey: process.env.CRYPTO_KEY,
    cryptoAlgo: "aes256",
    hostName: "localhost",
    environmentalScripts: []
};