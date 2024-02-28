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
    allProduct: [] as any[],
    listOfCategorie: [] as any[],
    selectedCat: 'Tous les fusils' as string ,
    listOfSelectedProducts: [] as any[],
  }),
  getters: {
    getSelectedCat():any{
      return this.selectedCat;
    },
    getlistOfSelectedProducts(): Product[] {
      return this.listOfSelectedProducts;
    },
    getListOfCategorie():string[]{
      return this.listOfCategorie;
    },
    getAllProducts():Product[]{
      return this.allProduct;
    }
  },
  actions: {
    async setSelectedCat(id:number,value:string): Promise<void>{
      this.selectedCat = value;
      let data;
      if(id != 0 && value != "Tous les fusils"){
        data = this.allProduct.filter((element) => element.categorieId = 1)
        console.log(data)
      }else{
        data = this.allProduct
      }
      this.listOfSelectedProducts = data;
    },

    async setAllProduct(){
      const data = await fetch('https://reparm-api-without-docker.onrender.com/product/getall')
      const products = await data.json()
      this.allProduct = products
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
