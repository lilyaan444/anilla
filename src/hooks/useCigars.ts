import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Cigar = Database['public']['Tables']['cigars']['Row'];

export function useCigars(searchQuery?: string) {
  const [cigars, setCigars] = useState<Cigar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCigars();
  }, [searchQuery]);

  async function fetchCigars() {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('cigars')
        .select('*');

      if (searchQuery) {
        query = query.or(
          `name.ilike.%${searchQuery}%,` +
          `origin.ilike.%${searchQuery}%,` +
          `flavor.ilike.%${searchQuery}%,` +
          `format.ilike.%${searchQuery}%`
        );
      }

      const { data, error: fetchError } = await query.order('name');

      if (fetchError) {
        throw fetchError;
      }

      setCigars(data || []);
    } catch (err) {
      console.error('Error in fetchCigars:', err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return { cigars, loading, error, refetch: fetchCigars };
}