-- ---------------------------------
-- Populating Users
-- ---------------------------------

INSERT INTO user (username,firstname,lastname,email,password_hash)
VALUES
    ('admin','Philippe','Weier','lotr.armycompanion@gmail.com','$pbkdf2-sha256$29000$6L0XgnCude79P6dUSsn5Hw$rz//QBn/OQxvkvusipwseZLBQVFkdBTq6z3ygGFe7l0'),
    ('Sulrin','Philippe','Weier','ph.weier@gmail.com','$pbkdf2-sha256$29000$SYlR6h0DYExp7f0fI6S0lg$QcoFsG1l9PCDIQV7E8WUqYeSxirN2q8bfAj22nuv57Q');


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
    ('fate',1),('fate',-1),('fate',2),('fate',-2);


-- ---------------------------------
-- Populating Promotions
-- ---------------------------------

INSERT INTO promotion (name,description,altering_effect_id,special_rule_id)
VALUES 
    ('fight_increase','Hero''s Fight characteristic is improved by 1 to a maximum of 6.',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('fight',1)),NULL),
    ('shoot_increase','Hero''s Shoot characteristic is reduced by 1 to a minimum of 3+.',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('shoot',-1)),NULL),
    ('strength_increase','Hero''s Strength is increased by 1. May be improved once.',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('strength',1)),NULL),
    ('defence_increase','Hero''s Defence is increased by 1. May be improved once.',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('defence',1)),NULL),
    ('attacks_increase','Hero''s Attacks characteristic is increased by 1 to a maximum of 3.',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('attacks',1)),NULL),
    ('wounds_increase','Hero''s Wounds characteristic is increased by 1 to a maximum of 3.',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('wounds',1)),NULL),
    ('courage_increase','Hero''s Courage characteristic is increased by 1 to a maximum of 6',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('courage',1)),NULL),
    ('will_increase','Hero''s Will characteristic is increased by 1 to a maximum of 3.',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('will',1)),NULL),
    ('might_increase','Hero''s Might characteristic is increased by 1 to a maximum of 3.',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('might',1)),NULL),
    ('lieutenant_base_might','Lieutenant''s bonus Might characteristic.',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('might',1)),NULL),
    ('lieutenant_base_will','Lieutenant''s bonus Will characteristic.',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('will',1)),NULL),
    ('hero_base_fate','Hero''s bonus Fate characteristic.',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('fate',1)),NULL);
    

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
Note that a Hero model can utilise their Heroic Move and call With Me! without actually moving themselves, even if they fail a Courage test as a result of the Terror special rule, they are simply goading those around them into action. However, should a Hero call With Me! and then subsequently flee the board as a result of their force being Broken, their Heroic Move will automatically be cancelled.'),
    
    ('heroic_shoot','Heroic Shoot enables a Hero model to shoot before other models get a chance. A Hero cannot perform a Heroic Shoot if they are Engaged in combat.','loose!','A Hero performing a Heroic Shoot may shout "Loose!" if they wish, enabling all friendly models within 6" to shoot with them.
A Hero does not need to have a missile weapon to call Loose! and does not need to shoot first. Models benefitting from a Heroic Shoot or Loose! do not need to target the same enemy model – they may each choose any target viable to them. Any model in range of a Heroic Shoot/Loose! that does not Shoot cannot choose to Shoot later on in that phase.'),

    ('heroic_combat','When a Hero model declares a Heroic Combat, the Fight that they are involved in is resolved first. In addition, if all the enemies in the Fight are slain, the Hero, and any models from their force Engaged in the same Fight (not those joining in with a spearor pike) may move again before proceeding with the Fight phase. This additional move can be a Charge into new enemies, if you wish, in which case the models will fight again in the ordinary sequence. A model may only benefit from one Heroic Combat in each turn; so if a model that was involved in a Heroic Combat moves into a combat where another friendly Hero model has also called a Heroic Combat, they may not move again if that Heroic Combat is also successful.
    If any of the models involved in the Heroic Combat Charge into new enemies, the way that the Fights are divided may be altered. Once all Heroic Combats have been resolved, rematch any Fights that must now change. The player with Priority decides how combatants are matched.',
    NULL,NULL),

    ('heroic_resolve','Unlike other Heroic Actions, when a Hero declares a Heroic Resolve, the effects of the Heroic Action take place immediately. Friendly models that are within 6"of a Hero model that declared a Heroic Resolve, including the Herothemselves, receive one free additional dice to any Resist tests they make for the remainder of the turn. Note that in the case of Warriormodels, and Hero models with no Will points remaining, this allows them to make a Resist test on one dice rather than none (one for Heroic Resolve, and one for Resistant to Magic). If a model that has the Resistant to Magic special rule is subject to a Heroic Resolve, they may roll two dice for their Resist test. A Herowho declares a Heroic Resolve cannot move in the same turn (they are too busy trying to steel their allies against unfriendly magics), however they may still do anything else that they would usually be able to do, such as cast Magical Powers.',
    NULL,NULL),

    ('heroic_march','A Heroic March enables a Heroto swiftly cover a greater distance – ignoring the chaos around them to rush into position. A Hero model who uses a Heroic March adds 3 "to their maximum Move distance if they are Infantry, or 5"to their mount’s maximum Move distance if they are Cavalry, or if the Herohas the Fly special rule. Models who utilise a Heroic March may not Charge in the same Move phase.
If a Hero declares that they will attempt a Heroic March, but is charged before they can perform it, the Heroic March is cancelled and the Might point spent to attempt it is lost.',
    'At The Double!','A Hero model who is conducting a Heroic March may choose to shout "At The Double!"" as they move, to enable their friends to keep pace with them. In this case, note their starting position before moving any affected models. Any friendly models within 6"of that point, who have not yet moved, also add 3"to their maximum move distance if they are Infantryand 5"to their mounts’ maximum Move distance if they are Cavalry, or they have the Fly special rule. Once the Herohas completed their move, those affected models may also move, so long as they end their move within 6"of the Hero. A Herocan utilise their Heroic March and call At the Double! without actually moving themselves; they are simply goading their friends into action. These models may not Charge as part of the At The Double! move.
Any model in range of the Heroic March that does not move, cannot choose to move later on in that phase.'),
    
    ('heroic_channelling','A Hero model who uses Heroic Channelling uses the Channelled versions of any Magical Powers that they cast this turn.',
    NULL,NULL),
    
    ('heroic_accuracy','Heroic Accuracy enables a Hero model to re-roll failed In The Way rolls when shooting in that Shoot phase. A Hero cannot perform a Heroic Accuracy if they are Engaged in combat. A Herodoes not need to have a missile weapon to declare a Heroic Accuracy.',
    'Take Aim!','If a Hero performing a Heroic Accuracy wishes, they may shout "Take Aim!" to their comrades, allowing all friendly models within 6" to also re-roll failed In The Way rolls when shooting in that Shoot phase.
Models benefitting from Heroic Accuracy or Take Aim! need not target the same enemy model – they may each choose targets viable to them.'),
    
    ('heroic_strike','A Hero model who declares they are using Heroic Strike adds D6 to their Fight value for the duration of the Fight phase. This is rolled for at the start of the model’s Duel roll and lasts until the end of the turn. This cannot increase a Hero model’s Fight value above 10. Note that this bonus is applied before other effects are taken into account. Thus, a Herowho is Engaged in a Fight with a Bat Swarm would add D6 to their Fight value (to a maximum of 10) and then halve the total due to the Bat Swarm’s Blinding Swarm special rule.',
    NULL,NULL),
    
    ('heroic_defence','A Hero model that declares a Heroic Defence will only suffer a Wound on the roll of a natural 6 in the ensuing Fight phase, regardless of any modifiers or Brutal Power Attacks. If the Hero would usually have been wounded on a 6/4+, 6/5+ or 6/6, then they will only be wounded if both rolls are natural rolls (see page 16). Note that a Heromodel’s mount is not affected by Heroic Defence.',
    NULL,NULL),
   
    ('heroic_strength','A Heromodel who declares they are using Heroic Strength adds D3 to their Strength characteristic for the duration of the Fight phase. This cannot increase a Heromodel’s Strength above 10. Note that this bonus is applied before other effects that affect a model’s Strength, such as the Wither Magical Power.',
    NULL,NULL),
    
    ('heroic_challenge','A Hero that is in base contact with an enemy Hero, of the same Heroic Tier or higher, may declare a Heroic Challenge.
If the enemy Hero accepts the Heroic Challenge, all other models that are part of the same combat, including supporting models, may not roll dice for the Duel roll, provide their Fight value to the fight or makes Strikes if their side wins the fight. From this point on, both Heromodels involved in a Heroic Challenge must Charge each other if able to do so until one of them has been slain. Other models may not Charge either of the Heromodels involved in the Heroic Challenge. Whichever Herois successful in slaying their opponent (they must be the one to cause the final blow) will immediately gain D3 Might points; this can take them above their starting level.
If the Challenge is declined, then any Heroic Actions called by the declining Herowill not affect other friendly models until the Herowho issued the Challenge is slain.',
    NULL,NULL);


;

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
-- Populating Special Rule
-- ---------------------------------

SOURCE /sql_scripts/specialRules.sql;


-- ---------------------------------
-- Populating Magical Powers
-- ---------------------------------

SOURCE /sql_scripts/magicalPowers.sql;

-- ---------------------------------
-- Populating Equipements
-- ---------------------------------

-- receivedSpecialRules.sql
SOURCE /sql_scripts/equipements.sql;


-- ---------------------------------
-- Populating Unit
-- ---------------------------------

SOURCE /sql_scripts/units.sql;


-- ---------------------------------
-- Populating Company Faction
-- ---------------------------------

SOURCE /sql_scripts/companyFactions.sql;