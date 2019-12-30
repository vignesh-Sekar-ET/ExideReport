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




@Component({
    selector: 'bh-reportconfigcreate',
    templateUrl: './reportconfigcreate.template.html'

})
export class reportconfigcreateComponent implements OnInit {


    // @ViewChild('multiSelect', { static: true }) multiSelect;

    // public loadContent: boolean = false;
    // public data: any;
    // public settings = {};
    // public selectedItems = [];
    // index: number;
    // updateData: any;
    // form: FormGroup;
    // times: any;
    // startTime: any;
    // endTime: any;
    // date: any;
    // selectemail: boolean = false;
    // selectstatus: boolean = false;
    // seldown: boolean = false;
    // selectstarttime: boolean = false;
    // selecttime: boolean = false;
    // selectEndtime: boolean = false;


    // downloads: any = [
    //     { value: '0', viewValue: 'Yes' },
    //     { value: '1', viewValue: 'No' }
    // ];
    // statuss: any = [
    //     { value: '0', viewValue: 'Yes' },
    //     { value: '1', viewValue: 'No' }
    // ];
    // emails: any = [
    //     { value: '0', viewValue: 'Yes' },
    //     { value: '1', viewValue: 'No' }
    // ];
    // state = [
    //     { value: 'daily', viewValue: 'Daily' },
    //     { value: 'weekly', viewValue: 'Weekly' },
    //     { value: 'monthly', viewValue: 'Monthly' },
    // ];
    // private exportTime = { hour: '0', minute: '0', meriden: 'AM', format: 12 };
    // private exportTime1 = { hour: '0', minute: '0', meriden: 'AM', format: 12 };

    // onChangeHour(event) {
    //     /*splitting the hour,minute and meriden in one variable*/
    //     this.times = event.hour + ':' + event.minute + '' + event.meriden;
    //     /*ends*/
    //     /* setting the formControlName and values for time,starttime and endtime*/
    //     this.form.controls.time.setValue(this.times);
    //     /*ends*/

    // }
    // onChangestarttime(event) {

    //     this.startTime = event.hour + ':' + event.minute + '' + event.meriden;
    //     this.form.controls.StartTime.setValue(this.startTime);
    // }
    // onChangeendtime(event) {

    //     this.endTime = event.hour + ':' + event.minute + '' + event.meriden;
    //     this.form.controls.EndTime.setValue(this.endTime);
    // }

    constructor(private bdms: NDataModelService, private formBuilder: FormBuilder, public reportConfigService: reportconfigserviceService) {

    }

    ngOnInit() {
        // this.reportConfigService.getReportConfigList().subscribe((response) => {
        //     this.data = response;


        // });


        // setting and support i18n
        // this.settings = {
        //     singleSelection: false,
        //     idField: 'reports_id',
        //     textField: 'ReportName',
        //     enableCheckAll: false,
        //     selectAllText: 'Chọn All',
        //     unSelectAllText: 'Hủy chọn',
        //     allowSearchFilter: true,
        //     limitSelection: -1,
        //     clearSearchFilter: true,
        //     maxHeight: 197,
        //     itemsShowLimit: 3,
        //     searchPlaceholderText: 'Search',
        //     noDataAvailablePlaceholderText: 'Không có dữ liệu',
        //     closeDropDownOnSelection: false,
        //     showSelectedItemsAtTop: false,
        //     defaultOpen: false
        // };
        this.setForm();

    }

    public setForm() {

        // this.form = new FormGroup({

        //     name: new FormControl('', Validators.required),
        //     selectscheduledstatus: new FormControl('', Validators.required),
        //     ScheduledStartDate: new FormControl('', Validators.required),
        //     networkLocation: new FormControl('', Validators.required),
        //     emailSubscription: new FormControl('', Validators.required),
        //     downloadable: new FormControl('', Validators.required),
        //     Selectedstatus: new FormControl('', Validators.required),
        //     time: new FormControl('', Validators.required),
        //     StartTime: new FormControl('', Validators.required),
        //     EndTime: new FormControl('', Validators.required)

        // });
        // this.loadContent = true;

    }

    // get f() { return this.form.controls; }

    // public onFilterChange(item: any) {
    // }
    // public onDropDownClose(item: any) {
    // }

    // public onItemSelect(item: any) {

    //     this.selectedItems.push(item.reports_id);
    //     // console.log(this.selectedItems);

    // }
    // public onDeSelect(item: any) {
    //     let index = this.selectedItems.findIndex(ind => ind == item.reports_id);
    //     this.selectedItems.splice(index, 1)
    //     // console.log("index" + this.selectedItems);


    // }
    // emailSelected() {
    //     this.selectemail = false;

    // }
    // down() {
    //     this.seldown = false;
    // }


    // activeStatus(){
    //     this.selectstatus = false;
    // }
    // endtime() {
    //     this.selectEndtime = false;
    // }
    // timeclick() {
    //     this.selecttime = false;

    // }
    // starttimeclick() {
    //     this.selectstarttime = false;


    // }

    // onSubmit(form: FormGroup) {


    //     if (this.form.invalid) {

    //     }
    //     if (this.form.value.StartTime == '') {
    //         this.selectstarttime = true;
    //     }

    //     if (this.form.value.EndTime == '') {
    //         this.selectEndtime = true;
    //     }
    //     if (this.form.value.time == '') {
    //         this.selecttime = true;
    //     }

    //     if (this.form.value.emailSubscription != 1 && this.form.value.emailSubscription != 0) {

    //         this.selectemail = true;
    //     }
    //     if (this.form.value.downloadable != 1 && this.form.value.downloadable != 0) {
    //         this.seldown = true;

    //     }
    //     if (this.form.value.Selectedstatus != 1 && this.form.value.Selectedstatus != 0) {
    //         this.selectstatus = true;
    //     }
        




    //     else {


    //         let reportName = this.form.value.name;
    //         let scheduledexcutionType = this.form.value.selectscheduledstatus;
    //         /*moment used for format the date*/
    //         this.date = moment(this.form.value.ScheduledStartDate).format('DD/MM/YYYY');
    //         let scheduledexcutiondate = this.date;

    //         let time = this.form.value.time;
    //         let networklocation = this.form.value.networkLocation;
    //         let starttime = this.form.value.StartTime;
    //         let endtime = this.form.value.EndTime;
    //         let email = this.form.value.emailSubscription;
    //         let downloadble = this.form.value.downloadable;
    //         let status = this.form.value.Selectedstatus;
    //         console.log("startdate" + downloadble);

    //         this.reportConfigService.onSubmit(reportName, scheduledexcutionType, scheduledexcutiondate, time, networklocation, starttime, endtime, email, downloadble, status).subscribe(
    //             (data) => {
    //                 // alert("hi");
    //             });
    //         console.log("REPORTCONFIG" + reportName, scheduledexcutionType, scheduledexcutiondate, time, networklocation, starttime, endtime, email, downloadble, status)
    //     }


    // }
    // onClear() {

    // }
}
