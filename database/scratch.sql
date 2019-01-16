USE lotr;


-- DESC company_unit;
-- DESC user;
/* SHOW TABLES; */
 
--  UPDATE faction
--    SET name = 'Numenor'
--  WHERE name = 'Barad-Dur';



-- INSERT INTO user
--     (username,email,password)
-- VALUES 
--     ('admin','lotr.armycompanion@gmail.com','admin');

-- INSERT INTO company
--     (name,gold,user_id)
-- VALUES 
--     ('The Golden Robbers','24',1);

-- INSERT INTO company_unit
--     (unit_id,company_id,pseudo_name,company_unit_rank,effective_points)
-- VALUES 
--     ((SELECT unit.unit_id FROM unit WHERE unit.name='moria_goblin_warrior'),
--     (SELECT company.company_id FROM company WHERE company.name='The Golden Robbers'),
--     'Slurpus','warrior',
--     (SELECT unit.points FROM unit WHERE unit.name='moria_goblin_warrior'));

SELECT * FROM company;



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
-- WHERE company_unit.pseudo_name='TestUnit10'