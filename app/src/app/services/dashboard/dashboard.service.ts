/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { NDataModelService } from 'neutrinos-seed-services';
import { ModelMethods } from 'app/lib/model.methods';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class dashboardService {
    grouptype :any ;
    dm: ModelMethods
    sysProps;
    systemProperties: any;
    dbconfigupdate:any;
    updateVal:boolean = false;
    UpdateLabel:string = "Update";
    constructor(private bDataModelService: NDataModelService,
        private http: HttpClient) {
        this.dm = new ModelMethods(bDataModelService);
        this.sysProps = this.bDataModelService;
        this.systemProperties = this.sysProps.systemService.properties;
        // console.log(this.systemProperties);

    }
    getConfigListGet(){
        let URL = this.systemProperties.modularUrl;
        URL+= "dbconfiglist";
        // console.log(URL);
        return this.http.get(URL)
    }
        //dbconfigCreate 

    getConfigListPost(jndi,ip,port,name,type,pool,username,pass,active){
        let URL = this.systemProperties.modularUrl;
        let jndiname = "'" + jndi + "'";
        let serverip = "'" + ip + "'";
        let portnumber = "'" + port + "'";
        let dbname = "'" + name + "'";
        let drivertype = "'" + type + "'";
        let connectionpoolsize = "'" + pool + "'";
        let dbusername = "'" + username + "'";
        let password = "'" + pass + "'";
        let activestatus = "'" + active + "'";
        let body = { "jndi":jndiname, "ip":serverip,"port":portnumber, "name":dbname, "type":drivertype,
        "pool":connectionpoolsize,"username":dbusername, "pass":password, "active":activestatus
    }
   
        URL+= "dbconfigcreate";
        //  console.log(body, URL)
        return this.http.post(URL,body);
        
    }
    getconfigUpdate(jndi:any, ip:any, port:any, name:any, type:any, pool:any, username:any, pass:any, active:any, id:any) {
        let URL = this.systemProperties.modularUrl;
        let jndiname = "'" + jndi + "'";
        let serverip = "'" + ip + "'";
        let portnumber = "'" + port + "'";
        let dbname = "'" + name + "'";
        let drivertype = "'" + type + "'";
        let connectionpoolsize = "'" + pool + "'";
        let dbusername = "'" + username + "'";
        let password = "'" + pass + "'";
        let activestatus = "'" + active + "'";
        let updateId="'"+ id +"'";
        // console.log(updateId)
        let body = {
            "jndi": jndiname, "ip": serverip, "port": portnumber, "name": dbname, "type": drivertype,
            "pool": connectionpoolsize, "username": dbusername, "pass": password, "active": activestatus,"id":updateId
        }
         URL += "dbconfigupdate";
        // console.log( body, URL);
        return this.http.post(URL, body);
    }
    menuArray = [{
        "admin": [{ name: "Dashboard", maticon: "home", router: 'admindash' },
        { name: "Create User Group", maticon: "home", router: 'createuserlist' },
        // { name: "DB Config", maticon: "home", router: 'DbGrouplist' },
        { name: "System Config", maticon: "home", router: 'SystemConfig' },
        { name: "User Group Mapping", maticon: "home", router: 'usergroupmap' },
        { name: "Logout", maticon: "home", router: "/login" }],

        "reportwriter": [{ name: "Create Report group", maticon: "home", router: 'reportgrouplist' },
        { name: "Crete Report", maticon: "home", router: 'createreportlist' },
        { name: "logout", maticon: "home", router: '/login' }],

        "enduser": [{ name: "Generate Report", maticon: "home", router: 'generatereport' },

        { name: "Logout ", maticon: "home", router: '/login' }]

    }]


}
