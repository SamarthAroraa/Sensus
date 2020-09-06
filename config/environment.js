const path = require('path')
const development = {
    name: "development",
    secretOrKey: "5D34F7E618B22B4F45EBE2EAE8CDB",
    session_cookie_key: "asifhajosicrh89w34u9rjixp3purhw3oir",
    db: {
        password: "zuarCppdm4JleJpT",
        username: "samarth",
    },

    asset_path: "./assets",
    smtp: {
        host: "smtp.gmail.com",
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "teamcodeial",
            pass: "pack6:ICU",
        },
    },
    GOOGLE_APPLICATION_CREDENTIALS: path.join(__dirname, "../config/Sensus-0f50e66c71ef.json")
};
const production = {
    name: "production",
    secretOrKey: "5D34F7E618B22B4F45EBE2EAE8CDB",
    session_cookie_key: "asifhajosicrh89w34u9rjixp3purhw3oir",
    db: {
        password: "zuarCppdm4JleJpT",
        username: "samarth",
    },

    asset_path: "client/build",
    smtp: {
        host: "smtp.gmail.com",
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "teamcodeial",
            pass: "pack6:ICU",
        },
    },
    GOOGLE_APPLICATION_CREDENTIALS: path.join(__dirname, "../config/Sensus-0f50e66c71ef.json")
};

module.exports = production;