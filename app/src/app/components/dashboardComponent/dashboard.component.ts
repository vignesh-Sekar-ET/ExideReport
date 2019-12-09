/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { dashboardService } from '../../services/dashboard/dashboard.service';




@Component({
    selector: 'bh-dashboard',
    templateUrl: './dashboard.template.html'
})

export class dashboardComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    uservalue:any;
    navigation:any
    selectedItem = null;
    constructor(private bdms: NDataModelService, private nav: dashboardService) {
        super();
        this.mm = new ModelMethods(bdms);
    }
    userName: string = "";
    arrayval: any;
    ngOnInit() {
        // console.log(this.nav.menuArray[0]["Abi"]);
        this.uservalue = this.nav.grouptype;
        this.navigation = this.nav.menuArray;
        // console.log(this.nav.grouptype);
        // console.log(this.nav.menuArray);

        this.arrayval = JSON.parse(localStorage.getItem("currentUser"));
        // this.userName = this.arrayval.result.user_name;
    }
    //select value highlight
    onClick(item) {
        //   console.log(item)
        this.selectedItem = item;
    }
    sidenavOpen() {
        //   console.log("sidenavOpen")
    }
    sidenavclose() {
        //   console.log("sidenavClosed")
    }
}
