const request =require("request")


const geocode= (address,callback)=>{
    const url='http://api.positionstack.com/v1/forward?access_key=922e39555554bb179ec2eb32f87b6f55&query= '+encodeURIComponent(address)+ ' &limit=1&output=json'
    request({url,json:true},(error,{ body })=>{  //here we use shorthand syntax of o ject and destructuring object
        if(error) {
            callback("Unable to connect to the Location Services",undefined)
        } else if (body.error|| body.data.length===0) {
            callback("Unable to find location please try another search.",undefined)
        } else {
            callback(undefined,{
                latitude : body.data[0].latitude,
                longitude :body.data[0].longitude,
                label :body.data[0].label
            })
        }

    })

}
module.exports=geocode