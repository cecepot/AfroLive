from .db import db, environment, SCHEMA, add_prefix_for_prod


class Favorite(db.Model):
    __tablename__='favorites'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column()
    event_id = db.Column()
    created_at = db.Column(db.DateTime, default = db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default = db.func.current_timestamp())

    def to_dict(self):
        return {
            "id" : self.id,
            "user_id" : self.user_id,
            "event_id" : self.event_id,
            "created_at" : self.created_at,
            "updated_at" : self.updated_at
        }
