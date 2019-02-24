
-- New Special Rule: ancient_evil
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('ancient_evil','passive',
         'An enemy model within 18" of this model suffers a -1 penalty to it''s Courage. Note, this is not cumulative with other similar penalties such as those provided by Goblin Drums, The Harbinger of Evil Special rule and so on.',
         'basic');

-- New Special Rule: cave_dweller
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('cave_dweller','active',
         'A model with this special rule adds 1 to all Jump, Leap and Climb tests. They also suffer no penalties for fighting in the dark.',
         'basic');

-- New Special Rule: fiery_lash
INSERT INTO special_rule (name,type,description,origin,is_weapon_rule)
    VALUES
        ('fiery_lash','active',
         'This is a throwing weapon with a range of 8" and a Strength of 7. Additionnally, a model that is hit by this weapon and not slain is dragged directly towards and into base contact with the Balrog, even over intervening models or terrain. If the model cannot be placed where it should be placed, instead place it in base contact with the Balrog as close as possible to the position it should have been in. If, for wathever reason, the model cannot be placed anywhere in base contact, then it is not moved at all.',
         'basic','yes');

-- New Special Rule: flame_of_udûn
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('flame_of_udûn','passive',
         'The Balrog is never considered to be unarmed and any model that suffers a Wound from the Balrog''s Strikes (even if it is subsequently saved by Fate) and not slain must roll a D6. On a 6, the model suffers the Set Ablaze special rule. Additionnally, the Balrog is immune to any fire-based attacks or special rules, such as a Dragon''s Breath Fire or the Set Ablaze special rule.',
         'basic');

-- New Special Rule: demon_of_the_ancient_world
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('demon_of_the_ancient_world','passive',
         'The Balrog may call a Heroic Combat each turn without the need to expend a point of Might. Additionnally, special rules and Strikes that would slay the Balrog instantly (such as Drain Soul or a Morgul blade) will only inflict half of the Balrog''s starting Wounds rather than all of them.',
         'basic');

-- New Special Rule: goblin_mastery
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('goblin_mastery','passive',
         'Friendly Moria Goblin models within 12" of the Balrog automatically pass Courage tests.',
         'basic');

-- New Special Rule: fearless
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('fearless','passive',
         'This model automatically passes any Courage test it is required to make.',
         'basic');

-- New Special Rule: resistant_to_magic
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('resistant_to_magic','passive',
         'If this model is targeted by a Magical Power, it may use an additional ''free'' dice when it makes a Resist test, even if it has no Will remaining or decides not to use any Will points from its store.',
         'basic');

-- New Special Rule: terror
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('terror','passive',
         'Should a model wish to Charge this model, it must first take a Courage test before it moves. If the test is passed, the model may Charge as normal. If the test is failed, the model does not Charge and may not move at all this turn.
Sometimes, a model will only cause Terror in certain enemies. In these instances, the creatures that are affected are clearly listed, and only those models need to make a Courage test before charging this model. For example, a model with the Terror (Orc) will cause Terror in all Orc models.',
         'basic');

-- New Special Rule: backstabbers
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('backstabbers','active',
         'This model receives +1 to their To Wound rolls when making Strikes against a Trapped model. This bonus is cumulative with  other bonuses, such as using a two-handed weapon.',
         'basic');

-- New Special Rule: bane_of_kings/venom
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('bane_of_kings/venom','active',
         'This model must re-roll all failed To Wound rolls when making Strikes in close combat.',
         'basic');

-- New Special Rule: bane_weapons
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('bane_weapons','active',
         'Bane weapons cause D3 Wounds rather than 1, per successful Strike, on specific races – the race in question will be presented as Xbane, where X is the race in question. For example, a model with the Orcbane special rule will cause D3 Wounds per successful Strike against models with the Orc keyword.',
         'basic');

-- New Special Rule: blades_of_the_dead
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('blades_of_the_dead','active',
         'When determining what number models with this special rule need To Wound their opponents, use their opponent’s Courage rather than its Defence on the Wound chart. Models with this special rule cannot use Special Strikes.',
         'basic');

-- New Special Rule: blood_and_glory
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('blood_and_glory','active',
         'If this model kills an enemy Hero model in a Fight, they immediately regain a single point of Might spent earlier in the battle.',
         'basic');

