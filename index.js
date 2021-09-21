var exp=require('express')
var request=require('request')
var path=require('path')
var bp=require('body-parser')

var app=exp()
app.use(bp.urlencoded({extended:true}))
app.set('view engine','ejs')

app.get('/',function(_req,res){
    var city="gwalior"
    var url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`

    request(url,function(err,_response,body){
        if(err) throw err;
        weather_json=JSON.parse(body)
        console.log(weather_json)
        temp=5/9*(Math.round(weather_json.main.temp)-32)
        var weather={
            city:city,
            temperature:temp,
            description:weather_json.weather[0].description,
            icon:weather_json.weather[0].icon
        }
        var weather_data={weather:weather}
        res.render('index',weather_data)
    })

})
app.post('/temp',function(req,res){
    city=req.body.city_name
    var url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`

    request(url,function(err,response,body){
        if(err) throw err;
        weather_json=JSON.parse(body)
        console.log(weather_json)
            temp=5/9*(Math.round(weather_json.main.temp)-32)
        var weather={
            city:city,
            temperature:temp,
            description:weather_json.weather[0].description,
            icon:weather_json.weather[0].icon
        }
        var weather_data={weather:weather}
        res.render('index',weather_data)
    })
})

app.listen(1122,function(req,res){
    console.log("server is running")
})