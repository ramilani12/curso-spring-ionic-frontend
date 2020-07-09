import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credencias.dto';
import { AuthService } from '../../domain/auth.service';

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

    this.navCtrl.setRoot("CategoriasPage")

  }

  ionViewWillEnter() { 
    
    this.menu.swipeEnable(false);
  
  }
  
  ionViewDidLeave() { 

    this.auth.authenticate(this.creds)
      .subscribe(response => {
          console.log(response.headers.get("Authorization"));
      },
      error => {
      });
    
    this.menu.swipeEnable(true);
  
  }

}
