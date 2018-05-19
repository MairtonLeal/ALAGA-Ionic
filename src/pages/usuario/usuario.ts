import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController  } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SigninPage } from '../signin/signin';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { InfoPage } from '../info/info';
import { FotoSocialPage } from '../foto-social/foto-social';


@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {
  public parametroRecebido;
  public parametroRecebido2;
  LocalItems: FirebaseListObservable<any[]>;
  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authServiceProvider: AuthServiceProvider,
    public firebaseProvider: FirebaseProvider,
    public loadingCtrl: LoadingController
  ) {
    this.LocalItems = this.firebaseProvider.getLocalItems();
    this.parametroRecebido = navParams.get("parametroReferenciaEnviado");
    this.parametroRecebido2 = navParams.get("parametroReferenciaEnviado2")

  }

  OpcaoMapa() {
    this.presentLoading();
    this.navCtrl.setRoot(HomePage);
  }
  Sair() {
    this.authServiceProvider.signOut().then(() => {
      this.navCtrl.setRoot(SigninPage);

    }).catch((error) => {
      console.error(error);

    });
  }
  removeItem(id) {
    this.firebaseProvider.removeItem(id);
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  infoPerfil() {
    this.navCtrl.push(InfoPage);
  }

  tirarFoto() {
    this.navCtrl.push(FotoSocialPage);
  }
}
