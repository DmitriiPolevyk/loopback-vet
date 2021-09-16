import { Component, OnInit } from '@angular/core';
import {AddressControllerService} from '../../api/services/address-controller.service';
import {OwnerAddressControllerService} from '../../api/services/owner-address-controller.service';
import {OwnerControllerService} from '../../api/services/owner-controller.service';
import { NewOwner } from '../../api/models/new-owner';
import { NewAddressInOwner } from '../../api/models/new-address-in-owner';
import { OwnerWithRelations } from '../../api/models/owner-with-relations';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  regModel: any;
  showNew: Boolean = false;
  submitType: string = 'Save';
  selectedRow: number = 0;
  ownersWithRelations: OwnerWithRelations[] = [];
  alert: string = '';
  constructor(
    private AddressService: AddressControllerService,
    private OwnerAddressService: OwnerAddressControllerService,
    private OwnerService: OwnerControllerService
    ) {}

  ngOnInit(): void {
    this.getOwnersWithRelations();
  }

  async getOwnersWithRelations() {
    const owners = await this.OwnerService.find({
      filter: {'filter': '{"include": ["address"]}'}
    }).subscribe(ownersWithRelations => (this.ownersWithRelations = ownersWithRelations))
  }

  onNew() {
    this.regModel = Object.assign({address: {}});
    this.submitType = 'Save';
    this.showNew = true;
  }

  async onSave(): Promise<boolean> { 
    this.alert = '';
    if(!this.regModel.fullName || !this.regModel.address.country || 
      !this.regModel.address.city || !this.regModel.address.street ||
      !this.regModel.address.zipCode
    ){
        this.alert = 'Please fill all fields!';
        return false;
    }
    const owner: NewOwner = { fullName: this.regModel.fullName };
    const addressInOwner: NewAddressInOwner = {
      country: this.regModel.address.country,
      city: this.regModel.address.city,
      street: this.regModel.address.street,
      zipCode: this.regModel.address.zipCode,
    }
    if (this.submitType === 'Save') {      
      const resultOwner = await this.OwnerService.create(
        {
          body: owner
        }
      ).toPromise();
      if(resultOwner && resultOwner.id){
        const addressResult = await this.OwnerAddressService.create(
          {
            id: resultOwner.id,
            body: addressInOwner
          }
        ).toPromise();
      }
    } else{
      await this.OwnerService.updateById(
        {
          id: this.regModel.id,
          body: owner
        }
      ).toPromise(); 

      await this.AddressService.updateById(
        {
          id: this.regModel.address.id,
          body: addressInOwner
        }
      ).toPromise();  

    }
    this.getOwnersWithRelations();
    this.showNew = false;
    return true;
  }

  onEdit(index: number) {
    this.selectedRow = index;
    this.regModel = Object.assign({}, this.ownersWithRelations[this.selectedRow]);
    if(!this.regModel.address){
      this.regModel.address = Object.assign({address: {}});
    }
    this.submitType = 'Update';
    this.showNew = true;
  }

  async onDelete(index: number) {
    this.selectedRow = index;
    this.regModel = Object.assign({}, this.ownersWithRelations[this.selectedRow]);
    await this.OwnerService.deleteById(
      {
        id: this.regModel.id,
      }
    ).toPromise();
    await this.AddressService.deleteById(
      {
        id: this.regModel.address.id,
      }
    ).toPromise();
    this.getOwnersWithRelations();
  }

  onCancel() {
    this.showNew = false;
  }

}
