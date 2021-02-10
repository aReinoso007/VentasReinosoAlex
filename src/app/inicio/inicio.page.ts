import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../model/producto';
import { Usuario } from '../model/usuario';
import { FireService } from '../service/fire.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  usuario: Usuario;
  productos: Producto[];
  prods: Observable<any[]>;
  producto: Producto;
  loggedIn = false;
  constructor(
    private afService: FireService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.usuario = this.router.getCurrentNavigation().extras.queryParams.usuario;
        this.producto = this.router.getCurrentNavigation().extras.queryParams.producto;
      }
    });
    
  }

  ngOnInit() {
    this.prods = this.afService.getProds();
    this.checkIfLoggedin();
    //this.productos.push(this.producto);
    console.log("lista de carrito "+this.productos);
  }

  listarProductos(){
    this.afService.getProductos()
    .subscribe(data => {
      this.productos = data;
      console.log(this.productos);
    })
  }

  verProducto(uid: string){
    const url = '/producto/'+uid;
    console.log(url);
    this.router.navigate([url]);
  }

  checkIfLoggedin(){
    if(!this.usuario){
      this.loggedIn = false;
    }else{
      this.loggedIn = true;
    }
    console.log("estado: ", this.loggedIn);
  }

  logOut(){
    if(this.usuario){
      this.loggedIn = false;
    }else {
      this.loggedIn = true;
    }
    console.log("estado: ", this.loggedIn);
    this.router.navigate(['/login']);
    this.usuario = new Usuario();
  }

}
