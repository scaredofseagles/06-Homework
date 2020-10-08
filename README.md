# Weather-Dashboard

## Description

A web application displaying the current weather of a searched city. A 5-Day forecast is also available for the given city.

## Technologies

* HTML
* CSS
* JavaScript
* jQuery
* BootStrap 4
* FontAwesome
* Open Weather API
* Moment.js

## Goal of the Project

#### Build a Weather Dashboard 

In order to ensure the web application is responsive, we used Bootstrap's components and grid layout so that the contents are intact in a variety of screen sizes. To do this, we needed to use relational ratio for positions and widths and heights. In addition, we needed a navigation bar and a footer that was consistent through all pages and would be responsive.

As a weather dashboard, I needed to display the temperature as well as humidity, wind speed, and UV index for the city that the user searched for. To do this, I used the Open Weather API in addition to Moment.js to display the current weather and the forecast for the next 5 days.

## Usage

The following image is an example of the web application's appearance and functionality:

![Image]()

## What I Did

#### Display Current Temperature

```
function searchWeather(){
    var cityName = document.getElementById('citySearch').value
    
    $.ajax({
        url:`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`,
        method:"GET"
    }).then(function(response){
        $('.cityName').html(`${response.name} <img src="http://openweathermap.org/img/wn/${response.weather[0].icon}.png" >`)
        $('#temp').html(`Temperature: ${response.main.temp} &deg;C    Feels Like: ${response.main.feels_like} &deg;C`)
        $('#humid').text(`Humidity: ${response.main.humidity} %`)
        $('#wind').text(`Wind Speed ${response.wind.speed} km/h`)
});
```

#### 5-Day Forecast

```
for(var i=0; i<5; i++){
                    
    if( i === 0){
        $('#1stDay').html(`
        <h5>${moment().add(1, 'days')._d}</h5>
        <img src="http://openweathermap.org/img/wn/${forecastList[i].weather[0].icon}.png" />
        <p> Temperature: ${forecastList[i].temp.day} &deg;C</p>
        <p>Humidity: ${forecastList[i].humidity} %</p>
        `)
    }
}
```

#### Search Function

```
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

```

#### Current time

```
$('#currentTime').html(`${moment().format("dddd, MMMM Do, h:mm a")}`)
```

## URL

See the web application [here]()

## License

MIT License

Copyright (c) 2020 Dailey Kaze

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
