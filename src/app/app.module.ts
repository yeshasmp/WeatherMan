import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { sunrise, sunset, wind, droplet, heartFill,badgeAd,github,globe,calendarDay,personCheckFill, cloudSun, linkedin, search, geoAlt } from 'ngx-bootstrap-icons';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { RoundPipe } from './round.pipe';
import { HomeComponent } from './home/home.component';
import { WeatherService } from './service/weather.service';

export function playerFactory() {
  return player;
}

const icons = {
  sunrise, sunset, wind, droplet, heartFill, badgeAd, github, globe, calendarDay, personCheckFill,cloudSun, linkedin, search, geoAlt
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    RoundPipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxBootstrapIconsModule.pick(icons),
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
