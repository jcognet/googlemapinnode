// Lancement de la configuration
const server = require('./Service/server')
// Lancement du serveur qui s'occupe de la configuration :)
server.start()
// Les variables d'environnement ont bien été chargées, let's have fun :D
const google_map = require('./Service/google_map')
const prompt = require('./Service/prompt')
const fs = require('fs')
const serialize = require('node-serialize')

//google_map.test()
google_map.geocode(prompt.getAddress(), (listAddress)=>{
    for(const address of listAddress)
        google_map.places(address, (listRestaurant, json)=>{
            fs.writeFile(process.env.RES_FILE_JSON_FULL, JSON.stringify(json), ( err)=>{
                if(err) throw err
            })
            let wstream = fs.createWriteStream(process.env.RES_FILE_JSON);
            for(const restaurant of listRestaurant)
                wstream.write(serialize.serialize(restaurant)+"\r\n");
            wstream.end();

            server.bye()
        })

});


//https://github.com/googlemaps/google-maps-services-js