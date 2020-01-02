/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';

@Injectable()
export class tablepaginationserviceService {
   tableData:any = {};
   recordPerPage:number  = 5;
   dbconfigcreateDisablebutton:boolean = false;
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
        // console.log(this.agentFilterCache.pageSize)
    }
    pagination(index, totalCount, pageSize) {
       console.log(index)
        let pager = [];
        let totalPages = Math.ceil(totalCount / pageSize);
        let i = 0;
        console.log(totalCount,pageSize )
        let finalSize = 0;
        console.log(index *5)
        if (index * 5 < totalPages) {
            finalSize = index * 5;
            // console.log("final", finalSize)
        } else {
            finalSize = totalPages;
            // console.log("finalsize", finalSize)
        }
        i = (index - 1) * 10;
        // console.log("index",  i)
        while (i < finalSize) {
            pager.push(i + 1);
            // console.log(pager)
            i = i + 1;
        }
        return { pager: pager, page_Index: totalPages };
    }
        initialiseLeadsPageData() {
        this.searchParameters = '';
        return {
            filterObject: {},
            FilterformObject: {},
            sortObject: { CREATED_DATE: "DESC" },
            currntPageNum: 1,
            pageSize: 5,
            paginatorIndex: 0,
            matSortActive: 'CREATED_DATE',
            sortDirection: 'desc'
        }
    }

}
