const dotenv = require('dotenv')
const fs = require('fs')
const configFile = 'config.env'
const configFileDist = 'config.env.dist'


exports.initConfig = ()=>{
    require('dotenv').config({path:configFile})
}
exports.checkConfigFile = ()=>{
    let config = readConfigFile()
    console.log("Configuration présente : ", config)
    let configDist = readConfigDistFile()
    console.log("Configuration présente du fichier dist : ", configDist)

    // Vérification sur la présence de toutes les chaînes de configuration présente dans le fichier dist
    let listLackingKeyInConfig = checkPropertiesOfObject(configDist, config)
    if( listLackingKeyInConfig.length>0){
        throw new Error("Attention, votre fichier de configuration ne possède pas les clés : "+listLackingKeyInConfig.join(', '))
    }
    // Vérification (non bloquante) sur les clés en trop dans le fichier de configuration
    let listKeyNotUsed = checkPropertiesOfObject(config, configDist)
    if( listKeyNotUsed.length>0){
        console.debug("Attention, votre fichier de configuration  possède TROP de clés : "+listKeyNotUsed.join(', '))
    }

}

function readConfigFile(){
    return readFile(configFile)
}

function readConfigDistFile(){
    return readFile(configFileDist)
}

function readFile(fileName){
    return dotenv.parse(fs.readFileSync(fileName));
}

function checkPropertiesOfObject(object1, object2){
    let listLackingKey = []
    for(let configLine in object1) {
        if(!object2.hasOwnProperty(configLine)) {
            listLackingKey.push(configLine + "("+object1[configLine]+")")
        }
    }
    return listLackingKey
}