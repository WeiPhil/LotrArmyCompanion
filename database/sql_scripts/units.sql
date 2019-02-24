-- New Unit: moria_goblin_warrior
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='moria'),
        'moria_goblin_warrior',4,
        5,2,5,3,4,1,1,2,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='moria_goblin_warrior'),(SELECT keyword_id FROM keyword WHERE name='moria')),
		((SELECT unit_id FROM unit WHERE name='moria_goblin_warrior'),(SELECT keyword_id FROM keyword WHERE name='goblin')),
		((SELECT unit_id FROM unit WHERE name='moria_goblin_warrior'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='moria_goblin_warrior'),(SELECT keyword_id FROM keyword WHERE name='warrior'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='moria_goblin_warrior'),(SELECT equipement_id FROM equipement WHERE name='spear'),1),
		((SELECT unit_id FROM unit WHERE name='moria_goblin_warrior'),(SELECT equipement_id FROM equipement WHERE name='shield'),1),
		((SELECT unit_id FROM unit WHERE name='moria_goblin_warrior'),(SELECT equipement_id FROM equipement WHERE name='orc_bow'),1),
		((SELECT unit_id FROM unit WHERE name='moria_goblin_warrior'),(SELECT equipement_id FROM equipement WHERE name='sword'),0),
		((SELECT unit_id FROM unit WHERE name='moria_goblin_warrior'),(SELECT equipement_id FROM equipement WHERE name='armour'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='moria_goblin_warrior'),(SELECT special_rule_id FROM special_rule WHERE name='cave_dweller'));

-- New Unit: the_balrog
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='moria'),
        'the_balrog',350,
        6,10,3,9,9,4,10,7,0,10,0,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='the_balrog'),(SELECT keyword_id FROM keyword WHERE name='hero_of_legend')),
		((SELECT unit_id FROM unit WHERE name='the_balrog'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='the_balrog'),(SELECT keyword_id FROM keyword WHERE name='monster')),
		((SELECT unit_id FROM unit WHERE name='the_balrog'),(SELECT keyword_id FROM keyword WHERE name='spirit'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='the_balrog'),(SELECT equipement_id FROM equipement WHERE name='fiery_lash'),0),
		((SELECT unit_id FROM unit WHERE name='the_balrog'),(SELECT equipement_id FROM equipement WHERE name='giant_flaming_sword'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='the_balrog'),(SELECT special_rule_id FROM special_rule WHERE name='terror')),
		((SELECT unit_id FROM unit WHERE name='the_balrog'),(SELECT special_rule_id FROM special_rule WHERE name='resistant_to_magic')),
		((SELECT unit_id FROM unit WHERE name='the_balrog'),(SELECT special_rule_id FROM special_rule WHERE name='fearless')),
		((SELECT unit_id FROM unit WHERE name='the_balrog'),(SELECT special_rule_id FROM special_rule WHERE name='goblin_mastery')),
		((SELECT unit_id FROM unit WHERE name='the_balrog'),(SELECT special_rule_id FROM special_rule WHERE name='demon_of_the_ancient_world')),
		((SELECT unit_id FROM unit WHERE name='the_balrog'),(SELECT special_rule_id FROM special_rule WHERE name='flame_of_udûn')),
		((SELECT unit_id FROM unit WHERE name='the_balrog'),(SELECT special_rule_id FROM special_rule WHERE name='ancient_evil'));


-- New Unit: grimbold_of_grimslade
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='rohan'),
        'grimbold_of_grimslade',60,
        6,5,4,4,5,2,2,4,3,1,1,
        'If your army includes Grimbold, you may upgrade any numbers of Warriors of Rohan to Helmingas for a cost of +1 point per model. Helmingas are Strength 4, rather than 3.',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='grimbold_of_grimslade'),(SELECT keyword_id FROM keyword WHERE name='rohan')),
		((SELECT unit_id FROM unit WHERE name='grimbold_of_grimslade'),(SELECT keyword_id FROM keyword WHERE name='man')),
		((SELECT unit_id FROM unit WHERE name='grimbold_of_grimslade'),(SELECT keyword_id FROM keyword WHERE name='hero_of_fortitude'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='grimbold_of_grimslade'),(SELECT equipement_id FROM equipement WHERE name='two-handed_axe'),0),
		((SELECT unit_id FROM unit WHERE name='grimbold_of_grimslade'),(SELECT equipement_id FROM equipement WHERE name='armour'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='grimbold_of_grimslade'),(SELECT special_rule_id FROM special_rule WHERE name='mighty_blow'));

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='grimbold_of_grimslade'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_defence'));


