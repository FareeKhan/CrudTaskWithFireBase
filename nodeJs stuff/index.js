var admin = require("firebase-admin");
const express = require('express')
const app = express()


var serviceAccount = require("./olxproject-90312-firebase-adminsdk-ekypy-788dd36e82.json");


app.use(express.json())


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


app.post('./send_noti', (req,res) => {
    const message = {
        notification: {
            title: 'new ad',
            body: 'You posted new add'
        },
        tokens: req.body.tokens
    }

    admin.messaging().sendMultiCast(message).then((res) => {
        console.log('Send Success', res)
    }).catch((error) => {
        console.log(error)
    })
})


app.listen(3000,()=>{
    console.log('Server Running')
})
