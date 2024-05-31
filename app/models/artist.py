from .db import db, environment, SCHEMA, add_prefix_for_prod


class Artist(db.Model):
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
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
    created_at = db.Column(db.DateTime, default = db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default = db.func.current_timestamp())

    events = db.relatoinship("Event", back_populates = "artists")

    def to_dict(self):
        return {
            "id" : self.id,
            "name" : self.name,
            "image_url" : self.image_url,
            "spotify_url" : self.spotify_url,
            "soundcloud_url" : self.soundcloud_url,
            "applemusic_url" : self.applemusic_url,
            "other_music_url" : self.other_music_url,
            "event_id" : self.event_id,
            "created_at" : self.created_at,
            "updated_at" : self.updated_at
            }
