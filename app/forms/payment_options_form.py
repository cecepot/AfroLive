from flask_wtf import FlaskForm
from wtforms import IntegerField, SelectField, StringField, DateField
from wtforms.validators import DataRequired

class PaymentForm(FlaskForm):
    card_type = SelectField('cad type', choices=['credit card', 'debit card'], validators=[DataRequired()])
    card_number = StringField('card number', validators=[DataRequired()])
    expiration_date = DateField('expiration date', validators=[DataRequired()])
    cvv = IntegerField('cvv', validators=[DataRequired()])
    billing_address = StringField('billing adress', validators=[DataRequired()])
