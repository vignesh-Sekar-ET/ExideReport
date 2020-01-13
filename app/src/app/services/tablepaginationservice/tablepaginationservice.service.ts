/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';

@Injectable()
export class tablepaginationserviceService {
   tableData:any = {};
   recordPerPage:number  = 5;
   disableCreateButton:boolean = false;
   public disabled: boolean = false;
   searchParameters = '';
    agentFilterCache: any = {
        pageNumber: 0,
        pageSize: this.recordPerPage,
        tabIndex: 0,
        filterObj: {},
        searchParams: '',
        filteredLeads: []
    };

    constructor() {
        this.tableData = this.initialiseLeadsPageData();
        console.log(this.tableData)
    }
    pagination(index, totalCount, pageSize) {
    //    console.log(index)
        let pager = [];
        let totalPages = Math.ceil(totalCount / pageSize);
        let i = 0;
        // console.log(totalCount,pageSize )
        let finalSize = 0;
        // console.log(index *5)
        if (index * 5 < totalPages) {
            finalSize = index * 5;
        } else {
            finalSize = totalPages;
        }
        i = (index - 1) * 10;
        while (i < finalSize) {
            pager.push(i + 1);
            i = i + 1;
        }
        return { pager: pager, page_Index: totalPages };
    }
        initialiseLeadsPageData() {
        this.searchParameters = '';
        return {
            currntPageNum: 1,
            pageSize: 5,
            paginatorIndex: 0,

        }
    }

}
