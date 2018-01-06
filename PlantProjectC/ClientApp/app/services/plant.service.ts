import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Plant, Family, Genus, Conservation, ResponseModel } from '../shared/app.models';

const baseUrl = "http://localhost:59421";
@Injectable()
export class PlantService {
    constructor(private http: HttpClient) { }


    public addPlant(plant: Plant) {
        return this.http.post<ResponseModel>(baseUrl + "/api/Plant", plant);
    }

    public editPlant(plant: Plant) {
        return this.http.put<ResponseModel>(baseUrl + "/api/Plant", plant);
    }

    public getPlants(name?: string) {
        return this.http.get<Plant[]>(baseUrl + "/api/Plant/?name=" + name);
    }

    public getPlant(id: number) {
        return this.http.get<Plant>(baseUrl + "/api/Plant/" + id);
    }

    public deletePlant(id: number) {
        return this.http.delete(baseUrl + "/api/Plant/" + id);
    }

    public getFamilies() {
        return this.http.get<Family[]>(baseUrl + "/api/Family");
    }

    public addFamily(family: Family) {
        return this.http.post<ResponseModel>(baseUrl + "/api/Family", family);
    }

    public deleteFamily(id: number) {
        return this.http.delete(baseUrl + "/api/Family/" + id);
    }

    public getGenus() {
        return this.http.get<Genus[]>(baseUrl + "/api/Genus");
    }

    public addGenus(genus: Genus) {
        return this.http.post<ResponseModel>(baseUrl + "/api/Genus", genus);
    }

    public deleteGenus(id: number) {
        return this.http.delete(baseUrl + "/api/Genus/" + id);
    }

    public getConservations() {
        return this.http.get<Conservation[]>(baseUrl + "/api/Conservation");
    }
}