import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'WeatherMan';
  currentWeather;
  forecastWeather;
  latitude;
  longitude;
  sunrise;
  sunset;
  currentDay;
  inputLocation;
  currentWeatherIcon: string;
  forecastWeatherIcons: string[] = [];
  forecastDays: string[] = [];
  bottomWidth;
  displayWeather : boolean;
  geoLatitude;
  geoLongitude;
  geoCity;
  options: AnimationOptions = {
    path: '/assets/yoga-nature.json',
  };

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    // Handle Footer design
    this.displayWeather = true;
    if (this.displayWeather) {
      this.bottomWidth = "280px";
    }
  }

  // Get geo location
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geoLatitude = position.coords.latitude;
        this.geoLongitude = position.coords.longitude;
        this.weatherService.getGeoLocationWeather(this.geoLatitude, this.geoLongitude).subscribe(data => {
          if (data) {
            this.geoCity = data.name;
            this.showWeather(this.geoCity); // Call show weather and pass city
          }
        });
      },
        error => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.");
              break;
            default:
              alert("An unknown error occurred.");
              break;
          }
        });
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  // Call showWeather on Enter 
  searchWeather(event){
    if(event.keyCode == 13){
      this.showWeather(event.target.value);
    }
  }

  // Get current and forecast weather
  showWeather(location: string) {
    this.weatherService.getCurrentWeather(location).subscribe(data => {

      if (data) {
        this.displayWeather = false;
        this.bottomWidth = "8px"
      }

      // Get current weather data
      this.currentWeather = Array.of(data);
      // console.log("Current weather : ", data); // Log current weather data

      // Get current Weather animation icon
      this.currentWeatherIcon = this.getAnimatedIcon(data.weather[0].description, this.getCurrentHour());

      // Get sunrise and sunset
      this.sunrise = this.sunTimeConverter(data.sys.sunrise);
      this.sunset = this.sunTimeConverter(data.sys.sunset);

      // Get current day and weekday
      this.currentDay = this.getDay(data.dt);

      // Get forecast weather data
      this.latitude = data.coord.lat;
      this.longitude = data.coord.lon;
      this.weatherService.getDailyForecast(this.latitude, this.longitude).subscribe(data => {
        this.forecastWeather = Array.of(data);
        // console.log("Forecast Data : ", data); // Log forecast weather data

        // Get forecast Icons
        for (let i = 0; i < 6; i++) {
          this.forecastWeatherIcons[i] = this.getAnimatedIcon(data.daily[i].weather[0].description, this.getCurrentHour());
        }

        // Get forecast Days
        for (let i = 0; i < 6; i++) {
          this.forecastDays[i] = this.getForecastDay(data.daily[i].dt);
        }
      })
      //  Handle errors
    }, err => {
      if (err.error && err.error.message) {
        alert(err.error.message);
        return;
      }
      alert('Failed to get weather.');
    }, () => {
    });
  }

  // Get sunrise adn sunset time
  sunTimeConverter(unixTimestamp) {
    var date = new Date(unixTimestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
  }

  // Get date and weekday
  getDay(unixTimestamp) {
    const dateObject = new Date(unixTimestamp * 1000);
    return dateObject.toLocaleString("en-IN", { day: "2-digit", month: "2-digit", weekday: "long" }) // day, dd/mm
  }

  // Get forecast days 
  getForecastDay(unixTimestamp) {
    const dateObject = new Date(unixTimestamp * 1000);
    return dateObject.toLocaleString("en-IN", { weekday: "long" }) // day
  }

  // Get current hour
  getCurrentHour() {
    var current = new Date();
    return current.getHours();
  }

  // Get animated icon 
  getAnimatedIcon(description, time) {
    if (time < 18) {
      if (description.match("clear sky")) {
        return "assets/animation-ready/clear-day.svg";
      }
      else if (description.match("few clouds")) {
        return "assets/animation-ready/partly-cloudy-day.svg";
      }
      else if (description.includes("clouds")) {
        return "assets/animation-ready/cloudy.svg";
      }
      else if (description.match("shower rain")) {
        return "assets/animation-ready/partly-cloudy-day-hail.svg";
      }
      else if (description.includes("rain")) {
        return "assets/animation-ready/partly-cloudy-day-rain.svg";
      }
      else if (description.includes("thunderstorm")) {
        return "assets/animation-ready/thunderstorms.svg";
      }
      else if (description.includes("snow")) {
        return "assets/animation-ready/partly-cloudy-day-snow.svg";
      }
      else if (description.includes("drizzle")) {
        return "assets/animation-ready/partly-cloudy-day-drizzle.svg";
      }
      else if (description.includes("mist")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("smoke")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("haze")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("sand/ dust whirls")) {
        return "assets/animation-ready/wind.svg";
      }
      else if (description.includes("dust")) {
        return "assets/animation-ready/wind.svg";
      }
      else if (description.includes("sand")) {
        return "assets/animation-ready/wind.svg";
      }
      else if (description.includes("fog")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("volcanic ash")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("squalls")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("tornado")) {
        return "assets/animation-ready/tornado.svg";
      }
    }
    else {
      if (description.match("clear sky")) {
        return "assets/animation-ready/clear-night.svg";
      }
      else if (description.match("few clouds")) {
        return "assets/animation-ready/partly-cloudy-night.svg";
      }
      else if (description.includes("clouds")) {
        return "assets/animation-ready/cloudy.svg";
      }
      else if (description.match("shower rain")) {
        return "assets/animation-ready/partly-cloudy-night-hail.svg";
      }
      else if (description.includes("rain")) {
        return "assets/animation-ready/partly-cloudy-night-rain.svg";
      }
      else if (description.includes("thunderstorm")) {
        return "assets/animation-ready/thunderstorms.svg";
      }
      else if (description.includes("snow")) {
        return "assets/animation-ready/partly-cloudy-night-snow.svg";
      }
      else if (description.includes("drizzle")) {
        return "assets/animation-ready/partly-cloudy-night-drizzle.svg";
      }
      else if (description.includes("mist")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("smoke")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("haze")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("sand/ dust whirls")) {
        return "assets/animation-ready/wind.svg";
      }
      else if (description.includes("dust")) {
        return "assets/animation-ready/wind.svg";
      }
      else if (description.includes("sand")) {
        return "assets/animation-ready/wind.svg";
      }
      else if (description.includes("fog")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("volcanic ash")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("squalls")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("tornado")) {
        return "assets/animation-ready/tornado.svg";
      }
    }
  }

}
