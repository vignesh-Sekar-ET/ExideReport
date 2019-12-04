/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, Input, AfterViewInit, ViewChild, OnInit, OnChanges, Output, EventEmitter } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { MatTableModule, MatTableDataSource, MatSort, ThemePalette, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';
import 'rxjs';

// import { TablePaginationSettingsModel, ColumnSettingsModel } from './table-settings.model';

/**
 * Service import Example :
 * import { HeroService } from '../../services/hero/hero.service';
 */

/**
* 
* Serivice Designer import Example - Service Name - HeroService
* import { HeroService } from 'app/sd-services/HeroService';
*/

@Component({
    selector: 'bh-tabledemo',
    templateUrl: './tabledemo.template.html'
})


export class tabledemoComponent extends NBaseComponent implements OnChanges, AfterViewInit, OnChanges {
    mm: ModelMethods;
    selection = new SelectionModel<{}>();
    form: FormGroup;
    @Input() rowData: any;
    @Input() enableCheckbox: boolean;
    // @Input() formControl:any
    @Input() sqColumnDefinition: any;
    @Input() sqPaginationConfig: any;
    columnNames: string[] = [];
    formcontrolval: any = [];
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @Output() getSelectedRows = new EventEmitter();
    selectedRowIndex = -1;
    dataSource: MatTableDataSource<{}>;
    filterData = [];

    // console.log(this.rowData);

    constructor(private bdms: NDataModelService, private fb: FormBuilder) {
        super();
        this.mm = new ModelMethods(bdms);

        //          dataSource: this.rowData;
        // console.log(this.rowData);
    }


    ngOnInit() {
        for (const column of this.sqColumnDefinition) {
            this.columnNames.push(column.name);
        }
         console.log("toggle"+this.columnNames)
        // Condition to add selection column to the table
        if (this.enableCheckbox) {
             this.columnNames.splice(9, 0, 'Active/Inactive');

            this.columnNames.splice(9, 0, 'select');
            // console.log(this.columnNames)
            this.sqColumnDefinition.splice(9, 0, {
                'name': 'select',
                'displayName': 'Select'
        
            });

             this.sqColumnDefinition.splice(9, 0, {
                'name': 'Active/Inactive',
                'displayName': 'Active/Inactive'
        
            });

        }

        for (let i = 0; i < this.sqColumnDefinition.length - 1; i++) {
            this.formcontrolval.push(this.sqColumnDefinition[i].formcontrol)
        }
        this.dataSource.data = this.rowData;
        // console.log(this.dataSource.data)
        this.dataSource.filterPredicate = this.createFilter();
        // console.log(this.dataSource.filterPredicate)

        this.form = this.fb.group({
        });


        this.dataSource = new MatTableDataSource(this.rowData);
    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }


    ngAfterViewInit() {

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.sort)
    }
    ngOnChanges() {
        console.log("change")
        this.dataSource = new MatTableDataSource(this.rowData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    rowSelect(i) {
        this.getSelectedRows.emit(this.selection.selected);
    }
    createFilter(): (data: any, filter: string) => boolean {
        let filterFunction = function (data, filter): boolean {
            let searchTerms = JSON.parse(filter);
            return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
                && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
                && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
                && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
        }
        return filterFunction;
    }

    // search(term: string) {
    //     console.log(term)
    //     if (!term) {
    //         this.dataSource = this.rowData;
    //         console.log(this.dataSource)
    //     }
    //     else {
    //         //this.dataSource = this.rowData.filter(x => x.Groupname.toLowerCase().includes(term.toLowerCase()));
           
    // this.dataSource.filter = term.trim().toLowerCase();
    //             this.dataSource = this.rowData.filter.trim().toLowerCase();

  
    //     }
    // }

    applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
