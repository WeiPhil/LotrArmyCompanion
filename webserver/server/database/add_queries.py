import json
from functools import reduce
from sqlalchemy import and_, or_, exc

from server.run import db
from .models import *
from .select_queries import getCompanyUnit, getCompany
from .utility import checkAndUpdateCompanyUnitCost, checkAndUpdateCompanyCost

session = db.session


def addPromotionToCompanyUnit(companyUnitName, promotionName, updateCost=True):
    promotion_id = session.query(Promotion.promotion_id).filter(
        Promotion.name == promotionName).one()[0]
    # check for double
    company_unit_id = session.query(CompanyUnit.company_unit_id).filter(
        CompanyUnit.company_unit_name == companyUnitName).one()[0]

    exists = session.query(CompanyUnitHasPromotion).filter(and_(CompanyUnitHasPromotion.promotion_id ==
                                                                promotion_id, CompanyUnitHasPromotion.company_unit_id == company_unit_id)).scalar() is not None
    if(exists):
        hasPromotion = session.query(CompanyUnitHasPromotion).filter(and_(
            CompanyUnitHasPromotion.promotion_id == promotion_id, CompanyUnitHasPromotion.company_unit_id == company_unit_id)).one()
        hasPromotion.number += 1
        session.commit()
    else:
        newHasPromotion = CompanyUnitHasPromotion(
            promotion_id=promotion_id, company_unit_id=company_unit_id, number=1)
        session.add(newHasPromotion)
        session.commit()

    if(updateCost):
        updated_company_unit = None
        try:
            updated_company_unit = checkAndUpdateCompanyUnitCost(
                getCompanyUnit(companyUnitName))
        except exc.SQLAlchemyError as error:
            return {}, 404

        return updated_company_unit, 200
    else:
        return


def addEquipementToCompanyUnit(companyUnitName, equipementName, equipementValue):
    equipement_id = session.query(Equipement.equipement_id).filter(
        Equipement.name == equipementName).one()[0]
    #  TODO check for double

    company_unit_id = session.query(CompanyUnit.company_unit_id).filter(
        CompanyUnit.company_unit_name == companyUnitName).one()[0]

    exists = session.query(CompanyUnitHasEquipement).filter(and_(CompanyUnitHasEquipement.equipement_id ==
                                                                 equipement_id, CompanyUnitHasEquipement.company_unit_id == company_unit_id)).scalar() is not None
    if(exists):
        updateHasEquipement = session.query(CompanyUnitHasEquipement).filter(and_(
            CompanyUnitHasEquipement.equipement_id == equipement_id, CompanyUnitHasEquipement.company_unit_id == company_unit_id)).one()
        updateHasEquipement.bought = "yes"
        session.commit()
    else:
        newHasEquipement = CompanyUnitHasEquipement(
            equipement_id=equipement_id, company_unit_id=company_unit_id, points=equipementValue, bought="yes")
        session.add(newHasEquipement)
        session.commit()

    updated_company_unit = None
    company_name = None
    try:
        updated_company_unit = checkAndUpdateCompanyUnitCost(
            getCompanyUnit(companyUnitName))
        company_name = updated_company_unit["company_name"]
        company = session.query(Company).filter(
            Company.name == company_name).one()
        company.gold -= equipementValue
        session.commit()
    except exc.SQLAlchemyError as error:
        return {}, 404

    return getCompany(company_name), 200


def addCompany(username, companyName, companyFactionName, companyNotes, image_path='tempCardBackground1.jpg'):

    try:
        user_id = session.query(User.user_id).filter(
            User.username == username).one()[0]
        company_faction_id = session.query(CompanyFaction.company_faction_id).filter(
            CompanyFaction.name == companyFactionName).one()[0]
        # handle duplicate entries
        newCompany = Company(name=companyName, company_faction_id=company_faction_id, user_id=user_id,
                             image_path=image_path)
        session.add(newCompany)
        session.commit()
    except exc.SQLAlchemyError as error:
        return {}, 404
    return getCompany(companyName), 200


