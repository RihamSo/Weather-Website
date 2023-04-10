const request =require('request')

const forcast = (lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=5372caf67b36cdbb385a2b2fd5cc923e&query='+lat+','+long 
    request({url,json:true},(error,{ body })=> {
        if(error){
            callback("Unable to connect to weather services",undefined)
        }else if(body.error) {
            callback("Unable to find location",undefined)
        }
        else {
            const description=body.current.weather_descriptions[0]

            callback(undefined,description+". It is currently "+body.current.temperature+" degree out But feels like "+body.current.feelslike+" degree out.")
        
        }

    })
}

module.exports=forcast