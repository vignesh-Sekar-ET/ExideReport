
import { Component, OnInit, ViewChild } from '@angular/core'
import { reportcreateserviceService } from '../../services/reportcreateservice/reportcreateservice.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Columnsetting } from '../../columnsetting';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ngxCsv } from 'ngx-csv/ngx-csv';


@Component({
    selector: 'bh-generatereport',
    templateUrl: './generatereport.template.html'
})

export class generatereportComponent implements OnInit {


    tablePaginationSettings: Columnsetting = <Columnsetting>{};
    columnDefinition = [];
    reportcolumn = [];
    selectvalue: any
    tablevisible: boolean = false;

    testContent: any;
    generatereportform: FormGroup;

    fileReaded: any;




    constructor(private snackBar: MatSnackBar, private reportservice: reportcreateserviceService,
        private formBuilder: FormBuilder) {
        this.generatereportform = this.formBuilder.group(
            {
                rname: ['', [Validators.required]],
                upload: ['',],
            }
        )


    }

    button() {

    }

    ngOnInit() {

        this.reportservice.genreportlist().subscribe((response) => {
            this.selectvalue = response;
        });
        this.tablePaginationSettings.enablePagination = true;
        this.tablePaginationSettings.pageSize = 5;
        this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
        this.tablePaginationSettings.showFirstLastButtons = true;

    }

    reportformsubmit() {
        this.generatereportform.controls['upload'].setValue(this.fileReaded);
        this.reportservice.reportgenerate(this.generatereportform.value).subscribe(
            data => {
            
                this.testContent = data;
                Object.keys(this.testContent[0]).forEach(key => {

                    this.columnDefinition.push({
                        'name': key,
                        'displayName': key
                    })
                    this.reportcolumn.push(key);
                });
                this.tablevisible = true;
            },
            err => {
                console.log(err);
            }
        )
    }

    onFileInput(sender: any) {
       

        var validExts = new Array(".xlsx", ".csv");

        var fileExt = sender.target.value;

        fileExt = fileExt.substring(fileExt.lastIndexOf('.'));


        if (validExts.indexOf(fileExt) < 0) {
            // console.log(validExts.toString() + " files only");
            return false;
        }
        else {

            if (fileExt == ".xlsx") {
                console.log("uploaded file xlsx")
            }
            else {
            
                this.fileReaded = sender.target.files[0];

                let reader: FileReader = new FileReader();
                reader.readAsText(this.fileReaded);

                reader.onload = (e) => {
                    let csv: any = reader.result;
               
                    let allTextLines = csv.split(/\r|\n|\r/);
                
                    let headers = allTextLines[0].split(',');
                   
                    let lines = [];

                    for (let i = 0; i < allTextLines.length; i++) {
                        // split content based on comma  
                        let data = allTextLines[i].split(',');
                        if (data.length === headers.length) {
                            let tarr = [];
                            for (let j = 0; j < headers.length; j++) {
                                tarr.push(data[j]);
                              
                            }

                            // log each row to see output  
                       
                            lines.push(tarr);
               
                        }
                    }
                    // all rows in the csv file  
 
                    this.fileReaded = lines;
                   
                }
            }
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
        new ngxCsv(this.testContent, "Report",options);
    }

}
