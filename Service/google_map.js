const addressExample = '1600 Amphitheatre Parkway, Mountain View, CA'
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY
});
const Address = require('../Entity/Address')

exports.test = () => {
    console.log('Début du test de Google Maps')
    geocode(addressExample, (listAddress) => {
        console.log('Succès de Google Map <3 !')
    })
}

function geocode(address, callback) {
    console.log("On recherche : " + address)
    googleMapsClient.geocode({
        address: address
    }, function (err, response) {
        if (err) {
            console.log(err)
            throw err;
        }
        let listAddress = []
        // Gérer la création d'une entité ici
        for (result of response.json.results) {
            listAddress.push({
                'address': result.formatted_address,
                'latitute': result.geometry.location.lat,
                'longitude': result.geometry.location.lng,
            });
        }
        console.log("Résultats de google", listAddress)

        callback(listAddress)
    });
}

exports.geocode = geocode

function places(address, callback) {
    console.log("On recherche les restaurants proches de  : " + address.address)
    googleMapsClient.placesNearby({
        location: address.latitute + ',' + address.longitude,
        radius: 5000,
        type: 'restaurant'

    }, function (err, response) {
        if (err) {
            console.log(err)
            throw err;
        }
        let listRestaurant = []
        // Analyse des résultats des lieux
        for (const result of response.json.results) {
            let restaurant = {
                'name': result.name,
                'latitute': result.geometry.location.lat,
                'longitude': result.geometry.location.lng,
                'address': result.vicinity,
                'rating': result.rating,
                'types': result.types,
            }
            if (result.photos !== undefined) {
                restaurant.photo = result.photos[0].photo_reference
            }
            listRestaurant.push(restaurant)
        }
        // Création des images
        for (const restaurant of listRestaurant) {
            console.log(restaurant)
            if (restaurant.photo !== undefined) {
                console.log(restaurant.photo)
                googleMapsClient.placesPhoto({
                    photoreference: restaurant.photo,
                    maxwidth: 500,
                    maxheight: 500,
                }, (err, response) => {
                    restaurant.photo_url = response.requestUrl
                    console.log(restaurant.photo_url)
                    //callback(listRestaurant, response.json.results)
                })

            }
        }

        //callback(listRestaurant, response.json.results)


    });
}

exports.places = places
