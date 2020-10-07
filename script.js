$('button').on('click', searchWeather);
let pastSearches = []

localStorage.setItem('items', JSON.stringify(pastSearches))
const data = JSON.parse(localStorage.getItem('items'))

function searchWeather(){
    console.log('[searchWeather] started ...')
    var apiKey = "1764725cf4acb2b623feb3d307894531"
    var cityName = document.getElementById('citySearch').value

    pastSearches.push(cityName)

    $.ajax({
        url:`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`,
        method:"GET"
    }).then(function(response){
        console.log(response.weather[0])
        $('.cityName').html(`${response.name} <img src="http://openweathermap.org/img/wn/${response.weather[0].icon}.png" >`)
        $('#temp').html(`Temperature: ${response.main.temp} &deg;C    Feels Like: ${response.main.feels_like} &deg;C`)
        $('#humid').text(`Humidity: ${response.main.humidity} %`)
        $('#wind').text(`Wind Speed ${response.wind.speed} km/h`)
        //$('#uvIdx').text(`UV Index: ${response.current.uvi}`)

        function searchWeekWeather(){
            var cityLat = response.coord.lat
            var cityLong = response.coord.lon
        
            $.ajax({
                url:`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLong}&units=metric&exclude=minutely,hourly&appid=${apiKey}`,
                method:"GET"
            }).then(function(response){
                var forecastList = response.daily
                console.log(forecastList)

                $('#uvIdx').text(`UV Index: ${response.current.uvi}`)

                for(var i=0; i<5; i++){
                    
                    if( i === 0){
                        $('#1stDay').html(`
                        <h5>${convertUnix(forecastList[i].dt)}</h5>
                        <img src="http://openweathermap.org/img/wn/${forecastList[i].weather[0].icon}.png" />
                        <p> Temperature: ${forecastList[i].temp.day} &deg;C</p>
                        <p>Humidity: ${forecastList[i].humidity} %</p>
                        `)
                    } else if ( i === 1 ){
                        $('#2ndDay').html(`
                        <h5>${forecastList[i].dt}</h5>
                        <img src="http://openweathermap.org/img/wn/${forecastList[i].weather[0].icon}.png" />
                        <p> Temperature: ${forecastList[i].temp.day} &deg;C</p>
                        <p>Humidity: ${forecastList[i].humidity} %</p>
                        `)
                    } else if ( i === 2 ){
                        $('#3rdDay').html(`
                        <h5>${forecastList[i].dt}</h5>
                        <img src="http://openweathermap.org/img/wn/${forecastList[i].weather[0].icon}.png" />
                        <p> Temperature: ${forecastList[i].temp.day} &deg;C</p>
                        <p>Humidity: ${forecastList[i].humidity} %</p>
                        `)
                    } else if ( i === 3 ){
                        $('#4thDay').html(`
                        <h5>${forecastList[i].dt}</h5>
                        <img src="http://openweathermap.org/img/wn/${forecastList[i].weather[0].icon}.png" />
                        <p> Temperature: ${forecastList[i].temp.day} &deg;C</p>
                        <p>Humidity: ${forecastList[i].humidity} %</p>
                        `)
                    } else if ( i === 4 ){
                        $('#5thDay').html(`
                        <h5>${forecastList[i].dt}</h5>
                        <img src="http://openweathermap.org/img/wn/${forecastList[i].weather[0].icon}.png" />
                        <p> Temperature: ${forecastList[i].temp.day} &deg;C</p>
                        <p>Humidity: ${forecastList[i].humidity} %</p>
                        `)
                    }
                }
        
                
            })
        }
        
        searchWeekWeather()
    });

}

function convertUnix(currentTime){
    var timeStamp = currentTime

    $.ajax({
        url:`https://showcase.api.linx.twenty57.net/UnixTime/fromunix?timestamp=${timeStamp}`,
        method: "GET"
    }).then(function(response){
        var timeDate = response
        console.log(response) 
        return response;
    });
}

function saveItem(){

}