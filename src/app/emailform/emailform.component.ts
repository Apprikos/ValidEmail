import { Component } from '@angular/core';
import * as stringSimilarity from "string-similarity";

@Component({
  selector: 'app-emailform',
  templateUrl: './emailform.component.html',
  styleUrls: ['./emailform.component.scss']
})
export class EmailformComponent {
	
	domains = [
  
  "aol.com", "att.net", "comcast.net", "facebook.com", "gmail.com", "gmx.com", "googlemail.com",
  "google.com", "hotmail.com", "hotmail.co.uk", "mac.com", "me.com", "mail.com", "msn.com",
  "live.com", "sbcglobal.net", "verizon.net", "yahoo.com", "yahoo.co.uk",

  /* Other global domains */
  "email.com", "games.com" /* AOL */, "gmx.net", "hush.com", "hushmail.com", "icloud.com", "inbox.com",
  "lavabit.com", "love.com" /* AOL */, "outlook.com", "pobox.com", "rocketmail.com" /* Yahoo */,
  "safe-mail.net", "wow.com" /* AOL */, "ygm.com" /* AOL */, "ymail.com" /* Yahoo */, "zoho.com", "fastmail.fm",
  "yandex.com","iname.com",

  /* United States ISP domains */
  "bellsouth.net", "charter.net", "cox.net", "earthlink.net", "juno.com",

  /* British ISP domains */
  "btinternet.com", "virginmedia.com", "blueyonder.co.uk", "freeserve.co.uk", "live.co.uk",
  "ntlworld.com", "o2.co.uk", "orange.net", "sky.com", "talktalk.co.uk", "tiscali.co.uk",
  "virgin.net", "wanadoo.co.uk", "bt.com",

  /* Domains used in Asia */
  "sina.com", "qq.com", "naver.com", "hanmail.net", "daum.net", "nate.com", "yahoo.co.jp", "yahoo.co.kr", "yahoo.co.id", "yahoo.co.in", "yahoo.com.sg", "yahoo.com.ph",

  /* French ISP domains */
  "hotmail.fr", "live.fr", "laposte.net", "yahoo.fr", "wanadoo.fr", "orange.fr", "gmx.fr", "sfr.fr", "neuf.fr", "free.fr",

  /* German ISP domains */
  "gmx.de", "hotmail.de", "live.de", "online.de", "t-online.de" /* T-Mobile */, "web.de", "yahoo.de",

  /* Russian ISP domains */
  "mail.ru", "rambler.ru", "yandex.ru", "ya.ru", "list.ru",

  /* Belgian ISP domains */
  "hotmail.be", "live.be", "skynet.be", "voo.be", "tvcablenet.be", "telenet.be",

  /* Argentinian ISP domains */
  "hotmail.com.ar", "live.com.ar", "yahoo.com.ar", "fibertel.com.ar", "speedy.com.ar", "arnet.com.ar",

  /* Domains used in Mexico */
  "yahoo.com.mx", "live.com.mx", "hotmail.es", "hotmail.com.mx", "prodigy.net.mx",

  /* Domains used in Brazil */
  "yahoo.com.br", "hotmail.com.br", "outlook.com.br", "uol.com.br", "bol.com.br", "terra.com.br", "ig.com.br", "itelefonica.com.br", "r7.com", "zipmail.com.br", "globo.com", "globomail.com", "oi.com.br"
];
	
	user = {email:'',
	password:''} ;
	
	submitted = false;
	typo = false;
	suggestion = '';
	close = false;
	isEmail = false;
	time = null;
	wait = false;
	message = false;
	
	submit() {
		this.submitted = true;
		console.log("submitted");
	}
	
	acceptChange(){
		console.log("clicked");
		this.user.email = this.suggestion;
		this.typo = false;
		this.isEmail = true;
	}
	
	validate(){
		console.log("validate");
		this.message = true;
		this.typo = false;
		this.suggestion = '';
		
		var at = this.user.email.indexOf("@");
		// if there is an @
		if(at > -1 && at != this.user.email.length-1){
			var after = this.user.email.substring(at+1, this.user.email.length);
			console.log(after);
			var match = stringSimilarity.findBestMatch(after, this.domains);
			console.log(match.bestMatch.target);
			console.log(match);
			var bestMatch = match.bestMatch;
			
			for(var i=0;i<match.ratings.length;i++){
			
				if(match.ratings[i].target[0] == after[0]){
					console.log("same first letter");
					if(match.ratings[i].rating+ 0.051 > bestMatch.rating){
						console.log("now better match");
						console.log(bestMatch);
						bestMatch = match.ratings[i];
						console.log(bestMatch);
					}
				}
			}
			
			if(bestMatch.rating > 0.6 && bestMatch.rating < 1){
				this.typo = true;
				this.suggestion = this.user.email.substring(0, at+1)+bestMatch.target;
			}
		}
		else if(at == -1 && this.user.email.length > 13){
			var after = this.user.email.substring(this.user.email.length-12, this.user.email.length);
			console.log(after);
			var match = stringSimilarity.findBestMatch(after, this.domains);
			console.log(match.bestMatch);
			if(match.bestMatch.rating > 0.6){
				this.typo = true;
				match.bestMatch.target
				var before = this.user.email.substring(0, this.user.email.length-match.bestMatch.target.length);
				this.suggestion = before+"@"+match.bestMatch.target;
			}
		}
	}
	
 
	valuechange(newValue) {
		this.message = false;
		this.isEmail = false;
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

