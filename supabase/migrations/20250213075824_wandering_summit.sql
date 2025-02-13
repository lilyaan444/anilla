/*
  # Create cigars and user_favorites tables

  1. New Tables
    - `cigars`
      - `id` (uuid, primary key)
      - `name` (text)
      - `origin` (text)
      - `flavor` (text)
      - `format` (text)
      - `description` (text)
      - `image` (text)
      - `created_at` (timestamp)
    - `user_favorites`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `cigar_id` (uuid, references cigars)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to:
      - Read all cigars
      - Manage their own favorites
*/

-- Create cigars table
CREATE TABLE IF NOT EXISTS cigars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  origin text NOT NULL,
  flavor text NOT NULL,
  format text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for cigars
ALTER TABLE cigars ENABLE ROW LEVEL SECURITY;

-- Allow all users to read cigars
CREATE POLICY "Anyone can read cigars"
  ON cigars
  FOR SELECT
  TO authenticated
  USING (true);

-- Create user_favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  cigar_id uuid REFERENCES cigars NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, cigar_id)
);

-- Enable RLS for user_favorites
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Allow users to manage their own favorites
CREATE POLICY "Users can manage their own favorites"
  ON user_favorites
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert initial cigar data
INSERT INTO cigars (name, origin, flavor, format, description, image)
VALUES
  ('Cohiba Behike', 'Cuba', 'Full-bodied, Earthy', 'Robusto', 'The Cohiba Behike is one of the most prestigious cigars in the world. It features an exceptional blend of select tobaccos that create a rich, complex smoking experience with notes of earth, coffee, and dark chocolate.', 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=800'),
  ('Montecristo No. 2', 'Dominican Republic', 'Medium, Spicy', 'Torpedo', 'The Montecristo No. 2 is a classic torpedo that has earned its place among the world''s most sought-after cigars. It offers a perfect balance of spice and sweetness with a creamy texture.', 'https://images.unsplash.com/photo-1574287094661-a0d3457e6a9d?w=800'),
  ('Arturo Fuente OpusX', 'Dominican Republic', 'Full-bodied, Complex', 'Double Corona', 'The OpusX is a masterpiece of cigar craftsmanship. This full-bodied cigar delivers an intense and complex flavor profile with notes of pepper, cedar, and hints of citrus.', 'https://images.unsplash.com/photo-1605148221705-7d8e86d205f9?w=800'),
  ('Padron 1964 Anniversary', 'Nicaragua', 'Full-bodied, Rich', 'Torpedo', 'A box-pressed masterpiece that showcases the finest aged tobaccos. Expect rich flavors of chocolate, coffee, and spice with a smooth, creamy finish.', 'https://images.unsplash.com/photo-1585685017356-bd8005c5cbfb?w=800'),
  ('Romeo y Julieta Wide Churchill', 'Cuba', 'Medium, Woody', 'Churchill', 'A refined and elegant cigar that offers a perfect medium-bodied experience. Notes of cedar, leather, and subtle spices create a well-balanced profile.', 'https://images.unsplash.com/photo-1633891421480-b66a76b26caf?w=800');