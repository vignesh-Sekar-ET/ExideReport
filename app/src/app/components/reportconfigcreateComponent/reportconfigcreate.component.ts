import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormGroup, FormControl, Validator, Validators, FormBuilder } from "@angular/forms";
import { reportconfigserviceService } from '../../services/reportconfigservice/reportconfigservice.service';
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NSnackbarService } from 'neutrinos-seed-services';
import { Router } from '@angular/router';

@Component({
    selector: 'bh-reportconfigcreate',
    templateUrl: './reportconfigcreate.template.html'

})
export class reportconfigcreateComponent implements OnInit {
    @ViewChild('multiSelect', { static: true }) multiSelect;
    public loadContent: boolean = false;
    public data: any;
    public settings = {};
    public selectedItems = [];
    index: number;
    updateData: any;
    form: FormGroup;
    times: any;
    startTime: any;
    endTime: any;
    date: any;
    selectemail: boolean = false;
    selectstatus: boolean = false;
    seldown: boolean = false;
    selectstarttime: boolean = false;
    selecttime: boolean = false;
    selectEndtime: boolean = false;
    title: any;


    downloads: any = [
        { value: '0', viewValue: 'Yes' },
        { value: '1', viewValue: 'No' }
    ];
    statuss: any = [
        { value: '0', viewValue: 'Yes' },
        { value: '1', viewValue: 'No' }
    ];
    emails: any = [
        { value: '0', viewValue: 'Yes' },
        { value: '1', viewValue: 'No' }
    ];
    state = [
        { value: 'daily', viewValue: 'Daily' },
        { value: 'weekly', viewValue: 'Weekly' },
        { value: 'monthly', viewValue: 'Monthly' },
    ];
    private exportTime = { hour: '0', minute: '0', meriden: 'AM', format: 12 };
    private exportTime1 = { hour: '0', minute: '0', meriden: 'AM', format: 12 };

    onChangeHour(event) {
        /*splitting the hour,minute and meriden in one variable*/
        this.times = event.hour + ':' + event.minute + '' + event.meriden;
        /*ends*/
        /* setting the formControlName and values for time,starttime and endtime*/
        this.form.controls.time.setValue(this.times);
        /*ends*/

    }
    onChangestarttime(event) {

        this.startTime = event.hour + ':' + event.minute + '' + event.meriden;
        this.form.controls.StartTime.setValue(this.startTime);
    }
    onChangeendtime(event) {

        this.endTime = event.hour + ':' + event.minute + '' + event.meriden;
        this.form.controls.EndTime.setValue(this.endTime);
    }
      constructor(private bdms: NDataModelService, private formBuilder: FormBuilder, public reportConfigService: reportconfigserviceService, private snackBar: NSnackbarService, private route: Router) {
        this.title = 'Report Config - Create'
        this.reportConfigService.configcreatelist().subscribe((response) => {
            this.data = response;
            console.log("data" + JSON.stringify(this.data))
            this.reportConfigService.reportid = this.data;
        });
        this.settings = {
            singleSelection: false,
            idField: 'reports_id',
            textField: 'ReportName',
            enableCheckAll: false,
            selectAllText: '',
            unSelectAllText: '',
            allowSearchFilter: true,
            limitSelection: -1,
            clearSearchFilter: true,
            maxHeight: 197,
            itemsShowLimit: 3,
            searchPlaceholderText: 'Search',
            noDataAvailablePlaceholderText: 'No List Available',
            closeDropDownOnSelection: false,
            showSelectedItemsAtTop: false,
            defaultOpen: false
        };


    }
     ngOnInit() {
        this.form = new FormGroup({
             emailSubscription: new FormControl('', Validators.required),
             downloadable: new FormControl('', Validators.required),
            StartTime: new FormControl('', Validators.required),
            EndTime: new FormControl('', Validators.required),
            networkLocation: new FormControl('', Validators.required),
            Selectedstatus: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required)
        });
        this.setForm();
      }

    public setForm() {
        this.loadContent = true;

    }
    get f() { return this.form.controls; }

    

    public onFilterChange(item: any) {
    }
    public onDropDownClose(item: any) {
    }

    public onItemSelect(item: any) {
        this.selectedItems.push(item.reports_id);

    }
    public onDeSelect(item: any) {
        let index = this.selectedItems.findIndex(ind => ind == item.reports_id);
        this.selectedItems.splice(index, 1)


    }
    emailSelected() {
        this.selectemail = false;

    }
    down() {
        this.seldown = false;
    }


    activeStatus() {
        this.selectstatus = false;
    }
    endtime() {
        this.selectEndtime = false;
    }

    starttimeclick() {
        this.selectstarttime = false;


    }

    onSubmit(form: FormGroup) {
        if (this.reportConfigService.changecomp == "create") {
            if (this.form.invalid) {

            }
            if (this.form.value.StartTime == '') {
                this.selectstarttime = true;
            }

            if (this.form.value.EndTime == '') {
                this.selectEndtime = true;
            }
            if (this.form.value.emailSubscription != 1 && this.form.value.emailSubscription != 0) {

                this.selectemail = true;
            }
            if (this.form.value.downloadable != 1 && this.form.value.downloadable != 0) {
                this.seldown = true;

            }
            if (this.form.value.Selectedstatus != 1 && this.form.value.Selectedstatus != 0) {
                this.selectstatus = true;
            }
            else {
            let reportName = this.reportConfigService.reportid[0].reports_id;
            let networklocation = this.form.value.networkLocation;
            let starttime = this.form.value.StartTime;
            let endtime = this.form.value.EndTime;
            let email = this.form.value.emailSubscription;
            let downloadble = this.form.value.downloadable;
            let status = this.form.value.Selectedstatus;
            // console.log("getreport" +reportName, networklocation, starttime, endtime, email, downloadble, status)
            this.reportConfigService.onSubmit(reportName, networklocation, starttime, endtime, email, downloadble, status).subscribe(
                (data) => {

                    this.snackBar.openSnackBar('Report Config Created Successfully', 2000);
                    this.route.navigateByUrl('/dashboard/reportConfigList');
                },
                (err) => console.log(err));

        }
    }
    }
    onClear() {

    }
}
