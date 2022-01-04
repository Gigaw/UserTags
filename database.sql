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
	sortOrder INTEGER DEFAULT 0,
	FOREIGN KEY (creator) REFERENCES users (id)
);

-- create TABLE user_tag(
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INTEGER,
-- 	tag_id INTEGER,
-- 	FOREIGN KEY (user_id) REFERENCES users (id),
-- 	FOREIGN KEY (tag_id) REFERENCES tags (id),
-- );