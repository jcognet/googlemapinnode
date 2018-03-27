let parameters = []

function getAddress(){
    if(parameters.length===0)
        listAllParameters()
    if(parameters.length>0)
        return parameters[0]
}
exports.getAddress = getAddress

function listAllParameters (){
    [, , ...parameters] = process.argv
}
exports.listAllParameters = listAllParameters

exports.writeAllParameters= ()=>{
    listAllParameters()
    console.log("Liste des paramètres de la commande : "+parameters.join(',')+" (soit "+parameters.length+" élément(s))")
}
exports.checkParameters = ()=>{
    if(getAddress()=== undefined)
        throw new Error("Merci de saisir l'adresse")
}