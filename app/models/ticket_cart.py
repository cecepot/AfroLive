from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Ticket_cart(db.Model):
    __tablename__ = 'ticket_carts'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    finished = db.Column(db.Boolean, default=False)

    user = db.relationship("User", back_populates="ticket_carts")
    cart_items = db.relationship("Cart_item", back_populates="Ticket_cart", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "finished": self.finished
        }
