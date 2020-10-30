const jwt = require('jsonwebtoken');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const {version} = require('./manifest.json');

const issuedAt = Math.floor(Date.now() / 1000);
const payload = {
    iss: process.env.AMO_JWT_ISS,
    jti: Math.random().toString(),
    iat: issuedAt,
    exp: issuedAt + 60,
};

const secret = process.env.AMO_JWT_SECRET;
const token = jwt.sign(payload, secret, {
    algorithm: 'HS256',
});

const form = new FormData();
const stream = fs.createReadStream(`web-ext-artifacts/another_new_tab-${version}.zip`)

form.append('upload', stream);

const formHeaders = form.getHeaders();

axios.put(`https://addons.mozilla.org/api/v4/addons/ant@silentnoodlemaster.fi/versions/${version}/`, form, {
    headers: {
        "Authorization": `JWT ${token}`,
        ...formHeaders
    },
})
.then(response => console.log(response))
.catch(error => console.error(error))

