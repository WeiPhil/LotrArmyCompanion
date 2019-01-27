import json

from server.run import db

from .utility import AlchemyEncoder


class Company(db.Model):
    __table__ = db.Table('company', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class CompanyUnit(db.Model):
    __table__ = db.Table('company_unit', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class CompanyUnitHasEquipement(db.Model):
    __table__ = db.Table('company_unit_has_equipement', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class CompanyHasInjured(db.Model):
    __table__ = db.Table('company_has_injured', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class CompanyUnitHasHeroicAction(db.Model):
    __table__ = db.Table('company_unit_has_heroic_action', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class CompanyUnitHasInjury(db.Model):
    __table__ = db.Table('company_unit_has_injury', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class CompanyUnitHasMagicalPower(db.Model):
    __table__ = db.Table('company_unit_has_magical_power', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class CompanyUnitHasSpecialRule(db.Model):
    __table__ = db.Table('company_unit_has_special_rule', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class CompanyUnitHasPromotion(db.Model):
    __table__ = db.Table('company_unit_has_promotion', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class Equipement(db.Model):
    __table__ = db.Table('equipement', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class EquipementHasSpecialRule(db.Model):
    __table__ = db.Table('equipement_has_special_rule', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class Faction(db.Model):
    __table__ = db.Table('faction', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class HeroicAction(db.Model):
    __table__ = db.Table('heroic_action', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class AlteringEffect(db.Model):
    __table__ = db.Table('altering_effect', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class Injury(db.Model):
    __table__ = db.Table('injury', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class MagicalPower(db.Model):
    __table__ = db.Table('magical_power', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class Promotion(db.Model):
    __table__ = db.Table('promotion', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class SpecialRule(db.Model):
    __table__ = db.Table('special_rule', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class Keyword(db.Model):
    __table__ = db.Table('keyword', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class Unit(db.Model):
    __table__ = db.Table('unit', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class UnitHasEquipement(db.Model):
    __table__ = db.Table('unit_has_equipement', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class UnitHasKeyword(db.Model):
    __table__ = db.Table('unit_has_keyword', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class UnitHasHeroicAction(db.Model):
    __table__ = db.Table('unit_has_heroic_action', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class UnitHasMagicalPower(db.Model):
    __table__ = db.Table('unit_has_magical_power', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class UnitHasSpecialRule(db.Model):
    __table__ = db.Table('unit_has_special_rule', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class User(db.Model):
    __table__ = db.Table('user', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class CompanyFaction(db.Model):
    __table__ = db.Table('company_faction', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class CompanyFactionHasReinforcement(db.Model):
    __table__ = db.Table('company_faction_has_reinforcement', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class CompanyFactionHasSpecialRule(db.Model):
    __table__ = db.Table('company_faction_has_special_rule', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class CompanyFactionHasHeroEquipement(db.Model):
    __table__ = db.Table('company_faction_has_hero_equipement', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)


class CompanyFactionHasUnitPromotions(db.Model):
    __table__ = db.Table('company_faction_has_unit_promotions', db.Model.metadata,
                         autoload=True, autoload_with=db.engine)

    def __repr__(self):
        return AlchemyEncoder().encode(self)
