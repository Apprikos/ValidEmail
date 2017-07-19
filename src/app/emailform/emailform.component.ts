import { Component } from '@angular/core';


@Component({
  selector: 'app-emailform',
  templateUrl: './emailform.component.html',
  styleUrls: ['./emailform.component.scss']
})
export class EmailformComponent {

	user = {email:'',
	password:''} ;
	
	submitted = false;
	typo = false;
	isEmail = false;
	time = null;
	wait = false;
	message = false;
	
	onSubmit() {
		this.submitted = true;
	}
	
	validate(){
		console.log("validate");
		this.message = true;
	}
	
 
	valuechange(newValue) {
		this.message = false;
		this.isEmail = true;
		this.user.email = newValue;
		console.log(newValue);
		
		
		// check there is a . after @ (not done buy angular validator)
		// find @
		var at = newValue.indexOf("@");
		// if there is an @
		if(at > -1 && at != newValue.length-1){
			this.isEmail = false;
			console.log("contains @");
			// see if there is a .
			var after = newValue.substring(at, newValue.length);
			
			// prevent double message where angular does not allow end in .
			if(after.indexOf(".") == after.length-1){
				this.isEmail = true;
			}
			
			// if . exists hide message
			if(after.indexOf(".") > -1 && after.indexOf(".") != after.length-1){
				console.log("contains .");
				// is an email
				this.isEmail = true;
			
			}
		}
			
		
		
		console.log("IsEmail "+this.isEmail);
		
	}

}

