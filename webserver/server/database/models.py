from server.run import db

from .utility import alchemy_encoder


class Faction(db.Model):
    __table__ = db.Table('faction', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=alchemy_encoder(), check_circular=False)


class Actor(db.Model):
    actor_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(45), nullable=False)
    last_name = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return json.dumps(self, cls=alchemy_encoder(), check_circular=False)
        # return '<Actor %r>' % self.first_name

    # Extends init with custom arguments
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
