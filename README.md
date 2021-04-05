# WeatherMan :snowman:

Weather Man is a weather app built using Angular to provide minimalistic and easy approach to quickly search and 
display current weather, forecasts and weather alerts of a city

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

### Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/25fbfd58-ae33-4c22-aec5-48516ee0ffc3/deploy-status)](https://app.netlify.com/sites/weather-man/deploys)

The project is currently live at : https://weather-man.netlify.app/

### Features

- Current weather support
- Daily forecast weather support
- Location support using Geo Location API
- No advertisements or promotions

## Development Setup

### Prerequisites

- Install [Node.js](https://nodejs.org/en/) which includes Node Package Manager.

### Setting Up the Project

- Clone this repo: git clone https://github.com/yeshasprabhakar/WeatherMan.git(HTTPS)

- Install project dependancies: npm install

- Sign up for an API key at - https://openweathermap.org/api

- Create api.ts file under src folder and export the api key as below

        export const WEATHER_API_KEY = 'YOUR_API_KEY';

- Run `ng serve --open` for a dev server. The app will automatically reload if you change any of the source files.

- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/yeshasprabhakar/WeatherMan/blob/master/LICENSE.md)

### Credits

* Thanks to [OpenWeather](https://openweathermap.org/) for providing weather data.
* Thanks to [License: @basmilius/Meteocons](https://github.com/basmilius/weather-icons) for animated weather icons.
* Thanks to [License: @avmaisak/ngx-bootstrap-icons](https://github.com/avmaisak/ngx-bootstrap-icons) for bootstrap icons.
* Thanks to [License: @BojanMitevskii/LottieFiles](https://lottiefiles.com/28592-yoga-nature) for animation.


### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
