import { Http }  from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GetStats {
    key = '3705739aafef9020c223eba561c6c82c';
    constructor (private _http: Http) {

    }

    getWeather() {
        return this._http.get(`http://api.openweathermap.org/data/2.5/weather?zip=95060,us&appid=${this.key}`)
        .map(res => res.json())
    }

    getMyStats() {
        return this._http.get("http://99.132.152.53/getStats")
        .map(res => res.json())
        // .catch((error:any) => Observable.throw(error || 'Server error'));
    }


}

