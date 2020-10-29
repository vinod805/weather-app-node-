const express=require('express')
const path=require('path')
const request=require('request')

const hbs=require('hbs')
const app=express()
app.set('view engine','hbs')
const hbspath=path.join(__dirname,'../templates/partials')
const filepath=path.join(__dirname,'../templates/views')
const staticpath=path.join(__dirname,'../public')
app.use(express.static(staticpath))

app.set('views',filepath)
hbs.registerPartials(hbspath)
app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather',
        name:'Scottline'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About',
        name:'Scottline'
    })
})
app.get('/weather',(req,res) =>{
if(!req.query.address){
    return res.send({error:'data not avilble'})
}else {
    const forecast=(value,callback) =>{
        url='http://api.weatherstack.com/current?access_key=17e1cb6a5697ae80dccff7460c39e525&query='+value
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
   const value=req.query.address
   forecast(value,(error,data)=>{
if(data===undefined){
    return res.send(error)
}else{
    return res.send(data)

}
   
   })
    
}
})
app.get('/help',(req,res) =>{
    res.render('help',{
        title:'help',
        name:'Scottline'
    })
})
app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404 error',
        name:'Scottline',
        errormsg:'help page not found'

    })
})
app.get('*',(req,res) =>{
    res.render('404',{
        title:'404 error',
        name:'Scottline',
        errormsg:'page not found'

    })
})


app.listen(3000,()=>{
    console.log('server is on')
})