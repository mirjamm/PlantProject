import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Family, Genus, Conservation, Plant } from '../../shared/app.models';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
    selector: 'editplant',
    templateUrl: './editplant.component.html',
    styleUrls: ['./editplant.component.css']
})
export class EditPlantComponent implements OnInit {
    families: Family[];
    genus: Genus[];
    conservations: Conservation[];
    name: string;
    selectedFamily: string;
    selectedGenus: string;
    selectedConservation: string;
    latinName: string;
    id?: number;
    private sub: any;
    plant: Plant;
    errorMessage: string;
    successMessage: string;
    isErrorMessage: boolean;

    constructor(private route: ActivatedRoute, private plantService: PlantService, private router: Router) {

    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.plantService.getPlant(params.id).subscribe(data => {
                this.plant = data;
                console.log(data);
                this.id = this.plant.id;
                this.selectedFamily = this.plant.family;
                this.selectedConservation = this.plant.conservation;
                this.selectedGenus = this.plant.genus;
                this.name = this.plant.name;
                this.latinName = this.plant.latinName;
            });

        });

        this.getFamilies();
        this.getGenus();
        this.getConservation();

    }

    public getFamilies() {
        this.plantService.getFamilies().subscribe(data => {
            this.families = data;
            this.families.unshift({
                name: '--Select--',
                id: 0
            });
        });
       
    }

    public getGenus() {
        this.plantService.getGenus().subscribe(data => this.genus = data);
    }

    public getConservation() {
        this.plantService.getConservations().subscribe(data => this.conservations = data);
    }

    public save() {
        this.isErrorMessage = false;
        this.plantService.editPlant({
            id: this.id,
            name: this.name,
            latinName: this.latinName,
            family: this.selectedFamily,
            genus: this.selectedGenus,
            conservation: this.selectedConservation
        }).subscribe(res => {
            console.log(res)
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