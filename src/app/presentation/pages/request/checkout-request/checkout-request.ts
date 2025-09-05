import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoStoreService }  from 'src/app/infrastructure/services/cart.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-checkout-request',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './checkout-request.html',
  styleUrl: './checkout-request.css'
})
export class CheckoutRequest {
  constructor(public carritoStore: CarritoStoreService) {}

}