-- New Unit: durbûrz_the_goblin_king_of_moria
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='moria'),
        'durbûrz_the_goblin_king_of_moria',70,
        5,4,5,4,6,2,2,4,3,2,2,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='durbûrz_the_goblin_king_of_moria'),(SELECT keyword_id FROM keyword WHERE name='goblin')),
		((SELECT unit_id FROM unit WHERE name='durbûrz_the_goblin_king_of_moria'),(SELECT keyword_id FROM keyword WHERE name='moria')),
		((SELECT unit_id FROM unit WHERE name='durbûrz_the_goblin_king_of_moria'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='durbûrz_the_goblin_king_of_moria'),(SELECT keyword_id FROM keyword WHERE name='hero_of_valor'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='durbûrz_the_goblin_king_of_moria'),(SELECT equipement_id FROM equipement WHERE name='sword'),0),
		((SELECT unit_id FROM unit WHERE name='durbûrz_the_goblin_king_of_moria'),(SELECT equipement_id FROM equipement WHERE name='heavy_armour'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='durbûrz_the_goblin_king_of_moria'),(SELECT special_rule_id FROM special_rule WHERE name='cave_dweller')),
		((SELECT unit_id FROM unit WHERE name='durbûrz_the_goblin_king_of_moria'),(SELECT special_rule_id FROM special_rule WHERE name='iron_fist'));

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='durbûrz_the_goblin_king_of_moria'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_defence')),
		((SELECT unit_id FROM unit WHERE name='durbûrz_the_goblin_king_of_moria'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_strike')),
		((SELECT unit_id FROM unit WHERE name='durbûrz_the_goblin_king_of_moria'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_resolve'));

-- New Unit: grôblog
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='moria'),
        'grôblog',50,
        5,3,5,4,6,2,2,3,3,1,1,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='grôblog'),(SELECT keyword_id FROM keyword WHERE name='moria')),
		((SELECT unit_id FROM unit WHERE name='grôblog'),(SELECT keyword_id FROM keyword WHERE name='goblin')),
		((SELECT unit_id FROM unit WHERE name='grôblog'),(SELECT keyword_id FROM keyword WHERE name='hero_of_fortitude')),
		((SELECT unit_id FROM unit WHERE name='grôblog'),(SELECT keyword_id FROM keyword WHERE name='infantry'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='grôblog'),(SELECT equipement_id FROM equipement WHERE name='mithril_crown'),0),
		((SELECT unit_id FROM unit WHERE name='grôblog'),(SELECT equipement_id FROM equipement WHERE name='sword'),0),
		((SELECT unit_id FROM unit WHERE name='grôblog'),(SELECT equipement_id FROM equipement WHERE name='armour'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='grôblog'),(SELECT special_rule_id FROM special_rule WHERE name='cave_dweller'));

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='grôblog'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_defence')),
		((SELECT unit_id FROM unit WHERE name='grôblog'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_strike'));


-- New Unit: drûzhag_the_beastcaller
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='moria'),
        'drûzhag_the_beastcaller',90,
        5,3,5,3,4,1,2,4,2,5,2,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='drûzhag_the_beastcaller'),(SELECT keyword_id FROM keyword WHERE name='moria')),
		((SELECT unit_id FROM unit WHERE name='drûzhag_the_beastcaller'),(SELECT keyword_id FROM keyword WHERE name='goblin')),
		((SELECT unit_id FROM unit WHERE name='drûzhag_the_beastcaller'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='drûzhag_the_beastcaller'),(SELECT keyword_id FROM keyword WHERE name='hero_of_fortitude'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='drûzhag_the_beastcaller'),(SELECT equipement_id FROM equipement WHERE name='staff'),0),
		((SELECT unit_id FROM unit WHERE name='drûzhag_the_beastcaller'),(SELECT equipement_id FROM equipement WHERE name='dagger'),0),
		((SELECT unit_id FROM unit WHERE name='drûzhag_the_beastcaller'),(SELECT equipement_id FROM equipement WHERE name='armour'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='drûzhag_the_beastcaller'),(SELECT special_rule_id FROM special_rule WHERE name='master_of_the_dark_wild')),
		((SELECT unit_id FROM unit WHERE name='drûzhag_the_beastcaller'),(SELECT special_rule_id FROM special_rule WHERE name='cave_dweller'));

INSERT INTO unit_has_magical_power (unit_id,magical_power_id,`range`,casting)
	VALUES
		((SELECT unit_id FROM unit WHERE name='drûzhag_the_beastcaller'),(SELECT magical_power_id FROM magical_power WHERE name='fury_(x)'),0,3),
		((SELECT unit_id FROM unit WHERE name='drûzhag_the_beastcaller'),(SELECT magical_power_id FROM magical_power WHERE name='enrage_beast'),12,3);

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='drûzhag_the_beastcaller'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_channelling'));


-- New Unit: moria_blackshield
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='moria'),
        'moria_blackshield',8,
        5,2,5,3,6,1,1,3,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='moria_blackshield'),(SELECT keyword_id FROM keyword WHERE name='moria')),
		((SELECT unit_id FROM unit WHERE name='moria_blackshield'),(SELECT keyword_id FROM keyword WHERE name='goblin')),
		((SELECT unit_id FROM unit WHERE name='moria_blackshield'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='moria_blackshield'),(SELECT keyword_id FROM keyword WHERE name='warrior'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='moria_blackshield'),(SELECT equipement_id FROM equipement WHERE name='spear'),1),
		((SELECT unit_id FROM unit WHERE name='moria_blackshield'),(SELECT equipement_id FROM equipement WHERE name='shield'),0),
		((SELECT unit_id FROM unit WHERE name='moria_blackshield'),(SELECT equipement_id FROM equipement WHERE name='sword'),0),
		((SELECT unit_id FROM unit WHERE name='moria_blackshield'),(SELECT equipement_id FROM equipement WHERE name='heavy_armour'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='moria_blackshield'),(SELECT special_rule_id FROM special_rule WHERE name='hatred_(dwarf)')),
		((SELECT unit_id FROM unit WHERE name='moria_blackshield'),(SELECT special_rule_id FROM special_rule WHERE name='cave_dweller'));

