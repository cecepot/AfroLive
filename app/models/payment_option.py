from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date, time

class Payment_option(db.Model):
    __tablename__='payment_options'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    card_type =db.Column(db.String, nullable = False)
    card_number =db.Column(db.Integer, nullable = False)
    expiration_date =db.Column(db.Integer, nullable = False)
    cvv =db.Column(db.Integer, nullable = False)
    billing_address =db.Column(db.String, nullable = False)
    user_id =db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, default = db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default = db.func.current_timestamp())

    user = db.relationship("User", back_populates = "payment_options")

    def to_dict(self):
        return {
            "id" : self.id,
            "card_type" : self.card_type,
            "card_number" : self.card_number,
            "expiration_date" : self.expiration_date,
            "cvv" : self.cvv,
            "billing_address" : self.billing_address,
            "user_id" : self.user_id,
            "created_at" : self.created_at,
            "updated_at" : self.updated_at
        }
