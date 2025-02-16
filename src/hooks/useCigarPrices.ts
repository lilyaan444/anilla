import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CigarPrice } from '../types/cigar';

export function useCigarPrices(cigarId: string) {
  const [prices, setPrices] = useState<CigarPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('cigar_prices')
        .select('*')
        .eq('cigar_id', cigarId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setPrices(data || []);
    } catch (err) {
      console.error('Error fetching prices:', err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const addPrice = async (price: number, storeName?: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Must be logged in to add prices');

      const { error } = await supabase
        .from('cigar_prices')
        .insert({
          cigar_id: cigarId,
          user_id: session.user.id,
          price,
          store_name: storeName,
        });

      if (error) throw error;
      await fetchPrices();
    } catch (err) {
      console.error('Error adding price:', err);
      throw err;
    }
  };

  const getAveragePrice = () => {
    if (prices.length === 0) return null;
    const sum = prices.reduce((acc, curr) => acc + curr.price, 0);
    return {
      average: sum / prices.length,
      count: prices.length
    };
  };

  useEffect(() => {
    fetchPrices();
  }, [cigarId]);

  return {
    prices,
    loading,
    error,
    addPrice,
    getAveragePrice,
    refetch: fetchPrices
  };
}