from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Event, Ticket, db
from app.forms import EventForm, TicketForm

event_routes = Blueprint('events', __name__)

# Create (create an event)
@event_routes.route('/', methods=['POST'])
@login_required
def create_event():
    """
    Create a new event
    """
    form = EventForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
      event = Event(
      description = form.data['description'],
      date = form.data['date'],
      start_time = form.data['start_time'],
      end_time = form.data['end_time'],
      venue = form.data['venue'],
      city = form.data['city'],
      state = form.data['state'],
      image_url = form.data['image_url'],
      tickets_available = form.data['tickets_available'],
      ticket_price = form.data['ticket_price'],
      organizer_name = form.data['organizer_name'],
      organizer_contact = form.data['organizer_contact'],
      category = form.data['category'],
      event_website = form.data['event_website'],
      additional_notes = form.data['additional_notes'],
      user_id = current_user.id,
      title = form.data['title'])
      db.session.commit()
      return event.to_dict()
    return event.errors, 400

# Read (get all events)
@event_routes.route('/')
@login_required
def all_events():
    """
    Query for all events and returns them in a list of dictionaries
    """
    events = Event.query.all()
    all_events = [event.to_dict() for event in events]
    sorted_events = sorted(all_events, key=lambda x : x['date'])
    return {'events': sorted_events}

# Read (get event by id)
@event_routes.route('/<int:id>')
@login_required
def one_event(id):
    """
    returns a single event by id
    """
    event = Event.query.get(id)
    return event.to_dict()

# Update (update an event)
@event_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_event(id):
    """
    updates a single event by id
    """
    event = Event.query.get(id)
    if event.user_id != current_user.id:
        return {"message" : "You are not authorized to perform this action"}, 401
    form = EventForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        event.title = form.data['title']
        event.description = form.data['description']
        event.date = form.data['date']
        event.start_time = form.data['start_time']
        event.end_time = form.data['end_time']
        event.venue = form.data['venue']
        event.city = form.data['city']
        event.state = form.data['state']
        event.image_url = form.data['image_url']
        event.tickets_available = form.data['tickets_available']
        event.ticket_price = form.data['ticket_price']
        event.organizer_name = form.data['organizer_name']
        event.organizer_contact = form.data['organizer_contact']
        event.category = form.data['category']
        event.event_website = form.data['event_website']
        event.additional_notes = form.data['additional_notes']
        event.user_id = current_user.id
        db.session.commit()
        return event.to_dict()
    return event.errors

# Destroy (delete an event)
@event_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_event(id):
    """
        Delete an event
    """
    event = Event.query.get(id)
    if event == None:
        return {"message" : "Looks like this event does not exist"}, 404

    if event.user_id == current_user.id:
        db.session.delete(event)
        db.session.commit()
        return {"message" : "Your event was sucessfully deleted"}
    return {"message" : "You are not authorized to perform this action"}, 401

# Create (create a ticket for an event)
@event_routes.route('/<int:id>/tickets', methods=['POST'])
@login_required
def create_ticket(id):
    """
    Create a ticket for an event
    """
    form = TicketForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
      ticket = Ticket(
      seat_number = form.data['seat_number'],
      price = form.data['price'],
      user_id = current_user.id,
      event_id = id

     )
      db.session.commit()
      return ticket.to_dict()
    return ticket.errors, 400

# Read (get all tickets for an event)
@event_routes.route('/<int:id>/tickets')
@login_required
def all_tickets():
    """
    Query for all tickets for an event and returns them in a list of dictionaries
    """
    tickets = Ticket.query.all()
    all_tickets = [ticket.to_dict() for ticket in tickets]
    return {'tickets': all_tickets}

# Read (get all tickets for the current user)
@event_routes.route('/<int:id>/tickets')
@login_required
def all_tickets_by_id():
    """
    Query for all tickets for an event and returns them in a list of dictionaries
    """
    tickets = Ticket.query.filter_by(Ticket.user_id == current_user.id).all()
    all_tickets = [ticket.to_dict() for ticket in tickets]
    return {'tickets': all_tickets}

# Destroy (delete a ticket)
@event_routes.route('/<int:Eventid>/tickets/<int:id>', methods=["DELETE"])
@login_required
def delete_ticket(id):
    """
        Delete an event
    """
    ticket = Ticket.query.get(id)
    if ticket == None:
        return {"message" : "Looks like this ticket does not exist"}, 404

    if ticket.user_id == current_user.id:
        db.session.delete(ticket)
        db.session.commit()
        return {"message" : "Your ticket was sucessfully deleted"}
    return {"message" : "You are not authorized to perform this action"}, 401
