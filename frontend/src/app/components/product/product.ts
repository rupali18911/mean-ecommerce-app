import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  formData: Product = {
    name: '',
    price: 0,
    description: '',
    imageUrl: ''
  };

  editingId: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  submit() {

    if (this.editingId) {
      this.productService.updateProduct(this.editingId, this.formData)
        .subscribe(() => {
          this.resetForm();
          this.loadProducts();
        });
    } else {
      this.productService.createProduct(this.formData)
        .subscribe(() => {
          this.resetForm();
          this.loadProducts();
        });
    }
  }

  edit(product: Product) {
    this.formData = { ...product };
    this.editingId = product.id!;
  }

  delete(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(() => this.loadProducts());
  }

  resetForm() {
    this.formData = {
      name: '',
      price: 0,
      description: '',
      imageUrl: ''
    };
    this.editingId = null;
  }
}
