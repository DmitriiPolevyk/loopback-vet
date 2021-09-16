import { Component, OnInit } from '@angular/core';
import {AnimalWithRelations} from '../../api/models/animal-with-relations';
import {PetControllerService} from '../../api/services/pet-controller.service';
import {Species} from '../../api/models/species';
import {SpeciesControllerService} from '../../api/services/species-controller.service';
import {Owner} from '../../api/models/owner';
import {OwnerControllerService} from '../../api/services/owner-controller.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  regModel: any;
  showNew: Boolean = false;
  submitType: string = 'Save';
  selectedRow: number = 0;
  pets: AnimalWithRelations[] = [];
  specieses: Species[] = [];
  owners: Owner[] = [];

  constructor(
    private PetService: PetControllerService,
    private SpeciesService: SpeciesControllerService,
    private OwnerService: OwnerControllerService
  ) {}

  ngOnInit(): void {
    this.getPets();
  }

  getPets(): void {
    this.PetService.find({
      filter: {'filter': '{"include": ["species", "owner"]}'}
    }).subscribe(pets => {
      this.pets = pets
    });
    
  }

  onNew() {
    this.getSpecies();
    this.getOwners();
    this.regModel = Object.assign({});
    this.regModel.speciesLabel = 'Select species';
    this.regModel.ownerLabel = 'Select owner';
    this.submitType = 'Save';
    this.showNew = true;

  }

  async onSave() {   
   const body = {
    birthday: new Date(this.regModel.birthday).toISOString(),
    vaccinated: Boolean(this.regModel.vaccinated),    
    speciesId: Number(this.regModel.speciesId),
    ownerId: Number(this.regModel.ownerId),
  }
    if (this.submitType === 'Save') {
      const result = await this.PetService.create(
        {
          body
        }
      ).toPromise(); 
    } else{
      const result = await this.PetService.updateById(
        {
          id: this.regModel.id,
          body
        }
      ).toPromise();        
    }
    this.getPets();
    this.showNew = false;
  }

  onEdit(index: number) {
    this.getSpecies();
    this.getOwners();
    this.selectedRow = index;
    this.regModel = Object.assign({}, this.pets[this.selectedRow]);
    this.regModel.speciesLabel = this.pets[this.selectedRow].species?.label;
    this.regModel.ownerLabel = this.pets[this.selectedRow].owner?.fullName;
    this.regModel.birthday = new Date(this.regModel.birthday).toISOString().slice(0,10)
    this.submitType = 'Update';
    this.showNew = true;
  }

  async onDelete(index: number) {
    this.selectedRow = index;
    this.regModel = Object.assign({}, this.pets[this.selectedRow]);
    await this.PetService.deleteById(
      {
        id: this.regModel.id,
      }
    ).toPromise();
    this.getPets();
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

  getOwners(): void {
    this.OwnerService.find().subscribe(owners => {
      this.owners = owners
    });    
  }

  onChangeOwner(owner: Owner) {
    this.regModel.owner = owner;
    this.regModel.ownerId = owner.id;
    this.regModel.ownerLabel = owner.fullName;
  }

}
