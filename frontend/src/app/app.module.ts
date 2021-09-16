import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SpeciesComponent } from './components/species/species.component';
import { OwnerComponent } from './components/owner/owner.component';
import { WildAnimalComponent } from './components/wild-animal/wild-animal.component';
import { PetComponent } from './components/pet/pet.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SpeciesComponent,
    OwnerComponent,
    WildAnimalComponent,
    PetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: OwnerComponent },
      {
        path: 'species',
        component: SpeciesComponent
      },      
      {
        path: 'wild-animal',
        component: WildAnimalComponent
      },         
      {
        path: 'pet',
        component: PetComponent
      },
    ]),
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
