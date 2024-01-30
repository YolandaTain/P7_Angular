import { Component } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  title = ' Stock';
  products: Product[] = [
    new Product('P001', 'Laptop - High Performance', 10, 1299.99),
    new Product('P002', 'Smartphone - Latest Model', 5, 899.99),
    new Product('P003', 'Headphones - Noise Cancelling', 15, 149.99),
    new Product('P004', 'Camera - Professional DSLR', 8, 1899.99),
    new Product('P005', 'Smartwatch - Fitness Tracker', 12, 129.99)
  ];

  product: Product = {
    code: '',
    description: '',
    quantity: 0,
    price: 0
  };

  deleteProduct(product: Product): void {
    this.products.forEach((element, index) => {
      if (element === product) {
        this.products.splice(index, 1);
      }
    });
  }

  selectProduct(product: Product): void {
    this.product = { ...product };  // Copia los valores del producto seleccionado al objeto product
  }

  addProduct(): void {
    // Comprobación de código único y no cero
    if (this.product.code === '' || this.product.code === '0') {
      alert('El código del producto no puede ser vacío o cero.');
      return;
    }

    const existingProduct = this.products.find(product => product.code === this.product.code);

    if (existingProduct) {
      alert('El producto con este código ya existe. Introduce un código único.');
      return;
    }

    // Si no hay producto existente con el mismo código, agregamos el nuevo producto
    this.products.push({ ...this.product });

    // Limpiamos los campos del formulario después de agregar el producto
    this.product = {
      code: '',
      description: '',
      quantity: 0,
      price: 0
    };
  }

  modifyProduct(): void {
    // Comprobación de código no vacío
    if (this.product.code === '') {
      alert('El código del producto no puede ser vacío.');
      return;
    }

    const existingProductIndex = this.products.findIndex(product => product.code === this.product.code);

    if (existingProductIndex === -1) {
      alert('El producto con este código no está registrado.');
      return;
    }

    // Si el producto existe en el array, lo modificamos
    this.products[existingProductIndex] = { ...this.product };
    alert(`Producto modificado. Código: ${this.product.code}`);

    // Limpiamos los campos del formulario después de modificar el producto
    this.product = {
      code: '',
      description: '',
      quantity: 0,
      price: 0
    };
  }
}


