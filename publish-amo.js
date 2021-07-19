const jwt = require('jsonwebtoken');
const FormData = require('form-data');
const fetch = require('node-fetch');
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

fetch(`https://addons.mozilla.org/api/v5/addons/ant@silentnoodlemaster.fi/versions/${version}/`, {
    method: 'PUT',
    headers: {
        'Authorization': `JWT ${token}`,
        ...formHeaders,
    },
    body: form
})
.then(response => response.json().then( (json) => {
        console.log(JSON.stringify(json, null, 2));
    }))
.catch(error => console.error(error))