from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, DateField, TimeField, IntegerField, URLField
from flask_wtf.file import FileField, FileAllowed
from wtforms.validators import Optional
from app.api.helper import ALLOWED_EXTENSIONS



class UpdateEventForm(FlaskForm):
    title = StringField('title', validators=[Optional()])
    description =StringField('description', validators=[Optional()])
    date = DateField('date', validators=[Optional()])
    start_time = TimeField('start time', validators=[Optional()])
    end_time = TimeField('end time', validators=[Optional()])
    venue = StringField('venue', validators=[Optional()])
    city = StringField('city', validators=[Optional()])
    state = SelectField('state', validators=[Optional()], choices=['Maryland', 'Virginia', ])
    image_url = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    tickets_available = IntegerField('number of tickets', validators=[Optional()])
    ticket_price = IntegerField('price', validators=[Optional()])
    organizer_name = StringField('name of organizer', validators=[Optional()])
    organizer_contact = StringField('contact of organizer', validators=[Optional()])
    category = SelectField('category', choices=['concert', 'festival', 'live performance' , 'album release party'], validators=[Optional()])
    event_website = URLField('website link')
    additional_notes = StringField('additional notes')
