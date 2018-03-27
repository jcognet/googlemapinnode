class Address{
    constructor(address = undefined, latitude= undefined, longitude= undefined){
        this.address = address
        this.latitude = latitude
        this.longitude = longitude
    }

    get address(){
        return this.address;
    }
    get latitude(){
        return this.latitude;
    }
    get longitude(){
        return this.longitude;
    }
}

module.exports  = Address