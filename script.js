$('button').on('click', searchWeather);

function searchWeather(){
    console.log('[searchWeather] started ...')
    var apiKey = "1764725cf4acb2b623feb3d307894531"
    var cityName = document.getElementById('citySearch').value

    $.ajax({
        url:`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`,
        method:"GET"
    }).then(function(response){
        console.log(response.weather[0])
        $('.cityName').text(response.name)
        $('#temp').html(`Temperature: ${response.main.temp} &deg;C Feels Like: ${response.main.feels_like} &deg;C`)
        $('#humid').text(`Humidity: ${response.main.humidity} %`)
        $('#wind').text(`Wind Speed ${response.wind.speed} km/h`)
        $('#uvIdx').text(`UV Index: ${response.uvi}`)

    });
    searchWeekWeather()
}

function searchWeekWeather(){
    var apiKey = "1764725cf4acb2b623feb3d307894531"
    var cityName = document.getElementById('citySearch').value

    $.ajax({
        url:`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`,
        method:"GET"
    }).then(function(response){
        var newList = response.list
        console.log(newList)

        for(var i=0;i<newList.length; i++){
            console.log(newList[i].dt_txt)
        }
    })
}