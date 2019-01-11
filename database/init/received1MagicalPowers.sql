-- New Magical Power: bladewrath
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('bladewrath','This power targets one friendly model within range. In the Fight phase, all Strikes made by the target model are resolved at Strength 6, regardless of other modifiers.',
         'All Strikes are instead resolved at Strength 10.',
         'temporary');

-- New Magical Power: aura_of_dismay
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('aura_of_dismay','This power targets the caster themself. While this power is in effect, the caster and all friendly models within 6" cause Terror .',
         'The range of this power is increased to 12".',
         'exhaustion');

-- New Magical Power: banishment
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('banishment','This power targets one enemy model within range. This power only affects Spirit models. The target model automatically suffers 1 Wound, exactly as if it had been wounded in combat. If the target is a Cavalry model, the caster must choose whether the rider or the mount suffers the effects.',
         'The target suffers D3 Wounds rather than 1.',
         'instant');

-- New Magical Power: black_dart
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('black_dart','This power targets one enemy model within range. The target immediately suffers one Strength 9 hit. Do not roll To Hit or for In The Way tests. If the target is a Cavalry model then the Attacker must choose whether the rider or the mount is hit. This power can still be used on a target that is Engaged in combat.',
         'A wounding hit will cause D3 Wounds rather than 1.',
         'instant');

-- New Magical Power: blessing_of_the_valar
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('blessing_of_the_valar','This power targets one friendly model within range. They immediately recover a Fate point spent earlier in the battle. This may not take a model’s Fate beyond its starting level. If the target is a Cavalry model, the caster must choose whether the rider or the mount recovers the Fate point.',
         'The target instead recovers D3 Fate.',
         'instant');

-- New Magical Power: blinding_light
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('blinding_light','This power targets the caster themselves. While this power is in effect, any shooting attacks directed at the caster, or a friendly model within 6" of them, will only hit on a To Hit roll of a 6. Additionally, an area within a 12" radius around the caster is illuminated as if it were daylight (perfect when you are fighting underground!).',
         'The duration becomes Exhaustion.',
         'temporary');

-- New Magical Power: call_winds
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('call_winds','This power targets one enemy model within range. The target is blown D6" directly away from the caster in a straight line. If the model comes into contact with another model or terrain such as an Obstacle like a hedge, house or large rock, then it will stop 1" away from it. In either case the target model is knocked Prone. If the target is in combat, the effect is the same as described above, but every other model in the combat is also knocked Prone.',
         'The target is instead blown 2D6" away.',
         'instant');

-- New Magical Power: chill_soul
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('chill_soul','This power targets one enemy model within range. The target model suffers a Wound, exactly as if it had been wounded in combat. If cast on a Cavalry model, the Attacker decides whether the rider or the mount suffers the Wound. This power may be cast on a model Engaged in close combat.',
         'The range of this Magical Power is increased by 6".',
         'instant');

-- New Magical Power: collapse_rocks
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('collapse_rocks','This power targets one enemy model within range. This power may only be cast on a model that is within a ruin, stone or brick building, cave, rock pile or another similar piece of terrain where a Wizard could crack rocks either underfoot or overhead. The target suffers one Strength 5 hit.',
         'All models (friend and foe) within 2" of the target also suffer one Strength 5 hit.',
         'instant');

-- New Magical Power: command/compel
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('command/compel','This power targets one enemy model within range. The caster may move the target model up to half of its maximum Move distance. They can do this even if the model has already moved this turn. The move cannot force the target to jump, leap, climb, dismount or lie down, but can take them into difficult terrain, and even make them Charge an enemy. No Courage test is required to Charge Terror-causing foes. It can even force an unengaged victim to drop an object (but not wargear) that it is holding or to put on The One Ring (if they carry it). Once the target has finished the move, it may move no further that turn for any reason.
Finally, the target suffers the effect of the Immobilise/Transfix magical power.',
         'Additionally, while this power is in effect, the target will halve their Fight and Attacks characteristics (rounding up), and may not Strike if they win a Duel.',
         'temporary');

