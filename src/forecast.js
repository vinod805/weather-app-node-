const request=require('request')

const forecast=(Lat,lad,callback) =>{
     url='http://api.weatherstack.com/current?access_key=17e1cb6a5697ae80dccff7460c39e525&query='+Lat+','+lad
     request({url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect',undefined)
        }
        else if(response.body.location.region === ''){
            callback(response.body.error.info,undefined)           
        }else{
            callback(undefined,{region:response.body.location.region,country:response.body.location.country,temp:response.body.current.temperature})
        }
     })    

}
module.exports=forecast