USE lotr;


DESC equipement;

-- SELECT * FROM company_has_injured;

-- -- INSERT INTO user (username,firstname,lastname,email,password)
-- -- VALUES
-- --     ('admin','Philippe','Weier','lotr.armycompanion@gmail.com','$pbkdf2-sha256$29000$6L0XgnCude79P6dUSsn5Hw$rz//QBn/OQxvkvusipwseZLBQVFkdBTq6z3ygGFe7l0'),
-- --     ('Sulrin','Philippe','Weier','ph.weier@gmail.com','$pbkdf2-sha256$29000$SYlR6h0DYExp7f0fI6S0lg$QcoFsG1l9PCDIQV7E8WUqYeSxirN2q8bfAj22nuv57Q'),

-- -- DESC user;
-- /* SHOW TABLES; */

-- INSERT INTO company_faction_has_unit_promotions
--     (company_faction_id,old_unit_id,new_unit_id,needed_equipement_id,bonus_equipement_id)
-- VALUES
--     ((SELECT company_faction.company_faction_id FROM company_faction WHERE company_faction.name='Angmar'),
--     (SELECT unit.unit_id FROM unit WHERE unit.name='angmar_orc_warrior'),
--     (SELECT unit.unit_id FROM unit WHERE unit.name='warg_rider'),
--     (SELECT equipement.equipement_id FROM equipement WHERE equipement.name='orc_bow'),
--     (SELECT equipement.equipement_id FROM equipement WHERE equipement.name='orc_bow'));

/* Usefull */

/* 
SELECT special_rule.name as special_rule_name
FROM unit_has_special_rule 
LEFT JOIN unit ON unit.unit_id = unit_has_special_rule.unit_id
LEFT JOIN special_rule ON special_rule.special_rule_id = unit_has_special_rule.special_rule_id
WHERE unit.name='moria_goblin_warrior' */

-- SELECT equipement.name as equipement_name
-- FROM company_unit_has_equipement 
-- LEFT JOIN company_unit ON company_unit.company_unit_id = company_unit_has_equipement.company_unit_id
-- LEFT JOIN equipement ON equipement.equipement_id = company_unit_has_equipement.equipement_id
-- WHERE company_unit.company_unit_name='Gormungur'
