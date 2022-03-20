create TABLE users(
	id SERIAL PRIMARY KEY,
	email VARCHAR(100),
	password VARCHAR(100),
	nickname VARCHAR(30)
);

create TABLE tags(
	id SERIAL PRIMARY KEY,
	creator INTEGER,
	name VARCHAR(40),
	sortOrder INTEGER DEFAULT 0
);

create TABLE user_tags(
	id SERIAL PRIMARY KEY,
	user_id INTEGER,
	tag_id INTEGER
);

-- CREATE TABLE IF NOT EXISTS public.users(
--     id integer PRIMARY KEY,
--     email character varying(255),
--     password character varying(255),
--     nickname character varying(255),
-- );

-- TABLESPACE pg_default;

-- ALTER TABLE public.users
-- OWNER to postgres;