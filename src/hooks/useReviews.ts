import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Review = Database['public']['Tables']['reviews']['Row'];

export function useReviews(cigarId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userReview, setUserReview] = useState<Review | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [cigarId]);

  async function fetchReviews() {
    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();

      // First, fetch all reviews for this cigar without user filtering
      const { data: allReviews, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .eq('cigar_id', cigarId)
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;

      setReviews(allReviews || []);

      // Only fetch user review if there's an active session
      if (session?.user?.id) {
        const { data: userReviewData, error: userReviewError } = await supabase
          .from('reviews')
          .select('*')
          .eq('cigar_id', cigarId)
          .eq('user_id', session.user.id)
          .maybeSingle(); // Use maybeSingle instead of single to avoid errors

        if (userReviewError && userReviewError.code !== 'PGRST116') {
          // Only throw if it's not a "no results" error
          throw userReviewError;
        }

        setUserReview(userReviewData || null);
      } else {
        setUserReview(null);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function addReview(rating: number, comment: string) {
    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('Please sign in to add a review');
      }

      const { error } = await supabase
        .from('reviews')
        .insert({
          user_id: session.user.id,
          cigar_id: cigarId,
          rating,
          comment
        });

      if (error) throw error;

      await fetchReviews();
    } catch (err) {
      console.error('Error adding review:', err);
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function updateReview(rating: number, comment: string) {
    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('Please sign in to update your review');
      }

      const { error } = await supabase
        .from('reviews')
        .update({ rating, comment })
        .eq('cigar_id', cigarId)
        .eq('user_id', session.user.id);

      if (error) throw error;

      await fetchReviews();
    } catch (err) {
      console.error('Error updating review:', err);
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function deleteReview() {
    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('Please sign in to delete your review');
      }

      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('cigar_id', cigarId)
        .eq('user_id', session.user.id);

      if (error) throw error;

      await fetchReviews();
    } catch (err) {
      console.error('Error deleting review:', err);
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    reviews,
    userReview,
    loading,
    error,
    addReview,
    updateReview,
    deleteReview,
    refetch: fetchReviews
  };
}