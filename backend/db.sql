-- CREATE TABLE IF NOT EXISTS blog;


CREATE TABLE IF NOT EXISTS `blog` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `title` TEXT NULL,
    `content` TEXT NULL,
    `create_time` TIMESTAMP default (datetime('now', 'localtime')) NOT NULL,
    `update_time` DATETIME  default (datetime('now', 'localtime')) NOT NULL,
    `star` INTEGER default 0
);

INSERT INTO blog(title, content) values("默认标题", "默认内容");