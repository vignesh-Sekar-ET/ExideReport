/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { selectserviceService } from '../../services/selectservice/selectservice.service';
import { ReportGroup } from '../../report-group';
import { UserGroup } from '../../user-group';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    selector: 'bh-usergroupmappingview',
    templateUrl: './usergroupmappingview.template.html'
})

export class usergroupmappingviewComponent extends NBaseComponent implements OnInit {

    mm: ModelMethods;
    reportGroup: ReportGroup[];
    userGroup: UserGroup[];
    form:FormGroup;
    selectedCountry: UserGroup = new UserGroup(2, 'Brazil');
    constructor(private bdms: NDataModelService, private selectService: selectserviceService, private formBuilder: FormBuilder) {
        super();
        this.mm = new ModelMethods(bdms);
    }
    columnDefinition = [];
    ngOnInit() {
        this.userGroup = this.selectService.getCountries();
        console.log(this.selectedCountry.id)
        this.onSelect(this.selectedCountry.id);
        this. createDbconfig();
        //column definition
        this.columnDefinition = [
            {
                'name': 'jndiname',
                'displayName': 'jndiname',
                'disableSorting': false,
            },
            {
                'name': 'serverip',
                'displayName': 'serverip',
                'disableSorting': false,
                'icon': 'face'

            }]
    }

    onSelect(countryid) {
        console.log(countryid);
        this.reportGroup = this.selectService.getStates().filter((item) => item.countryid == countryid);
    }

    

    reportData = [
        { jndiname: 0, serverip: 'Hydrogen'},
        { jndiname: 1, serverip: 'Helium' },
    ]
    createDbconfig() {
        this.form = this.formBuilder.group(
            {
                usergroup: ['', Validators.required],
                reportgroup: ['', Validators.required],
            }
        )
    }

}
