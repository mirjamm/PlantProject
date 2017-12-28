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
    name: string;
    latinName: string;
    selectedFamily: string;
    selectedGenus: string;
    selectedConservation: string;
    errorMessage: string;
    successMessage: string;
    isErrorMessage: boolean;

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
        this.isErrorMessage = false;
        this.plantService.addPlant({
            name: this.name,
            latinName: this.latinName,
            family: this.selectedFamily,
            genus: this.selectedGenus,
            conservation: this.selectedConservation
        }).subscribe(res => {
            if (res.isError) {
                this.isErrorMessage = true;
                this.errorMessage = res.errorMessage;
            } else {
                this.successMessage = "Successfully saved changes.";
                setTimeout(() => {
                    this.router.navigate(['plants']);
                }, 1500)
            }
        }, error => {
            this.errorMessage = error.message;
            console.log("er " + error.message)
        });
    }

    public cancel() {
        this.router.navigate(['plants']);
    }
}