from flask_wtf import FlaskForm
from wtforms import IntegerField, SelectField, StringField, DateField
from wtforms.validators import  ValidationError, DataRequired
from app.models import Payment_option

def name_exists(form, field):
    # Checking if name exists
    name = field.data
    card = Payment_option.query.filter(Payment_option.name == name).first()
    if card:
        raise ValidationError('Name is already in use.')

class EditCardForm(FlaskForm):
    card_type = SelectField('card type', choices=['credit card', 'debit card'])
    name = StringField('card name', validators=[DataRequired(), name_exists])
    card_number = StringField('card number')
    card_company = StringField('name on card')
    owner_name = StringField('name on card', validators=[DataRequired()])
    expiration_date = DateField('expiration date', validators=[DataRequired()])
    cvv = IntegerField('cvv', validators=[DataRequired()])
    billing_address = StringField('billing adress', validators=[DataRequired()])
