from app.models import db, Ticket_cart, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

def seed_ticket_cart():
    cart = Ticket_cart(
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        finished=False
    )

    db.session.add(cart)
    db.session.commit()

def undo_ticket_cart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
