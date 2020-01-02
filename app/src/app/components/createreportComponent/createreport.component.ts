/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { reportcreateserviceService } from '../../services/reportcreateservice/reportcreateservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NSnackbarService } from 'neutrinos-seed-services';
import { Router } from '@angular/router';

@Component({
    selector: 'bh-createreport',
    templateUrl: './createreport.template.html'
})

export class createreportComponent implements OnInit {
    datavalue: any;
    RGname: any;
    createreportform: FormGroup;
    selectvalue: any;

    /*    selectvalue = [
           { value: 'mssql_nrb', viewValue: 'MSSQL_NRB' },
           { value: 'mssql_sharebazaar', viewValue: 'MSSQL_SHAREBAZAAR' },
       ]; */
    querytype: any = [
        { value: 'q', viewValue: 'query' },
        { value: 'sp', viewValue: 'Store Procedure' }
    ];

    sub: any;
    checkvalue: any;

    constructor(private reportcreate: reportcreateserviceService, private _snackBar: NSnackbarService,
        private formBuilder: FormBuilder, private router: Router) {

        this.createreportform = this.formBuilder.group(
            {
                rname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
                typeq: ['',],
                source: ['', [Validators.required]],
                ptname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
                query: ['',],
                rgpname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
            }
        )

    }

    ngOnInit() {
        this.reportcreate.reportgrouplist().subscribe(
            data => { this.RGname = data });
        this.reportcreate.JNDIlist().subscribe(
            data => { this.selectvalue = data });

        let check = this.reportcreate.updatename;
        console.log(check)
        if (Array.isArray(check)) {
            this.checkvalue = "Update Report";
            this.createreportform.patchValue({ rname: check[0]["ReportName"] })
            this.createreportform.patchValue({ typeq: check[0]["querytype"] == "Query" ? 'q' : 'sp' })
            this.createreportform.patchValue({ source: check[0]["jndi_id"] })
            this.createreportform.patchValue({ ptname: check[0]["tablename"] })
            this.createreportform.patchValue({ query: check[0]["query"] })
            this.createreportform.patchValue({ rgpname: check[0]["id"] })
        }
        else {
            this.checkvalue = "Create Report";

        }
    }


    reportformsubmit() {
        // this.createreportform.value.upload = this.fileReaded;
        if (this.checkvalue == "Create Report") {
            this.reportcreate.reportcreat(this.createreportform.value).subscribe(
                data => {
                    if (data.result == 'reportcreated') {
                        this._snackBar.openSnackBar("Report created Successful", 2000,
                        );
                        this.router.navigate(['/dashboard/createreportlist']);
                    }
                    else {
                        this._snackBar.openSnackBar(data, 2000
                        );

                    }
                },
                err => {
                    console.log(err);
                }
            )
        }
        else
        {
             this.reportcreate.reportupdate(this.createreportform.value).subscribe(
                data => {
                    if (data.result == 'reportcreated') {
                        this._snackBar.openSnackBar("Report created Successful", 2000,
                        );
                        this.router.navigate(['/dashboard/createreportlist']);
                    }
                    else {
                        this._snackBar.openSnackBar(data, 2000
                        );

                    }
                },
                err => {
                    console.log(err);
                }
            )

        }

    }

    formclear() {
        this.createreportform.reset();
        // this.createreportform.value.rname   ='';
        // this.createreportform.value.typeq   ='';
        // this.createreportform.value.ptname  ='';
        // this.createreportform.value.query   ='';
        // this.createreportform.value.rgpname ='';

        console.log(this.createreportform)
    }




}
