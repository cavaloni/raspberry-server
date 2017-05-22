import { Http }  from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GetStats {
    constructor (private _http: Http) {

    }

    getMyStats() {
        return this._http.get("http://99.132.152.53/getStats")
        .map(res => res.json())
        .catch((error:any) => Observable.throw(error || 'Server error'));
    }
}

// .reduce((acc, cur) => {
//             console.log(cur)
//             acc.dates.push(cur.date)
//             acc.hourMins.push(cur.hour_min)
//             acc.humidity.push(cur.humidity)
//             acc.temperature.push(cur.temperature)
//         }, {
//             dates: [],
//             hoursMins: [],
//             humidity: [],
//             temperature: [],
//         })