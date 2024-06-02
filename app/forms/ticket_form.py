from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class TicketForm(FlaskForm):
    seat_number = IntegerField('Seat number', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
