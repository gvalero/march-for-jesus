ALTER TABLE orders ADD COLUMN confirmation_email_status TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE orders ADD COLUMN confirmation_email_error TEXT;
ALTER TABLE orders ADD COLUMN confirmation_email_sent_at INTEGER;
