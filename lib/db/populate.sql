-- Application specific tables
BEGIN;
create table if not exists account (
  id integer primary key generated always as identity,
  username varchar(255) unique not null,
  password text not null,
  verified boolean default false
);

create table if not exists message (
  id integer primary key generated always as identity,
  account_id integer not null references account(id) on delete cascade,
  title varchar(255),
  message text,
  added timestamp default current_timestamp
);
COMMIT;


-- Used by pg sessions
BEGIN;
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
COMMIT;
