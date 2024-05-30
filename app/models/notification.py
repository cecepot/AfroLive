from .db import db, environment, SCHEMA, add_prefix_for_prod

class Notification(db.Model):
    __tablename__='notifications'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable = False)
    read = db.Column(db.Boolean, default = False)
    user_id = db.Column()
    created_at = db.Column(db.DateTime, default = db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default = db.func.current_timestamp())
