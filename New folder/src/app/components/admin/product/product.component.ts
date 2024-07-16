import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/interfaces';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import { ToastService } from 'angular-toastify';
interface Column {
  field: string;
  header: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  categoryData!: [{ _id: string, name: string }]
  @ViewChild("dt") datatable!: ElementRef
  productData: any
  productForm!: FormGroup
  submitted: boolean = false
  isEdited: boolean = false
  productId?: string
  file: any
  product: IProduct = {
    category: "",
    category_name: "",
    description: "",
    file: "",
    name: "",
    price: 0
  }
  filevalue: any
  updateImage = true
  url: any;

  cols!: Column[];
  exportColumns!: ExportColumn[];
  constructor(private fb: FormBuilder, private _toastService: ToastService, private productService: ProductService, private categoryService: CategoryService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      file: ['', Validators.required]
    })
    this.getCategories()
    this.getProducts()
    this.cols = [
      { field: '_id', header: '_id', },
      { field: 'name', header: 'name' },
      { field: 'description', header: 'description' },
      { field: 'price', header: 'price' },
      { field: 'category', header: 'category' },
      { field: 'file', header: 'file' },
      { field: 'category_name', header: 'category_name' },
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default('p', 'px', 'a3');
        autoTable(doc,{
          head:[this.exportColumns],
          body:[this.productData]
        });
        doc.save('products.pdf');
      });
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.productData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  getCategories() {
    this.categoryService.getCategory().subscribe({
      next: (response: any) => {
        this.categoryData = response.data
        // console.log(this.categoryData)
      }
    })
  }
  viewProduct(product: IProduct) {
    this.product = product
  }
  get f() {
    return this.productForm.controls
  }
  onSelectFile(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.file = file
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    } else {
      this.url = undefined
      this.file = undefined
      this.filevalue = ""
    }
  }
  changeFlag() {
    this.updateImage = true
  }
  editProduct(product: IProduct) {
    this.resetForm()
    this.updateImage = false
    // console.log(product)
    this.productId = product._id
    this.isEdited = true
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
    })
  }


  submitForm() {
    this.submitted = true
    if (this.isEdited && this.f['file'].value == null) {
      this.f['file'].setValidators(null);
      this.f['file'].updateValueAndValidity();
    }

    if (this.productForm.valid) {
      const formData = new FormData()
      if (this.file !== undefined) {
        formData.append("file", this.file)
      }
      formData.append("name", this.f['name'].value)
      formData.append("price", this.f['price'].value)
      formData.append("category", this.f['category'].value)
      formData.append("description", this.f['description'].value)
      if (!this.isEdited) {
        this.productService.addProduct(formData).subscribe({
          next: (response) => {
            console.log(response)
            this._toastService.success("product added successfully")
            this.getProducts()
            this.resetForm()
          },
          error: (error) => {
            console.log(error)
          }
        })
      } else {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to proceed?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.productService.updateProduct(this.productId!, formData).subscribe({
              next: (response) => {
                this._toastService.success("product updated successfully")
                this.getProducts()
                this.resetForm()
              },
              error: (error) => {
                this._toastService.error(error.error.message)
              }
            })
    
          },
          reject: (type: ConfirmEventType) => {
            switch (type) {
              case ConfirmEventType.REJECT:
                this._toastService.error("You have rejected")
                break;
              case ConfirmEventType.CANCEL:
                this._toastService.info("You have cancelled")
                break;
            }
          }
        });

      }
    }
  }

  getProducts() {
    this.productService.getProduct().subscribe({
      next: (response: any) => {
        this.productData = response.data
      }
    })
  }
  resetForm() {
    this.submitted = false
    this.isEdited = false
    this.productId = ""
    this.productForm.reset()
    this.url = undefined
    this.file = undefined
    this.filevalue = ""
    this.updateImage = true
    this.f['file'].setValidators(Validators.required);
    this.f['file'].updateValueAndValidity();
  }


  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product._id).subscribe({
          next: (response: any) => {
            // console.log(response)
            this._toastService.success("product deleted successfully")
            this.getProducts()
          },
          error: (error) => {
            this._toastService.error(error.error.message)
          }
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this._toastService.error("You have rejected")
            break;
          case ConfirmEventType.CANCEL:
            this._toastService.info("You have cancelled'")
            break;
        }
      }
    });

  }
}

