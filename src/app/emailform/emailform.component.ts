import { Component } from '@angular/core';

@Component({
  selector: 'app-emailform',
  templateUrl: './emailform.component.html',
  styleUrls: ['./emailform.component.scss']
})
export class EmailformComponent {
	
	user = {email:'',
	password:''};
	
	submitted = false;
	typo = false;
	isEmail = false;
		
	onSubmit() {
		this.submitted = true;
	}
 
	valuechange(newValue) {
		this.isEmail = false;
		this.user.email = newValue;
		
		// find @
		var at = newValue.indexOf("@");
		// if there is an @
		if(at > -1){
			console.log("contains @");
			// see if there is a .
			var after = newValue.substring(at, newValue.length);
			if(after.indexOf(".") > -1 && after.indexOf(".") != after.length-1){
				console.log("contains .");
				// is an email
				this.isEmail = true;
			
			}
		}
		
		console.log("IsEmail "+this.isEmail);
	}

}

