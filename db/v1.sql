CREATE SCHEMA IF NOT EXISTS "fiat";

CREATE TABLE IF NOT EXISTS fiat.currency (
  "symbol" VARCHAR(10),
  "sign" VARCHAR(10),
  "name"  VARCHAR(255) NOT NULL,
  PRIMARY KEY ("symbol")
);

CREATE TABLE IF NOT EXISTS fiat.bar_d (
  "currency" VARCHAR(10) REFERENCES fiat.currency("symbol"),
  "open" NUMERIC(40, 17) NOT NULL,
  "high" NUMERIC(40, 17) NOT NULL,
  "low" NUMERIC(40, 17) NOT NULL,
  "close" NUMERIC(40, 17) NOT NULL,
  "timestamp" TIMESTAMP,
  PRIMARY KEY ("currency", "timestamp")
);

CREATE SCHEMA IF NOT EXISTS "crypto";

CREATE TABLE IF NOT EXISTS crypto.ticker (
  "symbol" VARCHAR(10),
  "name"  VARCHAR(255) NOT NULL,
  "marketCap" NUMERIC(40, 17) NOT NULL,
  "logo" VARCHAR,
  PRIMARY KEY ("symbol")
);

CREATE TABLE IF NOT EXISTS crypto.bar_d (
  "ticker" VARCHAR(10) REFERENCES crypto.ticker("symbol"),
  "open" NUMERIC(40, 17) NOT NULL,
  "high" NUMERIC(40, 17) NOT NULL,
  "low" NUMERIC(40, 17) NOT NULL,
  "close" NUMERIC(40, 17) NOT NULL,
  "timestamp" TIMESTAMP,
  PRIMARY KEY ("ticker", "timestamp")
);

CREATE SCHEMA IF NOT EXISTS "etf";

CREATE TABLE IF NOT EXISTS etf.ticker (
  "symbol" VARCHAR(10),
  "name"  VARCHAR(255) NOT NULL,
  "marketCap" NUMERIC(40, 17),
  "logo" VARCHAR,
  PRIMARY KEY ("symbol")
);

CREATE TABLE IF NOT EXISTS etf.bar_d (
  "ticker" VARCHAR(10) REFERENCES etf.ticker("symbol"),
  "open" NUMERIC(40, 17),
  "high" NUMERIC(40, 17),
  "low" NUMERIC(40, 17),
  "close" NUMERIC(40, 17),
  "timestamp" TIMESTAMP NOT NULL,
  PRIMARY KEY ("ticker", "timestamp")
);

CREATE SCHEMA IF NOT EXISTS "stock";

CREATE TABLE IF NOT EXISTS stock.ticker (
  "symbol" VARCHAR(10),
  "name"  VARCHAR(255) NOT NULL,
  "marketCap" NUMERIC(40, 17),
  "logo" VARCHAR,
  PRIMARY KEY ("symbol")
);

CREATE TABLE IF NOT EXISTS stock.bar_d (
  "ticker" VARCHAR(10) REFERENCES stock.ticker("symbol"),
  "open" NUMERIC(40, 17),
  "high" NUMERIC(40, 17),
  "low" NUMERIC(40, 17),
  "close" NUMERIC(40, 17),
  "timestamp" TIMESTAMP NOT NULL,
  PRIMARY KEY ("ticker", "timestamp")
);