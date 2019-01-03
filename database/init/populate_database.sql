-- ---------------------------------
-- Populating Factions
-- ---------------------------------

INSERT INTO faction (name,alignment)
VALUES 
    ('the_fellowship','good'),
    ('the_shire','good'),
    ('the_rangers','good'),
    ('númenor','good'),
    ('minas_tirith','good'),
    ('the_fiefdoms','good'),
    ('the_dead_of_dunharrow','good'),
    ('arnor','good'),
    ('rohan','good'),
    ('wildmen_of_drúadan','good'),
    ('rivendell','good'),
    ('lothlórien','good'),
    ('fangorn','good'),
    ('the_misty_mountains','good'),
    ('the_kingdom_of_khazad-dûm','good'),
    ('wanderers_in_the_wild','good'),
    ('barad-dûr','evil'),
    ('angmar','evil'),
    ('mordor','evil'),
    ('moria','evil'),
    ('isengard','evil'),
    ('the_easterlings','evil'),
    ('variags_of_khand','evil'),
    ('the_serpent_horde','evil'),
    ('far_harad','evil'),
    ('corsairs_of_umbar','evil'),
    ('sharkey''s_rogues','evil');

-- ---------------------------------
-- Populating Altering Effects
-- ---------------------------------

INSERT INTO altering_effect (defence_bonus)
VALUES (1);

INSERT INTO altering_effect (defence_bonus)
VALUES (2);

-- ---------------------------------
-- Populating Equipements
-- ---------------------------------

INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
VALUES 
    ('sword',NULL,1,5,'no',NULL),
    ('armour',NULL,1,5,'no',(SELECT altering_effect_id FROM altering_effect WHERE  
                            (fight_bonus,shoot_bonus,strength_bonus,defence_bonus,attacks_bonus,wounds_bonus,courage_bonus,might_bonus,will_bonus,faith_bonus) =
                            (0          ,0          ,0             ,1            ,0            ,0           ,0            ,0          ,0         ,0)
                            )),
    ('heavy_armour',NULL,2,5,'no',(SELECT altering_effect_id FROM altering_effect WHERE  
                            (fight_bonus,shoot_bonus,strength_bonus,defence_bonus,attacks_bonus,wounds_bonus,courage_bonus,might_bonus,will_bonus,faith_bonus) =
                            (0          ,0          ,0             ,2            ,0            ,0           ,0            ,0          ,0         ,0)
                            )),
    ('orc_bow',NULL,1,5,'no',NULL),
    ('throwing_daggers',NULL,1,5,'no',NULL),
    ('spear',NULL,1,5,'no',NULL),
    ('pike',NULL,1,5,'no',NULL),
    ('shield',NULL,1,5,'no',(SELECT altering_effect_id FROM altering_effect WHERE  
                            (fight_bonus,shoot_bonus,strength_bonus,defence_bonus,attacks_bonus,wounds_bonus,courage_bonus,might_bonus,will_bonus,faith_bonus) =
                            (0          ,0          ,0             ,1            ,0            ,0           ,0            ,0          ,0         ,0)
                            )),
    ('clubs',NULL,NULL,NULL,'no',NULL),
    ('drum',NULL,NULL,NULL,'no',NULL), 
    ('claws',NULL,NULL,NULL,'no',NULL),
    ('teeth',NULL,NULL,NULL,'no',NULL), 
    ('two-handed_axe',NULL,1,5,'no',NULL), 
    ('nenya','This unobtrusive ring is one of the three Elven Rings of power.',NULL,NULL,'no',NULL), 
    ('elven-made_sword',NULL,1,5,'no',NULL),
    ('elven-made_hand-and-a-half_sword',NULL,1,5,'no',NULL),
    ('elven_cloak',NULL,5,10,'no',NULL), 
    ('staff',NULL,1,5,'no',NULL), 
    ('horse',NULL,6,10,'no',NULL), 
    ('warg',NULL,6,10,'no',NULL), 
    ('armoured_horse',NULL,9,15,'no',NULL);


-- ---------------------------------
-- Populating Unit
-- ---------------------------------

-- Warriors
INSERT INTO unit 
    (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,description,image_path)
VALUES 
    -- Moria
    ((SELECT faction_id FROM faction WHERE name='Moria'),
    'moria_goblin_warrior',4,
    5,2,5,3,4,1,1,2,
    'Since the fall of Khazad-dûm, the former Dwarven kingdom of Moria has become overrun by swrms of these foul and stunted creatures.',
    'goblin_fall.jpg'),

    ((SELECT faction_id FROM faction WHERE name='Moria'),
    'moria_blackshield',8,
    5,2,5,3,6,1,1,3,
    'Moria Blackshield are just awesome! Anything to argue?.',
    'tempCardBackground1.jpg'),
    -- Angmar    
    ((SELECT faction_id FROM faction WHERE name='Angmar'),
    'wild_warg',8,
    10,3,5,4,4,1,1,2,
    'Wargs are always hunting like beasts.',
    'warg_rider.jpg'),
    -- Lothlorien    
    ((SELECT faction_id FROM faction WHERE name='Lothlórien'),
    'wood_elf_warrior',8,
    6,5,3,3,3,1,1,5,
    'An epic wood elf description.',
    'tempCardBackground1.jpg');

-- ---------------------------------
-- Populating Special Rule
-- ---------------------------------

INSERT INTO special_rule 
    (name,type,description,origin)
VALUES 
    ('Cave Dweller','active',
    'A model with this special rule adds 1 to all Jump, Leap and Climb tests. They also suffer no penalties for fighting in the dark.',
    'basic');

-- ---------------------------------
-- Populating Keywords
-- ---------------------------------

INSERT INTO keyword 
    (name)
VALUES 
    ('warrior'),('hero_of_legend'),('hero_of_valor'),('hero_of_fortitude'),('minor_hero'),('independent_hero'),
    ('infantry'),('cavalry'),('monster'),
    ('hobbit'),('elf'),('orc'),('pony'),('warg'),('goblin'),('wizard'),('man'),('dwarf'),('spirit'),('ringwraith'),('spider'),('troll'),('siege_engine'),('uruk-hai'),('great_beast'),('war_beast'),('drake'),('dragon'),('kraken'),('bat'),('mûmak'),('pony'),('ent'),('eagle'),
    ('gondor'),('mirkwood'),('erebor'),('númenor'),('arnor'),('rohan'),('rivendell'),('lórien'),('khazad-dûm'),('moria'),('iron_hills'),('mordor'),('angmar'),('easterling'),('isengard'),('dunlending'),('khandish'),('haradrim'),('mahûd'),('corsair'),('ruffian');