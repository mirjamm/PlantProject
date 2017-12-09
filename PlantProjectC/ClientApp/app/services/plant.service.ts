import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Plant } from '../shared/app.models';

@Injectable()
export class PlantService {
    constructor(private http: Http) { }
    public baseUrl = "http://localhost:59421";

    public insertPlant(plant: Plant) {
        return this.http.post(this.baseUrl + "api/plants", plant);
    }

    public getPlants() {
        return this.http.get(this.baseUrl + "/api/Plant/GetPlants");
    }
    public getFamilies() {
        return this.http.get(this.baseUrl + "/api/Plant/GetFamilies");
    }

    public getGenus() {
        return this.http.get(this.baseUrl + "/api/Plant/GetGenus");
    }
}