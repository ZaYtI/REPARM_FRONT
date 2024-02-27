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
    listOfCategorie: [] as any[],
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
    getListOfCategorie():string[]{
      console.log("get cat")
      return this.listOfCategorie;
    }
  },
  actions: {
    async setSelectedCat(value: string): Promise<void>{
      this.selectedCat = value;
      if( value === "Tous les fusils"){
        const data = await fetch('https://reparm-api-without-docker.onrender.com/product/getall')
        const products = await data.json()
        this.listOfProducts = products;
      }
    },

    async setListOfCategorie(): Promise<void>{
      const data = await fetch('https://reparm-api-without-docker.onrender.com/categorie/getall')
      const categorie = await data.json();
      for ( const cat of categorie){
        this.listOfCategorie.push(cat);
      }
      console.log(this.listOfCategorie);
      }
  },
});
