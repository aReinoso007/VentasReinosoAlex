import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Carrito } from '../model/carrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  carrito: Carrito[];
  productos = [];
  constructor() { }

  ngOnInit() {
    
  }

}
