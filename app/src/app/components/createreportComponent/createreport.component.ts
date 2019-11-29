/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';

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
    selector: 'bh-createreport',
    templateUrl: './createreport.template.html'
})

export class createreportComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;

    selectvalue = [
        { value: 'sql', viewValue: 'MySQL' },
        { value: 'oracle', viewValue: 'Oracle' },
        { value: 'db2', viewValue: 'DB2' }
    ];

    RGname = [
        { value: 'name1', viewValue: 'Name1' },
        { value: 'name2', viewValue: 'Name2' },
        { value: 'name3', viewValue: 'Name3' }
    ];
    constructor(private bdms: NDataModelService) {
        super();
        this.mm = new ModelMethods(bdms);
    }

    ngOnInit() {

    }


}
