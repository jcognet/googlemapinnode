const  configService = require('./config')
const  promptService = require('./prompt')
exports.start= ()=>{
    console.log("Bonjour, le serveur est lancé à "+printDate())
    configService.initConfig()
    configService.checkConfigFile()
    promptService.writeAllParameters()
    promptService.checkParameters()
}
exports.bye = ()=>{
    console.log("Bye, le serveur va dormir à "+printDate())
}

function printDate(){
    let now = new Date();
    return now.getDate()+'/'+(+now.getMonth()+1)+'/'+now.getFullYear()+' à '+now.getHours() + 'h'+now.getMinutes()+'m'+now.getSeconds()
}