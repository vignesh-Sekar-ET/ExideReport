
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { reportcreateserviceService } from '../../services/reportcreateservice/reportcreateservice.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Columnsetting } from '../../columnsetting';
import { NSnackbarService } from 'neutrinos-seed-services';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import readXlsxFile from 'read-excel-file';


@Component({
    selector: 'bh-generatereport',
    templateUrl: './generatereport.template.html'
})

export class generatereportComponent implements OnInit {
    @ViewChild('fileInput', { static: false }) uploadnameRef: ElementRef;
    @ViewChild('multiSelect', { static: true }) multiSelect;


    tablePaginationSettings: Columnsetting = <Columnsetting>{};
    columnDefinition = [];
    reportcolumn = [];
    selectvalue: any
    tablevisible: boolean = false;
    subscribable: boolean = false;
    downloadable: boolean = false;
    filename: any = '';
    loading = false;
    dropdownsetting = {}
    invalid_csv: boolean

    testContent: any;
    generatereportform: FormGroup;

    fileReaded: any;




    constructor(private _snackBar: NSnackbarService, private reportservice: reportcreateserviceService,
        private formBuilder: FormBuilder) {
        this.generatereportform = this.formBuilder.group(
            {
                rname: ['', [Validators.required]],
                upload: ['', [Validators.required]],
            }
        )
        this.reportservice.genreportlist().subscribe((response) => {
            this.selectvalue = response;
            console.log(this.selectvalue);
        });
        this.dropdownsetting = {
            singleSelection: true,
            text: "Select Report",
            enableSearchFilter: true,
            labelKey: "ReportName",
            primaryKey: "reports_id",
            showCheckbox: false,
            classes: "myclass custom-class",
            noDataLabel :"No Reports Found",
            maxHeight:150
        };


    }

   
    onDeSelectAll(item: any) {
       this.generatereportform.controls['rname'].setValue('');
    }


    ngOnInit() {


        this.tablePaginationSettings.enablePagination = true;
        this.tablePaginationSettings.pageSize = 5;
        this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
        this.tablePaginationSettings.showFirstLastButtons = true;

    }

    reportformsubmit() {
        // this.generatereportform.controls['upload'].setValue(this.fileReaded);
        this.reportservice.reportgenerate(this.generatereportform.value).subscribe(
            data => {

                if (data.result == 'success') {
                    this.testContent = data.value;

                    this.tablevisible = false;
                    this.columnDefinition = [];
                    this.reportcolumn = [];
                    if (this.testContent.length > 0) {
                        Object.keys(this.testContent[0]).forEach(key => {

                            this.columnDefinition.push({
                                'name': key,
                                'displayName': key
                            })
                            this.reportcolumn.push(key);

                        });

                        this.tablevisible = true;


                        data.access.download == 1 ? this.downloadable = true : this.downloadable = false;
                        data.access.subscribe == 1 ? this.subscribable = true : this.subscribable = false;

                    }
                    else {
                        this._snackBar.openSnackBar("Please Check your upload values", 4000,
                        );
                        this.tablevisible = false;
                        this.downloadable = false;
                        this.subscribable = false;
                    }


                }
                else if (data.result == 'failure' && data.syntaxerror) {
                    this._snackBar.openSnackBar(data.reason.message, 4000,
                    );
                    this.tablevisible = false;
                    this.downloadable = false;
                    this.subscribable = false;

                }
                else if (data.result == 'failure' && !data.syntaxerror) {
                    this._snackBar.openSnackBar(data.reason, 4000,
                    );
                    this.tablevisible = false;
                    this.downloadable = false;
                    this.subscribable = false;
                }



            },
            err => {
                console.log(err);
                this.tablevisible = false;
                this.downloadable = false;
                this.subscribable = false;
            }
        )
    }

    onFileInput(sender: any) {

        var validExts = new Array(".xlsx", ".csv");

        var fileExt = sender.target.value;
        this.filename = fileExt.replace(/^.*[\\\/]/, '')

        fileExt = fileExt.substring(fileExt.lastIndexOf('.'));


        if (validExts.indexOf(fileExt) < 0) {
            this.invalid_csv = true;
            this.filename = '';
            this.generatereportform.controls['upload'].setValue('');

            return false;
        }
        else {

            if (fileExt == ".csv") {
                this.fileReaded = [];
                this.invalid_csv = false;
                let readerval = sender.target.files[0];
                let reader: FileReader = new FileReader();
                reader.readAsText(readerval);

                reader.onload = (e) => {
                    let csv: any = reader.result;

                    let allTextLines = csv.split(/\r|\n|\r/);

                    let headers = allTextLines[0].split(',');

                    let lines = [];

                    for (let i = 0; i < allTextLines.length; i++) {

                        let data = allTextLines[i].split(',');
                        if (data.length === headers.length) {
                            let tarr = [];
                            for (let j = 0; j < headers.length; j++) {
                                tarr.push(data[j]);

                            }


                            lines.push(tarr);

                        }
                    }

                    this.fileReaded = lines;
                    this.generatereportform.controls['upload'].setValue(this.fileReaded);

                }
            }
            else if (fileExt == ".xlsx") {
                this.invalid_csv = false;
                var fileExt = sender.target.files[0];
                readXlsxFile(fileExt).then((rows) => {
                    this.fileReaded = rows;
                    this.generatereportform.controls['upload'].setValue(this.fileReaded);
                })

            }
            // else {
            //     this.generatereportform.controls['upload'].setValue('');
            //     this.invalid_csv = true;
            // }

        }

    }

    generatereport() {
        // let title = "SampleTitle";
        var options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            headers: this.reportcolumn
        };
        new ngxCsv(this.testContent, "Report", options);
    }

    generateformreset() {
        this.generatereportform.reset();
        this.filename = '';
        this.uploadnameRef.nativeElement.value = '';
        this.tablevisible = false;
        this.downloadable = false;
        this.subscribable = false;
    }

}
