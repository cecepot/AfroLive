from .db import db, environment, SCHEMA, add_prefix_for_prod


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
    user_id =db.Column()
    created_at = db.Column(db.DateTime, default = db.func.current_timestamp() )
    updated_at = db.Column(db.DateTime, default = db.func.current_timestamp())
