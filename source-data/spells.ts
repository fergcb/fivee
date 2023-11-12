import { dice, ref } from "$helpers";
import { SpellAttack } from "$collections/spells/collection.ts";
import { Entry } from "$db/resolver.ts";

const attacks: Entry<{ name: string; attack: SpellAttack }>[] = [
  {
    name: "Eyebite",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Faerie Fire",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "False Life",
    attack: {
      kind: "healing",
      healingAtSlotLevel: {
        1: dice("1d4 + 4"),
        2: dice("1d4 + 9"),
        3: dice("1d4 + 14"),
        4: dice("1d4 + 19"),
        5: dice("1d4 + 24"),
        6: dice("1d4 + 29"),
        7: dice("1d4 + 34"),
        8: dice("1d4 + 39"),
        9: dice("1d4 + 44"),
      },
    },
  },
  {
    name: "Fear",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Feeblemind",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "psychic"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            8: dice("4d6"),
          },
        },
      },
      saveType: ref("abilityScores", "int"),
      effectOnSave: "special",
    },
  },
  {
    name: "Finger of Death",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "necrotic"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            7: dice("7d8 + 30"),
          },
        },
      },
      saveType: ref("abilityScores", "con"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Fire Bolt",
    attack: {
      kind: "ranged",
      damage: {
        damageType: ref("damageTypes", "fire"),
        damageProgression: {
          kind: "cantrip",
          damageAtCharacterLevel: {
            1: dice("1d10"),
            5: dice("2d10"),
            11: dice("3d10"),
            17: dice("4d10"),
          },
        },
      },
    },
  },
  {
    name: "Fire Storm",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "fire"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            7: dice("7d10"),
          },
        },
      },
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Fireball",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "fire"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            3: dice("8d6"),
            4: dice("9d6"),
            5: dice("10d6"),
            6: dice("11d6"),
            7: dice("12d6"),
            8: dice("13d6"),
            9: dice("14d6"),
          },
        },
      },
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Flame Strike",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "fire"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            5: dice("4d6 + 4d6"),
            6: dice("4d6 + 5d6"),
            7: dice("4d6 + 6d6"),
            8: dice("4d6 + 7d6"),
            9: dice("4d6 + 8d6"),
          },
        },
      },
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Flesh to Stone",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "con"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Geas",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Grease",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Guardian of Faith",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "radiant"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            4: dice("20"),
          },
        },
      },
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Guiding Bolt",
    attack: {
      kind: "ranged",
      damage: {
        damageType: ref("damageTypes", "radiant"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            1: dice("4d6"),
            2: dice("5d6"),
            3: dice("6d6"),
            4: dice("7d6"),
            5: dice("8d6"),
            6: dice("9d6"),
            7: dice("10d6"),
            8: dice("11d6"),
            9: dice("12d6"),
          },
        },
      },
    },
  },
  {
    name: "Gust of Wind",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "str"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Hallow",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "cha"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Harm",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "necrotic"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            6: dice("14d6"),
          },
        },
      },
      saveType: ref("abilityScores", "con"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Heal",
    attack: {
      kind: "healing",
      healingAtSlotLevel: {
        6: dice("70"),
        7: dice("80"),
        8: dice("90"),
        9: dice("100"),
      },
    },
  },
  {
    name: "Healing Word",
    attack: {
      kind: "healing",
      healingAtSlotLevel: {
        1: dice("1d4 + MOD"),
        2: dice("2d4 + MOD"),
        3: dice("3d4 + MOD"),
        4: dice("4d4 + MOD"),
        5: dice("5d4 + MOD"),
        6: dice("6d4 + MOD"),
        7: dice("7d4 + MOD"),
        8: dice("8d4 + MOD"),
        9: dice("9d4 + MOD"),
      },
    },
  },
  {
    name: "Heat Metal",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "fire"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            2: dice("2d8"),
            3: dice("3d8"),
            4: dice("4d8"),
            5: dice("5d8"),
            6: dice("6d8"),
            7: dice("7d8"),
            8: dice("8d8"),
            9: dice("9d8"),
          },
        },
      },
      saveType: ref("abilityScores", "con"),
      effectOnSave: "special",
    },
  },
  {
    name: "Hellish Rebuke",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "fire"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            1: dice("2d10"),
            2: dice("3d10"),
            3: dice("4d10"),
            4: dice("5d10"),
            5: dice("6d10"),
            6: dice("7d10"),
            7: dice("8d10"),
            8: dice("9d10"),
            9: dice("10d10"),
          },
        },
      },
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Hold Monster",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Hold Person",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Hypnotic Pattern",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Ice Storm",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "bludgeoning"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            4: dice("2d8 + 4d6"),
            5: dice("3d8 + 4d6"),
            6: dice("4d8 + 4d6"),
            7: dice("5d8 + 4d6"),
            8: dice("6d8 + 4d6"),
            9: dice("7d8 + 4d6"),
          },
        },
      },
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Imprisonment",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Incendiary Cloud",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "fire"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            8: dice("10d8"),
          },
        },
      },
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Inflict Wounds",
    attack: {
      kind: "melee",
      damage: {
        damageType: ref("damageTypes", "necrotic"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            1: dice("3d10"),
            2: dice("4d10"),
            3: dice("5d10"),
            4: dice("6d10"),
            5: dice("7d10"),
            6: dice("8d10"),
            7: dice("9d10"),
            8: dice("10d10"),
            9: dice("11d10"),
          },
        },
      },
    },
  },
  {
    name: "Insect Plague",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "piercing"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            5: dice("4d10"),
            6: dice("5d10"),
            7: dice("6d10"),
            8: dice("7d10"),
            9: dice("8d10"),
          },
        },
      },
      saveType: ref("abilityScores", "con"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Light",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Lightning Bolt",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "lightning"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            3: dice("8d6"),
            4: dice("9d6"),
            5: dice("10d6"),
            6: dice("11d6"),
            7: dice("12d6"),
            8: dice("13d6"),
            9: dice("14d6"),
          },
        },
      },
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Magic Circle",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "cha"),
      effectOnSave: "special",
    },
  },
  {
    name: "Magic Jar",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "cha"),
      effectOnSave: "special",
    },
  },
  {
    name: "Mass Cure Wounds",
    attack: {
      kind: "healing",
      healingAtSlotLevel: {
        5: dice("3d8 + MOD"),
        6: dice("4d8 + MOD"),
        7: dice("5d8 + MOD"),
        8: dice("6d8 + MOD"),
        9: dice("7d8 + MOD"),
      },
    },
  },
  {
    name: "Mass Heal",
    attack: {
      kind: "healing",
      healingAtSlotLevel: {
        9: dice("700"),
      },
    },
  },
  {
    name: "Mass Healing Word",
    attack: {
      kind: "healing",
      healingAtSlotLevel: {
        3: dice("1d4 + MOD"),
        4: dice("2d4 + MOD"),
        5: dice("3d4 + MOD"),
        6: dice("4d4 + MOD"),
        7: dice("5d4 + MOD"),
        8: dice("6d4 + MOD"),
        9: dice("7d4 + MOD"),
      },
    },
  },
  {
    name: "Mass Suggestion",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Meteor Swarm",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "fire"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            9: dice("20d6 + 20d6"),
          },
        },
      },
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Modify Memory",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Moonbeam",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "radiant"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            2: dice("2d10"),
            3: dice("3d10"),
            4: dice("4d10"),
            5: dice("5d10"),
            6: dice("6d10"),
            7: dice("7d10"),
            8: dice("8d10"),
            9: dice("9d10"),
          },
        },
      },
      saveType: ref("abilityScores", "con"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Phantasmal Killer",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "psychic"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            4: dice("4d10"),
          },
        },
      },
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Planar Binding",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "cha"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Plane Shift",
    attack: {
      kind: "melee",
    },
  },
  {
    name: "Poison Spray",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "poison"),
        damageProgression: {
          kind: "cantrip",
          damageAtCharacterLevel: {
            1: dice("1d12"),
            5: dice("2d12"),
            11: dice("3d12"),
            17: dice("4d12"),
          },
        },
      },
      saveType: ref("abilityScores", "con"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Polymorph",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Prayer of Healing",
    attack: {
      kind: "healing",
      healingAtSlotLevel: {
        2: dice("2d8 + MOD"),
        3: dice("3d8 + MOD"),
        4: dice("4d8 + MOD"),
        5: dice("5d8 + MOD"),
        6: dice("6d8 + MOD"),
        7: dice("7d8 + MOD"),
        8: dice("8d8 + MOD"),
        9: dice("9d8 + MOD"),
      },
    },
  },
  {
    name: "Prismatic Spray",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "undefined"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            7: dice("10d6"),
          },
        },
      },
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "special",
    },
  },
  {
    name: "Produce Flame",
    attack: {
      kind: "ranged",
      damage: {
        damageType: ref("damageTypes", "fire"),
        damageProgression: {
          kind: "cantrip",
          damageAtCharacterLevel: {
            1: dice("1d8"),
            5: dice("2d8"),
            11: dice("3d8"),
            17: dice("4d8"),
          },
        },
      },
    },
  },
  {
    name: "Ray of Enfeeblement",
    attack: {
      kind: "ranged",
    },
  },
  {
    name: "Ray of Frost",
    attack: {
      kind: "ranged",
      damage: {
        damageType: ref("damageTypes", "cold"),
        damageProgression: {
          kind: "cantrip",
          damageAtCharacterLevel: {
            1: dice("1d8"),
            5: dice("2d8"),
            11: dice("3d8"),
            17: dice("4d8"),
          },
        },
      },
    },
  },
  {
    name: "Regenerate",
    attack: {
      kind: "healing",
      healingAtSlotLevel: {
        7: dice("4d8 + 15"),
      },
    },
  },
  {
    name: "Reverse Gravity",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "special",
    },
  },
  {
    name: "Sacred Flame",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "radiant"),
        damageProgression: {
          kind: "cantrip",
          damageAtCharacterLevel: {
            1: dice("1d8"),
            5: dice("2d8"),
            11: dice("3d8"),
            17: dice("4d8"),
          },
        },
      },
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Scrying",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Shatter",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "thunder"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            2: dice("3d8"),
            3: dice("4d8"),
            4: dice("5d8"),
            5: dice("6d8"),
            6: dice("7d8"),
            7: dice("8d8"),
            8: dice("9d8"),
            9: dice("10d8"),
          },
        },
      },
      saveType: ref("abilityScores", "con"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Shocking Grasp",
    attack: {
      kind: "melee",
      damage: {
        damageType: ref("damageTypes", "lightning"),
        damageProgression: {
          kind: "cantrip",
          damageAtCharacterLevel: {
            1: dice("1d8"),
            5: dice("2d8"),
            11: dice("3d8"),
            17: dice("4d8"),
          },
        },
      },
    },
  },
  {
    name: "Slow",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Spiritual Weapon",
    attack: {
      kind: "melee",
      damage: {
        damageType: ref("damageTypes", "force"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            2: dice("1d8 + MOD"),
            3: dice("1d8 + MOD"),
            4: dice("2d8 + MOD"),
            5: dice("2d8 + MOD"),
            6: dice("3d8 + MOD"),
            7: dice("3d8 + MOD"),
            8: dice("4d8 + MOD"),
            9: dice("4d8 + MOD"),
          },
        },
      },
    },
  },
  {
    name: "Stinking Cloud",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "con"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Storm of Vengeance",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "thunder"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            9: dice("2d6"),
          },
        },
      },
      saveType: ref("abilityScores", "con"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Suggestion",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Sunbeam",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "radiant"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            6: dice("6d8"),
          },
        },
      },
      saveType: ref("abilityScores", "con"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Sunburst",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "radiant"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            8: dice("12d6"),
          },
        },
      },
      saveType: ref("abilityScores", "con"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Thunderwave",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "thunder"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            1: dice("2d8"),
            2: dice("3d8"),
            3: dice("4d8"),
            4: dice("5d8"),
            5: dice("6d8"),
            6: dice("7d8"),
            7: dice("8d8"),
            8: dice("9d8"),
            9: dice("10d8"),
          },
        },
      },
      saveType: ref("abilityScores", "con"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Vampiric Touch",
    attack: {
      kind: "melee",
      damage: {
        damageType: ref("damageTypes", "necrotic"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            3: dice("3d6"),
            4: dice("4d6"),
            5: dice("5d6"),
            6: dice("6d6"),
            7: dice("7d6"),
            8: dice("8d6"),
            9: dice("9d6"),
          },
        },
      },
    },
  },
  {
    name: "Vicious Mockery",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "psychic"),
        damageProgression: {
          kind: "cantrip",
          damageAtCharacterLevel: {
            1: dice("1d4"),
            5: dice("2d4"),
            11: dice("3d4"),
            17: dice("4d4"),
          },
        },
      },
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Wall of Fire",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "fire"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            4: dice("5d8"),
          },
        },
      },
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Wall of Ice",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "cold"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            6: dice("10d6"),
            7: dice("12d6"),
            8: dice("14d6"),
            9: dice("16d6"),
          },
        },
      },
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Wall of Thorns",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "piercing"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            6: dice("7d8"),
            7: dice("8d8"),
            8: dice("9d8"),
            9: dice("10d8"),
          },
        },
      },
      saveType: ref("abilityScores", "dex"),
      effectOnSave: "halfDamage",
    },
  },
  {
    name: "Weird",
    attack: {
      kind: "savingThrow",
      saveType: ref("abilityScores", "wis"),
      effectOnSave: "noEffect",
    },
  },
  {
    name: "Wind Wall",
    attack: {
      kind: "savingThrow",
      damage: {
        damageType: ref("damageTypes", "bludgeoning"),
        damageProgression: {
          kind: "levelled",
          damageAtSlotLevel: {
            3: dice("3d8"),
          },
        },
      },
      saveType: ref("abilityScores", "str"),
      effectOnSave: "halfDamage",
    },
  },
];
