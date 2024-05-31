from app.models import db, User, Notification, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_notifications():
    notification1 = Notification(
        content="Don't miss Burna Boy's concert in New York!",
        read=False,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    notification2 = Notification(
        content="Wizkid's live performance is happening soon in Washington D.C.!",
        read=False,
        user_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    notification3 = Notification(
        content="Tiwa Savage's festival in Baltimore is just around the corner!",
        read=False,
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    notification4 = Notification(
        content="Davido's album release party in New York is a must-attend!",
        read=False,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    notification5 = Notification(
        content="Yemi Alade's live performance in Arlington is going to be amazing!",
        read=False,
        user_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    notification6 = Notification(
        content="Mr Eazi's concert in Alexandria is set to be an unforgettable experience!",
        read=False,
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.session.add_all([notification1, notification2, notification3, notification4, notification5, notification6])
    db.session.commit()


def undo_notifications():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notifications RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notifications"))

    db.session.commit()
