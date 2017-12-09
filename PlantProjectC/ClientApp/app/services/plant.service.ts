import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Plant } from '../shared/app.models';

@Injectable()
export class PlantService {
    constructor(private http: Http) { }

    public insertPlant(plant: Plant) {
        return this.http.post("api/plants", plant);
    }

    public getPlants() {
        return this.http.get("http://localhost:59421/api/Plant/GetPlants");
    }
}