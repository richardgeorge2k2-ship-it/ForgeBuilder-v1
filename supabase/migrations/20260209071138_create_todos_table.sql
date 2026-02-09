BEGIN;

CREATE TABLE IF NOT EXISTS todos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    task TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security (RLS)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read (for now, since we don't have auth yet)
CREATE POLICY "Allow public read access" ON todos FOR SELECT USING (true);

-- Create a policy that allows anyone to insert
CREATE POLICY "Allow public insert access" ON todos FOR INSERT WITH CHECK (true);

-- Create a policy that allows anyone to update
CREATE POLICY "Allow public update access" ON todos FOR UPDATE USING (true);

-- Create a policy that allows anyone to delete
CREATE POLICY "Allow public delete access" ON todos FOR DELETE USING (true);

COMMIT;