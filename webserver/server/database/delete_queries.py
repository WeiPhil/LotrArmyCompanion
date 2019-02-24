import json
from functools import reduce
from sqlalchemy import and_, or_, exc

from server.run import db
from .models import *
from .select_queries import getCompany
from .utility import checkAndUpdateCompanyUnitCost, checkAndUpdateCompanyCost

session = db.session


def deleteCompanyUnit(companyUnitName, companyName):

    company_unit_id = session.query(CompanyUnit.company_unit_id).filter(
        CompanyUnit.company_unit_name == companyUnitName).one()
    try:
        # delete equipements
        session.query(CompanyUnitHasEquipement).filter(
            CompanyUnitHasEquipement.company_unit_id == company_unit_id).delete()
        # delete promotions
        session.query(CompanyUnitHasPromotion).filter(
            CompanyUnitHasPromotion.company_unit_id == company_unit_id).delete()
        # delete special rules
        session.query(CompanyUnitHasSpecialRule).filter(
            CompanyUnitHasSpecialRule.company_unit_id == company_unit_id).delete()
        # delete magical powers
        session.query(CompanyUnitHasMagicalPower).filter(
            CompanyUnitHasMagicalPower.company_unit_id == company_unit_id).delete()
        # delete injuries
        session.query(CompanyUnitHasInjury).filter(
            CompanyUnitHasInjury.company_unit_id == company_unit_id).delete()
        # delete heroic actions
        session.query(CompanyUnitHasHeroicAction).filter(
            CompanyUnitHasHeroicAction.company_unit_id == company_unit_id).delete()

        # delete from company injured
        session.query(CompanyHasInjured).filter(
            CompanyHasInjured.company_unit_id == company_unit_id).delete()

        # delete company unit
        session.query(CompanyUnit).filter(
            CompanyUnit.company_unit_id == company_unit_id).delete()

        session.commit()
        updatedCompany = checkAndUpdateCompanyCost(companyName)
        return updatedCompany, 200

    except exc.SQLAlchemyError as error:
        print(error)
        return {}, 404
