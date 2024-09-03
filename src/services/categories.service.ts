import ky from 'ky';
import { Category } from '@prisma/client';

export const CategoriesService = {
  getAllCategories: async (searchString: string = '') => {
    return await ky.get<Category[]>('/api/categories?search=' + searchString).json();
  },
  getCategoryById: async () => {},
  createCategory: async () => {
    return await ky.post<number>('/api/categories').json();
  },
  updateCategory: async () => {},
  deleteCategory: async (id: number) => {
    return await ky.delete<unknown>('/api/categories/' + id).json();
  },
};
