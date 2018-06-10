
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp({ credential: admin.credential.applicationDefault() })
  
var db = admin.firestore()

exports.getBalance = functions.https.onRequest((req, res) => {
    let data = db.collection('bank').doc('1').get() // collection ของ DB ที่มี Document ที่ชื่อว่า 1 
        .then(c => {
            if (c.exists) {
                res.send(c.data())
                
            } else {
                res.send(null)
            }
            return
        })
})

exports.withdraw = functions.https.onRequest((req, res) => {
    let withdrawAmount = req.query.amount
   
    let data = db.collection('bank').doc('1').get() // collection ของ DB ที่มี Document ที่ชื่อว่า 1 
        .then(c => {
            if (c.exists) {
                let oldBalance = c.data().Balance
                let newBalance = oldBalance + parseInt(withdrawAmount)
              
                db.collection('bank').doc('1').update({Balance: newBalance})
                res.send('success')
            } else {
                res.send(null)
            }
            return
        })
})

exports.deposit = functions.https.onRequest((req, res) => {
    let depositAmount = req.query.price //get amount
    let data = db.collection('bank').doc('1').get() // collection ของ DB ที่มี Document ที่ชื่อว่า 1 
        .then(c => {
            if (c.exists) {
                let oldBalance = c.data().Balance
                let newBalance = oldBalance - depositAmount
                db.collection('bank').doc('1').update({Balance: newBalance})
                res.send('success')
            } else {
                res.send(null)
            }
            return
        })
}) 
