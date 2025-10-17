CREATE TYPE user_role_enum  AS ENUM ('USER', 'ADMIN');
CREATE TYPE item_type_enum  AS ENUM ('BOOK', 'MOVIE', 'ANIME', 'SERIES', 'GAME');
CREATE TYPE item_status_enum AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

CREATE TABLE user (
  id            SERIAL PRIMARY KEY,
  name  varchar(60) NOT NULL,
  email         varchar(255) NOT NULL UNIQUE,
  password      varchar(255) NOT NULL,
  role          user_role_enum NOT NULL DEFAULT 'USER',
  created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
);

CREATE TABLE item (
  id             SERIAL PRIMARY KEY,
  type           item_type_enum NOT NULL,
  title          varchar(200) NOT NULL,
  synopsis       text,
  release_date   date,
  cover_url      text,
  status         item_status_enum NOT NULL DEFAULT 'PENDING',
  submitted_by   int NOT NULL REFERENCES user(id),
  approved_by    int REFERENCES user(id),
  approved_at    TIMESTAMP,
  created_at     TIMESTAMP NOT NULL DEFAULT NOW(),
);

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
)

CREATE TABLE category_item(
    id SERIAL PRIMARY KEY,
    item_id int NOT NULL REFERENCES item(id),
    category_id int NOT NULL REFERENCES category(id),
)

CREATE TABLE comment (
  id          SERIAL PRIMARY KEY,
  item_id     int NOT NULL REFERENCES item(id),
  user_id     int NOT NULL REFERENCES user(id),
  body        text NOT NULL,
  is_deleted  boolean NOT NULL DEFAULT false,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);
