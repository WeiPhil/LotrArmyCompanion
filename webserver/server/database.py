from flask import current_app, g
from flask.cli import with_appcontext

from .run import db


class Actor(db.Model):
    actor_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(45), unique=True, nullable=False)
    last_name = db.Column(db.String(60), unique=True, nullable=False)

    def __repr__(self):
        return '<Actor %r>' % self.first_name


def test():
    db.create_all()
    newActor = Actor(first_name="Hey", last_name="Doe")
    db.session.add(newActor)
    db.session.commit()
    return str(Actor.query.all)
