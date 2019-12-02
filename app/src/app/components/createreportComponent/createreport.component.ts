/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { reportcreateserviceService } from '../../services/reportcreateservice/reportcreateservice.service';



@Component({
    selector: 'bh-createreport',
    templateUrl: './createreport.template.html'
})

export class createreportComponent  implements OnInit {
    RGname:any;
   
    selectvalue = [
        { value: 'sql', viewValue: 'MySQL' },
        { value: 'oracle', viewValue: 'Oracle' },
        { value: 'db2', viewValue: 'DB2' }
    ];

    /* RGname = [
        { value: 'name1', viewValue: 'Name1' },
        { value: 'name2', viewValue: 'Name2' },
        { value: 'name3', viewValue: 'Name3' }
    ]; */
    constructor(  private reportcreate: reportcreateserviceService) {
      
    }

    ngOnInit() {
        this.reportcreate.reportgrouplist().subscribe(data => {   this.RGname = data  })
    }


}