-- New Magical Power: curse
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('curse','This power targets one enemy model within range. The target model immediately loses 1 Fate point. If the target is a Cavalry model, the caster must choose whether the rider or the mount loses the Fate point.',
         'The target model immediately loses all remaining Fate points.',
         'instant');

-- New Magical Power: drain_courage
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('drain_courage','This power targets one enemy model within range. The target immediately reduces their Courage characteristic by 1 for the remainder of the battle, to a minimum of 1. This power can take effect multiple times over the course of a battle, reducing the target’s Courage each time. If the target is a Cavalry model, the caster must choose whether the rider or the mount reduces their Courage value.',
         'The target’s Courage is instead reduced by D3.',
         'temporary');

-- New Magical Power: enchanted_blades
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('enchanted_blades','This power targets one friendly model within range. In the Fight phase, the target may re-roll all failed To Wound rolls.',
         'Additionally, the target may add 1 to all To Wound rolls. This is cumulative with using a two-handed weapon.',
         'temporary');

-- New Magical Power: enrage_beast
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('enrage_beast','This power targets one friendly model within range. This power can be used against a single Bat, (unridden) Warg or Spider model within range. If successful, the target’s Fight, Attacks, Strength and Courage are increased by 2 until the End phase. During the End phase, the target suffers one Strength 10 hit.',
         'The target’s Fight, Attacks, Strength and Courage are instead increased by 3.',
         'temporary');

-- New Magical Power: flameburst
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('flameburst','This power targets one enemy model within range. The target immediately suffers one Strength 6 hit.',
         'The target instead suffers the effects of the Set Ablaze special rule.',
         'instant');

-- New Magical Power: fortify_spirit
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('fortify_spirit','This power may target one friendly model within range. While this power is in effect, the target rolls two extra dice when making Resist tests. These extra dice do not reduce the target’s store of Will and can even be rolled if the target has no Will points remaining or chooses not to expend any Will.',
         'The target also adds 1 to their highest dice score when resisting magic.',
         'exhaustion');

-- New Magical Power: immobilise/transfix
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('immobilise/transfix','This power targets one enemy model within range. While this power is in effect, the target model may not move (except to Back Away should they lose a Fight), shoot, cast Magical Powers, declare Heroic Actions, call a Stand Fast! or use Active abilities and may not Strike if they win a Duel.',
         'Additionally, while this power is in effect, the target will halve their Fight and Attacks characteristics (rounding up).',
         'temporary');

-- New Magical Power: instill_fear
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('instill_fear','This power targets all enemy models within range. Each affected model must take a Courage test, in an order chosen by the caster; if the test is failed then the model must move its maximum Move distance directly away from the caster. If the model comes into contact with another model, or impassable terrain, then it will stop so it is not in base contact with it. If a model comes into base contact with the edge of the board, they will immediately stop moving; this will not allow or force models to leave the board in Scenarios where models may leave the board. Models that fail a Courage test due to the effects of this Magical Power may then move no further that turn, for any reason.',
         'Courage tests caused by this Magical Power are taken on 3D6, discarding the highest result.',
         'instant');

-- New Magical Power: nature’s_wrath
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('nature’s_wrath','This power targets all enemy models within range. All enemy models within 6" of the caster are knocked Prone. Cavalry models are automatically treated as having suffered a Knocked Flying result on the Thrown Rider table – both rider and mount are then knocked Prone.',
         'All enemy models suffer one Strength 2 hit after being knocked Prone.',
         'instant');

-- New Magical Power: panic_steed
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('panic_steed','This power targets one enemy model within range. This power may only target Cavalry models. The rider is immediately thrown and the mount instantly flees. Remove the mount from play and roll on the Thrown Rider table to determine the effect on the rider.',
         'This power also targets all enemy models within 3" of the initial target.',
         'instant');

