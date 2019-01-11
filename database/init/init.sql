-- database setup
USE `lotr`;

ALTER DATABASE lotr CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `lotr`.`faction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`faction` (
  `faction_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `alignment` ENUM('good', 'evil', 'neutral') NOT NULL,
  PRIMARY KEY (`faction_id`),
  UNIQUE INDEX `name_UNIQUE` (`name`)
);


-- -----------------------------------------------------
-- Table `lotr`.`unit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`unit` (
  `unit_id` INT NOT NULL AUTO_INCREMENT,
  `faction_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `points` INT NOT NULL,
  `move` INT UNSIGNED NOT NULL,
  `fight` INT UNSIGNED NOT NULL,
  `shoot` INT UNSIGNED NULL DEFAULT 0,
  `strength` INT UNSIGNED NOT NULL,
  `defence` INT UNSIGNED NOT NULL,
  `attacks` INT UNSIGNED NOT NULL,
  `wounds` INT UNSIGNED NOT NULL,
  `courage` INT UNSIGNED NOT NULL,
  `might` INT UNSIGNED NULL DEFAULT 0,
  `will` INT UNSIGNED NULL DEFAULT 0,
  `faith` INT UNSIGNED NULL DEFAULT 0,
  `description` TEXT NULL,
  `image_path` VARCHAR(100) NOT NULL,
  `mount_id` INT NULL,
  PRIMARY KEY (`unit_id`),
  UNIQUE INDEX `name_UNIQUE` (`name`),
  INDEX `fk_unit_faction1_idx` (`faction_id`),
  CONSTRAINT `fk_unit_faction1`
    FOREIGN KEY (`faction_id`)
    REFERENCES `lotr`.`faction` (`faction_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_unit_unit1`
    FOREIGN KEY (`mount_id`)
    REFERENCES `lotr`.`unit` (`unit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table `lotr`.`altering_effect`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`altering_effect` (
  `altering_effect_id` INT NOT NULL AUTO_INCREMENT,
  `move_bonus` INT NULL DEFAULT 0,
  `fight_bonus` INT NULL DEFAULT 0,
  `shoot_bonus` INT NULL DEFAULT 0,
  `strength_bonus` INT NULL DEFAULT 0,
  `defence_bonus` INT NULL DEFAULT 0,
  `attacks_bonus` INT NULL DEFAULT 0,
  `wounds_bonus` INT NULL DEFAULT 0,
  `courage_bonus` INT NULL DEFAULT 0,
  `might_bonus` INT NULL DEFAULT 0,
  `will_bonus` INT NULL DEFAULT 0,
  `faith_bonus` INT NULL DEFAULT 0,
  PRIMARY KEY (`altering_effect_id`)
);


-- -----------------------------------------------------
-- Table `lotr`.`equipement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`equipement` (
  `equipement_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `high_cost` INT NULL,
  `low_cost` INT NULL,
  `is_extra` ENUM('yes','no') NOT NULL DEFAULT 'no',
  `altering_effect_id` INT NULL,
  PRIMARY KEY (`equipement_id`),
  UNIQUE INDEX `name_UNIQUE` (`name`),
  INDEX `fk_equipement_altering_effect1_idx` (`altering_effect_id`),
  CONSTRAINT `fk_equipement_altering_effect1`
    FOREIGN KEY (`altering_effect_id`)
    REFERENCES `lotr`.`altering_effect` (`altering_effect_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `lotr`.`keyword`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`keyword` (
  `keyword_id` INT NOT NULL AUTO_INCREMENT,
  `name` ENUM('warrior', 'hero_of_legend', 'hero_of_valor', 'hero_of_fortitude', 'minor_hero', 'independent_hero', 'infantry', 'cavalry', 'monster', 'hobbit', 'elf', 'orc', 'pony', 'warg', 'goblin', 'wizard', 'man', 'dwarf', 'spirit', 'ringwraith', 'spider', 'troll', 'siege_engine', 'uruk-hai', 'great_beast', 'war_beast', 'drake', 'dragon', 'kraken', 'bat', 'mûmak', 'ent', 'eagle', 'gondor', 'mirkwood', 'erebor', 'númenor', 'arnor', 'rohan', 'rivendell', 'lórien', 'khazad-dûm', 'moria', 'iron_hills', 'mordor', 'angmar', 'easterling', 'isengard', 'dunlending', 'khandish', 'haradrim', 'mahûd', 'corsair', 'ruffian') NOT NULL,
  PRIMARY KEY (`keyword_id`)
);

-- -----------------------------------------------------
-- Table `lotr`.`unit_has_keyword`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`unit_has_keyword` (
  `unit_id` INT NOT NULL,
  `keyword_id` INT NOT NULL,
  PRIMARY KEY (`unit_id`, `keyword_id`),
  INDEX `fk_unit_has_keyword_keyword1_idx` (`keyword_id`),
  INDEX `fk_unit_has_keyword_unit1_idx` (`unit_id`),
  CONSTRAINT `fk_unit_has_keyword_unit1`
    FOREIGN KEY (`unit_id`)
    REFERENCES `lotr`.`unit` (`unit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_unit_has_keyword_keyword1`
    FOREIGN KEY (`keyword_id`)
    REFERENCES `lotr`.`keyword` (`keyword_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `lotr`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `username_UNIQUE` (`username`)
);


-- -----------------------------------------------------
-- Table `lotr`.`company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`company` (
  `company_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `gold` INT UNSIGNED NOT NULL DEFAULT 60,
  `victories` INT UNSIGNED NOT NULL DEFAULT 0,
  `draws` INT UNSIGNED NOT NULL DEFAULT 0,
  `losses` INT UNSIGNED NOT NULL DEFAULT 0,
  `rating` INT UNSIGNED NOT NULL DEFAULT 0,
  `effective_rating` INT UNSIGNED NOT NULL DEFAULT 0,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE INDEX `name_UNIQUE` (`name`),
  INDEX `fk_company_user1_idx` (`user_id`),
  CONSTRAINT `fk_company_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `lotr`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table `lotr`.`magical_power`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`magical_power` (
  `magical_power_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `description_channelled` TEXT NOT NULL,
  `duration` ENUM('temporary', 'instant', 'exhaustion') NOT NULL,
  `range` INT NOT NULL DEFAULT 0,
  `casting` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`magical_power_id`),
  UNIQUE INDEX `name_UNIQUE` (`name`)
);

-- -----------------------------------------------------
-- Table `lotr`.`injury`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`injury` (
  `injury_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `altering_effect_id` INT NULL,
  PRIMARY KEY (`injury_id`),
  UNIQUE INDEX `name_UNIQUE` (`name`),
  INDEX `fk_injury_altering_effect1_idx` (`altering_effect_id`),
  CONSTRAINT `fk_injury_altering_effect1`
    FOREIGN KEY (`altering_effect_id`)
    REFERENCES `lotr`.`altering_effect` (`altering_effect_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table `lotr`.`special_rule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`special_rule` (
  `special_rule_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `type` ENUM('active', 'passive','other') NOT NULL,
  `description` TEXT NOT NULL,
  `origin` ENUM('basic', 'equipement', 'companies') NOT NULL,
  PRIMARY KEY (`special_rule_id`),
  UNIQUE INDEX `name_UNIQUE` (`name`)
);


-- -----------------------------------------------------
-- Table `lotr`.`company_unit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`company_unit` (
  `company_unit_id` INT NOT NULL AUTO_INCREMENT,
  `unit_id` INT NOT NULL,
  `company_id` INT NOT NULL,
  `pseudo_name` VARCHAR(255) NOT NULL,
  `company_unit_rank` ENUM('warrior', 'sergeant', 'lieutnant') NOT NULL DEFAULT 'warrior',
  `experience` INT UNSIGNED NOT NULL DEFAULT 0,
  `effective_points` INT UNSIGNED NOT NULL,
  `can_promote` ENUM('yes','no') NOT NULL DEFAULT 'no',
  `notes` TEXT NULL,
  PRIMARY KEY (`company_unit_id`, `unit_id`),
  INDEX `fk_company_unit_company1_idx` (`company_id`),
  UNIQUE INDEX `name_UNIQUE` (`pseudo_name`),
  INDEX `fk_company_unit_unit1_idx` (`unit_id`),
  CONSTRAINT `fk_company_unit_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `lotr`.`company` (`company_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_company_unit_unit1`
    FOREIGN KEY (`unit_id`)
    REFERENCES `lotr`.`unit` (`unit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `lotr`.`promotion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`promotion` (
  `promotion_id` INT NOT NULL AUTO_INCREMENT,
  `description` TEXT NULL,
  `altering_effect_id` INT NULL,
  `company_unit_id` INT NOT NULL,
  PRIMARY KEY (`promotion_id`),
  INDEX `fk_promotion_altering_effect1_idx` (`altering_effect_id`),
  INDEX `fk_promotion_company_unit1_idx` (`company_unit_id`),
  CONSTRAINT `fk_promotion_altering_effect1`
    FOREIGN KEY (`altering_effect_id`)
    REFERENCES `lotr`.`altering_effect` (`altering_effect_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_promotion_company_unit1`
    FOREIGN KEY (`company_unit_id`)
    REFERENCES `lotr`.`company_unit` (`company_unit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table `lotr`.`heroic_action`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`heroic_action` (
  `heroic_action_id` INT NOT NULL AUTO_INCREMENT,
  `name` ENUM('heroic_move', 'heroic_shoot', 'heroic_combat', 'heroic_resolve', 'heroic_march', 'heroic_channelling', 'heroic_accuracy', 'heroic_strike', 'heroic_defence', 'heroic_strength', 'heroic_challenge') NOT NULL,
  `description` TEXT NULL,
  `alternative_name` VARCHAR(45) NULL,
  `alternative_description` TEXT NULL,
  PRIMARY KEY (`heroic_action_id`));


-- -----------------------------------------------------
-- Table `lotr`.`company_unit_has_magical_power`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`company_unit_has_magical_power` (
  `company_unit_id` INT NOT NULL,
  `magical_power_id` INT NOT NULL,
  PRIMARY KEY (`company_unit_id`, `magical_power_id`),
  INDEX `fk_company_unit_has_magical_power_magical_power1_idx` (`magical_power_id`),
  INDEX `fk_company_unit_has_magical_power_company_unit1_idx` (`company_unit_id`),
  CONSTRAINT `fk_company_unit_has_magical_power_company_unit1`
    FOREIGN KEY (`company_unit_id`)
    REFERENCES `lotr`.`company_unit` (`company_unit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_company_unit_has_magical_power_magical_power1`
    FOREIGN KEY (`magical_power_id`)
    REFERENCES `lotr`.`magical_power` (`magical_power_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `lotr`.`company_unit_has_injury`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`company_unit_has_injury` (
  `company_unit_id` INT NOT NULL,
  `injury_id` INT NOT NULL,
  PRIMARY KEY (`company_unit_id`, `injury_id`),
  INDEX `fk_company_unit_has_injury_injury1_idx` (`injury_id`),
  INDEX `fk_company_unit_has_injury_company_unit1_idx` (`company_unit_id`),
  CONSTRAINT `fk_company_unit_has_injury_company_unit1`
    FOREIGN KEY (`company_unit_id`)
    REFERENCES `lotr`.`company_unit` (`company_unit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_company_unit_has_injury_injury1`
    FOREIGN KEY (`injury_id`)
    REFERENCES `lotr`.`injury` (`injury_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `lotr`.`unit_has_equipement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`unit_has_equipement` (
  `unit_id` INT NOT NULL,
  `equipement_id` INT NOT NULL,
  `points` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`unit_id`, `equipement_id`),
  INDEX `fk_unit_has_equipement_equipement1_idx` (`equipement_id`),
  INDEX `fk_unit_has_equipement_unit1_idx` (`unit_id`),
  CONSTRAINT `fk_unit_has_equipement_unit1`
    FOREIGN KEY (`unit_id`)
    REFERENCES `lotr`.`unit` (`unit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_unit_has_equipement_equipement1`
    FOREIGN KEY (`equipement_id`)
    REFERENCES `lotr`.`equipement` (`equipement_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `lotr`.`company_unit_has_equipement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`company_unit_has_equipement` (
  `company_unit_id` INT NOT NULL,
  `equipement_id` INT NOT NULL,
  PRIMARY KEY (`company_unit_id`, `equipement_id`),
  INDEX `fk_company_unit_has_equipement_equipement1_idx` (`equipement_id`),
  INDEX `fk_company_unit_has_equipement_company_unit1_idx` (`company_unit_id`),
  CONSTRAINT `fk_company_unit_has_equipement_company_unit1`
    FOREIGN KEY (`company_unit_id`)
    REFERENCES `lotr`.`company_unit` (`company_unit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_company_unit_has_equipement_equipement1`
    FOREIGN KEY (`equipement_id`)
    REFERENCES `lotr`.`equipement` (`equipement_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `lotr`.`unit_has_heroic_action`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`unit_has_heroic_action` (
  `unit_id` INT NOT NULL,
  `heroic_action_id` INT NOT NULL,
  PRIMARY KEY (`unit_id`, `heroic_action_id`),
  INDEX `fk_unit_has_heroic_action_heroic_action1_idx` (`heroic_action_id`),
  INDEX `fk_unit_has_heroic_action_unit1_idx` (`unit_id`),
  CONSTRAINT `fk_unit_has_heroic_action_unit1`
    FOREIGN KEY (`unit_id`)
    REFERENCES `lotr`.`unit` (`unit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_unit_has_heroic_action_heroic_action1`
    FOREIGN KEY (`heroic_action_id`)
    REFERENCES `lotr`.`heroic_action` (`heroic_action_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `lotr`.`unit_has_magical_power`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`unit_has_magical_power` (
  `unit_id` INT NOT NULL,
  `magical_power_id` INT NOT NULL,
  PRIMARY KEY (`unit_id`, `magical_power_id`),
  INDEX `fk_unit_has_magical_power_magical_power1_idx` (`magical_power_id`),
  INDEX `fk_unit_has_magical_power_unit1_idx` (`unit_id`),
  CONSTRAINT `fk_unit_has_magical_power_unit1`
    FOREIGN KEY (`unit_id`)
    REFERENCES `lotr`.`unit` (`unit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_unit_has_magical_power_magical_power1`
    FOREIGN KEY (`magical_power_id`)
    REFERENCES `lotr`.`magical_power` (`magical_power_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `lotr`.`company_unit_has_heroic_action`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`company_unit_has_heroic_action` (
  `company_unit_id` INT NOT NULL,
  `heroic_action_id` INT NOT NULL,
  PRIMARY KEY (`company_unit_id`, `heroic_action_id`),
  INDEX `fk_company_unit_has_heroic_action_heroic_action1_idx` (`heroic_action_id`),
  INDEX `fk_company_unit_has_heroic_action_company_unit1_idx` (`company_unit_id`),
  CONSTRAINT `fk_company_unit_has_heroic_action_company_unit1`
    FOREIGN KEY (`company_unit_id`)
    REFERENCES `lotr`.`company_unit` (`company_unit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_company_unit_has_heroic_action_heroic_action1`
    FOREIGN KEY (`heroic_action_id`)
    REFERENCES `lotr`.`heroic_action` (`heroic_action_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `lotr`.`unit_has_special_rule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`unit_has_special_rule` (
  `unit_id` INT NOT NULL,
  `special_rule_id` INT NOT NULL,
  PRIMARY KEY (`unit_id`, `special_rule_id`),
  INDEX `fk_unit_has_special_rule_special_rule1_idx` (`special_rule_id`),
  INDEX `fk_unit_has_special_rule_unit1_idx` (`unit_id`),
  CONSTRAINT `fk_unit_has_special_rule_unit1`
    FOREIGN KEY (`unit_id`)
    REFERENCES `lotr`.`unit` (`unit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_unit_has_special_rule_special_rule1`
    FOREIGN KEY (`special_rule_id`)
    REFERENCES `lotr`.`special_rule` (`special_rule_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table `lotr`.`company_unit_has_special_rule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`company_unit_has_special_rule` (
  `company_unit_id` INT NOT NULL,
  `special_rule_id` INT NOT NULL,
  PRIMARY KEY (`company_unit_id`, `special_rule_id`),
  INDEX `fk_company_unit_has_special_rule_special_rule1_idx` (`special_rule_id`),
  INDEX `fk_company_unit_has_special_rule_company_unit1_idx` (`company_unit_id`),
  CONSTRAINT `fk_company_unit_has_special_rule_company_unit1`
    FOREIGN KEY (`company_unit_id`)
    REFERENCES `lotr`.`company_unit` (`company_unit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_company_unit_has_special_rule_special_rule1`
    FOREIGN KEY (`special_rule_id`)
    REFERENCES `lotr`.`special_rule` (`special_rule_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- -----------------------------------------------------
-- Table `lotr`.`equipement_has_special_rule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lotr`.`equipement_has_special_rule` (
  `equipement_id` INT NOT NULL,
  `special_rule_id` INT NOT NULL,
  PRIMARY KEY (`equipement_id`, `special_rule_id`),
  INDEX `fk_equipement_has_special_rule_special_rule1_idx` (`special_rule_id`),
  INDEX `fk_equipement_has_special_rule_equipement1_idx` (`equipement_id`),
  CONSTRAINT `fk_equipement_has_special_rule_equipement1`
    FOREIGN KEY (`equipement_id`)
    REFERENCES `lotr`.`equipement` (`equipement_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_equipement_has_special_rule_special_rule1`
    FOREIGN KEY (`special_rule_id`)
    REFERENCES `lotr`.`special_rule` (`special_rule_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);