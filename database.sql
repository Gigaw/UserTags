create TABLE user(
	id SERIAL PRIMARY KEY,
	email VARCHAR(100),
	password VARCHAR(100),
	nickname VARCHAR(30),
)

create TABLE tag(
	id SERIAL PRIMARY KEY,
	creator INTEGER,
	name VARCHAR(40),
	sortOrder INTEGER DEFAULT 0,
	FOREIGN KEY (creator) REFERENCES user (id)
)