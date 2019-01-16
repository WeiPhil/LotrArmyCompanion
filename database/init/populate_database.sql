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

INSERT INTO altering_effect (characteristic,value)
VALUES 
    ('move',1),('move',-1),('move',2),('move',-2),
    ('fight',1),('fight',-1),('fight',2),('fight',-2),
    ('shoot',1),('shoot',-1),('shoot',2),('shoot',-2),
    ('strength',1),('strength',-1),('strength',2),('strength',-2),
    ('defence',1),('defence',-1),('defence',2),('defence',-2),
    ('attacks',1),('attacks',-1),('attacks',2),('attacks',-2),
    ('wounds',1),('wounds',-1),('wounds',2),('wounds',-2),
    ('courage',1),('courage',-1),('courage',2),('courage',-2),
    ('might',1),('might',-1),('might',2),('might',-2),
    ('will',1),('will',-1),('will',2),('will',-2),
    ('faith',1),('faith',-1),('faith',2),('faith',-2);

-- ---------------------------------
-- Populating Equipements
-- ---------------------------------

INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
VALUES 
    ('sword',NULL,1,5,'no',NULL),
    ('armour',NULL,1,5,'no',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('defence',1))),
    ('heavy_armour',NULL,2,5,'no',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('defence',2))),
    ('orc_bow',NULL,1,5,'no',NULL),
    ('throwing_daggers',NULL,1,5,'no',NULL),
    ('spear',NULL,1,5,'no',NULL),
    ('pike',NULL,1,5,'no',NULL),
    ('shield',NULL,1,5,'no',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('defence',1))),
    ('clubs',NULL,NULL,NULL,'no',NULL),
    ('drum',NULL,NULL,NULL,'no',NULL), 
    ('claws',NULL,NULL,NULL,'no',NULL),
    ('teeth',NULL,NULL,NULL,'no',NULL), 
    ('two-handed_axe',NULL,1,5,'no',NULL),
    ('elven-made_sword',NULL,1,5,'no',NULL),
    ('elven-made_hand-and-a-half_sword',NULL,1,5,'no',NULL),
    ('elven_cloak',NULL,5,10,'no',NULL), 
    ('staff',NULL,1,5,'no',NULL), 
    ('horse',NULL,6,10,'no',NULL), 
    ('warg',NULL,6,10,'no',NULL), 
    ('armoured_horse',NULL,9,15,'no',NULL);

-- ---------------------------------
-- Populating Promotions
-- ---------------------------------

INSERT INTO promotion (name,description,altering_effect_id,special_rule_id)
VALUES 
    ('Fight','Hero''s Fight characteristic is improved by 1 to a maximum of 6.',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('fight',1)),NULL),
    ('Shoot','Hero''s Shoot characteristic is reduced by 1 to a minimum of 3+.',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('shoot',-1)),NULL),
    ('Strength','Hero''s Strength is increased by 1. May be improved once.',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('strength',1)),NULL),
    ('Defence','Hero''s Defence is increased by 1. May be improved once.',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('defence',1)),NULL);


-- ---------------------------------
-- Populating Special Rule
-- ---------------------------------

-- receivedSpecialRules.sql

-- ---------------------------------
-- Populating Heroic Actions
-- ---------------------------------

INSERT INTO heroic_action 
    (name,description,alternative_name,alternative_description)
VALUES 
    ('heroic_move','A Heroic Move enables a Hero model to move before other models – essentially defying the usual Priority system. The Hero can then move, jump, climb, Charge and even use their Stand Fast! in the usual manner.
This Heroic Action can prove extremely valuable, so when a Heroic Move is declared by the player without Priority, the opposing player will often choose to also declare a Heroic Move in an attempt to keep the initiative.
    If a Hero declares that they will attempt a Heroic Move, but is charged before they can perform it, the Heroic Move is cancelled and the Might point spent to attempt it is lost.',
    'with_me!','A Hero model performing a Heroic Move may choose to shout “With Me!” In this case, note their starting position before moving them. Any friendly models within 6" of that point may also move, so long as they end their move within 6" of the Hero (if they are not able to end within 6" of the Hero then they may not move at all this phase). Any model in range of the Heroic Move that chooses not to move as part of the Heroic Move, will forgo their movement, and cannot act any further during that Move phase. The Hero calling the With Me! must fully complete their move before any friendly models can start their move as part of the With Me!
Note that a Hero model can utilise their Heroic Move and call With Me! without actually moving themselves, even if they fail a Courage test as a result of the Terror special rule, they are simply goading those around them into action. However, should a Hero call With Me! and then subsequently flee the board as a result of their force being Broken, their Heroic Move will automatically be cancelled.');

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



-- ---------------------------------
-- Populating Unit
-- ---------------------------------

-- received3Units.sql