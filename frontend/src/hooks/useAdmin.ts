import { useState, useEffect } from 'react';
import api from '../services/api';
import axios from 'axios';

interface Category {
  _id: string;
  name: string;
}

export const useAdmin = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Erro ao buscar categorias', err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: any) => {
    try {
      await api.post('/events', eventData);
      alert('Evento criado com sucesso!');
      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.error || 'Erro ao criar evento');
      } else {
        alert('Erro inesperado');
      }
      return false;
    }
  };

  const createCategory = async (categoryData: { name: string; description: string }) => {
    try {
      await api.post('/categories', categoryData);
      alert('Categoria criada!');
      await fetchCategories();
      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.error || 'Erro ao criar categoria');
      } else {
        alert('Erro inesperado');
      }
      return false;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    createEvent,
    createCategory,
    refreshCategories: fetchCategories
  };
};
