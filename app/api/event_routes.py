from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Event, Ticket, Artist, db
from app.forms import EventForm, TicketForm, ArtistForm
from app.api.helper import (upload_file_to_s3, get_unique_filename)


event_routes = Blueprint('events', __name__)
# ========================= EVENT 🥳================================
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
      event.image_url.filename = get_unique_filename(event.image_url.filename)
      upload = upload_file_to_s3(event.image_url)
      print(upload)
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
    return sorted_events


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
        event.image_url.filename = get_unique_filename(event.image_url.filename)
        upload = upload_file_to_s3(event.image_url)
        print(upload)
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

# ======================= TICKETS 🎫====================================================
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

# =============================== ARTISTS 🎺=====================================
# Create (Add an artist to an event)
@event_routes.route('/<int:id>/artists', methods=['POST'])
@login_required
def add_artist(id):
    """
    Add an artist to an event
    """
    form = ArtistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
      artist = ArtistForm(
      name = form.data['name'],
      image_url = form.data['image_url'],
      spotify_url = form.data['spotify_url'],
      soundcloud_url = form.data['soundcloud_url'],
      applemusic_url = form.data['applemusic_url'],
      other_music_url = form.data['other_music_url'],
      event_id = id
      )
      artist.image_url.filename = get_unique_filename(artist.image_url.filename)
      upload = upload_file_to_s3(artist.image_url)
      print(upload)
      db.session.commit()
      return artist.to_dict()
    return artist.errors, 400

# Read (get all artists for an event)
@event_routes.route('/<int:id>/artists')
@login_required
def all_artists(id):
    """
    returns all artists for an event
    """
    artists = Artist.query.filter_by(Artist.event_id == id).all()
    return artists.to_dict()

# Update (update an artist)
@event_routes.route('/<int:id>/artists/<int:artistId>', methods=['PUT'])
@login_required
def update_artist(artistId, id):
    """
    updates a single event by id
    """
    artist = Artist.query.get(artistId)
    form = ArtistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        artist.name = form.data['name'],
        artist.image_url = form.data['image_url'],
        artist.spotify_url = form.data['spotify_url'],
        artist.soundcloud_url = form.data['soundcloud_url'],
        artist.applemusic_url = form.data['applemusic_url'],
        artist.other_music_url = form.data['other_music_url'],
        artist.event_id = id
        artist.image_url.filename = get_unique_filename(artist.image_url.filename)
        upload = upload_file_to_s3(artist.image_url)
        print(upload)
        db.session.commit()
        return artist.to_dict()
    return artist.errors

# Destroy (delete an artist)
@event_routes.route('/<int:id>/artists/<int:artistId>', methods=["DELETE"])
@login_required
def delete_artist(artistId):
    """
        Delete an artist
    """
    artist = Artist.query.get(artistId)
    if artist == None:
        return {"message" : "Looks like this artist does not exist"}, 404

    db.session.delete(artist)
    db.session.commit()
    return {"message" : "Your event was sucessfully deleted"}
