import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FormGroup, NgForm, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  location = {
    city: 'Baku',
    country: 'az'
  };
  days = [
    {day: '0'},
    {day: '0'},
    {day: '0'},
    {day: '0'},
    {day: '0'}
  ];
  chosenDate;
  weatherList: [];
  regionForm: FormGroup;
  value;
  active;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.getAllWeather();
    this.isActive(0);

    this.regionForm = new FormGroup({
      city : new FormControl(this.location.city, Validators.required),
      country : new FormControl(this.location.country, Validators.required)
    });
  }

  getAllWeather() {
    this.value = localStorage.getItem('location');

    if (this.value != null) {
      this.location = JSON.parse(this.value);
    }

    this.weatherService.getWeather(this.location.city, this.location.country)
    .subscribe(
      data => {
        this.days[0].day = data.list[0].dt_txt;
        this.days[1].day = data.list[8].dt_txt;
        this.days[2].day = data.list[16].dt_txt;
        this.days[3].day = data.list[32].dt_txt;
        this.days[4].day = data.list[39].dt_txt;
        if (!this.chosenDate) {
          this.chosenDate = this.days[0].day.substring(0, 10);
        }
        this.weatherList = data.list.filter((list) => list.dt_txt.substring(0, 10) === this.chosenDate);
        // console.log(this.weatherList + '21323');
      }
    );
  }

  search(formValue) {
    const location = {
      city: formValue.city,
      country: formValue.country
    };

    localStorage.setItem('location', JSON.stringify(location));
    this.getAllWeather();
  }

  filter(day) {
    this.chosenDate = day.toString().substring(0, 10);
    this.getAllWeather();
  }

  isActive(i) {
    this.active = i;
  }

filterAndActive(day, i) {
  this.filter(day);
  this.isActive(i);
}

}
