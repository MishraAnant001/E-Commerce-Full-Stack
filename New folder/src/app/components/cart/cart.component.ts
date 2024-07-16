import { Component, OnInit } from '@angular/core';
import { ICartProduct, IProduct } from 'src/app/interfaces';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private service:CartService){}
  products:ICartProduct[]=[]
  ngOnInit(): void {
    this.getCart()
  }
  getCart(){
    this.service.getCart().subscribe({
      next:(response:any)=>{
        console.log(response)
        this.products=response.body.data.products
      }
    })
  }
  removeItem(item:ICartProduct){
    console.log(item)
    Swal.fire({
      title: "Are you sure you want to remove?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        const product = this.products.find((product:any)=>{
          return item.productid==product.productid
        })
        const index = this.products.indexOf(product!)
        // console.log(index)
        this.products.splice(index,1)
        // console.log(this.products)
        this.service.updateCart(this.products).subscribe({
          next:(response)=>{
            Swal.fire({
              icon: "success",
              title: "product removed",
              showConfirmButton: false,
              timer: 1500
            }).then(()=>{
              this.getCart()
            })
          }
        })
      }
    });
  }

}
