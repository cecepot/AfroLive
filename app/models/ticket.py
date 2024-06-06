from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date, time

class Ticket(db.Model):
    __tablename__ = 'tickets'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seat_number = db.Column(db.Integer, unique = True, nullable = False)
    price = db.Column(db.Float, nullable = False)
    row = db.Column(db.String, nullable = False)
    section = db.Column(db.String)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("events.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.DateTime, default = db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default = db.func.current_timestamp())

    events = db.relationship("Event", back_populates = "tickets")
    user = db.relationship("User", back_populates = "tickets")
    cart_items = db.relationship("Cart_item", back_populates = "tickets", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id" : self.id,
            "seat_number" : self.seat_number,
            "row": self.row,
            "section": self.section,
            "price" : self.price,
            "event_id" : self.event_id,
            "user_id" : self.user_id,
            "created_at" : self.created_at,
            "updated_at" : self.updated_at
        }
