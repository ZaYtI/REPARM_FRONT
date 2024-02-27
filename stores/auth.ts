import { defineStore } from 'pinia';

interface UserProfile {
  id: number;
  postalCode: string;
  nick: string;
  civility: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  password: string;
  roleId: number;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

interface RegisterUser{
  civility: string,
  lastName: string,
  firstName: string,
  phone: string,
  country: string,
  address: string,
  email: string,
  password: string,
  birthDate: string,
  postalCode: string,
  nick: string,
}

export const useAuthStore = defineStore('auth',{
  state: () => ({
    authenticated: false as boolean,
    token: localStorage.getItem('token') || null,
    user: null as UserProfile | null,
    panier : null as  any,
  }),
  getters: {
    getIsLoggedIn(): boolean {
      return this.authenticated;
    },
    getProfile(): UserProfile | null {
      return this.user;
    },
    getToken(): string | null {
      return this.token;
    },
    getPanier(): any{
      return this.panier
    }
  },
  actions: {
    async login(email: string, password: string): Promise<void> {
      const response = await fetch('https://reparm-api-without-docker.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const responseData = await response.json();
      if (response.status !== 200) {
        this.authenticated =false;
        localStorage.removeItem('token')
        throw new Error(responseData.message || 'Failed to authenticate');
      } else {
        this.token = responseData.access_token;
        this.authenticated = true;
        localStorage.setItem('token', responseData.access_token);
      }
    },

    async profile(): Promise<void> {
      const response = await fetch('https://reparm-api-without-docker.onrender.com/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      const responseData = await response.json();

      if (response.status !== 200) {
        this.authenticated =false;
        localStorage.removeItem('token')
        throw new Error(responseData.message || 'Failed to get profile');
      } else {
        this.user = responseData;
        this.authenticated = true;
      }
    },

    async register(formData: RegisterUser): Promise<void> {
      formData.postalCode = "62620";
      formData.nick = "test";
      const response = await fetch('https://reparm-api-without-docker.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if(responseData.access_token !== undefined || responseData.access_token !== null){
        this.token = responseData.access_token;
        this.authenticated = true;
        localStorage.setItem('token', responseData.access_token);
      }else{
        this.authenticated =false;
        localStorage.removeItem('token')
        throw new Error(responseData.message || 'Failed to register');
      }
    },

    async userPanier(): Promise<void> {
      const response = await fetch('https://reparm-api-without-docker.onrender.com/panier-item/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });
      const responseData = await response.json()

      if(response.status !== 200 && response.status !== 304){
        this.authenticated =false;
        localStorage.removeItem('token')
        throw new Error(responseData.message || 'Failed to get the basket');
      }else{
        this.panier = responseData
      }
    },

    async createOrder():Promise<void>{
      const response = await fetch('https://reparm-api-without-docker.onrender.com/commande_produit/createWithPanier',{
        method : 'POST',
        headers:{
          'Authorization': `Bearer ${this.token}`,
        }
      })
      const responseData = await response.json();
      if(response.status !== 200){
        this.authenticated =false;
        localStorage.removeItem('token')
        throw new Error(responseData.message || 'Failed to get the basket');
      }else{
        this.panier = responseData
      }
    },

    async logout():Promise<void>{
      const response = await fetch('https://reparm-api-without-docker.onrender.com/auth/register',{
        method : 'POST',
        headers:{
          'Authorization': `Bearer ${this.token}`,
        }
      })
      const responseData = await response.json();
      if(response.status !== 200){
        this.authenticated =false;
        localStorage.removeItem('token')
        throw new Error(responseData.message || 'Failed to get the basket');
      }else{
        this.panier = responseData
      }
    },

    async isLoggedIn(): Promise<void>{
      this.authenticated = localStorage.getItem('token') ? true : false;
    }
  },
});
