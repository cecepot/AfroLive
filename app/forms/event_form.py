from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, DateField, TimeField, IntegerField, URLField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length
from app.api.helper import ALLOWED_EXTENSIONS



class EventForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min = 1, max = 200, message = "Name must be between %(min)d and %(max)d characters long. Ensure the length is appropriate.")])
    description =StringField('description', validators=[DataRequired(), Length(min = 1, max = 200, message = "Description must be between %(min)d and %(max)d characters long. Ensure the length is appropriate.")])
    date = DateField('date', validators=[DataRequired()])
    start_time = TimeField('start time', validators=[DataRequired()])
    end_time = TimeField('end time', validators=[DataRequired()])
    venue = StringField('venue', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = SelectField('state', validators=[DataRequired()], choices=['Maryland', 'Virginia', 'New York'])
    image_url = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    # tickets_available = IntegerField('number of tickets', validators=[DataRequired()])
    # ticket_price = IntegerField('price', validators=[DataRequired()])
    organizer_name = StringField('name of organizer', validators=[DataRequired()])
    organizer_contact = StringField('contact of organizer', validators=[DataRequired()])
    category = SelectField('category', choices=['concert', 'festival', 'live performance' , 'album release party'], validators=[DataRequired()])
    event_website = URLField('website link')
    additional_notes = StringField('additional notes')
