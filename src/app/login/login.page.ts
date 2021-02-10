import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Usuario } from '../model/usuario';
import { FireService } from '../service/fire.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: Usuario = new Usuario();
  constructor(
    private afService: FireService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.usuario = this.router.getCurrentNavigation().extras.queryParams.usuario;
        console.log(this.usuario.email);
      }
    });
  }

  ngOnInit() {
  }

  login(){
    this.afService.login(this.usuario.email, this.usuario.contrasena);
    let navivationExtras: NavigationExtras = {
      queryParams: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/inicio'], navivationExtras);

  }

}
