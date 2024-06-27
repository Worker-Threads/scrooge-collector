CREATE SCHEMA IF NOT EXISTS "currency";

CREATE TABLE IF NOT EXISTS currency.currency (
    "symbol" VARCHAR(10) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS currency.bar_d (
    "symbol" VARCHAR(10) REFERENCES currency.currency ("symbol"),
    "open" NUMERIC(40, 17) NOT NULL,
    "high" NUMERIC(40, 17) NOT NULL,
    "low" NUMERIC(40, 17) NOT NULL,
    "close" NUMERIC(40, 17) NOT NULL,
    "timestamp" TIMESTAMP,
    PRIMARY KEY ("symbol", "timestamp")
);

CREATE SCHEMA IF NOT EXISTS "crypto";

CREATE TABLE IF NOT EXISTS crypto.ticker (
    "ticker" VARCHAR(10) PRIMARY KEY,
    "marketCap" NUMERIC(40, 17) NOT NULL
);

CREATE TABLE IF NOT EXISTS crypto.bar_d (
    "ticker" VARCHAR(10) REFERENCES crypto.ticker ("ticker"),
    "open" NUMERIC(40, 17) NOT NULL,
    "high" NUMERIC(40, 17) NOT NULL,
    "low" NUMERIC(40, 17) NOT NULL,
    "close" NUMERIC(40, 17) NOT NULL,
    "timestamp" TIMESTAMP,
    PRIMARY KEY ("ticker", "timestamp")
);