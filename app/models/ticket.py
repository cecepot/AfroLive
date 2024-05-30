from .db import db, environment, SCHEMA, add_prefix_for_prod


class Ticket(db.Model):
    __tablename__ = 'tickets'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seat_number = db.Column(db.Integer, unique = True, nullable = False)
    price = db.Column(db.Float, nullable = False)
    event_id = db.Column()
    user_id = db.Column()
    created_at = db.Column(db.DateTime, default = db.func.current_timestamp() )
    updated_at = db.Column(db.DateTime, default = db.func.current_timestamp())

    def to_dict(self):
        return {
            "id" : self.id,
            "seat_number" : self.seat_number,
            "price" : self.price,
            "event_id" : self.event_id,
            "user_id" : self.user_id,
            "created_at" : self.created_at,
            "updated_at" : self.updated_at
        }
