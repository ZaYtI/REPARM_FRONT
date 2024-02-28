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
    selectedCat: 'Tous les fusils' as string ,
    listOfProducts: [] as any[],
  }),
  getters: {
    getSelectedCat():any{
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
    async setSelectedCat(id:number,value:string): Promise<void>{
      this.selectedCat = value;
      let data;
      if(id != 0 && value != "Tous les fusils"){
        data = await fetch('https://reparm-api-without-docker.onrender.com/product/getByCat/'+id)
      }else{
        data = await fetch('https://reparm-api-without-docker.onrender.com/product/getall')
      }
      const products = await data.json()
      this.listOfProducts = products;
    },

    async setAllProduct(){
      const data = await fetch('https://reparm-api-without-docker.onrender.com/product/getall')
      const products = await data.json()
      this.listOfProducts = products
    },

    async setListOfCategorie(): Promise<void>{
      const data = await fetch('https://reparm-api-without-docker.onrender.com/categorie/getall')
      const categorie = await data.json();
      for ( const cat of categorie){
        this.listOfCategorie.push(cat);
      }
      }
  },
});
