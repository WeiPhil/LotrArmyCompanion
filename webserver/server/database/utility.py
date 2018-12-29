import json
from sqlalchemy.ext.declarative import DeclarativeMeta

from server.run import db


def alchemy_encoder():
    _visited_objs = []

    class AlchemyEncoder(json.JSONEncoder):
        def default(self, obj):  # pylint: disable=E0202
            if isinstance(obj.__class__, DeclarativeMeta):
                # don't re-visit self
                if obj in _visited_objs:
                    return None
                _visited_objs.append(obj)

                # an SQLAlchemy class
                fields = {}
                for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata' and not x.startswith('query')]:
                    fields[field] = obj.__getattribute__(field)
                # a json-encodable dict
                return fields

            return json.JSONEncoder.default(self, obj)
    return AlchemyEncoder


def writeModelToJson(object, isList=False):
    id_key = None
    id_name = None
    file_name = None
    if(not isList):
        field = [x for x in dir(object) if x.endswith('_id')]
        id_key = getattr(object, field[0])
        id_name = field[0][:-3]
        file_name = str(id_name)+'_'+str(id_key)+'.json'
    else:
        field = [x for x in dir(object[0]) if x.endswith('_id')]
        id_name = field[0][:-3]
        file_name = str(id_name)+'s'+'.json'

    with open(file_name, 'w', encoding='utf8') as outfile:
        json.dump(object, cls=alchemy_encoder(),
                  check_circular=False, ensure_ascii=False, fp=outfile)
