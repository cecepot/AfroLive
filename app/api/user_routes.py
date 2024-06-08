from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Payment_option, db, Event, Ticket
from app.forms import PaymentForm, EditCardForm


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# Read (get all events of the current user)
@user_routes.route('/<int:userId>/events')
@login_required
def all_current_user_events(userId):
    """
    Query for all events of the current user and returns them in a list of dictionaries
    """
    events = Event.query.filter(Event.user_id == userId).all()
    all_events = [event.to_dict() for event in events]
    sorted_events = sorted(all_events, key=lambda x : x['date'])
    return sorted_events


# Read (get all tickets for the current user)
@user_routes.route('/<int:id>/tickets')
@login_required
def all_tickets_by_id():
    """
    Query for all tickets for an event and returns them in a list of dictionaries
    """
    tickets = Ticket.query.filter_by(Ticket.user_id == current_user.id).all()
    all_tickets = [ticket.to_dict() for ticket in tickets]
    return {'tickets': all_tickets}
# =============================== PAYMENT OPTIONS 💳=====================================
# Create (Add a payment option to a user)
@user_routes.route('/<int:id>/cards', methods=['POST'])
@login_required
def add_card(id):
    """
    Add a card to a user
    """
    form = PaymentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
      print('================validddd', form.data)
      card = Payment_option(
      card_type = form.data['card_type'],
      owner_name = form.data['owner_name'],
      name = form.data['name'],
      card_number = form.data['card_number'],
      expiration_date = form.data['expiration_date'],
      cvv = form.data['cvv'],
      billing_address = form.data['billing_address'],
      card_company = form.data['card_company'],
      user_id = id
      )
      db.session.add(card)
      db.session.commit()
      return card.to_dict()
    print('========errrr============>',form.errors)
    return form.errors, 400

# Read (get all cards of a particular user)
@user_routes.route('/<int:id>/cards')
@login_required
def all_cards(id):
    """
    returns all cards on a user's account
    """
    cards = Payment_option.query.filter(Payment_option.user_id == id).all()
    return [card.to_dict() for card in cards]

# Read (get a card of a particular user by id)
@user_routes.route('/<int:id>/cards/<int:cardId>')
@login_required
def current_card(id, cardId):
    """
    returns all cards on a user's account
    """

    card = Payment_option.query.get(cardId)
    return card.to_dict()


# Update (update a payment option)
@user_routes.route('/<int:id>/cards/<int:cardId>', methods=['PUT'])
@login_required
def update_card(id, cardId):
    """
    updates a single card on the user's account
    """
    card = Payment_option.query.get(cardId)
    form = EditCardForm()
   
    print('========1=========', form.data)
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        print('========2=========')
        if (form.data['card_type']!= None):card.card_type = form.data['card_type']
        if (form.data['owner_name']!= None): card.owner_name = form.data['owner_name']
        if (form.data['name']!= None): card.name = form.data['name']
        if (form.data['card_number']!= None): card.card_number = form.data['card_number']
        if (form.data['expiration_date']!= None): card.expiration_date = form.data['expiration_date']
        if (form.data['expiration_date']!= None): card.cvv = form.data['cvv']
        if (form.data['billing_address']!= None): card.billing_address = form.data['billing_address']
        if (form.data['card_company']!= None): card.card_company = form.data['card_company']
        card.user_id = id
        db.session.commit()
        return card.to_dict()
    print('=========err===========>',form.errors)
    return form.errors

# Destroy (delete a card)
@user_routes.route('/<int:id>/cards/<int:cardId>', methods=["DELETE"])
@login_required
def delete_card(id, cardId):
    """
        Delete an artist
    """
    card = Payment_option.query.get(cardId)
    if card == None:
        return {"message" : "Looks like this card does not exist"}, 404

    db.session.delete(card)
    db.session.commit()
    return {"message" : "Your card was sucessfully deleted"}
