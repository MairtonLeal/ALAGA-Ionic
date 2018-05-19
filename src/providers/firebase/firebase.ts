import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) { }
  // pega dados
  getLocalItems() {
    return this.afd.list('/LocalItems/');
  }

  // adiciona itens
  addItem(name,estado,bairro,data,rua) {
   
    this.afd.list('/LocalItems/').push(name);
    this.afd.list('/LocalItems/').push(estado);
    this.afd.list('/LocalItems/').push(bairro);
    this.afd.list('/LocalItems/').push(data);
    this.afd.list('/LocalItems/').push(rua);
   

  }

  addPonto(cor = []) {
    this.afd.list('/LocalItems').push("Coordenadas: " + cor);
  }
  // remove por id o objeto
  removeItem(id) {
    this.afd.list('/LocalItems/').remove(id);

  }



}
