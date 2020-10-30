var jwt = require('jsonwebtoken');
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var {version} = require('./manifest.json');s

var issuedAt = Math.floor(Date.now() / 1000);
var payload = {
    iss: process.env.AMO_JWT_ISS,
    jti: Math.random().toString(),
    iat: issuedAt,
    exp: issuedAt + 60,
};

var secret = process.env.AMO_JWT_SECRET;
var token = jwt.sign(payload, secret, {
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

