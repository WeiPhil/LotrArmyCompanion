-- New Equipements
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
VALUES 
    ('sword',NULL,1,5,'no',NULL),
    ('armour',NULL,1,5,'no',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('defence',1))),
    ('heavy_armour',NULL,2,5,'no',(SELECT altering_effect_id FROM altering_effect WHERE  (characteristic,value) = ('defence',2))),
    ('orc_bow',NULL,1,5,'no',NULL),
    ('throwing_daggers',NULL,2,5,'no',NULL),
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

-- New Equipement: bow
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('bow','',1,'5','no',NULL);

-- New Equipement: giant_flaming_sword
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('giant_flaming_sword','',0,'0','no',NULL);

-- New Equipement: fiery_lash
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('fiery_lash','',0,'0','no',NULL);

INSERT INTO equipement_has_special_rule (equipement_id,special_rule_id)
	VALUES
		((SELECT equipement_id FROM equipement WHERE name='fiery_lash'),(SELECT special_rule_id FROM special_rule WHERE name='fiery_lash'));

-- New Equipement: mithril_crown
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('mithril_crown','',0,'0','no',NULL);

INSERT INTO equipement_has_special_rule (equipement_id,special_rule_id)
	VALUES
		((SELECT equipement_id FROM equipement WHERE name='mithril_crown'),(SELECT special_rule_id FROM special_rule WHERE name='mithril_crown'));

-- New Equipement: dagger
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('dagger','',1,'5','no',NULL);

-- New Equipement: nenya
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('nenya','This unobtrusive ring is one of the three Elven Rings of power.',0,'0','no',NULL);

INSERT INTO equipement_has_special_rule (equipement_id,special_rule_id)
	VALUES
		((SELECT equipement_id FROM equipement WHERE name='nenya'),(SELECT special_rule_id FROM special_rule WHERE name='nenya'));

-- New Equipement: mirror_of_galadriel
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('mirror_of_galadriel','',0,'0','no',NULL);

INSERT INTO equipement_has_special_rule (equipement_id,special_rule_id)
	VALUES
		((SELECT equipement_id FROM equipement WHERE name='mirror_of_galadriel'),(SELECT special_rule_id FROM special_rule WHERE name='mirror_of_galadriel'));

-- New Equipement: fell_beast
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('fell_beast','',0,'0','no',NULL);

INSERT INTO equipement_has_special_rule (equipement_id,special_rule_id)
	VALUES
		((SELECT equipement_id FROM equipement WHERE name='fell_beast'),(SELECT special_rule_id FROM special_rule WHERE name='feral')),
		((SELECT equipement_id FROM equipement WHERE name='fell_beast'),(SELECT special_rule_id FROM special_rule WHERE name='terror')),
		((SELECT equipement_id FROM equipement WHERE name='fell_beast'),(SELECT special_rule_id FROM special_rule WHERE name='monstrous_charge')),
		((SELECT equipement_id FROM equipement WHERE name='fell_beast'),(SELECT special_rule_id FROM special_rule WHERE name='fly'));

-- New Equipement: armoured_fell_beast
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('armoured_fell_beast','',0,'0','no',NULL);

INSERT INTO equipement_has_special_rule (equipement_id,special_rule_id)
	VALUES
		((SELECT equipement_id FROM equipement WHERE name='armoured_fell_beast'),(SELECT special_rule_id FROM special_rule WHERE name='fly')),
		((SELECT equipement_id FROM equipement WHERE name='armoured_fell_beast'),(SELECT special_rule_id FROM special_rule WHERE name='monstrous_charge')),
		((SELECT equipement_id FROM equipement WHERE name='armoured_fell_beast'),(SELECT special_rule_id FROM special_rule WHERE name='terror')),
		((SELECT equipement_id FROM equipement WHERE name='armoured_fell_beast'),(SELECT special_rule_id FROM special_rule WHERE name='feral'));

-- New Equipement: two-handed_sword
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('two-handed_sword','',1,'5','no',NULL);

-- New Equipement: pick
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('pick','',1,'5','no',NULL);

-- New Equipement: twisted_mass_of_undead
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('twisted_mass_of_undead','',0,'0','no',NULL);

-- New Equipement: banner
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('banner','',0,'0','no',NULL);

INSERT INTO equipement_has_special_rule (equipement_id,special_rule_id)
	VALUES
		((SELECT equipement_id FROM equipement WHERE name='banner'),(SELECT special_rule_id FROM special_rule WHERE name='banners'));

-- New Equipement: two-handed_weapon
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('two-handed_weapon','',1,'5','no',NULL);

-- New Equipement: throwing_spears
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('throwing_spears','',1,'5','no',NULL);

-- New Equipement: troll_chain
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('troll_chain','',0,'0','no',NULL);

INSERT INTO equipement_has_special_rule (equipement_id,special_rule_id)
	VALUES
		((SELECT equipement_id FROM equipement WHERE name='troll_chain'),(SELECT special_rule_id FROM special_rule WHERE name='troll_chain'));

-- New Equipement: hand-and-a-half_hammer
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('hand-and-a-half_hammer','',0,'0','no',NULL);
-- New Equipement: narsil
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('narsil','Forged during the First Age, Narsil is the sword of Elendil. It was with the shards of this sword that the Ring was cut from the hand of Sauron.',0,'0','no',NULL);

INSERT INTO equipement_has_special_rule (equipement_id,special_rule_id)
	VALUES
		((SELECT equipement_id FROM equipement WHERE name='narsil'),(SELECT special_rule_id FROM special_rule WHERE name='narsil'));

-- New Equipement: the_ring
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('the_ring','As long as your force does not contain either Elendil or Anárion, then Isildur may carry The Ring.',0,'0','no',NULL);

-- New Equipement: hand-and-a-half_sword
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('hand-and-a-half_sword','',0,'0','no',NULL);

-- New Equipement: andúril,_flame_of_the_west
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('andúril,_flame_of_the_west','',0,'0','no',NULL);

-- New Equipement: staff_of_power
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('staff_of_power','',0,'0','no',NULL);

INSERT INTO equipement_has_special_rule (equipement_id,special_rule_id)
	VALUES
		((SELECT equipement_id FROM equipement WHERE name='staff_of_power'),(SELECT special_rule_id FROM special_rule WHERE name='staff_of_power'));

-- New Equipement: glamdring
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('glamdring','',0,'0','no',NULL);

-- New Equipement: narya
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('narya','',0,'0','no',NULL);

-- New Equipement: shadowfax
INSERT INTO equipement (name,description,low_cost,high_cost,is_extra,altering_effect_id)
    VALUES
        ('shadowfax','',0,'0','no',NULL);
