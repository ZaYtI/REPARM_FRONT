import { defineStore } from 'pinia';

interface UserProfile {
  id: number;
  postalCode: string;
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

interface RegisterUser {
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
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false as boolean,
    token: localStorage.getItem('token') || null,
    user: null as UserProfile | null,
    panier: null as any,
    allOrder: [] as any[]
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
    getPanier(): any {
      return this.panier
    },
    getIsAdmin(): boolean {
      return this.user?.roleId == 2
    },
    getAllOrder(): any[] {
      return this.allOrder;
    }
  },
  actions: {
    async login(email: string, password: string): Promise<void> {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const responseData = await response.json();
      if (response.status !== 200) {
        this.authenticated = false;
        localStorage.removeItem('token')
        throw new Error(responseData.message || 'Failed to authenticate');
      } else {
        this.token = responseData.access_token;
        this.authenticated = true;
        localStorage.setItem('token', responseData.access_token);
      }
    },

    async profile(): Promise<void> {
      const response = await fetch('http://localhost:8000/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      const responseData = await response.json();

      if (response.status !== 200) {
        this.authenticated = false;
        localStorage.removeItem('token')
        throw new Error(responseData.message || 'Failed to get profile');
      } else {
        this.user = responseData;
        this.authenticated = true;
      }
    },

    async register(formData: RegisterUser): Promise<void> {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (responseData.access_token !== undefined || responseData.access_token !== null) {
        this.token = responseData.access_token;
        this.authenticated = true;
        localStorage.setItem('token', responseData.access_token);
      } else {
        this.authenticated = false;
        localStorage.removeItem('token')
        throw new Error(responseData.message || 'Failed to register');
      }
    },

    async userPanier(): Promise<void> {
      const response = await fetch('http://localhost:8000/panier-item/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });
      const responseData = await response.json()

      if (response.status !== 200 && response.status !== 304) {
        this.authenticated = false;
        localStorage.removeItem('token')
        throw new Error(responseData.message || 'Failed to get the basket');
      } else {
        this.panier = responseData
      }
    },

    async createOrder(): Promise<void> {
      const response = await fetch('http://localhost:8000/commande_produit/createWithPanier', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }
      })
      const responseData = await response.json();
      if (response.status !== 200) {
        this.authenticated = false;
        localStorage.removeItem('token')
        throw new Error(responseData.message || 'Failed to get the basket');
      } else {
        this.panier = responseData
      }
    },

    async logout(): Promise<void> {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }
      })
      const responseData = await response.json();
      if (response.status !== 200) {
        this.authenticated = false;
        localStorage.removeItem('token')
        throw new Error(responseData.message || 'Failed to get the basket');
      } else {
        this.panier = responseData
      }
    },

    async isLoggedIn(): Promise<void> {
      this.authenticated = localStorage.getItem('token') ? true : false;
    },

    async setAllOrder(): Promise<void> {
      const data = await fetch('http://localhost:8000/commande/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }
      })
      if (data.status !== 200) {
        throw new Error('Failed to get the order');
      } else {
        const order = await data.json()
        this.allOrder = order
      }
    },

    async removeProduct(productId: number): Promise<void> {
      const response = await fetch('http://localhost:8000/panier-item/' + productId, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });
      const data = await response.json()
      console.log(data)
      if (response.status !== 200) {
        this.authenticated = false;
        localStorage.removeItem('token')
        throw new Error('Failed to get remove product from panier');
      } else {
        this.panier = data;
      }
    }
  },
});
