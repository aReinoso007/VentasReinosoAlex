import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { FireService } from '../service/fire.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario: Usuario = new Usuario();
  constructor(
    private fireService: FireService
  ) { }

  ngOnInit() {
  }

  registerUser(){
    this.fireService.registerUser(this.usuario);
    this.usuario = new Usuario();
    alert("Exito");
  }

}
