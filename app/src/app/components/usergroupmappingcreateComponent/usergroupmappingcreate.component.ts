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
    rgselectedItems = [];
    settings = {};
    userGroupdatalist = [];
    reportGroupdatalist: any = [];
    dropdownSettingsUG = {};
    dropdownSettingsRG = {};
    public userGroup: any;
    public reportGroup: any;
    isSubmitted = false;
    action: string;
    ugupdatearray = [];
    rgupdatearray = [];
    updatecheckug: any;
    updatecheckrg: any;
    mapupdateid: any;
    updateUsergroup: any;
    updateReportgroup: any;
    loading = false;
    indices: any;
    dataLoading:boolean = true;
    readonly bufferSize: number = 10;
    constructor(private bdms: NDataModelService, public _snackbar: NSnackbarService, private fb: FormBuilder,
        public renderer: Renderer2, public element: ElementRef, private mappingservice: mappingserviceService,
        private ser: dashboardService, private route: Router) {
        super();
        this.mm = new ModelMethods(bdms);
        this.setForm();

    }

    ngOnInit() {
        // this.selectedItems = [];
         this.dataLoading= false;
        this.mappingservice.getReportGroup().subscribe((data) => {
            this.reportGroupdatalist = data;
            this.testExecutionFunction();
            if (this.ser.dbConfigLabelCreateUpdate == 'Update') {
                this.getselectedItem();
                setTimeout(() => {
                    let sample = this.reportGroupdatalist.filter(item => {
                        // console.log(item)
                        if (item.Groupname == this.updatecheckrg) {
                            return item;
                        }
                    })
                    this.rgselectedItems = sample;
                }, 0)
            }
        });

        this.mappingservice.getUserGroup().subscribe((data) => {
            this.userGroupdatalist = data["groups"];
            if (this.ser.dbConfigLabelCreateUpdate == 'Update') {
                console.log(this.ser.getTableValue)
                this.getselectedItem();
                setTimeout(() => {
                    let sample = this.userGroupdatalist.filter(item => {
                        if (item.cn == this.updatecheckug) {
                            return item;
                        }
                    })
                    this.selectedItems = sample;
                }, 0)

                console.log(this.selectedItems)
            }
            this.testExecutionFunction()
        });

        if (this.ser.dbConfigLabelCreateUpdate === 'Create') {
            this.dropdownSettingsUG = {
                text: "Select user group",
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                enableSearchFilter: true,
                lazyLoading: true,
                badgeShowLimit: 3,
                labelKey: "cn",
                primaryKey: "cn",
                searchBy: ['cn'],
                noDataLabel: "No Data...",
                classes: "myclass custom-class"
                // searchPlaceholderText: "Custom Placeholder text"
            };
            this.dropdownSettingsRG = {
                text: "Select report group",
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                enableSearchFilter: true,
                lazyLoading: true,
                badgeShowLimit: 3,
                labelKey: "Groupname",
                primaryKey: "id",
                searchBy: ['Groupname'],
                noDataLabel: "No Data..."
            };
        }
        else {
            this.dropdownSettingsUG = {
                singleSelection: true,
                text: "Select user group",
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                enableSearchFilter: true,
                lazyLoading: true,
                badgeShowLimit: 3,
                labelKey: "cn",
                primaryKey: "cn",
                searchBy: ['cn'],
                noDataLabel: "No Data...",
                showCheckbox: false
            };
            this.dropdownSettingsRG = {
                singleSelection: true,
                text: "Select report group",
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                enableSearchFilter: true,
                lazyLoading: true,
                badgeShowLimit: 3,
                labelKey: "Groupname",
                primaryKey: "id",
                searchBy: ['Groupname'],
                noDataLabel: "No Data...",
                showCheckbox: false
            };
        }
    }

    public getselectedItem() {
        this.ser.getTableValue.map(item => {
            this.updatecheckug = item.UserGroup;
            this.updatecheckrg = item.Groupname;
            this.mapupdateid = item.map_id;
        }
        );
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
            this.update(event);
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
        return array.reduce((result, currentValue) => {
            (result[currentValue.key] = result[currentValue.key] || []).push(
                currentValue
            );
            return result;
        }, {});
    };

    clear() {
        this.selectedItems = [];
        this.rgselectedItems = [];
        this.isSubmitted = false;
        console.log(this.isSubmitted)
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
        // this.clear();
    }

    //create
    create(event) {
        this.isSubmitted = true;
        if (this.form.valid) {
            this.uniqueArrayUserGroup(event.userGroup)
            this.uniqueArrayReportGroup(event.reportGroup)
            let Umap = this.usermapGroup.map(item => ({ Usergroup: item.cn, reporGroupmap: [...new Set(event.reportGroup)] }))
            let Rmap = this.reportmapGroup.map(item => ({ ReportGroup: item.Groupname, userGroupmap: [...new Set(event.userGroup)] }))
            this.mappingservice.postUserGroupmapping(Umap).subscribe(data => {
                if (data["result"] === "success") {
                    this.dataLoading=true;
                    this.action = 'Usermapping created';
                    this.openSnackBar();
                    this.route.navigateByUrl('/dashboard/groupmaplist');
                }
                if (data["reason"]) {
                    this.action = 'Duplicate user mapping please map new group mapping';
                    this.openSnackBar();
                }
            })
        }
    }

    update(event) {
        this.isSubmitted = true;
        if (this.form.valid) {
            let ugupdate = event.userGroup.map(item => item.cn)
            let rgupdate = event.reportGroup.map(item => {
                this.updateUsergroup = ugupdate[0];
                this.updateReportgroup = item.id;
            })
            console.log(this.mapupdateid, this.updateUsergroup, this.updateReportgroup)
            this.mappingservice.updateUserGroupmapping(this.updateUsergroup, this.updateReportgroup, this.mapupdateid)
                .subscribe((data) => {
                    console.log(data)
                    if (data["result"] === "success") {
                        this.route.navigateByUrl('/dashboard/groupmaplist');
                        this.action = 'Usermapping updated';
                        this.openSnackBar();
                    }
                    if (data["reason"] == 'Duplicate Value') {
                        this.action = 'Duplicate user mapping please map new group mapping';
                        this.openSnackBar();
                    }

                })

        }
    }
     fetchMore(event: any) {
    //     if (event.end === this.userGroupdatalist.length - 1) {
           
    //         this.loading = true;
    //         this.mappingservice.getUserGroup(this.userGroupdatalist.length, this.bufferSize).then(chunk => {
    //             this.userGroupdatalist = this.userGroupdatalist.concat(chunk);
    //             this.loading = false;
    //         }, () => this.loading = false);
    //     }
     }
        onScroll(e: any) {
        console.log(e);
    }
}
