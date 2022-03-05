-- CREATE TABLE IF NOT EXISTS blog;


CREATE TABLE IF NOT EXISTS `blog` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `title` TEXT NULL,
    `content` TEXT NULL,
    `create_time` TIMESTAMP default (datetime('now', 'localtime')) NOT NULL,
    `update_time` DATETIME  default (datetime('now', 'localtime')) NOT NULL
);

INSERT INTO blog(title, content) values("hello", "world");