-- New Special Rule: bodyguard
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('bodyguard','active',
         'All Warrior and Hero models from the same army list with this special rule will automatically Bodyguard the Hero from the same army list with the highest Heroic Tier. If there is more than one Hero with the highest Heroic Tier, the controlling player may choose. As long as the bodyguarded model is alive on the battlefield, this model passes all Courage tests.
Models that are part of an allied contingent must select a model from their own army list.',
         'basic');

-- New Special Rule: burly
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('burly','passive',
         'When fighting with a two-handed weapon, a model with this special rule does not suffer the -1 penalty to their Duel roll.
Additionally, Burly models may carry a Heavy Object and move their full distance.',
         'basic');

-- New Special Rule: expert_rider
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('expert_rider','active',
         'Whilst mounted, an Expert Rider may re-roll the dice when making Jump, Swim and Thrown Rider tests.
While mounted, a model carrying both a shield and a bow will still receive the +1 Defence bonus for being armed with a shield. If the model dismounts, they will lose this bonus.
Additionally, an Expert Rider can pick up Light Objects without having to dismount.',
         'basic');

-- New Special Rule: expert_shot
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('expert_shot','active',
         'A model with this special rule may fire twice in the Shoot phase. These shots are resolved one at a time, meaning that the shooter can target the same model twice or two different models, once each, if they wish.',
         'basic');

-- New Special Rule: fell_sight
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('fell_sight','passive',
         'A model with this special rule does not need Line of Sight to be able to Charge.
Additionally, they may target models with the Stalk Unseen special rule with no penalty.',
         'basic');

-- New Special Rule: fleetfoot
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('fleetfoot','active',
         'A model that has this special rule, and the Woodland Creature special rule, will also apply the effects of Woodland Creature to their mount, so the whole model treats woodland terrain as clear terrain for the purposes of movement.',
         'basic');

-- New Special Rule: fly
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('fly','active',
         'This model may ignore all intervening models and terrain as it moves – flying over buildings, woods and so on. The model may not end its movement within woods or upon any terrain that its base will not safely balance upon (flat rocks, hills and the like are fine, but don’t try to perch your model precariously upon trees, sloped roofs, and so on). When flying, a model may move up to 12". A model with this special rule may still choose to use their normal Move value if they wish, however, they will gain none of the benefits of the Fly special rule if they move in this way. If a model with the Fly special rule walks into a wood, they cannot use the Fly special rule again until they have fully left the wood.
Furthermore, a model with this special rule may pass ''over'' enemy Control Zones without charging the model – as long as they end their move outside of the Control Zone.',
         'basic');

-- New Special Rule: harbinger_of_evil
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('harbinger_of_evil','passive',
         'An enemy model within 12" of this model suffers a -1 penalty to its Courage. Note, this is not cumulative with other similar penalties such as those provided by Goblin Drums, the Ancient Evil special rule, and so on.',
         'basic');

-- New Special Rule: horse_lord
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('horse_lord','passive',
         'Whilst this model is mounted, they may choose to expend their own Fate points to prevent Wounds caused to their mount.',
         'basic');

-- New Special Rule: master_of_battle
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('master_of_battle','active',
         'Whenever an enemy Hero attempts a Heroic Action within 6" of a model with this special rule, this model may call the same Heroic Action without spending Might, even if they would not usually have access to it.
Sometimes a model with this special rule will have a number after the rule in brackets, e.g., Master of Battle (5+). In this situation, whenever an enemy Hero attempts a Heroic Action within 6" of a model with this special rule, roll a D6. If the dice score equals or beats the number after the special rule, this model may call the same Heroic Action without spending Might – even if they would not normally be able to call the same Heroic Action.',
         'basic');

-- New Special Rule: mighty_blow
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('mighty_blow','active',
         'For each Strike that successfully Wounds in close combat, this model inflicts 2 Wounds rather than 1.',
         'basic');

-- New Special Rule: mighty_hero
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('mighty_hero','passive',
         'A model with this special rule may expend 1 point of Might each turn without reducing their own store of Might.',
         'basic');

