from app.models import db,Event, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date, time

def seed_events():
    event1 = Event(
        title="Afrobeat Summer Concert",
        description="Join us for a vibrant night of Afrobeat music with top artists from across Africa.",
        date=date(2024, 12, 10),
        start_time=time(19, 0),
        end_time=time(22, 0),
        venue="City Park Amphitheater",
        city="New York",
        state="New York",
        image_url="https://afro-live-imagestore.s3.us-east-2.amazonaws.com/Afro-Nation-2024-Lineup-Poster-1600x1998.jpg",
        tickets_available=500,
        ticket_price=30.00,
        organizer_name="Afrobeat Events",
        organizer_contact="3425678498",
        category="concert",
        event_website="http://afrobeatsummerconcert.com",
        additional_notes="Bring your dancing shoes!",
        user_id=1
    )

    event2 = Event(
        title="DMV African Music Festival",
        description="Experience the rich diversity of African music at this annual festival.",
        date=date(2024, 8, 5),
        start_time=time(12, 0),
        end_time=time(22, 0),
        venue="Downtown Plaza",
        city="Laurel",
        state="Maryland",
        image_url="https://afro-live-imagestore.s3.us-east-2.amazonaws.com/Afro-Nation-2024-Lineup-Poster.jpg",
        tickets_available=2000,
        ticket_price=50.00,
        organizer_name="Festival Organizers Inc.",
        organizer_contact="1235748967",
        category="festival",
        event_website="http://africanmusicfestival.com",
        additional_notes="Food and drinks available for purchase.",
        user_id=2
    )

    event3 = Event(
        title="Live Performance: Afro Jazz Night",
        description="A night of smooth Afro Jazz performances by renowned artists.",
        date=date(2024, 9, 20),
        start_time=time(20, 0),
        end_time=time(23, 0),
        venue="Jazz Lounge",
        city="Baltimore",
        state="Mayland",
        image_url="https://afro-live-imagestore.s3.us-east-2.amazonaws.com/Wizkid-Live-in-Concert.jpg",
        tickets_available=150,
        ticket_price=25.00,
        organizer_name="Jazz Nights",
        organizer_contact="0869234781",
        category="live performance",
        event_website="http://afrojazznight.com",
        additional_notes="Limited seating available.",
        user_id=3
    )

    event4 = Event(
        title="Afrobeats Album Release Party",
        description="Celebrate the release of the latest Afrobeats album with live performances.",
        date=date(2024, 10, 12),
        start_time=time(18, 0),
        end_time=time(21, 0),
        venue="Music Hall",
        city="Richmond",
        state="Virginia",
        image_url="https://afro-live-imagestore.s3.us-east-2.amazonaws.com/rema-reveals-2023-north-america-tour-dates.jpg",
        tickets_available=300,
        ticket_price=20.00,
        organizer_name="Music Hall Events",
        organizer_contact="1234567983",
        category="album release party",
        event_website="http://afrobeatsalbumrelease.com",
        additional_notes="Album copies available for purchase.",
        user_id=1
    )

    event5 = Event(
        title="Highlife Groove Concert",
        description="Enjoy the classic sounds of Highlife music with top bands.",
        date=date(2024, 11, 5),
        start_time=time(17, 0),
        end_time=time(20, 0),
        venue="Open Air Arena",
        city="Alexandria",
        state="Virginia",
        image_url="https://afro-live-imagestore.s3.us-east-2.amazonaws.com/GPTMMBVWMAALPGQ.jpg",
        tickets_available=800,
        ticket_price=35.00,
        organizer_name="Groove Events",
        organizer_contact="8904567890",
        category="concert",
        event_website="http://highlifegrooveconcert.com",
        additional_notes="Gates open at 16:00.",
        user_id=2
    )

    event6 = Event(
        title="Afrobeat Festival",
        description="Two days of non-stop Afrobeat music featuring artists from around the world.",
        date=date(2024, 7, 14),
        start_time=time(10, 0),
        end_time=time(22, 0),
        venue="Festival Grounds",
        city="New York",
        state="New York",
        image_url="https://afro-live-imagestore.s3.us-east-2.amazonaws.com/FtxffUsXsAA1k_o.jpg",
        tickets_available=5000,
        ticket_price=75.00,
        organizer_name="Afrobeat Festival Group",
        organizer_contact="1234567907",
        category="festival",
        event_website="http://afrobeatfestival.com",
        additional_notes="VIP packages available.",
        user_id=3
    )

    db.session.add_all([event1, event2, event3, event4, event5, event6])
    db.session.commit()


def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))

    db.session.commit()
