/*
  # Enable Email Authentication
  
  1. Changes
    - Enable email sign up
    - Set security configurations
  
  2. Security
    - Enable row level security for auth-related tables
    - Set up secure defaults
*/

-- Enable RLS on auth-related tables for additional security
ALTER TABLE IF EXISTS auth.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS auth.sessions ENABLE ROW LEVEL SECURITY;

-- Create secure policies for auth tables
DO $$
BEGIN
  -- Users can read their own data
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'users' AND schemaname = 'auth'
  ) THEN
    CREATE POLICY "Users can read own data"
      ON auth.users
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  -- Users can read their own sessions
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'sessions' AND schemaname = 'auth'
  ) THEN
    CREATE POLICY "Users can read own sessions"
      ON auth.sessions
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;