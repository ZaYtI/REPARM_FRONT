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
    authenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null,
  }),
  getters: {
    isLoggedIn(): boolean {
      return this.authenticated;
    },
    getProfile(): UserProfile | null {
      return this.user;
    },
    getToken(): string | null {
      return this.token;
    },
  },
  actions: {
    async login(email: string, password: string): Promise<void> {
      const response = await fetch('https://reparm-api.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const responseData = await response.json();
      if (response.status !== 200) {
        throw new Error(responseData.message || 'Failed to authenticate');
      } else {
        this.token = responseData.access_token;
        this.authenticated = true;
        localStorage.setItem('token', responseData.access_token);
      }
    },

    async profile(): Promise<void> {
      const response = await fetch('https://reparm-api.onrender.com/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      const responseData = await response.json();

      if (response.status !== 200) {
        throw new Error(responseData.message || 'Failed to get profile');
      } else {
        this.user = responseData;
        localStorage.setItem('user', JSON.stringify(responseData));
      }
    },

    async register(formData: RegisterUser): Promise<void> {
      formData.postalCode = "62620";
      formData.nick = "test";
      const response = await fetch('https://reparm-api.onrender.com/auth/register', {
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
        throw new Error(responseData.message || 'Failed to register');
      }
    },
  },
});
