from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Cart_item(db.Model):
    __tablename__ = 'cart_items'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("ticket_carts.id")), nullable=False)
    ticket_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tickets.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

    Ticket_cart = db.relationship("Ticket_cart", back_populates="cart_items")
    ticket = db.relationship("Ticket", back_populates="cart_items")

    def to_dict(self):
        return {
            "id": self.id,
            "cart_id": self.cart_id,
            "ticket_id": self.ticket_id,
            "quantity": self.quantity,
            "price": self.price
        }
