from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Payment_option, db, Event
from app.forms import PaymentForm


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
# =============================== PAYMENT OPTIONS 💳=====================================
# Create (Add a payment option to a user)
@user_routes.route('/<int:id>/payments', methods=['POST'])
@login_required
def add_card(id):
    """
    Add a card to a user
    """
    form = PaymentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
      card = Payment_option(
      card_type = form.data['name'],
      card_number = form.data['name'],
      expiration_date = form.data['image_url'],
      cvv = form.data['spotify_url'],
      billing_address = form.data['soundcloud_url'],
      user_id = id
      )
      db.session.commit()
      return card.to_dict()
    return card.errors, 400

# Read (get all cards of a particular user)
@user_routes.route('/<int:id>/payments')
@login_required
def all_cards():
    """
    returns all cards on a user's account
    """
    cards = Payment_option.query.filter_by(Payment_option.user_id == current_user.id).all()
    return cards.to_dict()

# Update (update a payment option)
@user_routes.route('/<int:id>/payments/<int:cardId>', methods=['PUT'])
@login_required
def update_card(cardId):
    """
    updates a single card on the user's account
    """
    card = Payment_option.query.get(cardId)
    form = PaymentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        card.card_type = form.data['name'],
        card.card_number = form.data['name'],
        card.expiration_date = form.data['image_url'],
        card.cvv = form.data['spotify_url'],
        card.billing_address = form.data['soundcloud_url'],
        card.user_id = id
        db.session.commit()
        return card.to_dict()
    return card.errors

# Destroy (delete a card)
@user_routes.route('/<int:id>/payments/<int:cardId>', methods=["DELETE"])
@login_required
def delete_card(cardId):
    """
        Delete an artist
    """
    card = Payment_option.query.get(cardId)
    if card == None:
        return {"message" : "Looks like this card does not exist"}, 404

    db.session.delete(card)
    db.session.commit()
    return {"message" : "Your card was sucessfully deleted"}
