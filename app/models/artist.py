from .db import db, environment, SCHEMA, add_prefix_for_prod


class artist(db.Model):
    __tablename__='artists'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    image_url = db.Column(db.String)
    spotify_url = db.Column(db.String)
    soundcloud_url = db.Column(db.String)
    applemusic_url = db.Column(db.String)
    other_music_url = db.Column(db.String)
    event_id = db.Column()
    created_at = db.Column(db.DateTime, default = db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default = db.func.current_timestamp())
