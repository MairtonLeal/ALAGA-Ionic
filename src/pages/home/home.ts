import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SigninPage } from '../signin/signin';
import { Geolocation } from '@ionic-native/geolocation';
// imports necessários
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { UsuarioPage } from '../usuario/usuario';
import { AlertController } from 'ionic-angular';
import { PreencherPage } from '../preencher/preencher';



// Puxa as importações necessárias para a pagina
// declarar variavel global google
declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  LastLng: any;
  LastLat: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  LocalItems: FirebaseListObservable<any[]>;

  newItem=[];


  /**
 Declara variavel global map do programa
  **/

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public firebaseProvider: FirebaseProvider,
    private authServiceProvider: AuthServiceProvider,   // instancia o serviço do Firebase Authenticaton
    private geolocation: Geolocation, // cria variavel de geolocalização
    public alertCtrl: AlertController,
    
  ) {
    this.LocalItems = this.firebaseProvider.getLocalItems();

  }
  // inicia mapa

  ionViewDidLoad() {
    this.LoadMap();

  }
  LoadMap() {

    // pega posição atual
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        let position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude); // gera variavel posição que armazena Latitude e Longitude

        // criar metodo para que o mapa apareça no ponto atual do usuário e tenha um zoom definido do mapa          
        let mapOptions = {
          zoom: 20,
          center: position,
        }



        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);



        google.maps.event.addListener(this.map, 'click', e => {

          this.presentToast();



          // a jogada que preciso fazer e pegar a latitude e longitude gerada e colocar na hora do click, agora quando clico ele
          // adiciona a posição mas no mesmo local
          var marker = new google.maps.Marker({
            // marcador criado com animação e titulo do mapa
            position: position,
            map: this.map,
            animation: google.maps.Animation.DROP,
            title: 'Ponto alagado Acionado!',
            icon: "./assets/imgs/m1.png",
            //icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            // o draggable é a função principal que move o marcador
            draggable: true,

            //fecha marcador
          })

          this.lastLatLng(marker);

        }); // fecha Listener


      });





  } // fecha ionviewLoad



  // remover  marcador aqui

  // faz uso de exibir a posição arrastada ao mapa
  lastLatLng(marker) {
    google.maps.event.addListener(marker, 'dragend', () => {
      this.LastLat = marker.position.lat();
      this.LastLng = marker.position.lng();

      const toast = this.toastCtrl.create({
        message: `Latitude: ${this.LastLat}\nLongitude: ${this.LastLng}`,
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  // toast para local add
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Ponto Alagado acionado!, Direcione no local ',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }


  // adicionando os itens
  addItem() {
    let lat = this.LastLat;
    let lng = this.LastLng;
    let cor = [this.LastLat, this.LastLng];

    this.firebaseProvider.addPonto(cor);


  }

  removeItem(id) {
    this.firebaseProvider.removeItem(id);

  }



  voltar() {
    this.navCtrl.push(UsuarioPage)
  }

  navigate(objSelecionado) {
    this.navCtrl.push(PreencherPage, {
      parametroReferenciaEnviar: objSelecionado
    })
  
  }

  AddPonto(objSelecionado) {
    
    
    let confirm = this.alertCtrl.create({
      title: 'Area Lagada',
      message: "Adicionando Local, deseja Salvar? ",

     

      buttons: [
        {
          
          text: 'Não',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: data => {
            console.log('Saved clicked');
            console.log(JSON.stringify(data));
            let local = data;
            this.addItem();
            
           
          }
        }
      ]
    });
   confirm.present();
  }



  }