-- New Magical Power: paralyse
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('paralyse','This power targets one enemy model within range. The target is immediately paralysed. It is knocked Prone and may do nothing until it recovers, including using Active special rules (see page 103). The target may make no Duel rolls and will automatically lose any Duels it takes part in unless joined by a friendly model.
During the End phase, the controlling player must roll a D6 for each of their Paralysed models. On a 6, the model recovers and stands up. Friendly models who spend the Fight phase in contact with a Paralysed model, and do nothing else, may also attempt to revive the victim. Roll an additional D6 for the Paralysed model for each such friend. Might points can be used to modify this roll.',
         'At the end of each turn that the target remains Paralysed, they suffer one Strength 5 hit.',
         'instant');

-- New Magical Power: protection_of_the_valar
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('protection_of_the_valar','This power may target the caster or a single friendly model within 3". The target may not be targeted by an enemy’s Magical Powers or special rules (e.g., The Golden King’s Riches Beyond Renown or a Dead Marsh Spectre’s A Fell Light is in Them).',
         'The power will affect all friendly models within 3".',
         'temporary');

-- New Magical Power: refreshing_song
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('refreshing_song','This power targets one friendly model within range. The target immediately recovers a single lost Wound, as well as a single lost Might, Will and Fate point spent earlier in the battle. The target also immediately recovers from the effects of any Magical Power they wish.',
         'The target instead recovers all lost Wounds rather than just one, in addition to all other effects.',
         'instant');

-- New Magical Power: renew
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('renew','This power targets a single friendly model within range. The target immediately regains a single Wound lost earlier in the battle. If the target is a Cavalry model, the caster must choose whether the rider or the mount regains the Wound.',
         'The target instead regains D3 lost Wounds.',
         'instant');

-- New Magical Power: sap_will
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('sap_will','This power targets one enemy model within range. The target immediately loses D3 Will points. If the target is a Cavalry model, the caster must choose whether the rider or the mount loses the Will.',
         'The target loses D6 Will points.',
         'instant');

-- New Magical Power: shatter
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('shatter','This power targets one enemy model within range. Pick a single piece of wargear on the target model. The selected item is immediately destroyed and cannot be used for the remainder of the game. All special rules associated with the selected item are lost. If, after destroying a weapon, the target model has no other weapons remaining then they are considered to be unarmed for the remainder of the game.
Note that wargear such as mounts, living creatures or those directly attached to the model (such as claws and teeth, etc.), Staffs of Power, or The One Ring, cannot be shattered.',
         'The target additionally suffers one Strength 6 hit.',
         'instant');

-- New Magical Power: shroud_of_shadows
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('shroud_of_shadows','This power targets a friendly model within range. The target is considered to be invisible until the End phase. They cannot be targeted by enemy models’ Magical Powers, special rules or shooting attacks (and do not count as In The Way). They have no Control Zone while invisible and enemy models may even move ‘through’ them. An enemy model may not end its movement on the space the target is taking up.
If an enemy wishes to Charge the target, it must pass a Courage test, applying a penalty of -1 to the roll for every full 1" that the target is away from the foe.',
         'Additionally, during the Fight phase, any enemy model Engaged in combat with the target halves its Fight value for the duration of the Duel.',
         'temporary');

-- New Magical Power: sorcerous_blast
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('sorcerous_blast','This power targets one enemy model within range. The target is blasted D6" directly away from the caster and knocked Prone. If the target comes into contact with another model that is Strength 5 or less, it will immediately stop and both models will be knocked Prone. If the target, or one of the models that is knocked Prone, is Engaged in combat, then all the models (friend and foe) in the same Fight are also knocked Prone. The target model suffers one Strength 5 hit, and any other model knocked Prone suffers one Strength 3 hit. Cavalry models are treated as having rolled the Knocked Flying result on the Thrown Rider chart.
Additionally, If the target comes into contact with a piece of terrain, such as an Obstacle like a hedge, house or large rock, or a model that is Strength 6 or higher, then it will immediately stop and be knocked Prone, however the Strength 6 model will not be knocked Prone. Both the target and the Obstacle or model (if it has a Defence value) will suffer one Strength 3 hit.
Even Transfixed/Compelled or otherwise immobilised models will be blasted by this power.',
         'The initial hit is instead Strength 6 and every other model suffers instead one Strength 4 hit.',
         'instant');

