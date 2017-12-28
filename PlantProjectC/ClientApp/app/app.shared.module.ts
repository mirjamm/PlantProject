import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { PlantComponent } from './components/plant/plant.component';
import { PlantService } from './services/plant.service';
import { NewPlantComponent } from './components/newplant/newplant.component';
import { EditPlantComponent } from './components/editplant/editplant.component';
import { FamilyComponent } from './components/family/family.component';
import { GenusComponent } from './components/genus/genus.component';

import { PlatformRef } from '@angular/core';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        PlantComponent,
        HomeComponent,
        NewPlantComponent,
        EditPlantComponent,
        FamilyComponent,
        GenusComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'plants', component: PlantComponent },
            { path: 'newplant', component: NewPlantComponent },
            { path: 'editplant/:id', component: EditPlantComponent },
            { path: 'family', component: FamilyComponent },
            { path: 'genus', component: GenusComponent },
            { path: '**', redirectTo: 'home' }

        ])
    ],
    providers: [PlantService, PlatformRef],
})
export class AppModuleShared {
}