-- New Special Rule: monstrous_charge
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('monstrous_charge','active',
         'If a model with this special rule charges into combat, it will gain the Knock to the Ground and Extra Attack bonuses as if it were Cavalry, with a couple of exceptions:
This model will Knock to the Ground any model that it Charges, including Cavalry or Monster models, with a lower Strength value than it, even if the charged model has a Strength of 6 or higher. The rider of a Cavalry model will automatically suffer the Knocked Flying result for its Thrown Rider test.
Additionally, this model will still get the Extra Attack bonus if it Charges, or is subsequently charged by, Cavalry or another model with this special rule.
If a model with this special rule is a Cavalry model, the mount will count as being In The Way of its rider, except that the rider will only be hit on a 5-6; a roll of 1-4 will hit the mount.',
         'basic');

-- New Special Rule: mountain_dweller
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('mountain_dweller','active',
         'Mountain Dwellers may re-roll any Jump, Leap and Climb tests. In addition, they may move through rocky areas that are classified as difficult terrain as if they were open ground.',
         'basic');

-- New Special Rule: poisoned_weapons
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('poisoned_weapons','active',
         'Poisoned weapons must re-roll To Wound rolls of a 1 when that weapon is being used. The weapon that is coated in poison, and therefore benefits from this rule, will be listed in the model’s profile. For example, a model with the Poisoned Sword special rule will re-roll all To Wound rolls of 1 when using their sword. A model with the Poisoned Arrows special rule will re-roll To Wound rolls of a 1 when firing their bow.',
         'basic');

-- New Special Rule: set_ablaze
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('set_ablaze','passive',
         'A model may be set ablaze through a number of means. When this happens, the model immediately suffers one Strength 9 hit. If the model survives, it will suffer a further one Strength 5 Hit in each End phase until the blaze is extinguished.
To extinguish the blaze, the model must either lie down and then crawl 1", or enter a water feature, at which point the blaze is immediately put out.',
         'basic');

-- New Special Rule: shieldwall
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('shieldwall','active',
         'If this model is armed with a shield, whilst in base contact with two or more non-Prone models with this special rule that are armed with a shield, this model gains a bonus of +1 to its Defence. This bonus is only available whilst on foot.',
         'basic');

-- New Special Rule: stalk_unseen
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('stalk_unseen','passive',
         'If a model with this special rule is partially concealed from view by a piece of terrain, they cannot be seen at all at distances of more than 6" – they appear to melt into the background. This means that enemies cannot Charge, Shoot or target them with Magical Powers or special rules at ranges of greater than 6", unless they have a completely clear view of the target.
If the model is riding a mount, Stalk Unseen has no effect.',
         'basic');

-- New Special Rule: survival_instinct
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('survival_instinct','active',
         'Each time a model with this special rule suffers a Wound, it must take a Courage test. If the test is failed then the model flees the battlefield and counts as a casualty. This is an exception to the usual rules for taking multiple Courage tests in a turn.',
         'basic');

-- New Special Rule: swift_movement
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('swift_movement','active',
         'A model with this special rule can climb on any surface, regardless of angle. They can therefore move at full speed over any type of difficult terrain and ignore all obstacles except for water features and gaps such as chasms, ditches and other spaces, which they have to jump as normal. The model must be able to balance safely upon wherever it finishes its movement – no spiders finishing upside down, for example!',
         'basic');

-- New Special Rule: sworn_protector
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('sworn_protector','active',
         'Models with this special rule will have a specific model in brackets after the special rule. Whilst the named model is alive and on the battlefield, this model passes all Courage tests.',
         'basic');

-- New Special Rule: throw_stones
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('throw_stones','active',
         'If this model does not move at all during the Move phase, then in the Shoot phase it may make a shooting attack with the Strength and range specified in the model’s profile.',
         'basic');

-- New Special Rule: unyielding_combat_stance
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('unyielding_combat_stance','active',
         'If a model with this special rule is knocked Prone, roll a D6. On a 4+, this model keeps their footing and is not knocked Prone. If this model was mounted when knocked Prone, and passes the roll to keep their footing, they will stay on their feet but they will still be separated from their mount. This model may still make this roll even if it automatically suffers the Knocked Flying result and, if the roll is successful, will not suffer any of its effects.',
         'basic');

