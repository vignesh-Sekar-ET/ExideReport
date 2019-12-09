/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';



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
    public multielect: "AbstractControl";
    public singleselect: "AbstractControlsa";
    singleArray: any = [];
    @ViewChild('multiSelect', { static: false }) multiSelect: ElementRef;
    public settings = {};
    public singlesettings = {};
    public selectedItems = [];
    public data = [];
    public bank = [];
    public multiuserMapping = [];
    public singleuserMapping = [];
    public sample = [];
    constructor(private bdms: NDataModelService, public element: ElementRef) {
        super();
        this.mm = new ModelMethods(bdms);
    }

    ngOnInit() {

        this.data = [
            { name: 'Bank A (Switzerland)', id: 'A' },
            { name: 'Bank B (Switzerland)', id: 'B' },
            { name: 'Bank C (France)', id: 'C' },
            { name: 'Bank D (France)', id: 'D' },
            { name: 'Bank E (France)', id: 'E' },
            { name: 'Bank F (Italy)', id: 'F' },
            { name: 'Bank G (Italy)', id: 'G' },
            { name: 'Bank H (Italy)', id: 'H' },
            { name: 'Bank I (Italy)', id: 'I' },
            { name: 'Bank J (Italy)', id: 'J' },
            { name: 'Bank R (Germany)', id: 'R' }
        ]

        this.bank = [
            { name: "sample", id: 1 },
            { name: "sample1", id: 2 },
            { name: "sample2", id: 3 },
        ]
        // singlese = true;

        // setting and support i18n
        this.settings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            enableCheckAll: true,
            selectAllText: 'Select All',
            unSelectAllText: 'Unselect All',
            allowSearchFilter: true,
            limitSelection: -1,
            clearSearchFilter: true,
            maxHeight: 197,
            itemsShowLimit: 3,
            searchPlaceholderText: 'search ',
            noDataAvailablePlaceholderText: 'No data',
            closeDropDownOnSelection: false,
            showSelectedItemsAtTop: false,
            defaultOpen: false
        };
        // setting and support i18n
        this.singlesettings = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
            enableCheckAll: true,
            selectAllText: 'Select All',
            unSelectAllText: 'Unselect All',
            allowSearchFilter: true,
            limitSelection: -1,
            clearSearchFilter: true,
            maxHeight: 197,
            itemsShowLimit: 3,
            searchPlaceholderText: 'search ',
            noDataAvailablePlaceholderText: 'No data',
            closeDropDownOnSelection: false,
            showSelectedItemsAtTop: false,
            defaultOpen: false
        };
        this.setForm();
        // console.log(this.settings)
    }

    public setForm() {
        this.form = new FormGroup({
            multiselect: new FormControl('', Validators.required),
            singleselect: new FormControl('', Validators.required)
        });
        this.loadContent = true;
    }


    // save(event) {
    //     let Mymap = new Map();
    //     let mappingArray = [];
    //     let singleArray = [];
    //     let multiselectobj = event.multiselect.map(multitem => ({ id: multitem.id, name: multitem.name }))
    //     let singleselectobj = event.singleselect.map(singleitem => singleitem.id);


    //     mappingArray.push(multiselectobj)
    //     singleArray.push(singleselectobj)
    //     let obj1 = {};
    //     // console.log(multiselectobj.assign(singleselectobj))
    //     Mymap.set(...singleselectobj, ...mappingArray);
    //     //       var obj = {multiselectobj};
    //     // var pair = {singleselectobj};
    //     // obj = {...obj, ...pair};
    //     // console.log(obj)
    //     for (let [key, value] of Mymap.entries()) {
    //         console.log(multiselectobj)
    //         // this.sample.push({ "value": { multiselectobj, key[0]})
    //         // this.sample.push(...value) 
    //         // Object.assign(this.sample, {key3: key});
    //     }
    //     console.log(this.sample)
    //     const groupBy = (array, key) => {
    //         console.log(array)
    //         return array.reduce((result, currentValue) => {
    //             (result[currentValue.key] = result[currentValue.key] || []).push(
    //                 currentValue
    //             );
    //             console.log(result);
    //             return result;
    //         }, {});
    //     };

    //     const personGroupedByColor = groupBy(this.sample, key);

    //     // console.log(this.sample)

    // }

    save(event) {

        let destructure = [...event.multiselect]
        Object.assign(destructure, { key: event.singleselect[0].id })
        console.log(destructure)
        let obj = destructure;
        console.log(JSON.stringify(obj))
        this.sample.push(obj)
        const personGroupedByColor = this.groupBy(this.sample, "key");
        console.log("pC", JSON.stringify(personGroupedByColor[event.singleselect[0].id]))
        personGroupedByColor[event.singleselect[0].id] = destructure;
        
        // this.finalArray(personGroupedByColor["1"][0], 'id')
        console.log("pC", JSON.stringify(personGroupedByColor))

    }

    groupBy = (array, key) => {
        // console.log(array, key)
        return array.reduce((result, currentValue) => {
            (result[currentValue.key] = result[currentValue.key] || []).push(
                currentValue
            );
            // console.log(JSON.stringify({ ...result }), "cV", JSON.stringify(currentValue));
            return result;
        }, {});

    };

    finalArray(array, key) {

        let lookup = new Set()
        console.log(lookup)
        return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]))
    }


    public onFilterChange(item: any) {
        // console.log(item);
    }
    public onDropDownClose(item: any) {
        // console.log(item);
    }

    public onItemSelect(item: any) {
        // console.log(item);
    }
    public onDeSelect(item: any) {
        // console.log(item);
    }

    public onSelectAll(items: any) {
        // console.log(items);
    }
    public onDeSelectAll(items: any) {
        // console.log(items);
    }
}
