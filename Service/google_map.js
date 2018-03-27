const addressExample =  '1600 Amphitheatre Parkway, Mountain View, CA'
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY
});

exports.test = ()=>{
    console.log('Début du test de Google Maps')
    googleMapsClient.geocode({
        address: addressExample
    }, function(err, response) {
        if(err) {
            console.log(err)
            throw err;
        }
        console.log('Succès de Google Map <3 !')
    });
}