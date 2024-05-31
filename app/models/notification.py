from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date, time

class Notification(db.Model):
    __tablename__='notifications'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable = False)
    read = db.Column(db.Boolean, default = False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, default = db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default = db.func.current_timestamp())

    user = db.relationship("User", back_populates = "notifications")

    def to_dict(self):
        return {
            "id" : self.id,
            "content" : self.content,
            "read" : self.read,
            "user_id" : self.user_id,
            "created_at" : self.created_at,
            "updated_at" : self.updated_at
                }
