// Lancement de la configuration
let server = require('./Service/server.js')
// Lancement du serveur qui s'occupe de la configuration :)
server.start()
// Les variables d'environnement ont bien été chargées, let's have fun :D
let google_map = require('./Service/google_map.js')


google_map.test()
server.bye()

//https://github.com/googlemaps/google-maps-services-js