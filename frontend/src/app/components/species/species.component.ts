import { Component, OnInit } from '@angular/core';
import {Species} from '../../api/models/species';
import {SpeciesControllerService} from '../../api/services/species-controller.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {
  regModel: any;
  showNew: Boolean = false;
  submitType: string = 'Save';
  selectedRow: number = 0;
  specieses: Species[] = [];
  constructor(private SpeciesService: SpeciesControllerService) {}

  ngOnInit(): void {
    this.getSpecies();
  }

  getSpecies(): void {
    this.SpeciesService.find().subscribe(specieses => (this.specieses = specieses));
  }

  onNew() {
    this.regModel = Object.assign({});
    this.submitType = 'Save';
    this.showNew = true;
  }

  async onSave() {    
    if (this.submitType === 'Save') {
      const result = await this.SpeciesService.create(
        {
          body: this.regModel
        }
      ).toPromise();    
    } else{
      const result = await this.SpeciesService.updateById(
        {
          id: this.regModel.id,
          body: this.regModel
        }
      ).toPromise();         
    }
    this.getSpecies();
    this.showNew = false;
  }

  onEdit(index: number) {
    this.selectedRow = index;
    this.regModel = Object.assign({}, this.specieses[this.selectedRow]);
    this.submitType = 'Update';
    this.showNew = true;
  }

  async onDelete(index: number) {
    this.selectedRow = index;
    this.regModel = Object.assign({}, this.specieses[this.selectedRow]);
    await this.SpeciesService.deleteById(
      {
        id: this.regModel.id,
      }
    ).toPromise();
    this.getSpecies();
  }

  onCancel() {
    this.showNew = false;
  }

}
