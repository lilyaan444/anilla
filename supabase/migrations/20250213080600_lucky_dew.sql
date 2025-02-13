/*
  # Update cigars policy to allow public access

  1. Changes
    - Drop existing policy that only allows authenticated users to read cigars
    - Create new policy that allows anyone (including anonymous users) to read cigars

  2. Security
    - Enable public read access to cigars table
    - Maintain write protection (only admins can modify cigars)
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Anyone can read cigars" ON cigars;

-- Create new policy for public access
CREATE POLICY "Public can read cigars"
  ON cigars
  FOR SELECT
  TO public
  USING (true);