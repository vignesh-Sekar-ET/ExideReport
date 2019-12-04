/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { dashboardService } from '../../services/dashboard/dashboard.service';

@Component({
    selector: 'bh-admindashboard',
    templateUrl: './admindashboard.template.html'
})

export class admindashboardComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    selectedItem = null;
    view: any[] = [400, 300];
    mapresult: any[] = [{
        "name": "January",
        "value": 500
    },
    {
        "name": "Fabruary",
        "value": 750
    },
    {
        "name": "March",
        "value": 550
    },
    {
        "name": "April",
        "value": 50
    },
    {
        "name": "May",
        "value": 800
    },
    {
        "name": "June",
        "value": 900
    }]

    constructor(private bdms: NDataModelService,private nav: dashboardService) {
        super();
        this.mm = new ModelMethods(bdms);
    }
     userName: string = "";
    arrayval: any;

    ngOnInit() {
        console.log(this.nav.menuArray[0]["Abi"])
        this.arrayval = JSON.parse(localStorage.getItem("currentUser"));

    }
      onClick(item) {
        console.log(item)
        this.selectedItem = item;
    }


    


}
