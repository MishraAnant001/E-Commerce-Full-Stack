import {  Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  isEdited: boolean = false
  categoryName: string = ""
  categoryId: string = ""
  data!: [{ _id: string, name: string }]
  constructor(private service: CategoryService,private toastr: ToastrService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.getData()
  }
  editCategory(category: any) {
    this.categoryName = category.name
    this.categoryId = category._id
    // console.log(this.categoryName)
    this.isEdited = true

  }
  resetForm() {
    this.isEdited = false
    this.categoryName = ""
    this.categoryId = ""
  }
  getData() {
    this.service.getCategory().subscribe({
      next: (response: any) => {
        this.data = response.data
      }
    })
  }
  deleteCategory(category:any){

    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteCategory(category._id).subscribe({
          next:(response:any)=>{
            // console.log(response)
            this.toastr.success('category deleted successfully');
            this.getData()
          },
          error:(error)=>{
            this.toastr.error(error.error.message);
          }
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.toastr.error("You have rejected");
            break;
          case ConfirmEventType.CANCEL:
            this.toastr.info("You have cancelled");
            break;
        }
      }
    });
    

  }
  submitForm() {
    if (this.categoryName == "") {
      this.toastr.error('please provide a valid name');
      return;
    }
    // console.log(this.categoryName)
    if (!this.isEdited) {
      this.service.addCategory(this.categoryName).subscribe({
        next: (response) => {
          // console.log(response)
          this.toastr.success('category added successfully');
          this.categoryName = ""
          this.getData()
        },
        error: (error) => {
          this.toastr.error(error.error.message);
        }
      })
    }
    else {

      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.service.updateCategory(this.categoryId, this.categoryName).subscribe({
            next: (response) => {
              this.toastr.success('category updated successfully');
              this.categoryName = ""
              this.getData()
            },
            error: (error) => {
              
            }
          })
  
        },
        reject: (type: ConfirmEventType) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              this.toastr.error("You have rejected");
              break;
            case ConfirmEventType.CANCEL:
              this.toastr.info("You have cancelled");
              break;
          }
        }
      });
    }
  }
}
