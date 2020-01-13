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
    public loadreportname: boolean = false;
    public data: any = [];
    public settings = {};
    public selectedItems = [];
    loading = false;
    indices: any;
    readonly bufferSize: number = 10;
    index: number;
    updateData: any;
    form: FormGroup;
    times: any;
    startTime: any;
    endTime: any;
    date: any;
    title: any;
    checkedstatus: boolean = false;
    reportname: any;
    submitted = false;
    reportid: any = [];

    downloads: any = [
        { value: 1, viewValue: 'Yes' },
        { value: 0, viewValue: 'No' }
    ];
    statuss: any = [
        { value: 1, viewValue: 'Active' },
        { value: 0, viewValue: 'InActive' }
    ];
    emails: any = [
        { value: 1, viewValue: 'Yes' },
        { value: 0, viewValue: 'No' }
    ];
    state = [
        { value: 'daily', viewValue: 'Daily' },
        { value: 'weekly', viewValue: 'Weekly' },
        { value: 'monthly', viewValue: 'Monthly' },
    ];
    exportTime = { hour: '12', minute: '0', meriden:'AM', format: 12 };
    exportTime1 = { hour: '12', minute: '0', meriden:'AM', format: 12 };

    onChangeHour(event) {
        /*splitting the hour,minute and meriden in one variable*/
        this.times = event.hour + ':' + event.minute + '' + event.meriden;
        /*ends*/
        /* setting the formControlName and values for time,starttime and endtime*/
        this.form.controls.time.setValue(this.times);
        /*ends*/

    }
    onChangestarttime(event) {
        event.hour = parseInt(event.hour);
        event.meriden == 'PM' && event.hour < 12 ? event.hour += 12 : event.hour
        this.startTime = event.hour + ':' + event.minute;
        this.form.controls.StartTime.setValue(this.startTime);

        let re = /^\d{1,2}:\d{2}([AP]M)?$/;
        if (!event.srcElement.value.match(re)) {
            this.snackBar.openSnackBar('Time format incorrect!!', 2000);
        }
    }
    onChangeendtime(event) {
        event.hour = parseInt(event.hour);
        event.meriden == 'PM' && event.hour < 12 ? event.hour += 12 : event.hour
        this.endTime = event.hour + ':' + event.minute;
        this.form.controls.EndTime.setValue(this.endTime);
         if (this.startTime>this.endTime) {
            this.snackBar.openSnackBar('End Time should be greater than starttime!!', 2000);

        }
        let re = /^\d{1,2}:\d{2}([AP]M)?$/;
        if (!event.srcElement.value.match(re)) {
            this.snackBar.openSnackBar('Time format incorrect!!', 2000);

        }
       
    }
    constructor(private bdms: NDataModelService, private formBuilder: FormBuilder, public reportConfigService: reportconfigserviceService, private snackBar: NSnackbarService, private route: Router) {
        this.title = 'Report Configuration - Create'

        this.reportConfigService.configcreatelist().subscribe((response) => {
            this.data = response;
            this.reportConfigService.reportid = this.data;
        });

        this.settings = {
            text: "Select Reportname",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            classes: "myclass custom-class",
            enableSearchFilter: true,
            lazyLoading: true,
            labelKey: "ReportName",
            primaryKey: "reports_id"



        };
    }
    ngOnInit() {

        this.form = new FormGroup({
            downloadable: new FormControl('', Validators.required),
            StartTime: new FormControl('', Validators.required),
            EndTime: new FormControl('', Validators.required),
            networkLocation: new FormControl('', Validators.required),
            emailSubscription: new FormControl('', Validators.required),
            Selectedstatus: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
        });
        this.setForm();
        this.update();


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
    get selectreportname() { return this.form.get("name") }
    get selectstarttime() { return this.form.get("StartTime") }
    get selectEndtime() { return this.form.get("EndTime") }
    get emailclick() { return this.form.get("emailSubscription") }
    get down() { return this.form.get("downloadable") }
    get status() { return this.form.get("Selectedstatus") }
    Submit() {
        this.submitted = true;
        if (this.reportConfigService.changecomp === 'create' && this.form.valid) {
            this.loadreportname = true;
            this.loadContent = false;
            let reportName = this.selectedItems;
            let networklocation = this.form.value.networkLocation;
            let starttime = this.form.value.StartTime;
            let endtime = this.form.value.EndTime;
            let downloadble = this.form.value.downloadable;
            let email = this.form.value.emailSubscription;
            let status = this.form.value.Selectedstatus;
            this.reportConfigService.onSubmit(reportName, networklocation, starttime, endtime, email, downloadble, status).subscribe(
                (data) => {
                    this.snackBar.openSnackBar('Report Config Created Successfully', 2000);
                    this.route.navigateByUrl('/dashboard/reportConfigList');
                },
                (err) => console.log(err));

        }

        else if (this.reportConfigService.changecomp === 'update') {
            this.submitted = true;
            this.reportid.push(this.reportConfigService.updatename[0].reports_id)
            let networklocation = this.form.value.networkLocation;
            let starttime = this.form.value.StartTime;
            let endtime = this.form.value.EndTime;
            let email = this.form.value.emailSubscription;
            let downloadble = this.form.value.downloadable;
            let status = this.form.value.Selectedstatus;
            this.reportConfigService.onSubmit(this.reportid, networklocation, starttime, endtime, email, downloadble, status).subscribe(
                (data) => {

                    this.snackBar.openSnackBar('Report Config updated Successfully', 2000);
                    this.route.navigateByUrl('/dashboard/reportConfigList');
                },
                (err) => console.log(err));

        }


    }
    update() {
         if (this.reportConfigService.changecomp == "update") {
            this.title = 'Report Configuration - Update';
            this.loadreportname = true;
            this.loadContent = false;
            let timestart = this.reportConfigService.updatename[0].starttime;
            let starttimesplit = timestart.split(":");
            this.exportTime = { hour: starttimesplit[0], minute: starttimesplit[1], meriden: '', format: 12 };
            this.form.controls.StartTime.setValue(this.reportConfigService.updatename[0].starttime);

            let timeend = this.reportConfigService.updatename[0].endtime;
            let endtimesplit = timeend.split(":");
            this.exportTime1 = { hour: endtimesplit[0], minute: endtimesplit[1], meriden: '', format: 12 };
            this.form.controls.EndTime.setValue(this.reportConfigService.updatename[0].endtime);

            this.reportname = this.reportConfigService.updatename[0].ReportName;
            this.form.patchValue({ networkLocation:this.reportConfigService.updatename[0].Network});
            this.form.patchValue({ emailSubscription: this.reportConfigService.updatename[0]["issubscribe"] == "Yes" ? 1 : 0 });
            this.form.patchValue({ downloadable: this.reportConfigService.updatename[0]["isdownloadable"] == "Yes" ? 1 : 0 });
            this.form.patchValue({ Selectedstatus: this.reportConfigService.updatename[0]["status"] == "Yes" ? 1 : 0 });
        }
    }

    onClear() {
        this.form.reset();
    }




}