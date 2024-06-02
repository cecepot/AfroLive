from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired

class ArtistForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    image_url = URLField('image')
    spotify_url = URLField('spotify link')
    soundcloud_url = URLField('soundcloud link')
    applemusic_url = URLField('applemusic link')
    other_music_url = URLField('other streaming link')
