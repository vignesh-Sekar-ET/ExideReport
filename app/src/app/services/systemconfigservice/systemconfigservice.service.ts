/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NDataModelService } from 'neutrinos-seed-services';
import { ModelMethods } from 'app/lib/model.methods';

@Injectable()
export class systemconfigserviceService {
    dm: ModelMethods
    sysProps;
    systemProperties: any;
    changecomp: any;
    systemconfigupdate: any;
    getsystemvalues: any;
    // systemconfig: any;

    constructor(private bdms: NDataModelService, private http: HttpClient) {
        this.dm = new ModelMethods(bdms);
        this.sysProps = this.bdms;
        this.systemProperties = this.sysProps.systemService.properties;
        // let url = this.systemProperties.modularUrl;
        // url += "sysconfiglist"
        // this.http.get(url).subscribe((response) => {
        //     this.systemconfig = response[0].max_timeout;
        // });
    }
    
    getSystemConfig() {
        let url = this.systemProperties.modularUrl;
        url += "sysconfiglist"
        return this.http.get(url);
    }


    systemConfigUpdate(maxtimeout: number, maxOutput: number, systemstatus: any, configId: number): Observable<any> {
        let url = this.systemProperties.modularUrl;
        url += "sysconfigupdate "
        let body = { 'max_timeout': maxtimeout, 'maxOutput': maxOutput, 'status': systemstatus, 'config_id': configId };
        console.log(body)
        return this.http.post(url, body);
    }

}
