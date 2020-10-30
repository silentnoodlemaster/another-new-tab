const fs = require('fs');
const {version} = require('./manifest.json');

const webStore = require('chrome-webstore-upload')({
    extensionId: 'hfdkaflgieogggbkghelhoiagoklcnob',
    clientId: process.env.WEBSTORE_CLIENT_ID,
    clientSecret: process.env.WEBSTORE_CLIENT_SECRET,
    refreshToken: process.env.WEBSTORE_REFRESH_TOKEN
});

const zipfile = fs.createReadStream(`web-ext-artifacts/another_new_tab-${version}.zip`);
const target = 'default';

webStore.fetchToken()
.then(token => {
    return webStore.uploadExisting(zipfile, token)
    .then((res) => {
        console.log(res)
        return  token
    })
})
.then(token => {
    return webStore.publish(target,token)
})
.then(res => {
    console.log(res)
})
