import { ADD_ATTACK_TO } from "./../constants/action-types";

const myCompanies = {
  companies: [
    {
      faction: "Misty Mountains",
      gold: 10,
      victories: 3,
      draws: 0,
      losses: 2,
      company_rating: 108,
      effective_rating: 120,
      access_map: { gormungur: 0, mulmuc: 1 },
      troops: [
        {
          display_name: "Gormungur",
          unit_name: "gobelin_warrior",
          unit_type: "infantry",
          troop_type: "lieutnant",
          points: 31,
          experience: 40,
          improvements: {
            move: 0,
            fight: 0,
            shoot: 0,
            strength: 0,
            defense: 0,
            attacks: 0,
            wounds: 0,
            courage: 0,
            might: 1,
            will: 1,
            faith: 1
          },
          injuries: ["old_battle_wound"],
          wargear: ["armour", "sword", "shield", "throwing_weapon"],
          special_rules: [],
          heroic_actions: [],
          magical_powers: [],
          notes: "Personal notes",
          image_path: "tempCardBackground1.jpg"
        },
        {
          display_name: "Mulmuc",
          unit_name: "gobelin_warrior",
          unit_type: "infantry",
          troop_type: "warrior",
          points: 31,
          experience: 40,
          improvements: {
            move: 0,
            fight: 0,
            shoot: 0,
            strength: 0,
            defense: 0,
            attacks: 0,
            wounds: 0,
            courage: 0,
            might: 0,
            will: 0,
            faith: 0
          },
          injuries: [],
          wargear: ["armour", "sword", "spear"],
          special_rules: [],
          heroic_actions: [],
          magical_powers: [],
          notes: "Personal notes",
          image_path: "tempCardBackground2.jpg"
        }
      ],
      injured: [],
      notes: "Personal Note on the company"
    }
  ]
};

const mistyMountains = {
  access_map: { gobelin_warrior: 0, warg: 1 },
  troops: [
    {
      display_name: "Goblin Warrior",
      unit_name: "gobelin_warrior",
      unit_type: "infantry",
      troop_type: "warrior",
      characteristics: {
        move: 5,
        fight: 2,
        shoot: 5,
        strength: 3,
        defense: 5,
        attacks: 1,
        wounds: 1,
        courage: 2,
        might: 0,
        will: 0,
        faith: 0
      },
      base_wargear: ["armour", "sword"],
      optional_wargear: ["orc_bow", "shield", "spear"],
      special_rules: [],
      heroic_actions: [],
      magical_powers: [],
      description: "An epic gobelin description",
      image_path: "tempCardBackground1.jpg"
    },
    {
      display_name: "Warg",
      unit_name: "warg",
      unit_type: "cavalry",
      troop_type: "warrior",
      characteristics: {
        move: 10,
        fight: 3,
        shoot: 0,
        strength: 4,
        defense: 4,
        attacks: 1,
        wounds: 1,
        courage: 3,
        might: 0,
        will: 0,
        faith: 0
      },
      base_wargear: ["teeth"],
      optional_wargear: [],
      special_rules: [],
      heroic_actions: [],
      magical_powers: [],
      description: "An epic warg description",
      image_path: "tempCardBackground3.jpg"
    }
  ]
};

const initialState = {
  userCompanies: myCompanies,
  mistyMountainsArmy: mistyMountains
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ATTACK_TO: {
      const newCompanies = Object.assign({}, state.userCompanies);
      const index = newCompanies.companies[0].map_to_index[action.payload];
      newCompanies.companies[0].troops[index].improvements.attacks += 1;
      return { ...state, userCompanies: newCompanies };
    }
    default:
      return state;
  }
};

export default rootReducer;
