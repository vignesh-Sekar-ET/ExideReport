/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import {
    Component, OnInit, ViewChild, ElementRef, Input, Renderer2, ChangeDetectorRef, ViewContainerRef,
    ViewChildren, ChangeDetectionStrategy
} from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { mappingserviceService } from '../../services/mappingservice/mappingservice.service';
import { NSnackbarService } from 'neutrinos-seed-services';
import { dashboardService } from '../../services/dashboard/dashboard.service';
import { Router } from '@angular/router';


// import { BehaviorSubject } from 'rxjs/BehaviorSubject';



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
    selector: 'bh-usergroupmappingcreate',
    templateUrl: './usergroupmappingcreate.template.html'
})

export class usergroupmappingcreateComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    public form: FormGroup;
    public loadContent: boolean = false;
    mydata: any;
    singleArray: any = [];
    @ViewChild('multiSelect', { static: false }) multiSelect;
    public singleSelect = [];
    public multiSelectArray = [];
    public result: any;
    public changingSample: any;
    public usermapGroup = [];
    public reportmapGroup = [];
    public URarray = []; item; i = 0;
    itemList: any = [];
    selectedItems = [];
    settings = {};
    userGroupdatalist = [];
    reportGroupdatalist: any = [];
    dropdownSettingsUG = {};
    dropdownSettingsRG = {};
    public userGroup: any;
    public reportGroup: any;
    isSubmitted = false;
    action: string;
    constructor(private bdms: NDataModelService, public _snackbar: NSnackbarService, private fb: FormBuilder,
        public renderer: Renderer2, public element: ElementRef, private mappingservice: mappingserviceService, private ser: dashboardService) {
        super();
        this.mm = new ModelMethods(bdms);
        this.setForm();

    }

    ngOnInit() {
        this.selectedItems = [];

        this.dropdownSettingsUG = {
            text: "Select user group",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            lazyLoading: true,
            badgeShowLimit: 3,
            labelKey: "cn",
            primaryKey: "cn"
        };
        this.dropdownSettingsRG = {
            text: "Select report group",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            lazyLoading: true,
            badgeShowLimit: 3,
            labelKey: "Groupname",
            primaryKey: "id"
        };

        this.mappingservice.getReportGroup().subscribe((data) => {
            this.reportGroupdatalist = data;
            this.testExecutionFunction()
        });

        this.mappingservice.getUserGroup().subscribe((data) => {
            this.userGroupdatalist = data["groups"];
            this.testExecutionFunction()
        });

        if (this.ser.dbConfigLabelCreateUpdate === 'Create') {
            console.log("create")
        }
        else {
            this.userGropmappingPatchvalue();
        }
    }

    public setForm() {
        this.form = this.fb.group({
            userGroup: ['', Validators.required],
            reportGroup: ['', Validators.required]
        });
        this.loadContent = true;
    }

    testExecutionFunction() {
        this.userGroupdatalist;
        this.reportGroupdatalist;
    }
    openSnackBar() {
        this._snackbar.openSnackBar(this.action, 2000);
    }
    get getuserGroup() { return this.form.get('userGroup'); }
    get getReportGroup() { return this.form.get('reportGroup'); }
    save(event) {
        if (this.ser.dbConfigLabelCreateUpdate === 'Create') {
            // this.submitted = true;
            this.create(event);
        }
        else {
            this.update();
        }
    }

    uniqueArrayUserGroup(array) {
        this.usermapGroup = [];
        for (let i = 0; i < array.length; i++) {
            if (this.usermapGroup.indexOf(array[i]["cn"]) === -1) {
                this.usermapGroup.push(array[i])
            }
        }
    }
    uniqueArrayReportGroup(array) {
        this.reportmapGroup = [];
        for (let i = 0; i < array.length; i++) {
            if (this.reportmapGroup.indexOf(array[i]["id"]) === -1) {
                this.reportmapGroup.push(array[i])
            }
        }
    }
    removeDuplicates(array, key) {
        console.log(array, key)
        let lookUp = new Set();
        console.log(lookUp)
        return array.filter(item => !lookUp.has(item[key]) && lookUp.add(item[key]))
    }
    groupBy = (array, key) => {
        // console.log(array, key)
        return array.reduce((result, currentValue) => {
            (result[currentValue.key] = result[currentValue.key] || []).push(
                currentValue
            );
            // console.log(JSON.stringify({ ...result }), "cV", JSON.stringify(currentValue));
            return result;
        }, {});
    };

    clear() {
        this.isSubmitted = false;
        this.form.reset();
        this.form.markAsDirty()
        this.form.markAsTouched()
    }
    onItemSelect(item: any) {
    }
    OnItemDeSelect(item: any) {
        this.isSubmitted = false;
    }
    onSelectAll(items: any) {
    }
    onDeSelectAll(items: any) {
        this.clear();
    }


    userGropmappingPatchvalue() {
        console.log('update');
        // this.form.patchValue({ active: this.ser.dbconfigupdate[0]["isactive"] == "Yes" ? 1 : 0 })
        // this.form.patchValue({ drivertype: this.ser.dbconfigupdate[0]["db"] })
        // this.form.patchValue({ jndiname: this.ser.dbconfigupdate[0]["JNDIName"] })
    }

    //create
    create(event) {
        this.isSubmitted = true;
        if (this.form.valid) {
            this.uniqueArrayUserGroup(event.userGroup)
            this.uniqueArrayReportGroup(event.reportGroup)
            let Umap = this.usermapGroup.map(item => ({ Usergroup: item.cn, reporGroupmap: [...new Set(event.reportGroup)] }))
            let Rmap = this.reportmapGroup.map(item => ({ ReportGroup: item.Groupname, userGroupmap: [...new Set(event.userGroup)] }))
            console.log("ReportGroup", Rmap, 'Usergroup', Umap)
            console.log(JSON.stringify(Rmap))
            // let umapping = Umap.map((userGroup) => {
            //     // let result = {
            //     //     key:userGroup.Usergroup
            //     // }
            //     console.log(userGroup)
            // })
            this.mappingservice.postUserGroupmapping(Umap).subscribe(data => {
                this.action = 'Usermapping created';
                this.openSnackBar();
            })
        }
    }

    update(){

    }

}
