export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cigars: {
        Row: {
          id: string
          name: string
          origin: string
          flavor: string
          format: string
          description: string
          image: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          origin: string
          flavor: string
          format: string
          description: string
          image: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          origin?: string
          flavor?: string
          format?: string
          description?: string
          image?: string
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          cigar_id: string
          rating: number
          comment: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          cigar_id: string
          rating: number
          comment: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          cigar_id?: string
          rating?: number
          comment?: string
          created_at?: string
        }
      }
      user_favorites: {
        Row: {
          id: string
          user_id: string
          cigar_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          cigar_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          cigar_id?: string
          created_at?: string
        }
      }
      userProfile: {
        Row: {
          id: string
          display_name: string | null
          avatar_url: string | null
          phone: string | null
          provider: string | null
          updated_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          cigar_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          cigar_id?: string
          created_at?: string
        }
      }
    }
  }
}