-- New Special Rule: will_of_evil
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('will_of_evil','passive',
         'This model must give up 1 point of Will at the end of the Fight phase if it has been involved in one or more Fights that turn. Note that if a model is in base contact with an enemy model then it must fight – it cannot choose not to fight! Once the model is reduced to 0 Will points, it is banished and therefore removed as a casualty. If a model with this special rule uses their last Will points to cast a Magical Power with the Instant duration, the effects of the Magical Power will be resolved before the model is removed as a casualty.
         Additionally, a Hero wearing The One Ring is not invisible to this model as they are to others. Furthermore, this model does not need to give up a point of Will if they are fighting a model wearing the Ring – not even if other enemy models are included as part of a Multiple Combat.',
         'basic');

-- New Special Rule: woodland_creature
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('woodland_creature','active',
         'An Infantry model with this special rule may move through woods and forests that are classified as difficult terrain as if they are open ground. Note that this doesn’t mean they can automatically climb terrain in those areas, nor move through tree trunks or jump fallen Obstacles.',
         'basic');

-- New Special Rule: iron_fist
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('iron_fist','active',
         'Durbûrz''s Stand Fast! has a range of 12".',
         'basic');

-- New Special Rule: mithril_crown
INSERT INTO special_rule (name,type,description,origin,is_weapon_rule)
    VALUES
        ('mithril_crown','passive',
         'At the start of each fight phase, before Heroic Actions are declared, roll a D6. On a 4+, all friendly Moria Goblin models within 3" of Grôblog gain +1 Fight until the End phase of the turn.',
         'basic','yes');

-- New Special Rule: master_of_the_dark_wild
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('master_of_the_dark_wild','passive',
         'Drûzhag may include Wild Wargs, Fell Wargs, Giant Spiders and Bat Swarms in his warband as if they were part of the same army list. This does not count as allying. Additionnally, all friendly Bat, Warg and Spider models within 12" of Drûzhag may use his Courage value instead of their own. Drûzhag''s Fury Magical Power will affect himself and any model that is either a Bat, Spider or Warg model.',
         'basic');

-- New Special Rule: hatred_(dwarf)
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('hatred_(dwarf)','active',
         'A model with this special rule adds 1 to their To Wound rolls when fighting in combat against the models with the keyword listed in the brackets in its profile. For example, a model that has the Hatred (Man) special rule will get +1 to their To Wound rolls against all models with the Man keyword. A model that has the Hatred (Mordor) special rule will get +1 to their To Wound rolls against all models with the Mordor keyword.',
         'basic');

-- New Special Rule: nenya
INSERT INTO special_rule (name,type,description,origin,is_weapon_rule)
    VALUES
        ('nenya','passive',
         'Galadriel can re-roll her dice when using Fate points.',
         'basic','yes');

-- New Special Rule: mirror_of_galadriel
INSERT INTO special_rule (name,type,description,origin,is_weapon_rule)
    VALUES
        ('mirror_of_galadriel','passive',
         'The mirror is a Heavy Object wit a Defence of 8 and 3 Wounds. It is deployed within 6" of Galadriel at the start of the game. For Scenarios that require both armies to move onto the board, any models within Galadriel''s warband may carry the mirror onto the board. During the End phase of each turn, one friendly Hero model within 6" may restore their Fate to its starting value.',
         'basic','yes');

-- New Special Rule: packlord
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('packlord','active',
         'Only friendly Warg models may benefit from a Wild Warg Chieftain''s Stand Fast! and Heroic Actions.',
         'basic');

-- New Special Rule: feral
INSERT INTO special_rule (name,type,description,origin,is_weapon_rule)
    VALUES
        ('feral','passive',
         'If the Ringwraith riding a Fell Beast is slain or dismounts, the creature automatically fails its Courage test and flees the battlefield.',
         'basic','yes');

-- New Special Rule: miasmatic_presence
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('miasmatic_presence','passive',
         'At the start of the Move phase, before Heroic Actions are declared, The Tainted may elect to spend a point of Will. If he does this, until the end of the turn, all Warrior models within 6" of The Tainted may not benefit from the Stand Fast! rule, nor take part in Heroic Actions.',
         'basic');

-- New Special Rule: seeping_decay
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('seeping_decay','passive',
         'At the start of the Fight phase, roll a D6 for each non-Spirit model (friendly or ennemy) in base contact with The Tainted - if the model is a Cavalry model, roll for both the mount and the rider. On the roll of a 6, they suffer a Wound.',
         'basic');

