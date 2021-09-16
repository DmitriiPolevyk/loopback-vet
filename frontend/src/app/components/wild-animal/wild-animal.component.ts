import { Component, OnInit } from '@angular/core';
import {AnimalWithRelations} from '../../api/models/animal-with-relations';
import {WildAnimalControllerService} from '../../api/services/wild-animal-controller.service';
import {Species} from '../../api/models/species';
import {SpeciesControllerService} from '../../api/services/species-controller.service';

@Component({
  selector: 'app-wild-animal',
  templateUrl: './wild-animal.component.html',
  styleUrls: ['./wild-animal.component.css']
})
export class WildAnimalComponent implements OnInit {
  regModel: any;
  showNew: Boolean = false;
  submitType: string = 'Save';
  selectedRow: number = 0;
  wildAnimals: AnimalWithRelations[] = [];
  specieses: Species[] = [];

  constructor(
    private WildAnimalService: WildAnimalControllerService,
    private SpeciesService: SpeciesControllerService
  ) {}

  ngOnInit(): void {
    this.getWildAnimal();
  }

  getWildAnimal(): void {
    this.WildAnimalService.find({
      filter: {'filter': '{"include": ["species"]}'}
    }).subscribe(wildAnimals => {
      this.wildAnimals = wildAnimals
    });
    
  }

  onNew() {
    this.getSpecies();
    this.regModel = Object.assign({});
    this.regModel.speciesLabel = 'Select species';
    this.submitType = 'Save';
    this.showNew = true;

  }

  async onSave() {   
   const body = {
    birthday: new Date(this.regModel.birthday).toISOString(),
    vaccinated: Boolean(this.regModel.vaccinated),
    trackingId: Number(this.regModel.trackingId),
    speciesId: Number(this.regModel.speciesId),
  }
    if (this.submitType === 'Save') {
      const result = await this.WildAnimalService.create(
        {
          body
        }
      ).toPromise();   
    } else{
      const result = await this.WildAnimalService.updateById(
        {
          id: this.regModel.id,
          body
        }
      ).toPromise();         
    }
    this.getWildAnimal();
    this.showNew = false;
  }

  onEdit(index: number) {
    this.getSpecies();
    this.selectedRow = index;
    this.regModel = Object.assign({}, this.wildAnimals[this.selectedRow]);
    this.regModel.speciesLabel = this.wildAnimals[this.selectedRow].species?.label;
    this.regModel.birthday = new Date(this.regModel.birthday).toISOString().slice(0,10)
    this.submitType = 'Update';
    this.showNew = true;
  }

  async onDelete(index: number) {
    this.selectedRow = index;
    this.regModel = Object.assign({}, this.wildAnimals[this.selectedRow]);
    await this.WildAnimalService.deleteById(
      {
        id: this.regModel.id,
      }
    ).toPromise();
    this.getWildAnimal();
  }

  onCancel() {
    this.showNew = false;
  }

  getSpecies(): void {
    this.SpeciesService.find().subscribe(specieses => (this.specieses = specieses));
  }

  onChangeSpecies(species: Species) {
    this.regModel.species = species;
    this.regModel.speciesId = species.id; 
    this.regModel.speciesLabel = species.label;   
  }

}
