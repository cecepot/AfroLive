from app.models import db, User, Payment_option, environment, SCHEMA
from sqlalchemy.sql import text

from datetime import datetime

def seed_payment_options():
    payment_option1 = Payment_option(
        card_type="Visa",
        card_number=4111111111111111,
        expiration_date=1225,
        cvv=123,
        billing_address="123 Demo Street, Demo City, Demo State, 12345",
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    payment_option2 = Payment_option(
        card_type="MasterCard",
        card_number=5555555555554444,
        expiration_date=1125,
        cvv=456,
        billing_address="456 Marnie Lane, Music City, Music State, 67890",
        user_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    payment_option3 = Payment_option(
        card_type="American Express",
        card_number=378282246310005,
        expiration_date=1025,
        cvv=789,
        billing_address="789 Bobbie Blvd, Rock City, Rock State, 54321",
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.session.add_all([payment_option1, payment_option2, payment_option3])
    db.session.commit()


def undo_payment_options():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.payment_options RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM payment_options"))

    db.session.commit()
