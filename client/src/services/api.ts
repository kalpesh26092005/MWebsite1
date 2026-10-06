import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse, PaginatedResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('adminToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminData');
          if (window.location.pathname.startsWith('/admin')) {
            window.location.href = '/admin_access';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth
  async login(email: string, password: string) {
    const response = await this.client.post<ApiResponse<{ admin: any; token: string }>>('/auth/login', { email, password });
    return response.data;
  }

  async logout() {
    const response = await this.client.post<ApiResponse<void>>('/auth/logout');
    return response.data;
  }

  async getMe() {
    const response = await this.client.get<ApiResponse<any>>('/auth/me');
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const response = await this.client.put<ApiResponse<void>>('/auth/change-password', { currentPassword, newPassword });
    return response.data;
  }

  // Products
  async getProducts(params?: {
    category?: string;
    search?: string;
    featured?: boolean;
    available?: boolean;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    const response = await this.client.get<PaginatedResponse<any>>('/products', { params });
    return response.data;
  }

  async getFeaturedProducts() {
    const response = await this.client.get<ApiResponse<any[]>>('/products/featured');
    return response.data;
  }

  async getProduct(id: string) {
    const response = await this.client.get<ApiResponse<any>>(`/products/${id}`);
    return response.data;
  }

  async createProduct(data: FormData) {
    const response = await this.client.post<ApiResponse<any>>('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async updateProduct(id: string, data: FormData) {
    const response = await this.client.put<ApiResponse<any>>(`/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async deleteProduct(id: string) {
    const response = await this.client.delete<ApiResponse<void>>(`/products/${id}`);
    return response.data;
  }

  // Categories
  async getCategories(active?: boolean) {
    const response = await this.client.get<ApiResponse<any[]>>('/categories', { params: { active } });
    return response.data;
  }

  async createCategory(data: FormData) {
    const response = await this.client.post<ApiResponse<any>>('/categories', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async updateCategory(id: string, data: FormData) {
    const response = await this.client.put<ApiResponse<any>>(`/categories/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async deleteCategory(id: string) {
    const response = await this.client.delete<ApiResponse<void>>(`/categories/${id}`);
    return response.data;
  }

  async reorderCategories(categories: { id: string; displayOrder: number }[]) {
    const response = await this.client.put<ApiResponse<void>>('/categories/reorder', { categories });
    return response.data;
  }

  // Testimonials
  async getTestimonials(visible?: boolean) {
    const response = await this.client.get<ApiResponse<any[]>>('/testimonials', { params: { visible } });
    return response.data;
  }

  async createTestimonial(data: FormData) {
    const response = await this.client.post<ApiResponse<any>>('/testimonials', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async updateTestimonial(id: string, data: FormData) {
    const response = await this.client.put<ApiResponse<any>>(`/testimonials/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async deleteTestimonial(id: string) {
    const response = await this.client.delete<ApiResponse<void>>(`/testimonials/${id}`);
    return response.data;
  }

  async reorderTestimonials(testimonials: { id: string; displayOrder: number }[]) {
    const response = await this.client.put<ApiResponse<void>>('/testimonials/reorder', { testimonials });
    return response.data;
  }

  // Instagram Posts
  async getInstagramPosts() {
    const response = await this.client.get<ApiResponse<any[]>>('/instagram-posts');
    return response.data;
  }

  async createInstagramPost(data: FormData) {
    const response = await this.client.post<ApiResponse<any>>('/instagram-posts', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async deleteInstagramPost(id: string) {
    const response = await this.client.delete<ApiResponse<void>>(`/instagram-posts/${id}`);
    return response.data;
  }

  // Upload
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    const response = await this.client.post<ApiResponse<{ url: string; publicId: string }>>('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async deleteImage(publicId: string) {
    const response = await this.client.delete<ApiResponse<void>>(`/upload/${publicId}`);
    return response.data;
  }

  // Settings
  async getSettings() {
    const response = await this.client.get<ApiResponse<any>>('/settings');
    return response.data;
  }

  async updateSettings(data: any) {
    const response = await this.client.put<ApiResponse<any>>('/settings', data);
    return response.data;
  }
}

export const api = new ApiService();