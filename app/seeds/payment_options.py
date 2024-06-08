from app.models import db, User, Payment_option, environment, SCHEMA
from sqlalchemy.sql import text

from datetime import datetime

def seed_payment_options():
    payment_option1 = Payment_option(
        card_type="Credit",
        card_number="4111 1111 1111 1111",
        expiration_date=1225,
        card_company = "Visa",
        owner_name = "Demo User",
        name = "Demo's happy card",
        cvv=123,
        billing_address="123 Demo Street, Demo City, Demo State, 12345",
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    payment_option2 = Payment_option(
        card_type="Credit",
        card_number="5555 5555 5555 4444",
        card_company = "MasterCard",
        owner_name = "Marnie Marnie",
        name = "Marnie's happy card",
        expiration_date=1125,
        cvv=456,
        billing_address="456 Marnie Lane, Music City, Music State, 67890",
        user_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    payment_option3 = Payment_option(
        card_type="credit",
        card_number="378 2822 4631 0005",
        card_company = "American Express",
        owner_name = "Bobbie Bobbie",
        name = "Bobby's happy card",
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