-- New Special Rule: sap_fortitude
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('sap_fortitude','passive',
         'Every time a Hero model within 6" of The Dwimmerlaik spend a point of Might, Will or Fate, The Dwimmerlaik may elect to spend a point of Will. If he does, roll a D6. On a 4+, the enemy Hero model must spend an additional point (of the same type) or the deed will be cancelled and any Might, Will or Fate already committed will be lost. Note that a Hero model that wishes to expend multiple points of Might, Will or Fate, may wait to see how The Dwimmerlaik''s roll affects their first point of Might, Will, or Fate, before committing to spending any more. The Dwimmerlaik will have to spend a point of Will for every point he wishes to affect, though he may wait to see how his first point of Will affected his opponent before deciding to spend another point of Will.',
         'basic');

-- New Special Rule: immortal_hunger
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('immortal_hunger','active',
         'Gûlavhar regains a single Wound for each model he slay in combat. Rend is the only Brutal Power Attack that allows Gûlavhar to regain Wounds in this manner. This can never take his Wounds beyond 4.',
         'basic');

-- New Special Rule: strength_of_body
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('strength_of_body','passive',
         'Gûlavhar''s Attacks is always equal to his remaining Wounds.',
         'basic');

-- New Special Rule: strength_of_will
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('strength_of_will','passive',
         'Gûlavhar''s Courage is always equal to his remaining Wounds.',
         'basic');

-- New Special Rule: lead_by_example
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('lead_by_example','active',
         'In a turn in which Buhrdûr slays an enemy Hero or Monster model in combat, all friendly Angmar Orc models and Troll models within 6" of him count as being in range of a Banner.',
         'basic');

-- New Special Rule: chill_aura
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('chill_aura','passive',
         'At the start of the Fight phase, before Heroic Actions are declared, a Shade may expend a Will point to activate this ability. Any enemy model within 6" of one or more Shades suffers a -1 penalty on its Duel roll. This is cumulative with other such penalties, such as for wielding a two-handed weapon.',
         'basic');

-- New Special Rule: banners
INSERT INTO special_rule (name,type,description,origin,is_weapon_rule)
    VALUES
        ('banners','other',
         'A banner provides a single re-roll to friendly models who are involved in a Fight within 3". Whether it is a model fighting on their own, or several friends all fighting against a common enemy, you can re-roll one D6 in each Duel roll to see who wins. This re-roll can be made after your opponent has rolled their own dice to see who wins, but must be made before any Might points are spent to adjust scores. 
It makes perfect sense that a banner must be flying in order for its bearer’s allies to gain the benefits of it being near, and as such a banner bearer must be standing for the effects of a banner to count. Models cannot benefit from the effects of a banner if the bearer is Prone. 
It is possible that one player may re-roll a dice and find themselves winning the Fight – in which case their opponent may wish to use a banner of their own. Remember, a banner only provides one re-roll to each Duel roll.
Any model carrying a banner is encumbered by its weight, and suffers a -1 penalty to their Duel rolls.
A Warrior model carrying a banner who is slain may pass it on to a friendly Warrior model (but not to a Hero model), who is in base contact, not Prone, and is not Engaged in a Fight. Swap the models over if they are the same type of Warrior, or find a suitable banner-carrying substitute in your collection.',
         'basic','yes');

-- New Special Rule: troll_chain
INSERT INTO special_rule (name,type,description,origin,is_weapon_rule)
    VALUES
        ('troll_chain','active',
         'This is a throwing weapon with a range of 3" and a Strength of 5.',
         'basic','yes');

-- New Special Rule: a_fell_light_is_in_them
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('a_fell_light_is_in_them','active',
         'At any point during its move, a Spectre can choose a single enemy model anywhere within 12" and Line of Sight. This model must pass a Courage test or make a full move under the control of the Spectre''s controlling player - even if it has already moved. This move cannot be used to enter an enemy model''s Control Zone, or perform actions that would cause direct harm to the target (such as jumping down a cliff). It may also not be used to have the target dismount or lie down. Affected models may move no further that turn, and may not use Active abilities for the remainder of the Move phase.',
         'basic');

