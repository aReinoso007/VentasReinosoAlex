import { Producto } from './../model/producto';
import { Usuario } from './../model/usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FireService } from '../service/fire.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  producto: Producto = new Producto();
  uid: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afService: FireService
  ) { 
    this.uid = this.route.snapshot.paramMap.get('uid');
    console.log("uid: ", this.uid);

    this.afService.getProdById(this.uid).subscribe(data => {
      const aux:any = data
      this.producto
       = aux[0];
    });

    this.route.queryParams.subscribe(params => {
      console.log(params);
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.producto = this.router.getCurrentNavigation().extras.queryParams.producto;
        console.log(this.producto);
      }
    })
  }

  ngOnInit() {
  }

  addToCart(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        producto: this.producto
      }
    };
    alert("added to cart");
    this.router.navigate(['/inicio'], navigationExtras);
  }


}
