import json

from server.run import db

from .utility import AlchemyEncoder


class Company(db.Model):
    __table__ = db.Table('company', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class CompanyUnit(db.Model):
    __table__ = db.Table('company_unit', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class CompanyUnitHasEquipement(db.Model):
    __table__ = db.Table('company_unit_has_equipement', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class CompanyUnitHasHeroicAction(db.Model):
    __table__ = db.Table('company_unit_has_heroic_action', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class CompanyUnitHasInjury(db.Model):
    __table__ = db.Table('company_unit_has_injury', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class CompanyUnitHasMagicalPower(db.Model):
    __table__ = db.Table('company_unit_has_magical_power', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class CompanyUnitHasSpecialRule(db.Model):
    __table__ = db.Table('company_unit_has_special_rule', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class Equipement(db.Model):
    __table__ = db.Table('equipement', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class Faction(db.Model):
    __table__ = db.Table('faction', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class HeroicAction(db.Model):
    __table__ = db.Table('heroic_action', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class Injury(db.Model):
    __table__ = db.Table('injury', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class MagicalPower(db.Model):
    __table__ = db.Table('magical_power', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class Promotion(db.Model):
    __table__ = db.Table('promotion', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class SpecialRule(db.Model):
    __table__ = db.Table('special_rule', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class Keyword(db.Model):
    __table__ = db.Table('keyword', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class Unit(db.Model):
    __table__ = db.Table('unit', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class UnitHasEquipement(db.Model):
    __table__ = db.Table('unit_has_equipement', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class UnitHasKeyword(db.Model):
    __table__ = db.Table('unit_has_keyword', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class UnitHasHeroicAction(db.Model):
    __table__ = db.Table('unit_has_heroic_action', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class UnitHasMagicalPower(db.Model):
    __table__ = db.Table('unit_has_magical_power', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class UnitHasSpecialRule(db.Model):
    __table__ = db.Table('unit_has_special_rule', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)


class User(db.Model):
    __table__ = db.Table('user', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return json.dumps(self, cls=AlchemyEncoder(), check_circular=False, ensure_ascii=False)
