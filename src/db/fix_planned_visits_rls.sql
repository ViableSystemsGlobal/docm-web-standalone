-- Fix RLS policies for planned_visits table to allow web app inserts

-- Option 1: Disable RLS (simplest for development)
ALTER TABLE planned_visits DISABLE ROW LEVEL SECURITY;

-- Option 2: Create permissive policies (alternative if we want to keep RLS)
-- CREATE POLICY "Allow anonymous inserts on planned_visits" ON planned_visits
--   FOR INSERT TO anon WITH CHECK (true);
-- 
-- CREATE POLICY "Allow authenticated inserts on planned_visits" ON planned_visits
--   FOR INSERT TO authenticated WITH CHECK (true);
-- 
-- CREATE POLICY "Allow service role all access on planned_visits" ON planned_visits
--   FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Verify the change
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'planned_visits'; 