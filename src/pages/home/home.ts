import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credencias.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
      email : "",
      senha : ""
  };


  constructor(public navCtrl: NavController , public menu: MenuController , public auth : AuthService) {

  }

  login() {

      this.auth.authenticate(this.creds)
      .subscribe(response => {
          //console.log(response.headers.get("Authorization"));
          this.auth.successfulLogin(response.headers.get("Authorization"));
          this.navCtrl.setRoot("CategoriasPage");
      },
      error => {
      });

  }

  ionViewWillEnter() { 
    
    this.menu.swipeEnable(false);
  
  }

  ionViewDidEnter() {

    this.auth.refreshToken()
    .subscribe(response => {
        //console.log(response.headers.get("Authorization"));
        this.auth.successfulLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot("CategoriasPage");
    },
    error => {
    });


  }
  
  ionViewDidLeave() { 
 
    this.menu.swipeEnable(true);
  
  }

  signup() {
    this.navCtrl.push("SignupPage");
  }

}