-- New Unit: moria_goblin_prowler
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='moria'),
        'moria_goblin_prowler',7,
        5,3,4,3,4,1,1,2,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='moria_goblin_prowler'),(SELECT keyword_id FROM keyword WHERE name='goblin')),
		((SELECT unit_id FROM unit WHERE name='moria_goblin_prowler'),(SELECT keyword_id FROM keyword WHERE name='moria')),
		((SELECT unit_id FROM unit WHERE name='moria_goblin_prowler'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='moria_goblin_prowler'),(SELECT keyword_id FROM keyword WHERE name='warrior'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='moria_goblin_prowler'),(SELECT equipement_id FROM equipement WHERE name='throwing_daggers'),0),
		((SELECT unit_id FROM unit WHERE name='moria_goblin_prowler'),(SELECT equipement_id FROM equipement WHERE name='two-handed_axe'),0),
		((SELECT unit_id FROM unit WHERE name='moria_goblin_prowler'),(SELECT equipement_id FROM equipement WHERE name='armour'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='moria_goblin_prowler'),(SELECT special_rule_id FROM special_rule WHERE name='backstabbers')),
		((SELECT unit_id FROM unit WHERE name='moria_goblin_prowler'),(SELECT special_rule_id FROM special_rule WHERE name='cave_dweller'));

-- New Unit: galadriel
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='lothlórien'),
        'galadriel',130,
        6,6,3,3,3,1,3,7,3,6,3,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='galadriel'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='galadriel'),(SELECT keyword_id FROM keyword WHERE name='lórien')),
		((SELECT unit_id FROM unit WHERE name='galadriel'),(SELECT keyword_id FROM keyword WHERE name='elf')),
		((SELECT unit_id FROM unit WHERE name='galadriel'),(SELECT keyword_id FROM keyword WHERE name='hero_of_legend'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='galadriel'),(SELECT equipement_id FROM equipement WHERE name='mirror_of_galadriel'),25),
		((SELECT unit_id FROM unit WHERE name='galadriel'),(SELECT equipement_id FROM equipement WHERE name='nenya'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='galadriel'),(SELECT special_rule_id FROM special_rule WHERE name='woodland_creature')),
		((SELECT unit_id FROM unit WHERE name='galadriel'),(SELECT special_rule_id FROM special_rule WHERE name='terror'));

INSERT INTO unit_has_magical_power (unit_id,magical_power_id,`range`,casting)
	VALUES
		((SELECT unit_id FROM unit WHERE name='galadriel'),(SELECT magical_power_id FROM magical_power WHERE name='command/compel'),12,4),
		((SELECT unit_id FROM unit WHERE name='galadriel'),(SELECT magical_power_id FROM magical_power WHERE name='immobilise/transfix'),12,3),
		((SELECT unit_id FROM unit WHERE name='galadriel'),(SELECT magical_power_id FROM magical_power WHERE name='blessing_of_the_valar'),12,3),
		((SELECT unit_id FROM unit WHERE name='galadriel'),(SELECT magical_power_id FROM magical_power WHERE name='blinding_light'),0,2);

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='galadriel'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_defence')),
		((SELECT unit_id FROM unit WHERE name='galadriel'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_channelling')),
		((SELECT unit_id FROM unit WHERE name='galadriel'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_resolve'));

-- New Unit: wild_warg_chieftain
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='angmar'),
        'wild_warg_chieftain',80,
        10,5,5,6,5,3,3,4,2,2,1,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='wild_warg_chieftain'),(SELECT keyword_id FROM keyword WHERE name='warg')),
		((SELECT unit_id FROM unit WHERE name='wild_warg_chieftain'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='wild_warg_chieftain'),(SELECT keyword_id FROM keyword WHERE name='hero_of_fortitude'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='wild_warg_chieftain'),(SELECT equipement_id FROM equipement WHERE name='teeth'),0),
		((SELECT unit_id FROM unit WHERE name='wild_warg_chieftain'),(SELECT equipement_id FROM equipement WHERE name='claws'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='wild_warg_chieftain'),(SELECT special_rule_id FROM special_rule WHERE name='packlord')),
		((SELECT unit_id FROM unit WHERE name='wild_warg_chieftain'),(SELECT special_rule_id FROM special_rule WHERE name='terror'));

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='wild_warg_chieftain'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_march')),
		((SELECT unit_id FROM unit WHERE name='wild_warg_chieftain'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_strength'));

-- New Unit: the_tainted
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='angmar'),
        'the_tainted',120,
        6,5,4,4,8,1,1,6,2,14,2,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT keyword_id FROM keyword WHERE name='spirit')),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT keyword_id FROM keyword WHERE name='ringwraith')),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT keyword_id FROM keyword WHERE name='mordor')),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT keyword_id FROM keyword WHERE name='angmar')),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT keyword_id FROM keyword WHERE name='hero_of_valor'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT equipement_id FROM equipement WHERE name='armoured_fell_beast'),70),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT equipement_id FROM equipement WHERE name='fell_beast'),50),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT equipement_id FROM equipement WHERE name='horse'),10),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT equipement_id FROM equipement WHERE name='armoured_horse'),15),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT equipement_id FROM equipement WHERE name='sword'),0),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT equipement_id FROM equipement WHERE name='heavy_armour'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT special_rule_id FROM special_rule WHERE name='seeping_decay')),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT special_rule_id FROM special_rule WHERE name='miasmatic_presence')),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT special_rule_id FROM special_rule WHERE name='will_of_evil')),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT special_rule_id FROM special_rule WHERE name='terror')),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT special_rule_id FROM special_rule WHERE name='harbinger_of_evil'));

INSERT INTO unit_has_magical_power (unit_id,magical_power_id,`range`,casting)
	VALUES
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT magical_power_id FROM magical_power WHERE name='sap_will'),12,5),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT magical_power_id FROM magical_power WHERE name='instill_fear'),3,5),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT magical_power_id FROM magical_power WHERE name='black_dart'),12,5),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT magical_power_id FROM magical_power WHERE name='command/compel'),12,4),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT magical_power_id FROM magical_power WHERE name='immobilise/transfix'),12,3),
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT magical_power_id FROM magical_power WHERE name='drain_courage'),12,2);

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='the_tainted'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_channelling'));

