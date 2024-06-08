from flask_wtf import FlaskForm
from wtforms import IntegerField, SelectField, StringField, DateField
from wtforms.validators import  ValidationError, DataRequired, Optional
from app.models import Payment_option

def name_exists(form, field):
    # Checking if name exists
    name = field.data
    card_id = form.card_id.data
    card = Payment_option.query.filter(Payment_option.name == name).first()
    if card and card.id != card_id:
        raise ValidationError('Name is already in use.')

class EditCardForm(FlaskForm):
    card_id = IntegerField('card id')
    card_type = SelectField('card type', choices=['credit card', 'debit card'], validators=[Optional()] )
    name = StringField('card name', validators=[DataRequired(), name_exists])
    card_number = StringField('card number')
    card_company = StringField('name on card')
    owner_name = StringField('name on card', validators=[DataRequired()])
    expiration_date = DateField('expiration date', validators=[DataRequired()])
    cvv = IntegerField('cvv', validators=[DataRequired()])
    billing_address = StringField('billing adress', validators=[DataRequired()])