-- New Special Rule: narsil
INSERT INTO special_rule (name,type,description,origin,is_weapon_rule)
    VALUES
        ('narsil','active',
         'Narsil is a Master-forged hand-and-a-half sword. Additionally, Elendil may call a Heroic Combat each turn without expending Might.',
         'basic','yes');

-- New Special Rule: high_king_of_gondor_and_arnor
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('high_king_of_gondor_and_arnor','active',
         'The range of Elendil’s Stand Fast! is 12" rather than 6".',
         'basic');

-- New Special Rule: unbending_resolve
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('unbending_resolve','passive',
         'Elendil always counts as having had the Fortify Spirit Magical Power cast upon him. This is always in effect, even if his Will is reduced to 0.',
         'basic');

-- New Special Rule: the_ring
INSERT INTO special_rule (name,type,description,origin,is_weapon_rule)
    VALUES
        ('the_ring','other',
         'WEARING THE RING\n
The model with the Ring(the Ringbearer) can put it on at any time during their Move phase. As soon as they do so, they become Invisible. If a model who put on the Ring is mounted, their steed will bolt and they must immediately take a Thrown Rider test.\n
INVISIBLE\n
Whilst they wear the Ring, the Ringbearer cannot be directly targeted by Magical Powers or shooting attacks (and does not count as In The Way). The Ringbearer has no Control Zone while invisible and enemy models may even move ‘through’ the Ringbearer. If an enemy model wishes to end its movement on the space the Ringbearer is taking up, move the Ringbearer the minimum distance to place them out of the way – this could involve hopping low walls, moving through foes or being shoved off a cliff!
If an enemy wishes to Charge the Ringbearer while they wear the Ring, it must pass a Courage test, applying a penalty of -1 to the roll for every 1" the Ringbearer is away from the foe. Models that automatically pass Courage tests still need to make this test, as it represents them being able to see the "Ringbearer, not how terrifying the Ringbearer is. During the Fight phase, any enemy model Engaged in combat with an invisible Ringbearer halves its Fight value for the duration of the duel.
None of the above rules apply to Sauronor Ringwraithmodels. Indeed, they actually gain some benefit, as described in their own special rules or the Will of Evil special rule.\n
REMOVING THE RING\n
If the controlling player wishes the Ringbearer to take off the Ring, they need to pass a Courage test to remove it. This test can be taken at any point during the Ringbearer’s Move phase, once it has been established which side has control of their movement (see below). If the test is failed, the Ringbearer must wear the Ring until the next turn, when they will have another chance to remove it. The Ringbearer cannot both put on and take off the Ring in the same turn.\n
SAURON’S WILL\n
If the Ring is already being worn, then the controlling player must test to see if the Ringbearer can overcome Sauron’s will. To do so, they must roll a dice immediately before they move the Ringbearer in the Move phase. If the player does not wish to move the Ringbearer, they must still roll a dice – but can do so at any time during their Move phase. The roll is made on behalf of the Ringbearer themself, so we allow the controlling player to use the Ringbearer’s Might points to modify this dice roll if they wish to do so. On a 3+, the controlling player moves the Ringbearer as usual. On a 1 or 2, the opposing player moves the Ringbearer instead of the controlling player. Regardless of which side moves the Ringbearer, they are still part of the controlling player’s side and all other actions, such as shooting and fighting, remain under the control of the controlling player. This means that when the opposing player moves the Ringbearer, all they can do is move the model, including Charging (in this case, the Ringbearer does not need to take Courage tests to Charge terrifying foes). They "cannot perform Heroic Actions and cannot pick up or put down other items. They cannot be forced to perform actions that would cause direct harm to the model (such as jumping down a cliff...) or be moved off the table (if the Scenario allows). This represents the struggle between the Ringbearer and the will of Sauron.\n
MY PRECIOUS!\n
During Matched Play and Open Play games, if the Ringbearer is the only model left on the controlling player’s side and is wearing the Ring, they count as a casualty – their mind has been taken over by its power. As Scenarios may depend on them surviving, this is very important! If the opposing side’s objective is to kill the Ringbearer, this is achieved if they are the only model remaining on the table from the controlling player’s side and they are wearing the Ring. 
There may be the odd occasions in Matched Play and Open Play games where there is more than one model on the board with The One Ring. As The One Ring is the only one of its kind (the clue is in the name), we have created a hierarchy of who carries the Ring when this occurs. The model closest to the top of the hierarchy table will get the Ring.\n
\t1 The Dark Lord Sauron
\t2 Isildur
\t3 Bilbo Baggins (from the Thorin’s Company army list) or Bilbo Baggins, Master Burglar (from the Survivors of Lake-town army list).
\t4 Frodo Baggins
\t5 Bilbo Baggins (from The Shire or Rivendell army list)
\t6 Gollum\n
In the rare situation where both players control models that have the Ring, and both models are the same on the hierarchy table, both players may use the Ring – although one is clearly a fake and only the winner of the battle can claim that theirs was the real one.',
         'basic','yes');