-- New Unit: the_dwimmerlaik
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='angmar'),
        'the_dwimmerlaik',120,
        6,5,4,4,8,1,1,6,0,16,2,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT keyword_id FROM keyword WHERE name='spirit')),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT keyword_id FROM keyword WHERE name='ringwraith')),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT keyword_id FROM keyword WHERE name='mordor')),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT keyword_id FROM keyword WHERE name='angmar')),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT keyword_id FROM keyword WHERE name='hero_of_valor'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT equipement_id FROM equipement WHERE name='armoured_horse'),15),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT equipement_id FROM equipement WHERE name='horse'),10),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT equipement_id FROM equipement WHERE name='fell_beast'),50),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT equipement_id FROM equipement WHERE name='armoured_fell_beast'),70),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT equipement_id FROM equipement WHERE name='two-handed_sword'),0),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT equipement_id FROM equipement WHERE name='heavy_armour'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT special_rule_id FROM special_rule WHERE name='sap_fortitude')),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT special_rule_id FROM special_rule WHERE name='terror')),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT special_rule_id FROM special_rule WHERE name='will_of_evil')),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT special_rule_id FROM special_rule WHERE name='harbinger_of_evil'));

INSERT INTO unit_has_magical_power (unit_id,magical_power_id,`range`,casting)
	VALUES
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT magical_power_id FROM magical_power WHERE name='sap_will'),12,5),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT magical_power_id FROM magical_power WHERE name='instill_fear'),3,5),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT magical_power_id FROM magical_power WHERE name='black_dart'),12,5),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT magical_power_id FROM magical_power WHERE name='command/compel'),12,4),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT magical_power_id FROM magical_power WHERE name='immobilise/transfix'),12,3),
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT magical_power_id FROM magical_power WHERE name='drain_courage'),12,2);

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='the_dwimmerlaik'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_channelling'));

-- New Unit: gûlavhar,_the_terror_of_arnor
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='angmar'),
        'gûlavhar,_the_terror_of_arnor',200,
        6,7,4,8,5,0,4,0,3,3,0,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT keyword_id FROM keyword WHERE name='angmar')),
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT keyword_id FROM keyword WHERE name='monster')),
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT keyword_id FROM keyword WHERE name='spirit')),
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT keyword_id FROM keyword WHERE name='hero_of_valor'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT equipement_id FROM equipement WHERE name='teeth'),0),
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT equipement_id FROM equipement WHERE name='claws'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT special_rule_id FROM special_rule WHERE name='strength_of_will')),
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT special_rule_id FROM special_rule WHERE name='strength_of_body')),
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT special_rule_id FROM special_rule WHERE name='immortal_hunger')),
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT special_rule_id FROM special_rule WHERE name='terror')),
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT special_rule_id FROM special_rule WHERE name='resistant_to_magic')),
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT special_rule_id FROM special_rule WHERE name='monstrous_charge')),
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT special_rule_id FROM special_rule WHERE name='harbinger_of_evil')),
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT special_rule_id FROM special_rule WHERE name='fly'));

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_defence')),
		((SELECT unit_id FROM unit WHERE name='gûlavhar,_the_terror_of_arnor'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_strength'));

-- New Unit: buhrdûr,_troll_chieftain
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='angmar'),
        'buhrdûr,_troll_chieftain',110,
        6,6,4,6,6,3,3,4,3,1,1,
        'Throw Stones (range 12", Strength 8).',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='buhrdûr,_troll_chieftain'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='buhrdûr,_troll_chieftain'),(SELECT keyword_id FROM keyword WHERE name='monster')),
		((SELECT unit_id FROM unit WHERE name='buhrdûr,_troll_chieftain'),(SELECT keyword_id FROM keyword WHERE name='troll')),
		((SELECT unit_id FROM unit WHERE name='buhrdûr,_troll_chieftain'),(SELECT keyword_id FROM keyword WHERE name='angmar')),
		((SELECT unit_id FROM unit WHERE name='buhrdûr,_troll_chieftain'),(SELECT keyword_id FROM keyword WHERE name='hero_of_valor'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='buhrdûr,_troll_chieftain'),(SELECT equipement_id FROM equipement WHERE name='pick'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='buhrdûr,_troll_chieftain'),(SELECT special_rule_id FROM special_rule WHERE name='lead_by_example')),
		((SELECT unit_id FROM unit WHERE name='buhrdûr,_troll_chieftain'),(SELECT special_rule_id FROM special_rule WHERE name='terror')),
		((SELECT unit_id FROM unit WHERE name='buhrdûr,_troll_chieftain'),(SELECT special_rule_id FROM special_rule WHERE name='throw_stones'));

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='buhrdûr,_troll_chieftain'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_strike')),
		((SELECT unit_id FROM unit WHERE name='buhrdûr,_troll_chieftain'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_defence')),
		((SELECT unit_id FROM unit WHERE name='buhrdûr,_troll_chieftain'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_challenge'));

-- New Unit: shade
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='angmar'),
        'shade',100,
        6,1,4,1,8,1,3,1,0,8,0,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='shade'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='shade'),(SELECT keyword_id FROM keyword WHERE name='angmar')),
		((SELECT unit_id FROM unit WHERE name='shade'),(SELECT keyword_id FROM keyword WHERE name='spirit')),
		((SELECT unit_id FROM unit WHERE name='shade'),(SELECT keyword_id FROM keyword WHERE name='hero_of_fortitude'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='shade'),(SELECT equipement_id FROM equipement WHERE name='twisted_mass_of_undead'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='shade'),(SELECT special_rule_id FROM special_rule WHERE name='chill_aura')),
		((SELECT unit_id FROM unit WHERE name='shade'),(SELECT special_rule_id FROM special_rule WHERE name='terror')),
		((SELECT unit_id FROM unit WHERE name='shade'),(SELECT special_rule_id FROM special_rule WHERE name='blades_of_the_dead'));


-- New Unit: barrow-wight
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='angmar'),
        'barrow-wight',50,
        6,3,4,3,7,1,2,6,0,5,0,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='barrow-wight'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='barrow-wight'),(SELECT keyword_id FROM keyword WHERE name='angmar')),
		((SELECT unit_id FROM unit WHERE name='barrow-wight'),(SELECT keyword_id FROM keyword WHERE name='spirit')),
		((SELECT unit_id FROM unit WHERE name='barrow-wight'),(SELECT keyword_id FROM keyword WHERE name='hero_of_fortitude'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='barrow-wight'),(SELECT equipement_id FROM equipement WHERE name='sword'),0),
		((SELECT unit_id FROM unit WHERE name='barrow-wight'),(SELECT equipement_id FROM equipement WHERE name='heavy_armour'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='barrow-wight'),(SELECT special_rule_id FROM special_rule WHERE name='terror')),
		((SELECT unit_id FROM unit WHERE name='barrow-wight'),(SELECT special_rule_id FROM special_rule WHERE name='blades_of_the_dead'));

