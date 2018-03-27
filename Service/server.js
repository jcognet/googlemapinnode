const  checkService = require('./check_service')
exports.start= ()=>{
    console.log("Bonjour, le serveur est lancé à "+printDate())
    checkService.checkConfigFile()
}
exports.bye = ()=>{
    console.log("Bye, le serveur va dormir à "+printDate())
}

function printDate(){
    let now = new Date();
    return now.getDate()+'/'+(+now.getMonth()+1)+'/'+now.getFullYear()+' à '+now.getHours() + 'h'+now.getMinutes()+'m'+now.getSeconds()
}