-- New Special Rule: hand-and-a-half_weapon
INSERT INTO special_rule (name,type,description,origin,is_weapon_rule)
    VALUES
        ('hand-and-a-half_weapon','other',
         'A hand-and-a-half weapon can be used as either a single-handed weapon or a two-handed weapon. Whenever a model armed with a hand-and-a-half weapon is involved in a Fight, the controlling player must decide at the start of the Fight whether they will be using their weapon as a single-handed weapon or a two-handed weapon.',
         'basic','yes');

-- New Special Rule: blood_of_númenor
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('blood_of_númenor','passive',
         'A model with this special rule gains the Resistant to Magic special rule whilst they are within 6" of Elendil, Isildur or Anárion.',
         'basic');

-- New Special Rule: andúril,_flame_of_the_west
INSERT INTO special_rule (name,type,description,origin,is_weapon_rule)
    VALUES
        ('andúril,_flame_of_the_west','active',
         'Andúril is an Elven–made hand-and-a-half sword. Additionally, when making Strikes with Andúril, Aragorn never requires more than a 4 for his To Wound rolls. Note that if Aragorn elects to use Andúril as a two-handed weapon, he will still get the +1 bonus To Wound meaning that he will Wound on a 3+.',
         'basic','yes');

-- New Special Rule: stand_men_of_the_west!
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('stand_men_of_the_west!','passive',
         'Friendly models within 6" of Aragorn, King Elessar count as being in range of a banner',
         'basic');

-- New Special Rule: staff_of_power
INSERT INTO special_rule (name,type,description,origin,is_weapon_rule)
    VALUES
        ('staff_of_power','other',
         'A Staff of Power is a hand-and-a-half staff, and may use the Stun Special Strike like all other staffs. In addition, the bearer can expend 1 point of Will each turn without reducing their own Will store.',
         'basic','yes');

-- New Special Rule: glamdring
INSERT INTO special_rule (name,type,description,origin,is_weapon_rule)
    VALUES
        ('glamdring','active',
         'Glamdring is an Elven-made hand-and-a-half sword. Additionally, Glamdring increases Gandalf’s Strength by 1 when making Strikes with it.',
         'basic','yes');

-- New Special Rule: narya
INSERT INTO special_rule (name,type,description,origin,is_weapon_rule)
    VALUES
        ('narya','passive',
         'Gandalf may re-roll his dice when making Fate rolls',
         'basic','yes');

-- New Special Rule: broken_mind
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('broken_mind','passive',
         'At the start of every turn, before Priority is rolled, the controlling player must take a Courage test for Denethor. If the test is passed, all is fine. If the test is failed, Denethor is controlled by the opposing player until the End phase of that turn. Whilst under the control of the opposing player, friendly models cannot target Denethor with shooting attacks or Magical Powers that cause damage and may not make Strikes if they beat him in a fight.
If Boromir is part of the same army as Denethor, then Denethor will automatically pass these Courage tests so long as Boromir is alive. Should Boromir be slain, then Denethor will automatically fail the next Courage test he must take for this special rule.',
         'basic');

-- New Special Rule: "the_rule_of_gondor_is_mine,_and_no_other''s!"
INSERT INTO special_rule (name,type,description,origin)
    VALUES
        ('"the_rule_of_gondor_is_mine,_and_no_other''s!"','passive',
         'If your force contains Denethor then he must be your leader, unless your force also contains Aragorn, King Elessar.',
         'basic');

