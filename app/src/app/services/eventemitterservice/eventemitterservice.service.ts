/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable,EventEmitter  } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';    


@Injectable()
export class eventemitterserviceService {
    invokeFirstComponentFunction = new EventEmitter();    
     subsVar: Subscription;    
      constructor() {
     this.invokeFirstComponentFunction.emit();    

       }    
    

}
