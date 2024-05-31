from app.models import db, Artist, environment, SCHEMA
from sqlalchemy.sql import text


from datetime import datetime

def seed_artists():
    artist1 = Artist(
        name="Burna Boy",
        image_url="http://example.com/burna_boy.jpg",
        spotify_url="https://open.spotify.com/artist/3wgQNSiK0wD8PNLNlSOxgo",
        soundcloud_url="https://soundcloud.com/burnaboy",
        applemusic_url="https://music.apple.com/us/artist/burna-boy/591899010",
        other_music_url="https://www.burnaboy.com",
        event_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    artist2 = Artist(
        name="Wizkid",
        image_url="http://example.com/wizkid.jpg",
        spotify_url="https://open.spotify.com/artist/3tVQdUvClmAT7URs9V3rsp",
        soundcloud_url="https://soundcloud.com/wizkidayo",
        applemusic_url="https://music.apple.com/us/artist/wizkid/29254083",
        other_music_url="https://www.wizkidmusic.com",
        event_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    artist3 = Artist(
        name="Tiwa Savage",
        image_url="http://example.com/tiwa_savage.jpg",
        spotify_url="https://open.spotify.com/artist/1XkoF8ryArs86LZvFOkbyr",
        soundcloud_url="https://soundcloud.com/tiwasavage",
        applemusic_url="https://music.apple.com/us/artist/tiwa-savage/4717435",
        other_music_url="https://www.tiwasavage.com",
        event_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    artist4 = Artist(
        name="Davido",
        image_url="http://example.com/davido.jpg",
        spotify_url="https://open.spotify.com/artist/0Y3agQaa6g2r0YmHPOO9rh",
        soundcloud_url="https://soundcloud.com/davidoofficial",
        applemusic_url="https://music.apple.com/us/artist/davido/566859156",
        other_music_url="https://www.iamdavido.com",
        event_id=4,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    artist5 = Artist(
        name="Yemi Alade",
        image_url="http://example.com/yemi_alade.jpg",
        spotify_url="https://open.spotify.com/artist/0G3unGSsOp3XaSnRqEqHoA",
        soundcloud_url="https://soundcloud.com/yemialade",
        applemusic_url="https://music.apple.com/us/artist/yemi-alade/353681034",
        other_music_url="https://www.yemialadeworld.com",
        event_id=5,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    artist6 = Artist(
        name="Mr Eazi",
        image_url="http://example.com/mr_eazi.jpg",
        spotify_url="https://open.spotify.com/artist/6vYKBwB4ssbB6OLaLCG0ta",
        soundcloud_url="https://soundcloud.com/mreazi",
        applemusic_url="https://music.apple.com/us/artist/mr-eazi/947228187",
        other_music_url="https://www.mreazi.com",
        event_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.session.add_all([artist1, artist2, artist3, artist4, artist5, artist6])
    db.session.commit()


def undo_artists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.artists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM artists"))

    db.session.commit()
