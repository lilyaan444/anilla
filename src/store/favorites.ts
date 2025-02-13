import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface FavoritesState {
  favorites: string[];
  loading: boolean;
  error: string | null;
  fetchFavorites: () => Promise<void>;
  addFavorite: (cigarId: string) => Promise<void>;
  removeFavorite: (cigarId: string) => Promise<void>;
  isFavorite: (cigarId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  loading: false,
  error: null,

  fetchFavorites: async () => {
    try {
      set({ loading: true, error: null });
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        set({ favorites: [], loading: false });
        return;
      }

      const { data: favorites, error } = await supabase
        .from('user_favorites')
        .select('cigar_id')
        .eq('user_id', session.user.id);

      if (error) throw error;

      set({ 
        favorites: favorites?.map(f => f.cigar_id) || [], 
        loading: false 
      });
    } catch (error) {
      console.error('Error fetching favorites:', error);
      set({ 
        error: (error as Error).message, 
        loading: false 
      });
    }
  },

  addFavorite: async (cigarId: string) => {
    try {
      set({ loading: true, error: null });
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Please sign in to add favorites');
      }

      const { error } = await supabase
        .from('user_favorites')
        .insert({ 
          user_id: session.user.id,
          cigar_id: cigarId
        });

      if (error) throw error;

      set(state => ({
        favorites: [...state.favorites, cigarId],
        loading: false
      }));
    } catch (error) {
      console.error('Error adding favorite:', error);
      set({ 
        error: (error as Error).message, 
        loading: false 
      });
      throw error;
    }
  },

  removeFavorite: async (cigarId: string) => {
    try {
      set({ loading: true, error: null });
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Please sign in to remove favorites');
      }

      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('cigar_id', cigarId)
        .eq('user_id', session.user.id);

      if (error) throw error;

      set(state => ({
        favorites: state.favorites.filter(id => id !== cigarId),
        loading: false
      }));
    } catch (error) {
      console.error('Error removing favorite:', error);
      set({ 
        error: (error as Error).message, 
        loading: false 
      });
      throw error;
    }
  },

  isFavorite: (cigarId: string) => {
    return get().favorites.includes(cigarId);
  },
}));