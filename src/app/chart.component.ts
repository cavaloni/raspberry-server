import { Component } from '@angular/core';
import { Color } from 'ng2-charts';
import { GetStats } from './chart.service';
import mock from './mock_data';

@Component({
  selector: 'chart-thing',
  templateUrl: './chart.component.html',
  providers: [GetStats],
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  public selectedValue: string = 'house';
  name: string;
  tempLabels: string[];
  tempData: number[];
  humLabels: string[];
  humData: number[];
  loaded: boolean;
  received: object;
  type: string = 'line';
  private mock: boolean = false;

  private parseData(data) {
    let received = data.reduce((acc, cur) => {
            acc.dates.push(cur.date)
            acc.hoursMins.push(cur.hour_min)
            acc.humidity.push(cur.humidity)
            acc.temperature.push(cur.temperature * 1.8 + 32)
            return acc
        }, {
            dates: [],
            hoursMins: [],
            humidity: [],
            temperature: [],
        })
      this.tempData = received.temperature
      this.tempLabels = received.hoursMins
      this.humData = received.humidity
      this.humLabels = received.hoursMins
      this.loaded = true;
  }
  
  private parseMock(data) {
    this.tempData = data.temperature;
    this.tempLabels = data.hoursMins;
    this.loaded = true;
  }

  onChange(e) {
    this.selectedValue = e;
    this.getData();
  }

  getData() {
    if (this.selectedValue === 'house') {
      this._getStats.getMyStats()
        .subscribe(res => {
          this.parseData(res.results)
        }, err => {
          this.parseMock(mock)
          this.mock = true;
        })
    } else {
      this._getStats.getWeather()
        .subscribe(res => {
          console.log(res)
        })
    }
  }

  constructor(private _getStats: GetStats) {
    this.getData()
  }
}