INSERT INTO unit_has_magical_power (unit_id,magical_power_id,`range`,casting)
	VALUES
		((SELECT unit_id FROM unit WHERE name='barrow-wight'),(SELECT magical_power_id FROM magical_power WHERE name='paralyse'),6,4);

-- New Unit: angmar_orc_captain
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='angmar'),
        'angmar_orc_captain',40,
        6,4,5,4,5,2,2,3,2,1,1,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='angmar_orc_captain'),(SELECT keyword_id FROM keyword WHERE name='angmar')),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_captain'),(SELECT keyword_id FROM keyword WHERE name='orc')),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_captain'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_captain'),(SELECT keyword_id FROM keyword WHERE name='hero_of_fortitude'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='angmar_orc_captain'),(SELECT equipement_id FROM equipement WHERE name='shield'),5),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_captain'),(SELECT equipement_id FROM equipement WHERE name='orc_bow'),5),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_captain'),(SELECT equipement_id FROM equipement WHERE name='warg'),10),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_captain'),(SELECT equipement_id FROM equipement WHERE name='pick'),0),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_captain'),(SELECT equipement_id FROM equipement WHERE name='armour'),0),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_captain'),(SELECT equipement_id FROM equipement WHERE name='sword'),0);

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='angmar_orc_captain'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_march'));

-- New Unit: angmar_orc_shaman
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='angmar'),
        'angmar_orc_shaman',50,
        6,3,5,3,5,1,2,3,1,3,1,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='angmar_orc_shaman'),(SELECT keyword_id FROM keyword WHERE name='minor_hero')),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_shaman'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_shaman'),(SELECT keyword_id FROM keyword WHERE name='angmar')),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_shaman'),(SELECT keyword_id FROM keyword WHERE name='orc'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='angmar_orc_shaman'),(SELECT equipement_id FROM equipement WHERE name='warg'),10),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_shaman'),(SELECT equipement_id FROM equipement WHERE name='spear'),0),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_shaman'),(SELECT equipement_id FROM equipement WHERE name='heavy_armour'),0),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_shaman'),(SELECT equipement_id FROM equipement WHERE name='dagger'),0);

INSERT INTO unit_has_magical_power (unit_id,magical_power_id,`range`,casting)
	VALUES
		((SELECT unit_id FROM unit WHERE name='angmar_orc_shaman'),(SELECT magical_power_id FROM magical_power WHERE name='instill_fear'),3,5),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_shaman'),(SELECT magical_power_id FROM magical_power WHERE name='wither'),12,3);

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='angmar_orc_shaman'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_channelling'));

-- New Unit: angmar_orc_warrior
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='angmar'),
        'angmar_orc_warrior',5,
        6,3,5,3,4,1,1,2,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='angmar_orc_warrior'),(SELECT keyword_id FROM keyword WHERE name='angmar')),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_warrior'),(SELECT keyword_id FROM keyword WHERE name='orc')),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_warrior'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_warrior'),(SELECT keyword_id FROM keyword WHERE name='warrior'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='angmar_orc_warrior'),(SELECT equipement_id FROM equipement WHERE name='two-handed_weapon'),1),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_warrior'),(SELECT equipement_id FROM equipement WHERE name='spear'),1),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_warrior'),(SELECT equipement_id FROM equipement WHERE name='shield'),1),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_warrior'),(SELECT equipement_id FROM equipement WHERE name='orc_bow'),1),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_warrior'),(SELECT equipement_id FROM equipement WHERE name='banner'),25),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_warrior'),(SELECT equipement_id FROM equipement WHERE name='pick'),0),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_warrior'),(SELECT equipement_id FROM equipement WHERE name='sword'),0),
		((SELECT unit_id FROM unit WHERE name='angmar_orc_warrior'),(SELECT equipement_id FROM equipement WHERE name='armour'),0);

