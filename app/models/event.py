from .db import db, environment, SCHEMA, add_prefix_for_prod


class Event(db.Model):
    __tablename__ = 'events'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable = False)
    date = db.Column(db.Date, nullable = False)
    start_time = db.Column(db.Time, nullable = False)
    end_time = db.Column(db.Time, nullable = False)
    venue = db.Column(db.String, nullable = False)
    city = db.Column(db.String, nullable = False)
    state = db.Column(db.String, nullable = False)
    image_url = db.Column(db.String)
    tickets_available = db.Column(db.Integer, nullable = False)
    ticket_price = db.Column(db.Float, nullable = False)
    organizer_name = db.Column(db.String, nullable = False)
    organizer_contact = db.Column(db.String, nullable = False)
    category = db.Column(db.String, nullable = False)
    event_website = db.Column(db.String)
    additional_notes = db.Column(db.String)
    user_id = db.Column()
    created_at = db.Column(db.DateTime, default = db.func.current_timestamp() )
    updated_at = db.Column(db.DateTime, default = db.func.current_timestamp())