def addCompanyUnit(companyName, unitName, unitRank, companyUnitName, additionalEquipement, image_path):

    updated_company = None
    try:
        unit_id = session.query(Unit.unit_id).filter(
            Unit.name == unitName).one()[0]
        company_id = session.query(Company.company_id).filter(
            Company.name == companyName).one()[0]

        unit_base_points = session.query(Unit.points).filter(
            Unit.name == unitName).one()[0]

        base_equipement_ids_points = session.query(UnitHasEquipement.equipement_id, UnitHasEquipement.points).filter(
            UnitHasEquipement.unit_id == unit_id
        ).filter(UnitHasEquipement.points == 0).all()

        optional_equipement_ids_points = session.query(UnitHasEquipement.equipement_id, UnitHasEquipement.points).filter(
            UnitHasEquipement.unit_id == unit_id
        ).filter(UnitHasEquipement.points > 0).all()

        additional_equipement_ids_points = []
        if(additionalEquipement):
            additional_equipement_ids_points = session.query(Equipement.equipement_id, Equipement.low_cost).filter(
                or_(Equipement.name == e for e in additionalEquipement)).all()

        equipements = base_equipement_ids_points + \
            optional_equipement_ids_points + additional_equipement_ids_points

        equipement_cost = 0
        for (_, points) in equipements:
            equipement_cost += points

        unit_total_cost = unit_base_points+equipement_cost

        # if(unitRank == 'lieutenant'):
        #     unit_total_cost += 15
        # elif(unitRank == 'sergeant'):
        #     unit_total_cost += 5

        #  add new unit with total cost in points of equipement
        newCompanyUnit = CompanyUnit(unit_id=unit_id, company_id=company_id, company_unit_name=companyUnitName,
                                     company_unit_rank=unitRank, effective_points=unit_total_cost, image_path=image_path)

        session.add(newCompanyUnit)
        session.commit()

        # Update company gold
        company = session.query(Company).filter(
            Company.name == companyName).one()
        company.rating += unit_total_cost
        company.effective_rating += unit_total_cost
        company.gold -= unit_base_points+equipement_cost
        session.commit()

        # get new company unit id
        company_unit_id = session.query(CompanyUnit.company_unit_id).filter(
            CompanyUnit.company_unit_name == companyUnitName).one()[0]

        # add promotions
        if(unitRank == 'lieutenant'):
            addPromotionToCompanyUnit(
                companyUnitName, 'lieutenant_base_might', updateCost=False)
            addPromotionToCompanyUnit(
                companyUnitName, 'lieutenant_base_will', updateCost=False)
            addPromotionToCompanyUnit(
                companyUnitName, 'hero_base_fate', updateCost=True)
        elif(unitRank == 'sergeant'):
            addPromotionToCompanyUnit(
                companyUnitName, 'hero_base_fate', updateCost=True)

        # add equipements to has_equipements
        for (equipement_id, points) in equipements:
            isBought = "no" if not [
                equipement for equipement in additional_equipement_ids_points if equipement[0] == equipement_id] else "yes"
            unit_has_new_equipement = CompanyUnitHasEquipement(
                company_unit_id=company_unit_id, equipement_id=equipement_id, points=points, bought=isBought)
            session.add(unit_has_new_equipement)

        session.commit()

        # add special_rules to has_special_rules
        special_rule_ids = session.query(UnitHasSpecialRule.special_rule_id).filter(
            UnitHasSpecialRule.unit_id == unit_id).all()

        for special_rule_id in special_rule_ids:
            unit_has_new_special_rule = CompanyUnitHasSpecialRule(
                company_unit_id=company_unit_id, special_rule_id=special_rule_id)
            session.add(unit_has_new_special_rule)

        session.commit()

        # This should basically do nothing
        checkAndUpdateCompanyUnitCost(getCompanyUnit(companyUnitName))

        updated_company = getCompany(companyName)

    except exc.SQLAlchemyError as error:
        print(error)
        return {}, 404

    return updated_company, 200


def addUser(username, firstname, lastname, email, password_hash):

    username_exists = session.query(User).filter(
        User.username == username).scalar() is not None
    if(username_exists):
        return 101
    email_exists = session.query(User).filter(
        User.email == email).scalar() is not None
    if(email_exists):
        return 102

    new_user = User(username=username, firstname=firstname,
                    lastname=lastname, email=email, password_hash=password_hash)
    session.add(new_user)
    session.commit()
    return 200
