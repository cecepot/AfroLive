from flask.cli import AppGroup
from .users import seed_users, undo_users
from .artists import seed_artists, undo_artists
from .events import seed_events, undo_events
from .favorites import seed_favorites, undo_favorites
from .notifications import seed_notifications, undo_notifications
from .payment_options import seed_payment_options, undo_payment_options
from .tickets import seed_tickets, undo_tickets

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_favorites()
        undo_notifications()
        undo_tickets()
        undo_artists()
        undo_events()
        undo_payment_options()
        undo_users()
    seed_users()
    seed_payment_options()
    seed_events()
    seed_artists()
    seed_tickets()
    seed_notifications()
    seed_favorites()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_favorites()
    undo_notifications()
    undo_tickets()
    undo_artists()
    undo_events()
    undo_payment_options()
    undo_users()






    # Add other undo functions here
