/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit,ViewChild } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormControl } from '@angular/forms';
import { MatTableDataSource,MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';





@Component({
    selector: 'bh-reportgrouplist',
    templateUrl: './reportgrouplist.template.html'
})

export class reportgrouplistComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
      @ViewChild(MatSort,{static:true}) sort: MatSort;
      @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;





    
people = [
    {
      name: 'Finance',
      id: 1,
      colour: 'Green',
      pet: ''
    },

    {
      name: 'Finance',
      id: 1,
      colour: 'Green',
      pet: ''
    },
    {
      name: 'Finance',
      id: 1,
      colour: 'Green',
      pet: ''
    },
    {
      name: 'Sales',
      id: 2,
      colour: 'Purple',
      pet: ''
    },
    {
      name: 'Actuarial',
      id: 3,
      colour: 'Blue',
      pet: ''
    },
    {
      name: 'Management',
      id: 4,
      colour: 'Orange',
      pet: ''
    }
  ];

  nameFilter = new FormControl('');
  idFilter = new FormControl('');
  colourFilter = new FormControl('');
  dataSource = new MatTableDataSource(this.people);
  columnsToDisplay = ['name', 'id', 'favouriteColour', 'pet'];
  filterValues = {
    name: '',
    id: '',
    colour: '',
    pet: ''
  };

 constructor(private bdms: NDataModelService) {
        super();
        this.mm = new ModelMethods(bdms);
    this.dataSource.data = this.people;
    this.dataSource.filterPredicate = this.createFilter();

    }

    ngOnInit() {
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;


        this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.idFilter.valueChanges
      .subscribe(
        id => {
          this.filterValues.id = id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.colourFilter.valueChanges
      .subscribe(
        colour => {
          this.filterValues.colour = colour;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
   
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
        && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
    }
    return filterFunction;
  }


    }

    

