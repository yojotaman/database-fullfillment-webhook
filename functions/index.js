const functions = require('firebase-functions');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.webhookdatabase = functions.https.onRequest((request, response) => {

    console.log("Request.body.queryResult.parameters: ", request.body.queryResult.parameters);

    let params = request.body.queryResult.parameters;

    firestore.collection('reservas').add(params)
        .then(() => {
            response.send({
                fulfillmentText: `Señor(a) ${params.given_name}, su reserva de habitacion tipo: ${params.tipo_habitacion} queda agendada para 
                    ${params.number} personas, nos contactaremos con usted pronto al correo: ${params.email}.`
            });
        })
        .catch((e => {
            console.log("error: ", e);
            response.send({
                fulfillmentText: `Algo salio mal al realizar el registro en la base de datos`
            });
        }))
});