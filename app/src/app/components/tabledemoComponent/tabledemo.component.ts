/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import {
    Component, Input, AfterViewInit, ViewChild, OnInit, OnChanges, Output, EventEmitter, Renderer2, ElementRef, Self,
    ViewContainerRef, Optional, Host
} from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { MatTableModule, MatTableDataSource, MatSort, ThemePalette, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { tablepaginationserviceService } from '../../services/tablepaginationservice/tablepaginationservice.service'
import { mappingserviceService } from '../../services/mappingservice/mappingservice.service';

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
    // @ViewChild(tabledemoComponent, { static: false }) matpageinsert;
    @ViewChild('matpageinsert', { static: false }) matpageinsert: ElementRef;
    @ViewChild('paginator', { read: ElementRef, static: false }) paginatorEl: ElementRef;
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
    constructor(private bdms: NDataModelService, private ser: tablepaginationserviceService, private renderer: Renderer2,
        private el: ElementRef, @Host() @Self() @Optional() private matPag: MatPaginator, private vr: ViewContainerRef) {
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
        this.dataSource = new MatTableDataSource(this.rowData);
    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        let arrayval = this.renderer.createElement('div');
        this.renderer.addClass(arrayval, 'sampleClass');
        let createDiv = this.renderer.appendChild(this.paginatorEl.nativeElement.childNodes[0].childNodes[0].childNodes[2], arrayval)
        let insertPagination1 = this.paginatorEl.nativeElement.querySelector('button.mat-paginator-navigation-next')
        let createDiv1 = this.renderer.insertBefore(this.paginatorEl.nativeElement.childNodes[0].childNodes[0].childNodes[2], arrayval, insertPagination1)
        let append = this.renderer.appendChild(arrayval, this.matpageinsert.nativeElement.childNodes[0])
    }

    ngOnChanges() {
        this.dataSource = new MatTableDataSource(this.rowData);
        this.dataSource.paginator = this.paginator;
        console.log("sample")
        this.setMatTable();
    }
    rowSelect(rowid) {
        this.getSelectedRows.emit(this.selection.selected);
        console.log("click");
        this.ser.disableCreateButton = true;
        // this.reportlist.selectedGroupId = rowid;
    }

    pageItem(start, dataValue) {
        this.ser.agentFilterCache.pageNumber = start;
        this.currntPageNum = this.ser.agentFilterCache.pageNumber > 0 ? this.ser.agentFilterCache.pageNumber : 1;
        this.ser.agentFilterCache.pageSize = dataValue || this.ser.agentFilterCache.pageSize;
        // console.log('PN', this.ser.agentFilterCache.pageNumber)
        this.paginator.pageIndex = this.ser.agentFilterCache.pageNumber;
        // console.log('PI', this.paginator.pageIndex)
        if (this.ser.agentFilterCache.pageSize * (this.ser.agentFilterCache.pageNumber - 1) < this.totalLeads && this.ser.agentFilterCache.pageNumber > 0) {
            start = this.ser.agentFilterCache.pageSize * (this.ser.agentFilterCache.pageNumber - 1);
            if (!this.ser.agentFilterCache.searchParams) {
                if (this.ser.agentFilterCache.tabIndex == 1) {
                    console.log("sample");
                    this.setPaginationRow();
                    this.setDataTable(this.rowData);
                } else {
                    this.setPaginationRow();
                    const end = start + this.ser.agentFilterCache.pageSize;
                    const tabArr = this.rowData.slice(start, end) || [];
                    this.setDataTable(tabArr);
                }
            } else {
                const end = start + this.ser.agentFilterCache.pageSize;
                const tabArr = this.rowData.slice(start, end) || [];
                console.log(tabArr, end)
                this.setDataTable(tabArr);
            }
        }
    }

    setDataTable(Obj) {
        this.dataSource = new MatTableDataSource(Obj);
    }

    setMatTable() {
        this.setDataTable(this.rowData);
        this.totalLeads = this.rowData.length;
        console.log('length', this.rowData.length)
        console.log('totalLeades', this.totalLeads)
        this.ser.agentFilterCache.pageNumber = 0;
        this.setPaginationRow();
        this.pagination(this.ser.initialiseLeadsPageData().currntPageNum);
    }
    setPaginationRow() {
        this.page_Index = Math.ceil(this.totalLeads / this.ser.agentFilterCache.pageSize);
        console.log("pageIndex", this.page_Index)
        let startPage: number, endPage: number;
        if (this.ser.agentFilterCache.pageNumber <= 3) {
            console.log(this.ser.agentFilterCache.pageNumber)
            startPage = 1;
            endPage = (this.page_Index > 5) ? 5 : this.page_Index;

        } else if ((this.ser.agentFilterCache.pageNumber + 1) >= this.page_Index) {
            startPage = (this.page_Index < 9) ? 1 : this.page_Index - 4;
            endPage = this.page_Index;
            console.log('elseifstart', startPage, 'elseifend', endPage)
        } else {
            startPage = this.ser.agentFilterCache.pageNumber - 2;
            endPage = this.ser.agentFilterCache.pageNumber + 2;
            console.log(startPage, endPage, "start", this.ser.agentFilterCache.pageNumber)
        }
        let iterator = Array((endPage + 1) - startPage).keys();
        let paginationArray = Array.from(iterator);
        this.pager = paginationArray.map(i => startPage + i);

    }
    getPagerDetails(pageNumber, pageSize) {
        let reqobj: any = {};
        reqobj['pageNumber'] = pageNumber;
        reqobj['pageSize'] = pageSize;
        this.paginator.pageIndex = pageNumber - 1;
    }



    paginationClicked(event) {
        this.ser.agentFilterCache.pageSize = event;
        console.log('PageS', this.ser.agentFilterCache.pageSize)
        this.ser.agentFilterCache.pageNumber = 1;
        console.log('event ', event, this.ser.agentFilterCache.pageSize)
        if (this.ser.agentFilterCache.tabIndex == 0) {
            console.log('getActiveLead')
            
        } else {
            console.log('getClosedLeads')
        }
        this.pageItem(this.ser.agentFilterCache.pageNumber, this.ser.agentFilterCache.pageSize)
    }

    // Function to get the pagination array.
    pagination(index) {
        this.paginatorIndex = index;
        let obj = this.ser.pagination(index, this.totalLeads, this.ser.agentFilterCache.pageSize);
        this.pager = obj['pager'];
        this.page_Index = obj['page_Index'];
    }

    getArray() {
        this.dataSource = new MatTableDataSource(this.rowData);
        this.dataSource.paginator = this.paginator;
        this.pagination(this.ser.initialiseLeadsPageData().currntPageNum);
    }
    iterator() {
        const end = (this.currntPageNum + 1) * this.ser.agentFilterCache.pageSize;
        const start = (this.currntPageNum - 1) * this.ser.agentFilterCache.pageSize;
        const part = this.array.slice(start, end);
        this.dataSource = new MatTableDataSource(part);
    }

}
