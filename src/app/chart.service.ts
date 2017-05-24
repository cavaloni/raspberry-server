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
        // .catch((error:any) => Observable.throw(error || 'Server error'));
    }
}

