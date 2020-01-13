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
    uservalue: any;
    navigation: any
    selectedItem = null;
    grouptype: any;
    constructor(private bdms: NDataModelService, private nav: dashboardService) {
        super();
        this.mm = new ModelMethods(bdms);
    }
    userName: string = "";
    arrayval: any;
    logoutarray: any = [
        { viewValue: 'Logout' },
    ];
    ngOnInit() {
        // console.log(this.nav.menuArray[0]["Abi"]);
        this.uservalue = this.nav.username;
        this.grouptype = this.nav.grouptype
        this.navigation = this.nav.menuArray;


        this.arrayval = JSON.parse(localStorage.getItem("currentUser"));
    }

    onClick(item) {

        this.selectedItem = item;
    }
    sidenavOpen() {

    }
    sidenavclose() {
    }
    logoutoption() {
        console.log('open');
    }
}