-- New Unit: angmar_warg_riders
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='angmar'),
        'angmar_warg_riders',11,
        6,3,5,3,4,1,1,2,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='angmar_warg_riders'),(SELECT keyword_id FROM keyword WHERE name='angmar')),
		((SELECT unit_id FROM unit WHERE name='angmar_warg_riders'),(SELECT keyword_id FROM keyword WHERE name='orc')),
		((SELECT unit_id FROM unit WHERE name='angmar_warg_riders'),(SELECT keyword_id FROM keyword WHERE name='warrior')),
		((SELECT unit_id FROM unit WHERE name='angmar_warg_riders'),(SELECT keyword_id FROM keyword WHERE name='cavalry'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='angmar_warg_riders'),(SELECT equipement_id FROM equipement WHERE name='throwing_spears'),1),
		((SELECT unit_id FROM unit WHERE name='angmar_warg_riders'),(SELECT equipement_id FROM equipement WHERE name='banner'),25),
		((SELECT unit_id FROM unit WHERE name='angmar_warg_riders'),(SELECT equipement_id FROM equipement WHERE name='orc_bow'),1),
		((SELECT unit_id FROM unit WHERE name='angmar_warg_riders'),(SELECT equipement_id FROM equipement WHERE name='shield'),1),
		((SELECT unit_id FROM unit WHERE name='angmar_warg_riders'),(SELECT equipement_id FROM equipement WHERE name='warg'),0),
		((SELECT unit_id FROM unit WHERE name='angmar_warg_riders'),(SELECT equipement_id FROM equipement WHERE name='armour'),0),
		((SELECT unit_id FROM unit WHERE name='angmar_warg_riders'),(SELECT equipement_id FROM equipement WHERE name='sword'),0);

-- New Unit: cave_troll
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='angmar'),
        'cave_troll',75,
        6,6,5,6,6,3,3,3,
        'Can''t equip Spear and Hammer at the same time. Throw Stones (range 12", Strength 8).',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='cave_troll'),(SELECT keyword_id FROM keyword WHERE name='warrior')),
		((SELECT unit_id FROM unit WHERE name='cave_troll'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='cave_troll'),(SELECT keyword_id FROM keyword WHERE name='troll')),
		((SELECT unit_id FROM unit WHERE name='cave_troll'),(SELECT keyword_id FROM keyword WHERE name='monster'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='cave_troll'),(SELECT equipement_id FROM equipement WHERE name='hand-and-a-half_hammer'),5),
		((SELECT unit_id FROM unit WHERE name='cave_troll'),(SELECT equipement_id FROM equipement WHERE name='troll_chain'),5),
		((SELECT unit_id FROM unit WHERE name='cave_troll'),(SELECT equipement_id FROM equipement WHERE name='spear'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='cave_troll'),(SELECT special_rule_id FROM special_rule WHERE name='throw_stones')),
		((SELECT unit_id FROM unit WHERE name='cave_troll'),(SELECT special_rule_id FROM special_rule WHERE name='terror')),
		((SELECT unit_id FROM unit WHERE name='cave_troll'),(SELECT special_rule_id FROM special_rule WHERE name='burly'));

-- New Unit: dead_marsh_spectre
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='angmar'),
        'dead_marsh_spectre',15,
        6,2,4,3,5,1,1,6,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='dead_marsh_spectre'),(SELECT keyword_id FROM keyword WHERE name='spirit')),
		((SELECT unit_id FROM unit WHERE name='dead_marsh_spectre'),(SELECT keyword_id FROM keyword WHERE name='angmar')),
		((SELECT unit_id FROM unit WHERE name='dead_marsh_spectre'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='dead_marsh_spectre'),(SELECT keyword_id FROM keyword WHERE name='warrior'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='dead_marsh_spectre'),(SELECT equipement_id FROM equipement WHERE name='heavy_armour'),0),
		((SELECT unit_id FROM unit WHERE name='dead_marsh_spectre'),(SELECT equipement_id FROM equipement WHERE name='sword'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='dead_marsh_spectre'),(SELECT special_rule_id FROM special_rule WHERE name='a_fell_light_is_in_them')),
		((SELECT unit_id FROM unit WHERE name='dead_marsh_spectre'),(SELECT special_rule_id FROM special_rule WHERE name='terror')),
		((SELECT unit_id FROM unit WHERE name='dead_marsh_spectre'),(SELECT special_rule_id FROM special_rule WHERE name='blades_of_the_dead'));

