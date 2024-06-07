from flask_wtf import FlaskForm
from wtforms import IntegerField, SelectField, StringField, DateField
from wtforms.validators import DataRequired

class EditCardForm(FlaskForm):
    card_type = SelectField('card type', choices=['credit card', 'debit card'])
    name = StringField('card name')
    card_number = StringField('card number')
    card_company = StringField('name on card')
    owner_name = StringField('name on card')
    expiration_date = DateField('expiration date')
    cvv = IntegerField('cvv', validators=[DataRequired()])
    billing_address = StringField('billing adress')
