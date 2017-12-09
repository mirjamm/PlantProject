import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { PlantService } from '../../services/plant.service';
import { Family, Genus } from '../../shared/app.models';

@Component({
    selector: 'newplant',
    templateUrl: './newplant.component.html',
    styleUrls: ['./newplant.component.css']
})
export class NewplantComponent {
    constructor(private plantService: PlantService) {
        this.getFamilies();
        this.getGenus();
    }
    families: Family[];
    genus: Genus[];
    name: string = '';
    selectedFamily: Family;

    public getFamilies() {
        this.plantService.getFamilies().subscribe(result => {
            this.families = result.json() as Family[];
        });
    }

    public getGenus() {
        this.plantService.getGenus().subscribe(result => {
            this.genus = result.json() as Genus[];
        });
    }

    public addPlant() {
        console.log("add " + this.name + " " + this.selectedFamily.id)
    }
}