-- New Unit: wild_warg
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,description,image_path)
    VALUES
        ((SELECT faction_id FROM faction WHERE name='angmar'),
        'wild_warg',7,
        10,3,5,4,4,1,1,2,
        '',
        'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='wild_warg'),(SELECT keyword_id FROM keyword WHERE name='warg')),
		((SELECT unit_id FROM unit WHERE name='wild_warg'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='wild_warg'),(SELECT keyword_id FROM keyword WHERE name='warrior'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='wild_warg'),(SELECT equipement_id FROM equipement WHERE name='teeth'),0),
		((SELECT unit_id FROM unit WHERE name='wild_warg'),(SELECT equipement_id FROM equipement WHERE name='claws'),0);

-- New Unit: elendil,_high_king_of_gondor_and_arnor
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
        VALUES
            ((SELECT faction_id FROM faction WHERE name='númenor'),
            'elendil,_high_king_of_gondor_and_arnor',185,
            6,7,4,5,7,3,3,6,3,3,1,
            '',
            'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='elendil,_high_king_of_gondor_and_arnor'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='elendil,_high_king_of_gondor_and_arnor'),(SELECT keyword_id FROM keyword WHERE name='númenor')),
		((SELECT unit_id FROM unit WHERE name='elendil,_high_king_of_gondor_and_arnor'),(SELECT keyword_id FROM keyword WHERE name='man')),
		((SELECT unit_id FROM unit WHERE name='elendil,_high_king_of_gondor_and_arnor'),(SELECT keyword_id FROM keyword WHERE name='hero_of_legend'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='elendil,_high_king_of_gondor_and_arnor'),(SELECT equipement_id FROM equipement WHERE name='shield'),5),
		((SELECT unit_id FROM unit WHERE name='elendil,_high_king_of_gondor_and_arnor'),(SELECT equipement_id FROM equipement WHERE name='horse'),10),
		((SELECT unit_id FROM unit WHERE name='elendil,_high_king_of_gondor_and_arnor'),(SELECT equipement_id FROM equipement WHERE name='narsil'),0),
		((SELECT unit_id FROM unit WHERE name='elendil,_high_king_of_gondor_and_arnor'),(SELECT equipement_id FROM equipement WHERE name='heavy_armour'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='elendil,_high_king_of_gondor_and_arnor'),(SELECT special_rule_id FROM special_rule WHERE name='unbending_resolve')),
		((SELECT unit_id FROM unit WHERE name='elendil,_high_king_of_gondor_and_arnor'),(SELECT special_rule_id FROM special_rule WHERE name='high_king_of_gondor_and_arnor'));

-- New Unit: isildur
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
        VALUES
            ((SELECT faction_id FROM faction WHERE name='númenor'),
            'isildur',120,
            6,6,4,5,7,3,3,6,3,2,2,
            '',
            'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='isildur'),(SELECT keyword_id FROM keyword WHERE name='númenor')),
		((SELECT unit_id FROM unit WHERE name='isildur'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='isildur'),(SELECT keyword_id FROM keyword WHERE name='man')),
		((SELECT unit_id FROM unit WHERE name='isildur'),(SELECT keyword_id FROM keyword WHERE name='hero_of_valor'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='isildur'),(SELECT equipement_id FROM equipement WHERE name='shield'),5),
		((SELECT unit_id FROM unit WHERE name='isildur'),(SELECT equipement_id FROM equipement WHERE name='the_ring'),0),
		((SELECT unit_id FROM unit WHERE name='isildur'),(SELECT equipement_id FROM equipement WHERE name='horse'),10),
		((SELECT unit_id FROM unit WHERE name='isildur'),(SELECT equipement_id FROM equipement WHERE name='heavy_armour'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='isildur'),(SELECT special_rule_id FROM special_rule WHERE name='blood_of_númenor'));

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='isildur'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_challenge')),
		((SELECT unit_id FROM unit WHERE name='isildur'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_strength')),
		((SELECT unit_id FROM unit WHERE name='isildur'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_defence')),
		((SELECT unit_id FROM unit WHERE name='isildur'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_strike'));


-- New Unit: captain_of_númenor
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
        VALUES
            ((SELECT faction_id FROM faction WHERE name='númenor'),
            'captain_of_númenor',50,
            6,5,4,4,5,2,2,4,2,1,1,
            '',
            'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='captain_of_númenor'),(SELECT keyword_id FROM keyword WHERE name='númenor')),
		((SELECT unit_id FROM unit WHERE name='captain_of_númenor'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='captain_of_númenor'),(SELECT keyword_id FROM keyword WHERE name='man')),
		((SELECT unit_id FROM unit WHERE name='captain_of_númenor'),(SELECT keyword_id FROM keyword WHERE name='hero_of_fortitude'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='captain_of_númenor'),(SELECT equipement_id FROM equipement WHERE name='horse'),10),
		((SELECT unit_id FROM unit WHERE name='captain_of_númenor'),(SELECT equipement_id FROM equipement WHERE name='shield'),5),
		((SELECT unit_id FROM unit WHERE name='captain_of_númenor'),(SELECT equipement_id FROM equipement WHERE name='heavy_armour'),5),
		((SELECT unit_id FROM unit WHERE name='captain_of_númenor'),(SELECT equipement_id FROM equipement WHERE name='bow'),5),
		((SELECT unit_id FROM unit WHERE name='captain_of_númenor'),(SELECT equipement_id FROM equipement WHERE name='armour'),0),
		((SELECT unit_id FROM unit WHERE name='captain_of_númenor'),(SELECT equipement_id FROM equipement WHERE name='sword'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='captain_of_númenor'),(SELECT special_rule_id FROM special_rule WHERE name='blood_of_númenor'));

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='captain_of_númenor'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_march'));

-- New Unit: warrior_of_númenor
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,description,image_path)
        VALUES
            ((SELECT faction_id FROM faction WHERE name='númenor'),
            'warrior_of_númenor',8,
            6,4,4,4,4,1,1,3,
            '',
            'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='warrior_of_númenor'),(SELECT keyword_id FROM keyword WHERE name='man')),
		((SELECT unit_id FROM unit WHERE name='warrior_of_númenor'),(SELECT keyword_id FROM keyword WHERE name='númenor')),
		((SELECT unit_id FROM unit WHERE name='warrior_of_númenor'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='warrior_of_númenor'),(SELECT keyword_id FROM keyword WHERE name='warrior'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='warrior_of_númenor'),(SELECT equipement_id FROM equipement WHERE name='bow'),1),
		((SELECT unit_id FROM unit WHERE name='warrior_of_númenor'),(SELECT equipement_id FROM equipement WHERE name='spear'),1),
		((SELECT unit_id FROM unit WHERE name='warrior_of_númenor'),(SELECT equipement_id FROM equipement WHERE name='shield'),1),
		((SELECT unit_id FROM unit WHERE name='warrior_of_númenor'),(SELECT equipement_id FROM equipement WHERE name='banner'),25),
		((SELECT unit_id FROM unit WHERE name='warrior_of_númenor'),(SELECT equipement_id FROM equipement WHERE name='armour'),0),
		((SELECT unit_id FROM unit WHERE name='warrior_of_númenor'),(SELECT equipement_id FROM equipement WHERE name='sword'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='warrior_of_númenor'),(SELECT special_rule_id FROM special_rule WHERE name='blood_of_númenor'));

-- New Unit: aragorn,_king_elessar
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
        VALUES
            ((SELECT faction_id FROM faction WHERE name='minas_tirith'),
            'aragorn,_king_elessar',225,
            6,6,3,4,7,3,3,6,3,3,3,
            '',
            'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT keyword_id FROM keyword WHERE name='gondor')),
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT keyword_id FROM keyword WHERE name='man')),
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT keyword_id FROM keyword WHERE name='hero_of_legend'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT equipement_id FROM equipement WHERE name='armoured_horse'),15),
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT equipement_id FROM equipement WHERE name='andúril,_flame_of_the_west'),0),
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT equipement_id FROM equipement WHERE name='heavy_armour'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT special_rule_id FROM special_rule WHERE name='stand_men_of_the_west!')),
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT special_rule_id FROM special_rule WHERE name='horse_lord')),
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT special_rule_id FROM special_rule WHERE name='mighty_hero'));

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_challenge')),
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_strength')),
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_defence')),
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_strike')),
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_march')),
		((SELECT unit_id FROM unit WHERE name='aragorn,_king_elessar'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_resolve'));


-- New Unit: gandalf_the_white
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
        VALUES
            ((SELECT faction_id FROM faction WHERE name='minas_tirith'),
            'gandalf_the_white',220,
            6,5,4,4,6,2,3,7,3,6,3,
            '',
            'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT keyword_id FROM keyword WHERE name='wizard')),
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT keyword_id FROM keyword WHERE name='hero_of_valor'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT equipement_id FROM equipement WHERE name='shadowfax'),20),
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT equipement_id FROM equipement WHERE name='narya'),0),
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT equipement_id FROM equipement WHERE name='glamdring'),0),
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT equipement_id FROM equipement WHERE name='staff_of_power'),0);

