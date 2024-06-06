from app.models import db, Ticket, environment, SCHEMA
from sqlalchemy.sql import text


from datetime import datetime

def seed_tickets():
    ticket1 = Ticket(
        seat_number=1,
        row = 'A',
        section = 'B',
        price=30.00,
        event_id=1,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    ticket2 = Ticket(
        seat_number=2,
        row = 'A',
        section = 'B',
        price=50.00,
        event_id=2,
        user_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    ticket3 = Ticket(
        seat_number=3,
        row = 'B',
        section = 'B',
        price=25.00,
        event_id=3,
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    ticket4 = Ticket(
        seat_number=4,
        row = 'B',
        section = 'B',
        price=20.00,
        event_id=4,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    ticket5 = Ticket(
        seat_number=5,
        row = 'B',
        section = 'I',
        price=35.00,
        event_id=5,
        user_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    ticket6 = Ticket(
        seat_number=6,
        row = 'C',
        section = 'I',
        price=75.00,
        event_id=6,
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    ticket7 = Ticket(
        seat_number=7,
        row = 'A',
        section = 'A',
        price=30.00,
        event_id=1,
        user_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    ticket8 = Ticket(
        seat_number=8,
        row = 'A',
        section = 'A',
        price=50.00,
        event_id=2,
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    ticket9 = Ticket(
        seat_number=9,
        row = 'F',
        section = 'G',
        price=25.00,
        event_id=3,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    ticket10 = Ticket(
        seat_number=10,
        row = 'F',
        section = 'G',
        price=20.00,
        event_id=4,
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    ticket11 = Ticket(
        seat_number=11,
        row = 'F',
        section = 'D',
        price=35.00,
        event_id=5,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    ticket12 = Ticket(
        seat_number=12,
        row = 'A',
        section = 'D',
        price=75.00,
        event_id=6,
        user_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.session.add_all([ticket1, ticket2, ticket3, ticket4, ticket5, ticket6, ticket7, ticket8, ticket9, ticket10, ticket11, ticket12])
    db.session.commit()


def undo_tickets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tickets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tickets"))

    db.session.commit()
