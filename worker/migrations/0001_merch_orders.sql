CREATE TABLE IF NOT EXISTS inventory (
  variant_id TEXT PRIMARY KEY,
  initial_stock INTEGER NOT NULL CHECK (initial_stock >= 0),
  reserved_quantity INTEGER NOT NULL DEFAULT 0 CHECK (reserved_quantity >= 0),
  sold_quantity INTEGER NOT NULL DEFAULT 0 CHECK (sold_quantity >= 0),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS reservations (
  id TEXT PRIMARY KEY,
  stripe_checkout_session_id TEXT UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'expired', 'cancelled', 'failed')),
  customer_email TEXT,
  amount_total INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'gbp',
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  paid_at INTEGER
);

CREATE TABLE IF NOT EXISTS reservation_lines (
  reservation_id TEXT NOT NULL,
  variant_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  colour TEXT NOT NULL,
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_amount INTEGER NOT NULL CHECK (unit_amount > 0),
  PRIMARY KEY (reservation_id, variant_id),
  FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  reservation_id TEXT NOT NULL UNIQUE,
  stripe_checkout_session_id TEXT NOT NULL UNIQUE,
  stripe_payment_intent_id TEXT,
  customer_name TEXT,
  customer_email TEXT,
  amount_total INTEGER NOT NULL,
  currency TEXT NOT NULL,
  payment_status TEXT NOT NULL,
  collection_status TEXT NOT NULL DEFAULT 'not_collected',
  microsoft_sync_status TEXT NOT NULL DEFAULT 'pending',
  microsoft_sync_error TEXT,
  microsoft_synced_at INTEGER,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);

CREATE TABLE IF NOT EXISTS order_lines (
  order_id TEXT NOT NULL,
  variant_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  colour TEXT NOT NULL,
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_amount INTEGER NOT NULL CHECK (unit_amount > 0),
  total_amount INTEGER NOT NULL CHECK (total_amount > 0),
  PRIMARY KEY (order_id, variant_id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE IF NOT EXISTS webhook_events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  processed_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS alert_milestones (
  milestone INTEGER PRIMARY KEY,
  sent_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_reservations_status_expires
  ON reservations(status, expires_at);

CREATE INDEX IF NOT EXISTS idx_order_lines_variant
  ON order_lines(variant_id);