INSERT INTO unit_has_magical_power (unit_id,magical_power_id,`range`,casting)
	VALUES
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT magical_power_id FROM magical_power WHERE name='your_staff_is_broken'),12,4),
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT magical_power_id FROM magical_power WHERE name='sorcerous_blast'),12,4),
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT magical_power_id FROM magical_power WHERE name='banishment'),12,4),
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT magical_power_id FROM magical_power WHERE name='strengthen_will'),12,3),
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT magical_power_id FROM magical_power WHERE name='fortify_spirit'),12,3),
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT magical_power_id FROM magical_power WHERE name='command/compel'),12,3),
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT magical_power_id FROM magical_power WHERE name='terrifying_aura'),0,2),
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT magical_power_id FROM magical_power WHERE name='immobilise/transfix'),12,2),
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT magical_power_id FROM magical_power WHERE name='blinding_light'),0,2);

INSERT INTO unit_has_heroic_action (unit_id,heroic_action_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_strike')),
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_channelling')),
		((SELECT unit_id FROM unit WHERE name='gandalf_the_white'),(SELECT heroic_action_id FROM heroic_action WHERE name='heroic_resolve'));


-- New Unit: denethor,_steward_of_gondor
INSERT INTO unit (faction_id,name,points,move,fight,shoot,strength,defence,attacks,wounds,courage,might,will,fate,description,image_path)
        VALUES
            ((SELECT faction_id FROM faction WHERE name='minas_tirith'),
            'denethor,_steward_of_gondor',35,
            6,5,4,4,5,2,2,5,0,3,0,
            '',
            'tempCardBackground2.jpg');

INSERT INTO unit_has_keyword (unit_id,keyword_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='denethor,_steward_of_gondor'),(SELECT keyword_id FROM keyword WHERE name='gondor')),
		((SELECT unit_id FROM unit WHERE name='denethor,_steward_of_gondor'),(SELECT keyword_id FROM keyword WHERE name='man')),
		((SELECT unit_id FROM unit WHERE name='denethor,_steward_of_gondor'),(SELECT keyword_id FROM keyword WHERE name='infantry')),
		((SELECT unit_id FROM unit WHERE name='denethor,_steward_of_gondor'),(SELECT keyword_id FROM keyword WHERE name='hero_of_valor'));

INSERT INTO unit_has_equipement (unit_id,equipement_id,points)
	VALUES
		((SELECT unit_id FROM unit WHERE name='denethor,_steward_of_gondor'),(SELECT equipement_id FROM equipement WHERE name='armour'),0),
		((SELECT unit_id FROM unit WHERE name='denethor,_steward_of_gondor'),(SELECT equipement_id FROM equipement WHERE name='sword'),0);

INSERT INTO unit_has_special_rule (unit_id,special_rule_id)
	VALUES
		((SELECT unit_id FROM unit WHERE name='denethor,_steward_of_gondor'),(SELECT special_rule_id FROM special_rule WHERE name='broken_mind')),
		((SELECT unit_id FROM unit WHERE name='denethor,_steward_of_gondor'),(SELECT special_rule_id FROM special_rule WHERE name='"the_rule_of_gondor_is_mine,_and_no_other''s!"'));
