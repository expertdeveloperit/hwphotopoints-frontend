import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';



@Injectable()
export class CommonService {
		
		msg = "I am Here";
		msgChanged(newmsg){
			
			console.log(this.msg);
			this.msg = newmsg;
			console.log(this.msg);
		}
}
