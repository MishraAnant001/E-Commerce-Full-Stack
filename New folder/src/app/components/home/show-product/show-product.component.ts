import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {
  constructor(private productService: ProductService,private service: CategoryService) { }
  ngOnInit(): void {
    this.getProducts()
    this.getCategoryData()
  }
  showSearch=false
  categoryData!: [{ _id: string, name: string }]
  productData!: IProduct[]
  category?:string
  priceRange?:string
  notFound=false
  search?:string|null=''
  product:IProduct={
    category:"",
    category_name:"",
    description:"",
    file:"",
    name:"",
    price:0
  }
  filterObject:any={}
  getProducts() {
    this.productService.getFilterProducts(this.filterObject).subscribe({
      next: (response: any) => {
        // console.log(response)
        this.productData = response.data
        this.notFound=false
      },
      error:(error:any)=>{
        // console.log(error);
        // console.log("error hua hai!");
        // console.log(error.error.message);
        if(error.error.message=="product not found"){
          this.notFound=true
        }
      }
    })
  }
  viewProduct(product:IProduct){
    this.product=product
  }
  getCategoryData() {
    this.service.getCategory().subscribe({
      next: (response: any) => {
        this.categoryData = response.data
      }
    })
  }
  applyFilters(){
    if(this.priceRange){
      const minPrice= this.priceRange.split("-")[0]
      const maxPrice = this.priceRange.split("-")[1]=="above"?undefined:this.priceRange.split("-")[1]
      this.filterObject['minPrice']=minPrice
      this.filterObject['maxPrice']=maxPrice
    }
    if(this.search && this.search!==null){
      // console.log("inside search");
      this.showSearch =true
      this.filterObject["search"]=this.search
    }else{
      this.showSearch=false
      this.filterObject["search"]=""
    }
    if(this.category){
      this.filterObject['category']=this.category
    }
    // console.log(minPrice,maxPrice);
    // console.log(this.filterObject);
    this.getProducts()
  }
  clearFilters(){
    this.search=""
    this.category=""
    this.priceRange=""
    this.filterObject={}
    this.getProducts()
    this.showSearch=false
  }

}



