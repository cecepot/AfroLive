from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, DateField, TimeField, IntegerField, URLField, FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired
from app.api.helper import ALLOWED_EXTENSIONS



class EventForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description =StringField('description', validators=[DataRequired()])
    date = DateField('date', validators=[DataRequired()])
    start_time = TimeField('start time', validators=[DataRequired()])
    end_time = TimeField('end time', validators=[DataRequired()])
    venue = StringField('venue', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = SelectField('state', validators=[DataRequired()], choices=['Maryland', 'Virginia', ])
    image_url = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    tickets_available = IntegerField('number of tickets', validators=[DataRequired()])
    ticket_price = IntegerField('price', validators=[DataRequired()])
    organizer_name = StringField('name of organizer', validators=[DataRequired()])
    organizer_contact = StringField('contact of organizer', validators=[DataRequired()])
    category = SelectField('category', choices=['concert', 'festival', 'live performance' , 'album release party'], validators=[DataRequired()])
    event_website = URLField('website link')
    additional_notes = StringField('additional notes')
