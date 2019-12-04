/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit,ViewChild,ElementRef,Input} from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms";


@Component({
    selector: 'bh-reportconfigcreate',
    templateUrl: './reportconfigcreate.template.html'
})

export class reportconfigcreateComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
   @ViewChild('multiSelect', { static: true }) multiSelect;
  public form: FormGroup;
  public loadContent: boolean = false;
  public name = 'Cricketers';
  public data = [];
  public settings = {};
  public selectedItems = [];
  state = [
        { value: 'daily', viewValue: 'Daily' },
        { value: 'weekly', viewValue: 'Weekly' },
        { value: 'monthly', viewValue: 'Monthly' },
    ];


  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 12 };

  onChangeHour(event) {
    console.log('event', event);
  }

    constructor(private bdms: NDataModelService) {
        super();
        this.mm = new ModelMethods(bdms);
    }

    ngOnInit() {
       this.data = [
      { item_id: 1, item_text: 'Finance Executive' },
      { item_id: 2, item_text: 'Sales Manager' },
      { item_id: 3, item_text: 'Report Executive' },
      { item_id: 4, item_text: 'Finance ' },
      { item_id: 5, item_text: 'Sales' }
    ];

   this.settings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: false,
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: 'Search',
      noDataAvailablePlaceholderText: 'Search',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    this.setForm();
    }
     public setForm() {
    this.form = new FormGroup({
      name: new FormControl(this.data, Validators.required)
    });
    this.loadContent = true;
  }
    get f() { return this.form.controls; }

//   public save() {
//     console.log(this.form.value);
//   }

//   public resetForm() {
//     // beacuse i need select all crickter by default when i click on reset button.
//     this.setForm();
//     // this.multiSelect.toggleSelectAll();
//     // i try below variable isAllItemsSelected reference from your  repository but still not working
//     // this.multiSelect.isAllItemsSelected = true;
//   }

  public onFilterChange(item: any) {
    console.log(item);
  }
  public onDropDownClose(item: any) {
    console.log(item);
  }

  public onItemSelect(item: any) {
    console.log(item);
  }
  public onDeSelect(item: any) {
    console.log(item);
  }

//   public onSelectAll(items: any) {
//     console.log(items);
//   }
//   public onDeSelectAll(items: any) {
//     console.log(items);
//   }


   }

  


