$('button').on('click', searchWeather);


var pastSearches = localStorage.getItem(pastSearches) ? JSON.parse(localStorage.getItem(pastSearches)) : [];


localStorage.setItem("cities", JSON.stringify(pastSearches))
const data = JSON.parse(localStorage.getItem("cities"))


function renderButtons(){
    $('.list-group').empty();

    for (var i=0; i<pastSearches.length;i++){
        var a = $("<li>")
        a.addClass("list-group-item");
        a.attr("data-name", pastSearches[i])
        a.text(pastSearches[i])
        $(".list-group").prepend(a)
    }

    localStorage.setItem('cities', JSON.stringify(pastSearches))
}


function searchWeather(){
    console.log('[searchWeather] started ...')
    var apiKey = "1764725cf4acb2b623feb3d307894531"
    var cityName = document.getElementById('citySearch').value
    
    pastSearches.push(cityName)
    $.ajax({
        url:`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`,
        method:"GET"
    }).then(function(response){
        $('#currentTime').html(`${moment().format("dddd, MMMM Do, h:mm a")}`)
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

                for(var i=0; i<5; i++){
                    
                    if( i === 0){
                        $('#1stDay').html(`
                        <h5>${moment().add(1, 'days')._d}</h5>
                        <img src="http://openweathermap.org/img/wn/${forecastList[i].weather[0].icon}.png" />
                        <p> Temperature: ${forecastList[i].temp.day} &deg;C</p>
                        <p>Humidity: ${forecastList[i].humidity} %</p>
                        `)
                    } else if ( i === 1 ){
                        $('#2ndDay').html(`
                        <h5>${moment().add(2, 'days')._d}</h5>
                        <img src="http://openweathermap.org/img/wn/${forecastList[i].weather[0].icon}.png" />
                        <p> Temperature: ${forecastList[i].temp.day} &deg;C</p>
                        <p>Humidity: ${forecastList[i].humidity} %</p>
                        `)
                    } else if ( i === 2 ){
                        $('#3rdDay').html(`
                        <h5>${moment().add(3, 'days')._d}</h5>
                        <img src="http://openweathermap.org/img/wn/${forecastList[i].weather[0].icon}.png" />
                        <p> Temperature: ${forecastList[i].temp.day} &deg;C</p>
                        <p>Humidity: ${forecastList[i].humidity} %</p>
                        `)
                    } else if ( i === 3 ){
                        $('#4thDay').html(`
                        <h5>${moment().add(4, 'days')._d}</h5>
                        <img src="http://openweathermap.org/img/wn/${forecastList[i].weather[0].icon}.png" />
                        <p> Temperature: ${forecastList[i].temp.day} &deg;C</p>
                        <p>Humidity: ${forecastList[i].humidity} %</p>
                        `)
                    } else if ( i === 4 ){
                        $('#5thDay').html(`
                        <h5>${moment().add(5, 'days')._d}</h5>
                        <img src="http://openweathermap.org/img/wn/${forecastList[i].weather[0].icon}.png" />
                        <p> Temperature: ${forecastList[i].temp.day} &deg;C</p>
                        <p>Humidity: ${forecastList[i].humidity} %</p>
                        `)
                    }
                }
        
                if (response.current.uvi <= 3 ) {
                    $('#uvIdx').html(`UV Index: <span class="badge badge-success">${response.current.uvi}</span>`)
                } else if ( response.current.uvi > 3 && response.current.uvi < 8){
                    $('#uvIdx').html(`UV Index: <span class="badge badge-warning">${response.current.uvi}</span>`)
                } else if (response.current.uvi >=8 && response.current.uvi < 11) {
                    $('#uvIdx').html(`UV Index: <span class="badge badge-danger">${response.current.uvi}</span>`)
                }else {
                    $('#uvIdx').html(`UV Index: <span class="badge badge-dark">${response.current.uvi}</span>`)
                }
            })
        }
        

        

        searchWeekWeather()
    });
    
    renderButtons()
}

$('.list-group-item').on('click', function(event){
    event.preventDefault()

    console.log(event)
})
