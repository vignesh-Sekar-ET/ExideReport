import { Component, Input, AfterViewInit, ViewChild, OnInit, OnChanges, Output, EventEmitter, Renderer2, ElementRef } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { MatTableModule, MatTableDataSource, MatSort, ThemePalette, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { dashboardService } from '../../services/dashboard/dashboard.service';
import { reportlistserviceService } from '../../services/reportlistservice/reportlistservice.service';

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
    @Input() rowData: object[];
    @Input() enableCheckbox: boolean;
    @Input() sqColumnDefinition: any;
    @Input() sqPaginationConfig: any;
    columnNames: string[] = [];
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @Output() getSelectedRows = new EventEmitter();
    selectedRowIndex = -1;
    dataSource: MatTableDataSource<{}>;

    array = [];
    //create custom element
    @ViewChild('one', { static: false }) d1: ElementRef;
    //Custom Paging Declaration Here

    /***** */
    pages = [];
    pageLimit = 10;
    pageNeighbours = 1;
    props:any;
    totalRecords=50;
    totalCountries;
    /*** */
    constructor(private bdms: NDataModelService, private ser: dashboardService,private reportlist:reportlistserviceService, private renderer: Renderer2, private el: ElementRef) {
        super();
        this.mm = new ModelMethods(bdms);
       
    }
    range = (from, to, step = 1) => {
        let i = from;
        let range = []
        while (i <= to) {
            range.push(i);
            i += step;
            console.log(range)
        }
        return range;
    }

    ngOnInit() {


        for (const column of this.sqColumnDefinition) {
            this.columnNames.push(column.name);
        }
        // Condition to add selection column to the table
        if (this.enableCheckbox) {
            this.columnNames.splice(9, 0, 'Select');
            this.sqColumnDefinition.splice(9, 0, {
                'name': 'Select',
                'displayName': '#'
            });
        }
        this.dataSource = new MatTableDataSource(this.rowData);
    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;

        

    }

    ngOnChanges() {
      this.dataSource = new MatTableDataSource(this.rowData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    rowSelect(rowid) {
      this.getSelectedRows.emit( this.selection.selected);

       this.reportlist.selectedGroupId = rowid;
    }
   
   
    paginationClicked(event) {
        console.log(event)
    }
    //  search(term: string) {
    //     console.log(term)
    //     if (!term) {
    //         this.reportlist.groupList = this.rowData;
    //     }
    //     else {
    //         this.reportlist.groupList = this.rowData.filter(x => x.Groupname.toLowerCase().includes(term.toLowerCase()));
    //     }
    // }

   
   

   
}
