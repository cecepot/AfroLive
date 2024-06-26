from app.models import db, Cart_item, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

def seed_cart_item():
    cart_item = Cart_item(
        cart_id=1,  
        ticket_id=1,
        quantity=2,
        price=60.00
    )

    db.session.add(cart_item)
    db.session.commit()

def undo_cart_item():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_items"))

    db.session.commit()
