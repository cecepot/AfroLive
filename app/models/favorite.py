from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date, time

class Favorite(db.Model):
    __tablename__='favorites'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
    created_at = db.Column(db.DateTime, default = db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default = db.func.current_timestamp())

    events = db.relationship("Event", back_populates = "favorites")
    user = db.relationship("User", back_populates = "favorites")

    def to_dict(self):
        return {
            "id" : self.id,
            "user_id" : self.user_id,
            "event_id" : self.event_id,
            "created_at" : self.created_at,
            "updated_at" : self.updated_at
        }
