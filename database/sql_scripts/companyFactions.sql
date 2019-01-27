
-- ---------------------------------
-- Populating Company Faction
-- ---------------------------------

INSERT INTO company_faction
    (people,name,note)
VALUES 
    ('Mordor','Barad-dûr',NULL),
    ('Mordor','Dol Guldur','Though cunning creatures, Wargs & Spiders have no grasp of tactics or leadership. As such, only creatures of their own species may benefit from their Stand Fast! rolls or benefit from their heroic actions. Wild Wargs may receive two increases to their Strength instead of one.
    Castellans of Dol Guldur are magical constructs bound to the will of Sauron alone and with no care for the living. Although Castellans are treated as Heroes during a scenario, they are not considered Heroes within the Battle Company. They may not be promoted or receive increases to their profiles. In addition, friendly warriors may not benefit from their Stand Fast! ability.'),
    ('Mordor','Minas Morgul','Though they are not above using them to enact their dark purposes, the Black Númenóreans despise the Orcish soldiers of Sauron''s hordes. It is unconscionable that they would ever take orders from an Orc, therefore only Black Númenóreans may become Heroes in a Minas Morgul Battle Company.
    Anytime a Venomblade Knight tries to wound an enemy but rolls a 1, he must reroll the dice. This upgrade costs +1 point.'),
    ('Mordor','Mirkwood','Though cunning creatures, Wargs & Spiders have little grasp of tactics or leadership. As such, only creatures of their own species may benefit from their Stand Fast! rolls or benefit from their heroic actions.
    Wild Wargs and Spiders may receive two increases to their Strength instead of one.
    Hardened Carapace and Tough Hide are considered Armor in all respects for Spiders and Wargs respectively. Similarly, Chitinous Plating and Iron Hide are considered Heavy Armor in all respects for Spiders and Wargs respectively.
    Giant Spiders and Mirkwood Spiders with the Venom-back upgrade must re-roll failed To Wound rolls. This upgrade costs +2 points.'),
    ('Kingdoms of Men','Rohan','Sons of Eorl are held in high esteem, yet they remain aloof from other warriors, choosing instead to hone their blades and minds in preparation for the next battle. Because of this devotion to their craft, they eschew positions of command to commit themselves more fully to the art of cavalry warfare. Sons of Eorl may not be promoted to Heroes.
    All Heroes in a Rohan Battle Company have the Expert Rider Special Rule.'),
    ('Kingdoms of Men','Minas Tirith','With regards to promotions, Ithilien Guard and Rangers of Ithilien are treated as Warriors of Minas Tirith and Rangers of Gondor respectively.'),
    ('Kingdoms of Men','Fiefdoms of Gondor','Though Dol Amroth holds no rule over the other fiefdoms, such is the nobility of their bloodline and reputation for martial prowess that the other fiefs often look to their warriors for counsel in times of war. A Fiefdom of Gondor Battle company may choose a single Knight of Dol Amroth as their Lieutenant model during the initial creation of their company instead of using the basic recruitment list, although it is not required to do so. If chosen, the Knight of Dol Amroth costs 9 Gold.
    Knights of Dol Amroth may not purchase mounts for themselves until they are deemed worthy through a promotion.'),
    ('Kingdoms of Men','Arnor','Arnor Battle Companies may have up to 50% of their warriors armed with bows.'),
    ('Kingdoms of Men','The Last Alliance',NULL),
    ('Kingdoms of Men','Laketown','More of a constabulary than a standing army, the Warriors of Lake-town rely on intimidation and strength of numbers to carry the day. Lake-town Battle Companies may have up to 20 members, of which 6 may be Heroes, rather than the usual limit of 15.'),
    ('The Fallen Realms','Isengard','Though awesome combatants, Feral Urukhai and Uruk-hai Berserkers are so consumed with bloodlust that they do not possess the presence of mind to lead their fellow warriors. As such, Feral Uruk-hai and Uruk-hai Berserkers can never be promoted to heroes.'),
    ('The Fallen Realms','Shadow of Saruman','An unorganized rabble, Shadow of Saruman Battle Companies rely on strength of numbers, rather than discipline or skill at arms. To represent this, Saruman''s Influence Battle Companies may have up to 20 members, of which 6 may be promoted to Heroes. 
    Some players, with a desire to play a certain themed company, may desire to only take Ruffians for a "Scouring of the Shire" themed company. If this is the case, feel free to ignore the options of "Dunlending Warrior" or "Wildman of Dunland" in all respects. However, you may also feel free to keep the units and treat them as different kinds of Ruffians with the same unit entries, such as Dunland "Thug" or Wildman "Brute" or even half-orcs.'),
    ('The Fallen Realms','Rhûn',NULL),
    ('The Fallen Realms','Khand',NULL),
    ('The Fallen Realms','Harad','The Watchers of Kârna are not an unknown sight in the armies of Harad, however, they tend to have their own agendas for marching to war. As such, the Watchers will never assume a role of leadership in a Harad Battle Company, so they may not be promoted to Heroes. 
    Harad Battle Companies may have up to 50% of their warriors armed with bows.'),
    ('The Fallen Realms','Far Harad','The Half Trolls of Far Harad are rightfully feared for their combat prowess. However, their only interest lies in crushing their enemies, rather than tactics or strategy. Because of this blind violence, Half Trolls never rise to leadership positions in a Far Harad battle company, and may not be promoted to Heroes.'),
    ('The Fallen Realms','Umbar','Mad with bloodlust, Corsair Reavers can never rise to positions of leadership with a Corsair battle company. They may not be promoted to Heroes. 
    Umbar was a Númenórean outpost that stayed loyal to Sauron after the fall of their island home. Warriors of Umbar are simply Warriors of Númenor that are aligned with Evil. They can be easily represented by using Warriors of Númenor with the White Tree of Gondor removed.'),
    ('The Free Peoples','Rivendell','Thanks to their incredibly long lives, Elves have a long time to hone their skills in battle. Elven heroes may increase their Fight value to 7, instead of 6 like other races.
    A King''s Guard and King''s Knight are upgrades of the High Elf Warrior and Knight of Rivendell profiles respectively. They have a Fight value of 6/3+ for +1 Point.'),
    ('The Free Peoples','Lothlórien','Thanks to their incredibly long lives, Elves have a long time to hone their skills in battle. Elven heroes may increase their Fight value to 7, instead of 6 like other races.'),
    ('The Free Peoples',"Thranduil's Halls",'Thanks to their incredibly long lives, Elves have a long time to hone their skills in battle. Elven heroes may increase their Fight value to 7, instead of 6 like other races.
    As Wood Elf Sentinels are already veteran warriors completely devoted to their craft, they cannot be promoted to Heroes.'),
    ('The Free Peoples',"Durin's Folk",'As Iron Guard are already veteran warriors devoted to their itinerant lifestyle and craft, they cannot be promoted to Heroes.'),
    ('The Free Peoples','Erebor & Dale',NULL),
    ('The Free Peoples','The Shire','Given their small stature, the Hobbits rely on the old adage that there is safety in numbers. A Shire Battle Company may have up to 25 members, of which, 8 may be Heroes.
    Whenever a Hobbit would roll on the Warrior Advancement Chart, add 1 to the result. Hobbits are made of sterner stuff than it appears!
    Each Shire Battle Company, whether aware of it or not, is protected by the might of the Dúnedain. Shire Battle Companies may have 0-3 Rangers of Arnor as part of their Company at any given time. If included, one of these should be designated as the Lieutenant or one of the Sergeants at the beginning of the campaign.'),
    ('Moria & Angmar','Angmar','Though cunning creatures, Wargs have no grasp of tactics or leadership. As such, only creatures of their own species may benefit from their Stand Fast! rolls or benefit from their heroic actions. Wild Wargs may receive two increases to their Strength instead of one. Stalkers are too distrusted, even by their own kind, to ever amass any sort of following so they may not be promoted to Heroes. Being undead creatures, Spectres may not receive promotions and, therefore, can never become heroes.'),
    ('Moria & Angmar','Misty Mountains','Because of the swarming nature of goblins and their allies, the maximum number of warriors/creatures in a Misty Mountains Battle Company is 25 rather than the usual 15.
    Though cunning creatures, Wargs and Spiders have no grasp of tactics or leadership. As such, only creatures of their own species may benefit from their Stand Fast! rolls or benefit from their heroic actions. Wild Wargs may receive two increases to their Strength instead of one. Warg Marauders may not be promoted in any way and therefore may not become Heroes. In addition, Warg Marauders take up three roster spots towards the Company''s maximum number, although they still only count as one model for game purposes.'),
    ('Moria & Angmar','Mount Gundabad','Hunter Orcs may not purchase Fell Wargs as mounts until they have rolled a 4+ for a promotion. 
    Fell Wargs that have become heroes cannot be given riders, and only other Wargs may benefit from their Stand Fast! rule. Fell Wargs can, however, receive two increases to their Strength instead of one.
    Additionally, though awesome combatants, Gundabad Brawlers are so consumed with bloodlust that they do not possess the presence of mind to lead their fellow warriors. As such, they can never be promoted to Heroes.'),
    ('Moria & Angmar','Goblin Town','Because of the swarming nature of goblins and their allies, the maximum number of warriors/creatures in a Misty Mountains Battle Company is 25 rather than the usual 15.
    A Thrasher Team should be modeled with 2 Goblins on a single 40mm base. Because this represents two Goblins rather than one Heroic individual, Thrasher Teams may not become Heroes.
    Though cunning creatures, Wargs have no grasp of tactics or leadership. As such, only creatures of their own species may benefit from their Stand Fast! rolls or benefit from their heroic actions. Wargs and Fell Wargs may receive two increases to their Strength instead of one.');

-- ---------------------------------
-- Populating Company Faction Has Reinforcement
-- ---------------------------------

-- Angmar 
INSERT INTO company_faction_has_reinforcement
    (company_faction_id,unit_id)
VALUES 
    ((SELECT company_faction.company_faction_id FROM company_faction WHERE company_faction.name='Angmar'),(SELECT unit.unit_id FROM unit WHERE unit.name='angmar_orc_warrior')),
    ((SELECT company_faction.company_faction_id FROM company_faction WHERE company_faction.name='Angmar'),(SELECT unit.unit_id FROM unit WHERE unit.name='wild_warg')),
    -- ((SELECT company_faction.company_faction_id FROM company_faction WHERE company_faction.name='Angmar'),(SELECT unit.unit_id FROM unit WHERE unit.name='barbarian_of_carn_dûm')),
    ((SELECT company_faction.company_faction_id FROM company_faction WHERE company_faction.name='Angmar'),(SELECT unit.unit_id FROM unit WHERE unit.name='dead_marsh_spectre'));

-- Misty Mountains 
INSERT INTO company_faction_has_reinforcement
    (company_faction_id,unit_id)
VALUES 
    ((SELECT company_faction.company_faction_id FROM company_faction WHERE company_faction.name='Misty Mountains'),(SELECT unit.unit_id FROM unit WHERE unit.name='moria_goblin_warrior')),
        -- ((SELECT company_faction.company_faction_id FROM company_faction WHERE company_faction.name='Misty Mountains'),(SELECT unit.unit_id FROM unit WHERE unit.name='giant_spider')),
    -- ((SELECT company_faction.company_faction_id FROM company_faction WHERE company_faction.name='Misty Mountains'),(SELECT unit.unit_id FROM unit WHERE unit.name='warg_marauder')),
    ((SELECT company_faction.company_faction_id FROM company_faction WHERE company_faction.name='Misty Mountains'),(SELECT unit.unit_id FROM unit WHERE unit.name='wild_warg'));


-- ---------------------------------
-- Populating Company Faction Has Unit Promotions
-- ---------------------------------

INSERT INTO company_faction_has_unit_promotions
    (company_faction_id,old_unit_id,new_unit_id,required_equipement_id)
VALUES
-- Angmar
    ((SELECT company_faction.company_faction_id FROM company_faction WHERE company_faction.name='Angmar'),
    (SELECT unit.unit_id FROM unit WHERE unit.name='angmar_orc_warrior'),
    (SELECT unit.unit_id FROM unit WHERE unit.name='angmar_warg_riders'),
    NULL),

    -- ((SELECT company_faction.company_faction_id FROM company_faction WHERE company_faction.name='Angmar'),
    -- (SELECT unit.unit_id FROM unit WHERE unit.name='angmar_orc_warrior'),
    -- (SELECT unit.unit_id FROM unit WHERE unit.name='orc_tracker'),
    -- (SELECT equipement.equipement_id FROM equipement WHERE equipement.name='orc_bow')),

-- Misty Mountains
    ((SELECT company_faction.company_faction_id FROM company_faction WHERE company_faction.name='Misty Mountains'),
    (SELECT unit.unit_id FROM unit WHERE unit.name='moria_goblin_warrior'),
    (SELECT unit.unit_id FROM unit WHERE unit.name='moria_goblin_prowler'),
    NULL),
    ((SELECT company_faction.company_faction_id FROM company_faction WHERE company_faction.name='Misty Mountains'),
    (SELECT unit.unit_id FROM unit WHERE unit.name='moria_goblin_warrior'),
    (SELECT unit.unit_id FROM unit WHERE unit.name='moria_blackshield'),
    NULL);