-- New Magical Power: strengthen_will
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('strengthen_will','This power targets one friendly model within range. The caster can use this spell to give 1 Will point to a friendly Hero within range. The target’s Will can be increased past their starting amount, and this power can be used even if they started the game without any Will points. If the target is a Cavalry model, the caster must choose whether the rider or the mount regains the Will point.',
         'The target instead receives D3 Will points.',
         'instant');

-- New Magical Power: terrifying_aura
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('terrifying_aura','This power targets the caster themselves. While this power is in effect, the caster causes Terror.',
         'Models wishing to Charge the caster whilst this power is in effect must take their Courage test on 3D6, discarding the highest dice.',
         'exhaustion');

-- New Magical Power: tremor
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('tremor','This power targets one enemy model within range, and any model that falls under the line. Draw a straight line, 1mm wide, that extends D6" from the target in the direction directly away from the caster. All models (both friend and foe) touched are knocked Prone and suffer one Strength 6 hit. Cavalry models are treated as having rolled the Knocked Flying result on the Thrown Rider chart. If a model is in combat then all models in combat are hit by this Magical Power. One affected model may attempt to Resist this power in the usual manner.',
         'The line instead extends out 2D6".',
         'instant');

-- New Magical Power: wither
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('wither','This power targets one enemy model within range. The target’s Strength is reduced by 1 (to a minimum of 1) for the remainder of the game. If the target is a Cavalry model, the caster must choose whether the rider or the mount has their Strength reduced.',
         'The target’s Strength is instead reduced by D3.',
         'instant');

-- New Magical Power: wrath_of_bruinen
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('wrath_of_bruinen','This power targets all enemy models within range. All enemy models within 6" of the caster are knocked Prone. Cavalry models are automatically treated as having suffered a Knocked Flying result on the Thrown Rider table – both rider and mount are then knocked Prone. All affected models additionally suffer one Strength 2 hit, or one Strength 8 hit if they are in a stream, river or other similar water terrain feature.',
         'All enemy models instead suffer one Strength 3 hit after being knocked Prone or one Strength 9 hit if they are in a stream, river or similar water terrain feature.',
         'instant');

-- New Magical Power: your_staff_is_broken
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('your_staff_is_broken','This power targets one enemy model within range, so long as they have a staff. This power destroys the staff of the target model. All the advantages associated with the staff are immediately lost (including the hand-and-a-half weapon bonus).',
         'The target additionally suffers a Strength 7 hit.',
         'instant');

-- New Magical Power: fury_(x)
INSERT INTO magical_power (name,description,description_channelled,duration)
    VALUES
        ('fury_(x)','Every model with this Magical Power will have a bracket after Fury denoting the models that will be affected by the power (e.g., Fury (Goblin)). This power targets all friendly models within 6" that are included in the bracket. Note that if there is more than one keyword within the brackets, then a model must have all the keywords to benefit from Fury. Whilst this power is in effect, all targets will automatically pass any Courage tests they are required to make. In the case of Cavalry models, a degree of common sense is required when applying this effect. For example, if a Mordor Orc Shaman casts Fury (Mordor Orc) and a Warg Rider is within range of the Magical Power, only the Orc rider will feel the benefits as only the rider is a Mordor Orc.',
         'Additionally, each time a target suffers a Wound whilst within range of at least one friendly model that has cast Fury, roll a D6. On the roll of a 6, the target ignores the Wound exactly as if a point of Fate had been spent. This roll is taken immediately after the Wound has been suffered, can be taken before Fate rolls are
made and Might may be used to influence it.',
         'exhaustion');
