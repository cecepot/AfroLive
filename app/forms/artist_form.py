from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired
from app.api.helper import ALLOWED_EXTENSIONS


class ArtistForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    image_url = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    spotify_url = URLField('spotify link')
    soundcloud_url = URLField('soundcloud link')
    applemusic_url = URLField('applemusic link')
    other_music_url = URLField('other streaming link')
