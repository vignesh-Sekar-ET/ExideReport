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
        // this.props = { totalRecord: null, pageLimit: 30, pageNeighbours: 0 };
        // this.pageLimit = typeof this.pageLimit === "number" ? this.pageLimit : 30;
        // console.log(this.pageLimit)
        // this.totalRecord = typeof this.totalRecord === "number" ? this.totalRecord : 0;

        // this.props.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
        // this.props.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;
        // console.log(this.props.totalRecords)
        // this.props.pageNeighbours = typeof pageNeighbours === 'number' ? Math.max(0, Math.min(pageNeighbours, 2)) : 0;
        // this.totalPages = Math.ceil(this.props.totalRecords / this.props.pageLimit);
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
            this.columnNames.splice(9, 0, 'select');
            this.sqColumnDefinition.splice(9, 0, {
                'name': 'select',
                'displayName': '#'
            });
        }
        // this.getArray();
    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }


    ngAfterViewInit() {
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        // this.pages.map((item, index) => {
        //     // console.log(index)
        //     if (item === this.RIGHT_PAGE) {
        //         console.log(item)
        //         this.d1.nativeElement.onclick = this.handleMoveRight;
        //     }
        //     else if(item === this.LEFT_PAGE){
        //         console.log("else"+ item)
        //         this.d1.nativeElement.onclick = this.handleMoveLeft;
        //     }
        //     else{
        //         console.log("else")
        //         this.d1.nativeElement.onclick = this.handleClick;
        //     }
        // })

    }

    ngOnChanges() {
        this.dataSource = new MatTableDataSource(this.rowData);
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // this.getArray()
    }
    rowSelect(rowid) {
        // console.log(row);
        // this.getSelectedRows.emit( this.selection.selected);
        this.reportlist.selectedGroupId = rowid;
    }
    sample(i){
        this.reportlist.getindex= i;
        console.log("getindex"+i)
    }
    deleterow(arg){
        console.log(arg);
    }
    // PagerItem
    // pageItem(start, pageSize) {
    //     this.currentPage = start;
    //     this.pageSize = this.totalPages;
    //     console.log(this.currentPage, this.pageSize)
    //     // this.getPagerDetails(start, this.pageSize);
    //     // this.iterator();
    // }

    // //getTeamManagerLeads
    // getPagerDetails(pageNumber, pageSize) {
    //     let reqobj: any = {};
    //     reqobj['pageNumber'] = pageNumber;
    //     reqobj['pageSize'] = pageSize;
    //     this.paginator.pageIndex = pageNumber - 1;
    //     // console.log(this.paginator)
    // }


    paginationClicked(event) {
        console.log(event)
        // this.pageSize = event.pageSize;
    }

    // Function to get the pagination array.
    // pagination(index) {
    //     this.paginatorIndex = index;
    //     let obj = this.ser.pagination(index, this.totalCount, this.pageSize);
    //     this.pager = obj['pager'];
    //     this.page_Index = obj['page_Index'];
    // }

    getArray() {

        // this.dataSource = new MatTableDataSource(this.rowData);
        // this.dataSource.paginator = this.paginator;
        // this.array = this.rowData;
        // this.state.totalPage = this.array.length;
        // this.getVisiblePages()
    }
    // iterator() {
    //     const end = (this.currntPageNum + 1) * this.pageSize;
    //     const start = (this.currntPageNum - 1) * this.pageSize;
    //     // console.log(start, end, this.currntPageNum)
    //     const part = this.array.slice(start, end);
    //     this.dataSource = new MatTableDataSource(part);
    // }

    // getVisiblePages = () => {
    //     const totalPages = this.totalPages;
    //     const currentPage = this.currentPage;
    //     const pageNeighbours = this.props.pageNeighbours;
    //     const totalNumbers = this.props.pageNeighbours * 2 + 3;
    //     // console.log(totalNumbers, totalPages, pageNeighbours)
    //     const totalBlocks = totalNumbers + 2;
    //     // console.log(totalPages, "curr: " + currentPage, "pn: " + pageNeighbours)
    //     if (totalPages > totalBlocks) {

    //         const leftBound = currentPage - this.props.pageNeighbours;
    //         const rightBound = currentPage + this.props.pageNeighbours;
    //         const beforeLastPage = this.totalPages - 1;

    //         const startPage = leftBound > 2 ? leftBound : 2;
    //         const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;
    //         console.log(this.range)
    //         this.pages = this.range(startPage, endPage);

    //         const pagesCount = this.pages.length;
    //         console.log("pageCount:" + pagesCount)
    //         const singleSpillOffset = totalNumbers - pagesCount - 1;
    //         console.log(startPage, endPage, this.pages);
    //         const leftSpill = startPage > 2;
    //         const rightSpill = endPage < beforeLastPage;

    //         const leftSpillPage = this.LEFT_PAGE;
    //         const rightSpillPage = this.RIGHT_PAGE;


    //         if (leftSpill && !rightSpill) {
    //             console.log(leftSpill)
    //             const extraPages = this.range(startPage - singleSpillOffset, startPage - 1);
    //             this.pages = [leftSpillPage, ...extraPages, ...this.pages];

    //         } else if (!leftSpill && rightSpill) {
    //             console.log(leftSpill)
    //             const extraPages = this.range(endPage + 1, endPage + singleSpillOffset);
    //             this.pages = [...this.pages, ...extraPages, rightSpillPage];
    //             console.log(this.pages)
    //         } else if (leftSpill && rightSpill) {
    //             this.pages = [leftSpillPage, ...this.pages, rightSpillPage];
    //         }
    //         // console.log(this.pages)
    //         this.pages = [1, ...this.pages, totalPages];
    //         return [1, ...this.pages, totalPages];
    //     }
    //     return this.range(1, totalPages);
    // }
    //     handleClick = (page, evt) => {
    //         console.log(page, "evt", evt)
    //         evt.preventDefault();
    //         this.gotoPage(page);
    //     };

    //     handleMoveLeft = evt => {
    //         evt.preventDefault();

    //         this.gotoPage(this.currentPage - this.props.pageNeighbours * 2 - 1);
    //         // console.log(this.currentPage - this.props.pageNeighbours * 2 - 1)
    //     };

    //     handleMoveRight = evt => {
    //         evt.preventDefault();
    //         this.gotoPage(this.currentPage + this.props.pageNeighbours * 2 + 1);
    //         // console.log("right", this.currentPage + this.props.pageNeighbours * 2 + 1)
    //         console.log("n", this.props.pageNeighbours * 2 + 1, "c", this.currentPage)
    //     };


    //     gotoPage = page => {
    //         const { onPageChanged = f => f } = this.props;
    //         console.log(page)
    //         const currentPage = Math.max(0, Math.min(page, this.totalPages));
    //         console.log(page, 'CP' + currentPage, 'tp', this.totalPages)
    //         const paginationData = {
    //             currentPage,
    //             totalPages: this.totalPages,
    //             pageLimit: this.props.pageLimit,
    //             totalRecords: this.props.totalRecords
    //         };
    //         console.log("pagination: " + JSON.stringify(paginationData))
    //         this.onPageChanged(paginationData)
    //         //create custom Element
    //         // this.ser.state({ currentPage }, () => this.onPageChanged(paginationData));

    //     };
    // onPageChanged = data =>{
    //     console.log(data)
    // }


}


