from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class TicketForm(FlaskForm):
    seat_number = IntegerField('Seat number', validators=[DataRequired()])
    row = StringField('Seat number', validators=[DataRequired()])
    row = StringField('Section')
    price = IntegerField('Price', validators=[DataRequired()])
