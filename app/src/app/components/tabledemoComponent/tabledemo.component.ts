import { Component, Input, AfterViewInit, ViewChild, OnInit, OnChanges, Output, EventEmitter, Renderer2, ElementRef } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { MatTableModule, MatTableDataSource, ThemePalette, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { dashboardService } from '../../services/dashboard/dashboard.service';
import { reportlistserviceService } from '../../services/reportlistservice/reportlistservice.service';
// import { tablepaginationserviceService } from '../../services/tablepaginationservice/tablepaginationservice.service'
import { mappingserviceService } from '../../services/mappingservice/mappingservice.service';
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
    // @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @Output() getSelectedRows = new EventEmitter();
    selectedRowIndex = -1;
    totalCount = 50;
    dataSource: MatTableDataSource<{}>;
    array = [];
    @ViewChild('one', { static: false }) d1: ElementRef;
    currntPageNum = 1;
    pager = [];
    paginatorIndex = 0;
    page_Index;
    totalLeads = 0;
    constructor(private bdms: NDataModelService,  private renderer: Renderer2, private el: ElementRef) {
        super();
        this.mm = new ModelMethods(bdms);

    }
    ngOnInit() {
        for (const column of this.sqColumnDefinition) {
            this.columnNames.push(column.name);
        }
        // Condition to add selection column to the table
        if (this.enableCheckbox) {
            this.columnNames.splice(9, 0, 'select');
            this.sqColumnDefinition.splice(9, 0, {
                'name': 'select',
                'displayName': '#'
            });
        }

    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        console.log(this.paginator)
    }

    ngOnChanges() {
        this.dataSource = new MatTableDataSource(this.rowData);
        this.dataSource.paginator = this.paginator;
        // this.setMatTable();
        
    }
    rowSelect() {
        this.getSelectedRows.emit(this.selection.selected );
    }

    // PagerItem

    
   
}


