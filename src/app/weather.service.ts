import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = 'ba6398358df2cbb3851e23822c501c47';
  url;

  constructor(private http: Http) {
   this.url = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  }

  getWeather(city: string, country: string) {
    return this.http.get(this.url + city + ',' + country + '&APPID=' + this.apiKey)
    .pipe(
      map( res => {
        return res.json();
      })
    );
  }
}
