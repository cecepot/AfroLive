from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text


from datetime import datetime

def seed_favorites():
    favorite1 = Favorite(
        user_id=1,
        event_id=1,
    )

    favorite2 = Favorite(
        user_id=2,
        event_id=2,
    )

    favorite3 = Favorite(
        user_id=3,
        event_id=3,
    )

    favorite4 = Favorite(
        user_id=1,
        event_id=4,
    )

    favorite5 = Favorite(
        user_id=2,
        event_id=5,
    )

    favorite6 = Favorite(
        user_id=3,
        event_id=6,
    )

    db.session.add_all([favorite1, favorite2, favorite3, favorite4, favorite5, favorite6])
    db.session.commit()


def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
