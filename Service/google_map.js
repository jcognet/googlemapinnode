const addressExample =  '1600 Amphitheatre Parkway, Mountain View, CA'
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY
});
const Address = require('../Entity/Address')

exports.test = ()=>{
    console.log('Début du test de Google Maps')
    geocode(addressExample, (listAddress)=>{
        console.log('Succès de Google Map <3 !')
    })
}
function geocode(address, callback){
    console.log("On recherche : "+address)
    googleMapsClient.geocode({
        address: address
    }, function(err, response) {
        if(err) {
            console.log(err)
            throw err;
        }
        let listAddress = []
        for(result of response.json.results){
            listAddress.push( new Address(
                result.formatted_address,
                result.geometry.location.lat,
                result.geometry.location.lng,
            ));
        }
        console.log(listAddress)
        console.log("Résultats de google", listAddress)

        callback(listAddress)
    });
}
exports.geocode = geocode