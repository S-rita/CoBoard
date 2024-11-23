CREATE DATABASE coboard;

-- Connect to the newly created database
\c coboard;

CREATE TABLE anonymous_user (
    aid VARCHAR(10) PRIMARY KEY,
    apw VARCHAR(255) NOT NULL,
    aprofile BYTEA,
    mail VARCHAR(255);
);

CREATE TABLE se_user (
    sid VARCHAR(10) PRIMARY KEY,
    spw VARCHAR(255) NOT NULL,
    sprofile BYTEA,
    username VARCHAR(255),
);

CREATE TABLE forum (
    forum_id SERIAL PRIMARY KEY,
    forum_name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255),
    creator_id VARCHAR(10) REFERENCES se_user(sid) NOT NULL,
    created_time DATE DEFAULT CURRENT_DATE,
    icon BYTEA,
    wallpaper VARCHAR(7) DEFAULT '#006b62',
    font INTEGER DEFAULT 0,
    sort_by INTEGER DEFAULT 0,
    slug VARCHAR(255) UNIQUE NOT NULL,
    board VARCHAR(255) NOT NULL,
    last_updated DATE DEFAULT CURRENT_DATE,
);

CREATE TABLE tag (
    tag_id SERIAL PRIMARY KEY,
    tag_text VARCHAR(255) NOT NULL,
    board VARCHAR(255) NOT NULL,
    use INTEGER DEFAULT 0 NOT NULL
);

CREATE TABLE topic (
    topic_id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
        expired DATE,
    publish DATE;
);

CREATE TABLE abookmark (
    forum_id INTEGER REFERENCES forum(forum_id) ON DELETE CASCADE,
    user_id VARCHAR(255) REFERENCES anonymous_user(aid) ON DELETE CASCADE,
    PRIMARY KEY (forum_id, user_id)
);

CREATE TABLE sbookmark (
    forum_id INTEGER REFERENCES forum(forum_id) ON DELETE CASCADE,
    user_id VARCHAR(255) REFERENCES se_user(sid) ON DELETE CASCADE,
    PRIMARY KEY (forum_id, user_id)
);

CREATE TABLE access (
    forum_id INTEGER REFERENCES forum(forum_id) ON DELETE CASCADE,
    user_id VARCHAR(10) REFERENCES se_user(sid) ON DELETE CASCADE,
    PRIMARY KEY (forum_id, user_id)
);

CREATE TABLE comment (
    comment_id SERIAL PRIMARY KEY,
    comment_text VARCHAR(255) NOT NULL,
    comment_heart INTEGER DEFAULT 0 NOT NULL,
    scomment_creator VARCHAR(10) REFERENCES se_user(sid),
    acomment_creator VARCHAR(10) REFERENCES anonymous_user(aid),
    CHECK (
        (scomment_creator IS NOT NULL AND acomment_creator IS NULL)
        OR (scomment_creator IS NULL AND acomment_creator IS NOT NULL)
    )
);

CREATE TABLE post (
    post_id SERIAL PRIMARY KEY,
    post_head VARCHAR(255) NOT NULL,
    post_body VARCHAR(255),
    heart INTEGER DEFAULT 0,
    spost_creator VARCHAR(10) REFERENCES se_user(sid),
    apost_creator VARCHAR(10) REFERENCES anonymous_user(aid),
    pic BYTEA,
    CHECK (
        (spost_creator IS NOT NULL AND apost_creator IS NULL)
        OR (spost_creator IS NULL AND apost_creator IS NOT NULL)
    )
);

