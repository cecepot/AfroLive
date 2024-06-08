from flask_wtf import FlaskForm
from wtforms import IntegerField, SelectField, StringField, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import Payment_option

def name_exists(form, field):
    # Checking if name exists
    name = field.data
    card = Payment_option.query.filter(Payment_option.name == name).first()
    if card:
        raise ValidationError('Name is already in use.')



class PaymentForm(FlaskForm):
    card_type = SelectField('card type', choices=['credit card', 'debit card'], validators=[DataRequired()])
    name = StringField('card name', validators=[DataRequired(), name_exists])
    owner_name = StringField('name on card', validators=[DataRequired()])
    card_company = StringField('name on card')
    card_number = StringField('card number', validators=[DataRequired()])
    expiration_date = DateField('expiration date', validators=[DataRequired()])
    cvv = IntegerField('cvv', validators=[DataRequired()])
    billing_address = StringField('billing adress', validators=[DataRequired()])
