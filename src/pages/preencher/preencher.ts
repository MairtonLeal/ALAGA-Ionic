import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { UsuarioPage } from '../usuario/usuario';



@IonicPage()
@Component({
  selector: 'page-preencher',
  templateUrl: 'preencher.html',
})
export class PreencherPage {
  Estado='';
  Bairro = '';
  Nome = '';
  Data = '';
  Rua = '';
  public parametroRecebido;
  LocalItems: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authServiceProvider: AuthServiceProvider,
    public firebaseProvider: FirebaseProvider,
    public alertCtrl: AlertController
  ) {
    this.LocalItems = this.firebaseProvider.getLocalItems();
    this.parametroRecebido = navParams.get("parametroReferenciaEnviado")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreencherPage');
  }
 
  
  logForm(objselecionado2) {

    this.showAlert();
    this.firebaseProvider.addItem(this.Nome, this.Estado, this.Bairro, this.Data, this.Rua);
    
  }
 
  navigate(objSelecionado2) {
    this.navCtrl.push(UsuarioPage, {
      parametroReferenciaEnviar2: objSelecionado2
    })

  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso ',
      subTitle: 'Dados registrados ALAGA-INFO APP',

      buttons: ['OK Entendi!']
    });
    alert.present();
  }

  removeItem(id) {
    this.firebaseProvider.removeItem(id);
  }
  retornar() {
    this.navCtrl.push(UsuarioPage);
  }
}
