import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Producto } from '../model/producto';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class FireService {
  authState = new BehaviorSubject(false);
  constructor(
    public afs: AngularFirestore
  ) { }

  registerUser(usuario: Usuario){
    const refUsuario = this.afs.collection("usuario");
    if(usuario.uid == null){
      usuario.uid = this.afs.createId();
    }
    refUsuario.doc(usuario.uid).set(Object.assign({}, usuario), { merge: true})
  }

  async login(email: string, contrasena: string){
    try{
      let aux = await this.afs.collection("usuario",
        ref => ref.where('email', '==', email).where('password', '==', contrasena)
      ).valueChanges().pipe(first()).toPromise().then(doc => {
        return doc;
      }).catch(error => {
        throw error;
      });
      if(aux==null)
        return {};
      return aux[0];
    }catch(error){
      console.error("error");
    }

  }

  getProductos(): Observable<any[]>{
    const productos = this.afs.collection("producto").valueChanges();
    console.log("retornando desde servicio");
    return productos;
  }

  getProds(): Observable<any[]>{
    return this.afs.collection("producto").valueChanges();
  }

  getProdById(uid: string): Observable<any>{
    return this.afs.collection("producto",
    ref => ref.where('uid', '==', uid)).valueChanges();
  }

  addProducto(producto: Producto){

  }

}
