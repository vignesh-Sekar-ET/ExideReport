/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { reportcreateserviceService } from '../../services/reportcreateservice/reportcreateservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'bh-createreport',
    templateUrl: './createreport.template.html'
})

export class createreportComponent implements OnInit {
    datavalue: any;
    RGname: any;
    createreportform: FormGroup;

    selectvalue = [
        { value: 'mssql_nrb', viewValue: 'MSSQL_NRB' },
        { value: 'mssql_sharebazaar', viewValue: 'MSSQL_SHAREBAZAAR' },
    ];
    querytype: any = [
        { value: 'q', viewValue: 'query' },
        { value: 'sp', viewValue: 'Store Procedure' }
    ];
    fileReaded: any;

    constructor(private reportcreate: reportcreateserviceService, private _snackBar: MatSnackBar,
        private formBuilder: FormBuilder, private router: Router) {

        this.createreportform = this.formBuilder.group(
            {
                rname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
                typeq: ['',],
                source: ['', [Validators.required]],
                ptname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
                query: ['',],
                upload: ['',],
                rgpname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
            }
        )

    }

    ngOnInit() {
        this.reportcreate.reportgrouplist().subscribe(
            data => { this.RGname = data })
    }

    fileuploaded() {
        console.log("event called");
        // console.log(event);
    }
    reportformsubmit() {
        this.createreportform.value.upload = this.fileReaded;
        this.reportcreate.reportcreat(this.createreportform.value).subscribe(
            data => {
                this.datavalue = data;
                if (this.datavalue.result == 'reportcreated') {
                    this._snackBar.open("Report created Successful", "", {
                        duration: 2000,
                    });
                    this.router.navigate(['/dashboard/createreportlist']);
                }
                else {
                    this._snackBar.open(this.datavalue, "ERROR", {
                        duration: 2000,
                    });

                }
            },
            err => {
                console.log(err);
            }
        )
    }

    formclear() {
        this.createreportform.reset();
        // this.createreportform.value.rname   ='';
        // this.createreportform.value.typeq   ='';
        // this.createreportform.value.ptname  ='';
        // this.createreportform.value.query   ='';
        // this.createreportform.value.upload  ='';
        // this.createreportform.value.rgpname ='';

        console.log(this.createreportform)
    }

    onFileInput(sender: any) {
        // console.log(sender);

        var validExts = new Array(".xlsx", ".csv");

        var fileExt = sender.target.value;

        fileExt = fileExt.substring(fileExt.lastIndexOf('.'));


        if (validExts.indexOf(fileExt) < 0) {
            console.log(validExts.toString() + " files only");
            return false;
        }
        else {

            if (fileExt == ".xlsx") {
                console.log("uploaded file xlsx")
            }
            else {
                // console.log("uploaded file csv");
                this.fileReaded = sender.target.files[0];

                let reader: FileReader = new FileReader();
                reader.readAsText(this.fileReaded);

                reader.onload = (e) => {
                    let csv: any = reader.result;
                    //  console.log("csv : "+ csv );
                    let allTextLines = csv.split(/\r|\n|\r/);
                    //  console.log("alltext : "+ allTextLines );
                    let headers = allTextLines[0].split(',');
                    //  console.log("headers : "+ headers );
                    let lines = [];

                    for (let i = 0; i < allTextLines.length; i++) {
                        // split content based on comma  
                        let data = allTextLines[i].split(',');
                        if (data.length === headers.length) {
                            let tarr = [];
                            for (let j = 0; j < headers.length; j++) {
                                tarr.push(data[j]);
                                // console.log(tarr);
                            }

                            // log each row to see output  
                            //  console.log(tarr);
                            lines.push(tarr);
                            // console.log(lines);
                        }
                    }
                    // all rows in the csv file  
                    // console.log(this.createreportform);
                    this.fileReaded = lines;
                    // console.log(">>>>>>>>>>>>>>>>>", lines);
                }
            }
        }
    }


}
