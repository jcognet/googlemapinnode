// Lancement de la configuration
const server = require('./Service/server')
// Lancement du serveur qui s'occupe de la configuration :)
server.start()
// Les variables d'environnement ont bien été chargées, let's have fun :D
const google_map = require('./Service/google_map')
const prompt = require('./Service/prompt')
google_map.test()
google_map.geocode(prompt.getAddress(), (listAddress)=>{
    server.bye()
});


//https://github.com/googlemaps/google-maps-services-js