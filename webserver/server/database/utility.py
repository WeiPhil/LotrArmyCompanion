import json
from sqlalchemy.ext.declarative import DeclarativeMeta

from server.run import db
import os
from collections import OrderedDict


class AlchemyEncoder(json.JSONEncoder):
    def __init__(self, ordered=False, list=[], exclude=False, **kwargs):
        kwargs['ensure_ascii'] = False
        kwargs['check_circular'] = False
        super(AlchemyEncoder, self).__init__(**kwargs)
        self.list = list
        self.visited_objs = []
        self.exclude = exclude
        self.ordered = ordered

    def default(self, obj):  # pylint: disable=E0202
        if isinstance(obj.__class__, DeclarativeMeta):
            # don't re-visit self
            if obj in self.visited_objs:
                return None
            self.visited_objs.append(obj)

            # an SQLAlchemy class
            fields = {}
            if(self.exclude):
                for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata' and not x.startswith('query') and x not in self.list]:
                    fields[field] = obj.__getattribute__(field)
            else:
                for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata' and not x.startswith('query') and x in self.list]:
                    fields[field] = obj.__getattribute__(field)

            # a json-encodable dict
            return OrderedDict(sorted(fields.items(), key=lambda i: self.list.index(i[0]))) if self.ordered else fields

        return json.JSONEncoder.default(self, obj)


def writeModelToJson(object, filename, isList=False, list=[], exclude=False):
    id_key = None
    id_name = None
    if(not isList):
        field = [x for x in dir(object) if x.endswith('_id')]
        id_key = getattr(object, field[0])
        id_name = field[0][:-3]
        file_name = filename+'_'+str(id_key)+'.json'
    else:
        field = [x for x in dir(object[0]) if x.endswith('_id')]
        id_name = field[0][:-3]
        file_name = filename+'s'+'.json'

    jsonString = AlchemyEncoder(list=list, exclude=exclude).encode(object)
    with open(os.path.join("queriedData", file_name), 'w', encoding='utf8') as outfile:
        outfile.write(jsonString)

    return jsonString
