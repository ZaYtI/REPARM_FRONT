import { defineStore } from 'pinia';

interface Product {
  id: number;
  naturaBuyId: string;
  name: string;
  description: string;
  price: number;
  barrePrice: number;
  image: string;
  categorieId: number;
  duree : number;
  new: boolean;
  stock: number;
  ean: string;
  createdAt: string;
  updatedAt: string;
}

export const useSelectedCatStore = defineStore('selectedCat',{
  state: () => ({
    selectedCat: "Tous les fusils",
    listOfProducts: [] as any[],
  }),
  getters: {
    getSelectedCat(): string | null {
      return this.selectedCat;
    },
    getListOfProducts(): Product[] {
      return this.listOfProducts;
    },
  },
  actions: {
    async setSelectedCat(value: string): Promise<void>{
      this.selectedCat = value;
      if( value === "Tous les fusils"){
        const data = await fetch('https://reparm-api.onrender.com/product/getall')
        const products = await data.json()
        this.setListOfProducts(products)
      }
    },
    setListOfProducts(value: Product[]): void {
      this.listOfProducts = value;
    },
  },
});
