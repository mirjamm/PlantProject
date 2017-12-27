import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Family, Genus, Conservation } from '../../shared/app.models';
import { Router } from '@angular/router';

@Component({
    selector: 'newplant',
    templateUrl: './newplant.component.html',
    styleUrls: ['./newplant.component.css']
})
export class NewPlantComponent implements OnInit {

    families: Family[];
    genus: Genus[];
    conservations: Conservation[];
    name = '';
    latinName = '';
    selectedFamily: Family;
    selectedGenus: Genus;
    selectedConservation: Conservation;

    ngOnInit(): void {
        this.getFamilies();
        this.getGenus();
        this.getConservation();
    }
    constructor(private plantService: PlantService, private router: Router) {

    }
    public getFamilies() {
        this.plantService.getFamilies().subscribe(data => this.families = data);
    }

    public getGenus() {
        this.plantService.getGenus().subscribe(data => this.genus = data);
    }

    public getConservation() {
        this.plantService.getConservations().subscribe(data => this.conservations = data);
    }

    public addPlant() {
        this.plantService.addPlant({
            name: this.name,
            latinName: this.latinName,
            family: this.selectedFamily.name,
            genus: this.selectedGenus.name,
            conservation: this.selectedConservation.name
        }).subscribe(res => {
            this.router.navigate(['plants']);
        }, error => {
            console.log("er " + error.message)
        });
    }
}