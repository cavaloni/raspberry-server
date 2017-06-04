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

  outsideTemp: number;
  outsideHum: number;
  difference: number;
  space: string;

  options: object = {
    legend: {
      display: false,
    }
  }
  tempOptions: object = {
    ...this.options,
    title: {
      display: true,
      text: 'Temperature'
    }
  }

  humOptions: object = {
    ...this.options,
    title: {
      display: true,
      text: 'Humidity'
    }
  }

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
    this._getStats.getMyStats()
      .subscribe(res => {
        this.parseData(res.results)

        let bigger;
        let smaller;
        let spaceNameBig;
        console.log(this.tempData)
        if (this.outsideTemp < this.tempData[this.tempData.length - 1]) { 
          bigger = this.tempData[this.tempData.length - 1]
          smaller = this.outsideTemp;
          spaceNameBig = 'inside';
        } else {
          bigger = this.outsideTemp
          smaller = this.tempData[this.tempData.length - 1]
          spaceNameBig = 'outside';
        }

        console.log(bigger, smaller)

        this.difference = Number((bigger - smaller).toFixed(1));
        this.space = spaceNameBig;
      }, err => {
        this.parseMock(mock)
        this.mock = true;
      })
    this._getStats.getWeather()
      .subscribe(res => {
        let converted = Number((res.main.temp * (9/5) - 459.67).toFixed(2));
        this.outsideTemp = converted;
        this.outsideHum = res.main.humidity;
        
      })
  }

  constructor(private _getStats: GetStats) {
    this.getData()
  }
}