CREATE TABLE forum_tag (
    forum_id INTEGER REFERENCES forum(forum_id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tag(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (forum_id, tag_id)
);

CREATE TABLE forum_topic (
    forum_id INTEGER REFERENCES forum(forum_id) ON DELETE CASCADE,
    topic_id INTEGER REFERENCES topic(topic_id) ON DELETE CASCADE,
    PRIMARY KEY (forum_id, topic_id)
);

CREATE TABLE topic_post (
    topic_id INTEGER REFERENCES topic(topic_id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES post(post_id) ON DELETE CASCADE,
    PRIMARY KEY (topic_id, post_id)
);

CREATE TABLE post_comment (
    post_id INTEGER REFERENCES post(post_id) ON DELETE CASCADE,
    comment_id INTEGER REFERENCES comment(comment_id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, comment_id)
);

CREATE TABLE file (
    file_id SERIAL PRIMARY KEY,
    filename VARCHAR UNIQUE,
    path VARCHAR,
    extension VARCHAR,
    s_owner VARCHAR REFERENCES se_user(sid),
    a_owner VARCHAR REFERENCES anonymous_user(aid),
    post_id INTEGER REFERENCES post(post_id)
    CHECK (
        (s_owner IS NOT NULL AND a_owner IS NULL)
        OR (s_owner IS NULL AND a_owner IS NOT NULL)
    )
);

CREATE OR REPLACE FUNCTION generate_forum_slug()
RETURNS TRIGGER AS $$
BEGIN
    NEW.slug := LOWER(REPLACE(NEW.forum_name, ' ', '-'));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trig_generate_forum_slug
BEFORE INSERT ON forum
FOR EACH ROW
EXECUTE FUNCTION generate_forum_slug();

INSERT INTO se_user(sid, spw) VALUES
('52', 'admin'),
('53', 'admin'),
('54', 'admin'),
('55', 'admin'),
('56', 'admin'),
('57', 'admin'),
('58', 'admin'),
('59', 'admin'),
('60', 'admin'),
('61', 'admin'),
('62', 'admin'),
('63', 'admin'),
('64', 'admin'),
('65', 'admin'),
('66', 'admin'),
('67', 'admin');

INSERT INTO tag (tag_text, board)
VALUES
('Portfolios', 'admission'),
('Recommendations', 'admission'),
('Campus lifes', 'admission'),
('Visa advices', 'admission'),
('Scholarships', 'admission'),
('Exchange programs', 'admission'),
('Requirements', 'admission'),
('Minimum scores', 'admission'),
('Interviews', 'admission'),
('Course syllabus', 'admission'),
('Locations', 'admission'),
('Open houses', 'admission'),
('Fees and waivers', 'admission'),
('Contacts', 'admission'),
('Year 1', 'classwork'),
('Year 2', 'classwork'),
('Year 3', 'classwork'),
('Year 4', 'classwork'),
('Metaverse SE', 'classwork'),
('Artificial Intelligence', 'classwork'),
('Industrial IOT', 'classwork'),
('Programming', 'classwork'),
('Math', 'classwork'),
('Computer Science', 'classwork'),
('Software Design', 'classwork'),
('Hardware', 'classwork'),
('Restaurants', 'discussion'),
('Cafes', 'discussion'),
('Coffees', 'discussion'),
('Desserts', 'discussion'),
('Cheap', 'discussion'),
('Inside campus', 'discussion'),
('Outside campus', 'discussion'),
('Full-time jobs', 'discussion'),
('Part-time jobs', 'discussion'),
('Charitable activities', 'discussion'),
('Party hunting', 'discussion'),
('Games', 'discussion'),
('Memes', 'discussion'),
('Meetups', 'discussion'),
('Hackathons', 'discussion'),
('Transportations', 'discussion'),
('Book recommendations', 'discussion'),
('Housing', 'discussion'),
('Events', 'discussion'),
('Festivals', 'discussion'),
('Short notes', 'education'),
('Slides', 'education'),
('Course materials', 'education'),
('Reviews', 'education'),
('Recordings', 'education'),
('Assignments', 'education'),
('Projects', 'education'),
('Tutoring', 'education'),
('Homework', 'education'),
('Practice tests', 'education'),
('Study plans', 'education'),
('Research sources', 'education'),
('Exam tips', 'education'),
('Online Tools', 'education'),
('Free courses', 'education'),
('Meetups', 'alumni'),
('Job recommendations', 'alumni'),
('Job reviews', 'alumni'),
('Contacts', 'alumni'),
('Job markets', 'alumni'),
('Further educations', 'alumni'),
('University experience', 'alumni'),
('Career paths', 'alumni'),
('Networking', 'alumni'),
('Advices', 'alumni');


