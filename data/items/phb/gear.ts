import { Entry } from "$db/resolver.ts";
import { GearItem, StackItem } from "$collections/items/collection.ts";
import { cost, md, ref, source } from "$helpers";

type GearData =
  & Pick<Entry<GearItem>, "id" | "name" | "cost" | "weight" | "desc">
  & Partial<Pick<Entry<GearItem>, "tags">>;

function createGear(data: GearData): Entry<GearItem> {
  return {
    ...data,
    kind: "gear",
    source: source("PHB2024", 223),
    tags: data.tags ?? [],
  };
}

type StackData = Omit<Entry<StackItem>, "kind" | "item" | "source" | "tags"> & {
  item: string;
};

function createAmmoStack({ item, ...data }: StackData): Entry<StackItem> {
  return {
    kind: "stack",
    item: ref("items", item),
    source: source("PHB2024", 222),
    tags: ["Ammunition"],
    ...data,
  };
}

export const gear: Entry<GearItem | StackItem>[] = [
  createGear({
    id: "acid",
    name: "Acid",
    cost: cost("25 gp"),
    weight: 1,
    desc: md`
      When you take the Attack action, you can replace one of your attacks with throwing a vial of
      Acid. Target one creature or object you can see within 20 feet of yourself. The target must
      succeed on a Dexterity saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus)
      or take 2d6 Acid damage.
    `,
  }),
  createGear({
    id: "alchemistsFire",
    name: "Alchemist's Fire",
    cost: cost("50 gp"),
    weight: 1,
    desc: md`
      When you take the Attack action, you can replace one of your attacks with throwing a flask of
      Alchemist's Fire. Target one creature or object you can see within 20 feet of yourself. The
      target must succeed on a Dexterity saving throw (DC 8 plus your Dexterity modifier and
      Proficiency Bonus) or take 1d4 Fire damage and start burning.
    `,
  }),
  createGear({
    id: "amulet",
    name: "Amulet",
    cost: cost("5 gp"),
    weight: 1,
    desc: md`
      A Holy Symbol takes one of the forms in the Holy Symbol table and is bejeweled or painted to
      channel divine magic. A cleric or Paladin can use a Holy Symbol as a Spellcasting Focus.

      The table indicates whether a Holy Symbol needs to be held, worn, or borne on fabric (Such as
      a tabard or banner) or a Shield.
    `,
    tags: ["Holy Symbol", "Spellcasting Focus"],
  }),
  createGear({
    id: "antitoxin",
    name: "Antitoxin",
    cost: cost("50 gp"),
    weight: 0,
    desc: md`
      As a Bonus Action, you can drink a vial of Antitoxin to gain Advantage on saving throws to
      avoid or end the Poisoned condition for 1 hour.
    `,
  }),
  createGear({
    id: "arrow",
    name: "Arrow",
    cost: cost("5 cp"),
    weight: 0.05,
    desc: md`
      Ammunition is required by a weapon that has the Ammunition property. A weapon's description
      specifies the type of ammunition used by the weapon. The Ammunition table lists the different
      types and the amount you get when you buy them. The table also lists the item that is
      typically used to store each type; storage must be bought separately.  
    `,
    tags: ["Ammunition"],
  }),
  createAmmoStack({
    id: "arrows",
    name: "Arrows",
    item: "arrow",
    quantity: 20,
    weight: 1,
    cost: cost("1 gp"),
  }),
  createGear({
    id: "backpack",
    name: "Backpack",
    cost: cost("2 gp"),
    weight: 5,
    desc: md`
      A Backpack holds up to 30 pounds within 1 cubic foot. It can also serve as a saddlebag.
    `,
  }),
  createGear({
    id: "ballBearings",
    name: "Ball Bearings",
    cost: cost("1 gp"),
    weight: 2,
    desc: md`
      As a Utilize action, you can spill Ball Bearings from their pouch. They spread to cover a
      level, 10-foot-square area within 10 feet of yourself. A creature that enters this area for
      the first time on a turn must succeed on a DC 10 Dexterity saving throw or have the Prone
      condition. It takes 10 minutes to recover the Ball Bearings.
    `,
  }),
  createGear({
    id: "barrel",
    name: "Barrel",
    cost: cost("2 gp"),
    weight: 70,
    desc: md`
      A Barrel holds up to 40 gallons of liquid or up to 4 cubic feet of dry goods.
    `,
  }),
  createGear({
    id: "basket",
    name: "Basket",
    cost: cost("4 sp"),
    weight: 2,
    desc: md`
      A Basket holds up to 40 pounds within 2 cubic feet.
    `,
  }),
  createGear({
    id: "bedroll",
    name: "Bedroll",
    cost: cost("1 gp"),
    weight: 7,
    desc: md`
      A Bedroll sleeps one Small or Medium creature. While in a Bedroll, you automatically succeed
      on saving throws against extreme cold (see the Dungeon Master's Guide).
    `,
  }),
  createGear({
    id: "bell",
    name: "Bell",
    cost: cost("1 gp"),
    weight: 0,
    desc: md`
      When rung as a Utilize action, a Bell produces a sound that can be heard up to 60 feet away.
    `,
  }),
  createGear({
    id: "blanket",
    name: "Blanket",
    cost: cost("5 sp"),
    weight: 3,
    desc: md`
      While wrapped in a blanket, you have Advantage on saving throws against extreme cold (see the
      Dungeon Master's Guide).
    `,
  }),
  createGear({
    id: "blockAndTackle",
    name: "Block and Tackle",
    cost: cost("1 gp"),
    weight: 5,
    desc: md`
      A Block and Tackle allows you to hoist up to four times the weight you can normally lift.
    `,
  }),
  createGear({
    id: "bolt",
    name: "Bolt",
    cost: cost("5 cp"),
    weight: 0.075,
    desc: md`
      Ammunition is required by a weapon that has the Ammunition property. A weapon's description
      specifies the type of ammunition used by the weapon. The Ammunition table lists the different
      types and the amount you get when you buy them. The table also lists the item that is
      typically used to store each type; storage must be bought separately.  
    `,
    tags: ["Ammunition"],
  }),
  createAmmoStack({
    id: "bolts",
    name: "Bolts",
    item: "bolt",
    quantity: 20,
    weight: 1.5,
    cost: cost("1 gp"),
  }),
  createGear({
    id: "book",
    name: "Book",
    cost: cost("25 gp"),
    weight: 5,
    desc: md`
      A Book contains fiction or nonfiction. If you consult an accurate nonfiction Book about its
      topic, you gain a +5 bonus to Intelligence (Arcana, History, Nature, or Religion) checks you
      make about that topic.
    `,
  }),
  createGear({
    id: "bottleGlass",
    name: "Bottle, Glass",
    cost: cost("2 gp"),
    weight: 2,
    desc: md`
      A Glass Bottle holds up to 1½ pints.
    `,
  }),
  createGear({
    id: "bucket",
    name: "Bucket",
    cost: cost("5 cp"),
    weight: 2,
    desc: md`
      A Bucket holds up to half a cubic foot of contents.
    `,
  }),
  createGear({
    id: "bulletFirearm",
    name: "Bullet, Firearm",
    cost: cost("3 sp"),
    weight: 0.2,
    desc: md`
      Ammunition is required by a weapon that has the Ammunition property. A weapon's description
      specifies the type of ammunition used by the weapon. The Ammunition table lists the different
      types and the amount you get when you buy them. The table also lists the item that is
      typically used to store each type; storage must be bought separately.  
    `,
    tags: ["Ammunition"],
  }),
  createAmmoStack({
    id: "bulletsFirearm",
    name: "Bullets, Firearm",
    item: "bulletFirearm",
    quantity: 10,
    weight: 2,
    cost: cost("3 gp"),
  }),
  createGear({
    id: "bulletSling",
    name: "Bullet, Sling",
    cost: cost("0.2 cp"),
    weight: 0.075,
    desc: md`
      Ammunition is required by a weapon that has the Ammunition property. A weapon's description
      specifies the type of ammunition used by the weapon. The Ammunition table lists the different
      types and the amount you get when you buy them. The table also lists the item that is
      typically used to store each type; storage must be bought separately.  
    `,
    tags: ["Ammunition"],
  }),
  createAmmoStack({
    id: "bulletsSling",
    name: "Bullets, Sling",
    item: "bulletSling",
    quantity: 20,
    weight: 1.5,
    cost: cost("4 cp"),
  }),
  createGear({
    id: "caltrops",
    name: "Caltrops",
    cost: cost("1 gp"),
    weight: 2,
    desc: md`
      As a Utilize action, you can spread Caltrops from their bag to cover a 5-foot-square area
      within 5 feet of yourself. A creature that enters this area for the first time on a turn must
      succeed on a DC 15 Dexterity saving throw or take 1 Piercing damage and have its Speed reduced
      to 0 until the start of its next turn. It takes 10 minutes to recover the Caltrops.
    `,
  }),
  createGear({
    id: "candle",
    name: "Candle",
    cost: cost("1 cp"),
    weight: 0,
    desc: md`
      For 1 hour, a lit Candle sheds Bright Light in a 5-foot radius and Dim Light for an additional
      5 feet.
    `,
    tags: ["Light Source"],
  }),
  createGear({
    id: "caseCrossbowBolt",
    name: "Case, Crossbow Bolt",
    cost: cost("1 gp"),
    weight: 1,
    desc: md`
      A Crossbow Bolt Case holds up to 20 Bolts.
    `,
  }),
  createGear({
    id: "caseMapOrScroll",
    name: "Case, Map or Scroll",
    cost: cost("1 gp"),
    weight: 1,
    desc: md`
      A Map or Scroll Case holds up to 10 sheets of paper or 5 sheets of parchment.
    `,
  }),
  createGear({
    id: "chain",
    name: "Chain",
    cost: cost("5 gp"),
    weight: 10,
    desc: md`
      As a Utilize action, you can wrap a Chain around an unwilling creature within 5 feet of
      yourself that has the Grappled, Incapacitated, or Restrained condition if you succeed on a DC
      13 Strength (Athletics) check. If the creature's legs are bound, the creature has the
      Restrained condition until it escapes. Escaping the Chain requires the creature to make a
      successful DC 18 Dexterity (Acrobatics) check as an action. Bursting the Chain requires a
      successful DC 20 Strength (Athletics) check as an action.
    `,
  }),
  createGear({
    id: "chest",
    name: "Chest",
    cost: cost("5 gp"),
    weight: 25,
    desc: md`
      A Chest holds up to 12 cubic feet of contents.
    `,
  }),
  createGear({
    id: "clothesFine",
    name: "Clothes, Fine",
    cost: cost("15 gp"),
    weight: 6,
    desc: md`
      Fine Clothes are made of expensive fabrics and adorned with expertly crafted details. Some
      events and locations admit only people wearing these clothes.
    `,
    tags: ["Clothing"],
  }),
  createGear({
    id: "clothesTravelers",
    name: "Clothes, Traveler's",
    cost: cost("2 gp"),
    weight: 4,
    desc: md`
      Traveler's Clothes are resilient garments designed for travel in various environments.
    `,
    tags: ["Clothing"],
  }),
  createGear({
    id: "componentPouch",
    name: "Component Pouch",
    cost: cost("25 gp"),
    weight: 2,
    desc: md`
      A Component Pouch is watertight and filled with compartments that hold all the free Material
      components of your spells.
    `,
  }),
  createGear({
    id: "costume",
    name: "Costume",
    cost: cost("5 gp"),
    weight: 3,
    desc: md`
      While wearing a Costume, you have Advantage on any ability check you make to impersonate the
      person or type of person it represents.
    `,
    tags: ["Clothing"],
  }),
  createGear({
    id: "crowbar",
    name: "Crowbar",
    cost: cost("2 gp"),
    weight: 5,
    desc: md`
      Using a Crowbar gives you Advantage on Strength checks where the Crowbar's leverage can be
      applied.
    `,
  }),
  createGear({
    id: "crystal",
    name: "Crystal",
    cost: cost("10 gp"),
    weight: 1,
    desc: md`
      An Arcane Focus takes a specific form and is bejeweled or carved to channel arcane magic. A
      Sorcerer, Warlock, or Wizard can use such an item as a Spellcasting Focus.
    `,
    tags: ["Arcane Focus", "Spellcasting Focus"],
  }),
  createGear({
    id: "emblem",
    name: "Emblem",
    cost: cost("5 gp"),
    weight: 0,
    desc: md`
      A Holy Symbol takes one of the forms in the Holy Symbol table and is bejeweled or painted to
      channel divine magic. A cleric or Paladin can use a Holy Symbol as a Spellcasting Focus.

      The table indicates whether a Holy Symbol needs to be held, worn, or borne on fabric (Such as
      a tabard or banner) or a Shield.
    `,
    tags: ["Holy Symbol", "Spellcasting Focus"],
  }),
  createGear({
    id: "flask",
    name: "Flask",
    cost: cost("2 cp"),
    weight: 1,
    desc: md`
      A Flask holds up to 1 pint.
    `,
  }),
  createGear({
    id: "grapplingHook",
    name: "Grappling Hook",
    cost: cost("2 gp"),
    weight: 4,
    desc: md`
      As a Utilize action, you can throw the Grappling Hook at a railing, a ledge, or another catch
      within 50 feet of yourself, and the hook catches on if you succeed on a DC 13 Dexterity
      (Acrobatics) check. If you tied a Rope to the hook, you can then climb it.
    `,
  }),
  createGear({
    id: "healersKit",
    name: "Healer's Kit",
    cost: cost("5 gp"),
    weight: 3,
    desc: md`
      A Healer's Kit has ten uses. As a Utilize action, you can expend one of its uses to stabilize
      an Unconscious creature that has 0 Hit Points without needing to make a Wisdom (Medicine)
      check.
    `,
  }),
  createGear({
    id: "holyWater",
    name: "Holy Water",
    cost: cost("25 gp"),
    weight: 1,
    desc: md`
      When you take the Attack action, you can replace one of your attacks with throwing a flask of
      Holy Water. Target one creature you can see within 20 feet of yourself. The target must
      succeed on a Dexterity saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus)
      or take 2d8 Radiant damage if it is a Fiend or an Undead.
    `,
  }),
  createGear({
    id: "huntingTrap",
    name: "Hunting Trap",
    cost: cost("5 gp"),
    weight: 25,
    desc: md`
      As a Utilize action, you can set a Hunting Trap, which is a sawtooth steel ring that snaps
      shut when a creature steps on a pressure plate in the center. The trap is affixed by a heavy
      chain to an immobile object, such as a tree or a spike driven into the ground. A creature that
      steps on the plate must succeed on a DC 13 Dexterity saving throw or take 1d4 Piercing damage
      and have its Speed reduced to 0 until the start of its next turn. Thereafter, until the
      creature breaks free of the trap, its movement is limited by the length of the chain
      (typically 3 feet). A creature can use its action to make a DC 13 Strength (Athletics) check,
      freeing itself or another creature within its reach on a success. Each failed check deals 1
      Piercing damage to the trapped creature.
    `,
  }),
  createGear({
    id: "ink",
    name: "Ink",
    cost: cost("10 gp"),
    weight: 0,
    desc: md`
      Ink comes in a 1-ounce bottle, which provides enough ink to write about 500 pages.
    `,
  }),
  createGear({
    id: "inkPen",
    name: "Ink Pen",
    cost: cost("2 cp"),
    weight: 0,
    desc: md`
      Using Ink, an Ink Pen is used to write or draw.
    `,
  }),
  createGear({
    id: "jug",
    name: "Jug",
    cost: cost("2 cp"),
    weight: 4,
    desc: md`
      A Jug holds up to 1 gallon.
    `,
  }),
  createGear({
    id: "ladder",
    name: "Ladder",
    cost: cost("1 sp"),
    weight: 25,
    desc: md`
      A Ladder is 10 feet tall. You must climb to move up or down it.
    `,
  }),
  createGear({
    id: "lamp",
    name: "Lamp",
    cost: cost("5 sp"),
    weight: 1,
    desc: md`
      A Lamp burns Oil as fuel to cast Bright Light in a 15-foot radius and Dim Light for an
      additional 30 feet.
    `,
    tags: ["Light Source"],
  }),
  createGear({
    id: "lanternBullseye",
    name: "Lantern, Bullseye",
    cost: cost("10 gp"),
    weight: 1,
    desc: md`
      A Bullseye Lantern burns Oil as fuel to cast Bright Light in a 60-foot Cone and Dim Light for
      an additional 60 feet.
    `,
    tags: ["Light Source"],
  }),
  createGear({
    id: "lanternHooded",
    name: "Lantern, Hooded",
    cost: cost("5 gp"),
    weight: 1,
    desc: md`
      A Hooded Lantern burns Oil as fuel to cast Bright Light in a 30-foot radius and Dim Light for
      an additional 30 feet. As a Bonus Action, you can lower the hood, reducing the light to Dim
      Light in a 5-foot radius, or raise it again.
    `,
    tags: ["Light Source"],
  }),
  createGear({
    id: "lock",
    name: "Lock",
    cost: cost("10 gp"),
    weight: 1,
    desc: md`
      A Lock comes with a key. Without the key, a creature can use Thieves' Tools to pick this
      Lock with a successful DC 15 Dexterity (Sleight of Hand) check.
    `,
  }),
  createGear({
    id: "magnifyingGlass",
    name: "Magnifying Glass",
    cost: cost("100 gp"),
    weight: 0,
    desc: md`
      A Magnifying Glass grants Advantage on any ability check made to appraise or inspect a highly
      detailed item. Lighting a fire with a Magnifying Glass requires light as bright as sunlight to
      focus, tinder to ignite, and about 5 minutes for the fire to ignite.
    `,
  }),
  createGear({
    id: "manacles",
    name: "Manacles",
    cost: cost("2 gp"),
    weight: 6,
    desc: md`
      As a Utilize action, you can use Manacles to bind an unwilling Small or Medium creature within
      5 feet of yourself that has the Grappled, Incapacitated, or Restrained condition if you
      succeed on a DC 13 Dexterity (Sleight of Hand) check. While bound, a creature has Disadvantage
      on attack rolls, and the creature is Restrained if the Manacles are attached to a chain or
      hook that is fixed in place. Escaping the Manacles requires a successful DC 20 Dexterity
      (Sleight of Hand) check as an action. Bursting them requires a successful DC 25 Strength
      (Athletics) check as an action.

      Each set of Manacles comes with a key. Without the key, a creature can use Thieves' Tools to
      pick the Manacles' lock with a successful DC 15 Dexterity (Sleight of Hand) check.
      
    `,
  }),
  createGear({
    id: "map",
    name: "Map",
    cost: cost("1 gp"),
    weight: 0,
    desc: md`
      If you consult an accurate Map, you gain a +5 bonus to Wisdom (Survival) checks you make to
      find your way in the place represented on it.
    `,
  }),
  createGear({
    id: "mirror",
    name: "Mirror",
    cost: cost("5 gp"),
    weight: 0.5,
    desc: md`
      A handheld steel Mirror is useful for personal cosmetics but also for peeking around corners
      and reflecting light as a signal.
    `,
  }),
  createGear({
    id: "needle",
    name: "Needle",
    cost: cost("2 cp"),
    weight: 0.02,
    desc: md`
      Ammunition is required by a weapon that has the Ammunition property. A weapon's description
      specifies the type of ammunition used by the weapon. The Ammunition table lists the different
      types and the amount you get when you buy them. The table also lists the item that is
      typically used to store each type; storage must be bought separately.  
    `,
    tags: ["Ammunition"],
  }),
  createAmmoStack({
    id: "needles",
    name: "Needles",
    item: "needle",
    quantity: 50,
    weight: 1,
    cost: cost("1 gp"),
  }),
  createGear({
    id: "net",
    name: "Net",
    cost: cost("1 gp"),
    weight: 3,
    desc: md`
      When you take the Attack action, you can replace one of your attacks with throwing a Net.
      Target a creature you can see within 15 feet of yourself. The target must succeed on a
      Dexterity saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus) or have the
      Restrained condition until it escapes. The target succeeds automatically if it is Huge or
      larger.

      To escape, the target or a creature within 5 feet of it must take an action to make a DC 10
      Strength (Athletics) check, freeing the Restrained creature on a success. Destroying the Net
      (AC 10; 5 HP; Immunity to Bludgeoning, Poison, and Psychic damage) also frees the target,
      ending the effect.
    `,
  }),
  createGear({
    id: "oil",
    name: "Oil",
    cost: cost("1 sp"),
    weight: 1,
    desc: md`
      You can douse a creature, object, or space with Oil or use it as fuel, as detailed below.

      **Dousing a Creature or an Object.** When you take the Attack action, you can replace one of
      your attacks with throwing an Oil flask. Target one creature or object within 20 feet of
      yourself. The target must succeed on a Dexterity saving throw (DC 8 plus your Dexterity
      modifier and Proficiency Bonus) or be covered in oil. If the target takes Fire damage before
      the oil dries (after 1 minute), the target takes an extra 5 Fire damage from burning oil.

      **Dousing a Space.** You can take the Utilize action to pour an Oil flask on level ground to
      cover a 5-foot-square area within 5 feet of yourself. If lit, the oil burns until the end of
      the turn 2 rounds from when the oil was lit (or 12 seconds) and deals 5 Fire damage to any
      creature that enters the area or ends its turn there. A creature can take this damage only
      once per turn.

      **Fuel.** Oil serves as fuel for Lamps and Lanterns. Once lit, a flask of Oil burns for 6
      hours in a Lamp or Lantern. That duration doesn't need to be consecutive; you can extinguish
      the burning Oil (as a Utilize action) and rekindle it again until it has burned for a total of
      6 hours.
    `,
  }),
  createGear({
    id: "orb",
    name: "Orb",
    cost: cost("20 gp"),
    weight: 3,
    desc: md`
      An Arcane Focus takes a specific form and is bejeweled or carved to channel arcane magic. A
      Sorcerer, Warlock, or Wizard can use such an item as a Spellcasting Focus.
    `,
    tags: ["Arcane Focus", "Spellcasting Focus"],
  }),
  createGear({
    id: "paper",
    name: "Paper",
    cost: cost("2 sp"),
    weight: 0,
    desc: md`
      One sheet of Paper can hold about 250 handwritten words.
    `,
  }),
  createGear({
    id: "parchment",
    name: "Parchment",
    cost: cost("1 sp"),
    weight: 0,
    desc: md`
      One sheet of Parchment can hold about 250 handwritten words.
    `,
  }),
  createGear({
    id: "perfume",
    name: "Perfume",
    cost: cost("5 gp"),
    weight: 0,
    desc: md`
      Perfume comes in a 4-ounce vial. For 1 hour after applying Perfume to yourself, you have
      Advantage on Charisma (Persuasion) checks made to influence an Indifferent Humanoid within 5
      feet of yourself.
    `,
  }),
  createGear({
    id: "poisonBasic",
    name: "Poison, Basic",
    cost: cost("100 gp"),
    weight: 0,
    desc: md`
      As a Bonus Action, you can use a vial of Basic Poison to coat one weapon or up to three pieces
      of ammunition. A creature that takes Piercing or Slashing damage from the poisoned weapon or
      ammunition takes an extra 1d4 Poison damage. Once applied, the poison retains potency for 1
      minute or until its damage is dealt, whichever comes first.
    `,
  }),
  createGear({
    id: "pole",
    name: "Pole",
    cost: cost("5 cp"),
    weight: 7,
    desc: md`
      A Pole is 10 feet long. You can use it to touch something up to 10 feet away. If you must make
      a Strength (Athletics) check as part of a High or Long Jump, you can use the Pole to vault,
      giving yourself Advantage on the check.      
    `,
  }),
  createGear({
    id: "potIron",
    name: "Pot, Iron",
    cost: cost("2 gp"),
    weight: 10,
    desc: md`
      An Iron Pot holds up to 1 gallon.
    `,
  }),
  createGear({
    id: "pouch",
    name: "Pouch",
    cost: cost("5 sp"),
    weight: 1,
    desc: md`
      A Pouch holds up to 6 pounds within one-fifth of a cubic foot.
    `,
  }),
  createGear({
    id: "quiver",
    name: "Quiver",
    cost: cost("1 gp"),
    weight: 1,
    desc: md`
      A Quiver holds up to 20 Arrows.
    `,
  }),
  createGear({
    id: "ramPortable",
    name: "Ram, Portable",
    cost: cost("4 gp"),
    weight: 35,
    desc: md`
      You can use a Portable Ram to break down doors. When doing so, you gain a +4 bonus to the
      Strength check. One other character can help you use the ram, giving you Advantage on this
      check.
    `,
  }),
  createGear({
    id: "rations",
    name: "Rations",
    cost: cost("5 sp"),
    weight: 2,
    desc: md`
      Rations consist of travel-ready food, including jerky, dried fruit, hardtack, and nuts. See
      "Malnutrition" for the risks of not eating.
    `,
  }),
  createGear({
    id: "reliquary",
    name: "Reliquary",
    cost: cost("5 gp"),
    weight: 2,
    desc: md`
      A Holy Symbol takes one of the forms in the Holy Symbol table and is bejeweled or painted to
      channel divine magic. A cleric or Paladin can use a Holy Symbol as a Spellcasting Focus.

      The table indicates whether a Holy Symbol needs to be held, worn, or borne on fabric (Such as
      a tabard or banner) or a Shield.
    `,
    tags: ["Holy Symbol", "Spellcasting Focus"],
  }),
  createGear({
    id: "robe",
    name: "Robe",
    cost: cost("1 gp"),
    weight: 4,
    desc: md`
      A Robe has vocational or ceremonial significance. Some events and locations admit only people
      wearing a Robe bearing certain colors or symbols.
    `,
    tags: ["Clothing"],
  }),
  createGear({
    id: "rod",
    name: "Rod",
    cost: cost("10 gp"),
    weight: 2,
    desc: md`
      An Arcane Focus takes a specific form and is bejeweled or carved to channel arcane magic. A
      Sorcerer, Warlock, or Wizard can use such an item as a Spellcasting Focus.
    `,
    tags: ["Arcane Focus", "Spellcasting Focus"],
  }),
  createGear({
    id: "rope",
    name: "Rope",
    cost: cost("1 gp"),
    weight: 5,
    desc: md`
      As a Utilize action, you can tie a knot with Rope if you succeed on a DC 10 Dexterity
      (Sleight of Hand) check. The Rope can be burst with a successful DC 20 Strength (Athletics)
      check.

      You can bind an unwilling creature with the Rope only if the creature has the Grappled,
      Incapacitated, or Restrained condition. If the creature's legs are bound, the creature has the
      Restrained condition until it escapes. Escaping the Rope requires the creature to make a
      successful DC 15 Dexterity (Acrobatics) check as an action.
    `,
  }),
  createGear({
    id: "sack",
    name: "Sack",
    cost: cost("1 cp"),
    weight: 0.5,
    desc: md`
      A Sack holds up to 30 pounds within 1 cubic foot.
    `,
  }),
  createGear({
    id: "shovel",
    name: "Shovel",
    cost: cost("2 gp"),
    weight: 5,
    desc: md`
      Working for 1 hour, you can use a Shovel to dig a hole that is 5 feet on each side in soil or
      similar material.
    `,
  }),
  createGear({
    id: "signalWhistle",
    name: "Signal Whistle",
    cost: cost("5 cp"),
    weight: 0,
    desc: md`
      When blown as a Utilize action, a Signal Whistle produces a sound that can be heard up to 600
      feet away.
    `,
  }),
  createGear({
    id: "spikesIron",
    name: "Spikes, Iron",
    cost: cost("1 gp"),
    weight: 5,
    desc: md`
      Iron Spikes come in bundles of ten. As a Utilize action, you can use a blunt object, such as
      a Light Hammer, to hammer a spike into wood, earth, or a similar material. You can do so to
      jam a door shut or to then tie a Rope or Chain to the Spike.
    `,
  }),
  createGear({
    id: "sprigOfMistletoe",
    name: "Sprig of Mistletoe",
    cost: cost("1 gp"),
    weight: 0,
    desc: md`
      A Druidic Focus takes one of the forms in the Druidic Focuses table as is carved, tied with
      ribbon, or painted to channel primal magic. A Druid or Ranger can use such an object as a
      Spellcasting Focus.
    `,
    tags: ["Druidic Focus", "Spellcasting Focus"],
  }),
  createGear({
    id: "spyglass",
    name: "Spyglass",
    cost: cost("1000 gp"),
    weight: 1,
    desc: md`
      Objects viewed through a Spyglass are magnified to twice their size.
    `,
  }),
  createGear({
    id: "staff",
    name: "Staff",
    cost: cost("5 gp"),
    weight: 4,
    desc: md`
      An Arcane Focus takes a specific form and is bejeweled or carved to channel arcane magic. A
      Sorcerer, Warlock, or Wizard can use such an item as a Spellcasting Focus.
    `,
    tags: ["Arcane Focus", "Spellcasting Focus"],
  }),
  createGear({
    id: "string",
    name: "String",
    cost: cost("1 sp"),
    weight: 0,
    desc: md`
      String is 10 feet long. You can tie a knot in it as a Utilize action.
    `,
  }),
  createGear({
    id: "tent",
    name: "Tent",
    cost: cost("2 gp"),
    weight: 20,
    desc: md`
      A Tent sleeps up to two Small or Medium creatures.
    `,
  }),
  createGear({
    id: "tinderbox",
    name: "Tinderbox",
    cost: cost("5 sp"),
    weight: 1,
    desc: md`
      A Tinderbox is a small container holding flint, fire steel, and tinder (usually dry cloth
      soaked in light oil) used to kindle a fire. Using it to light a Candle, Lamp, Lantern, or
      Torch—or anything else with exposed fuel—takes a Bonus Action. Lighting any other fire takes 1 
      minute.
    `,
  }),
  createGear({
    id: "torch",
    name: "Torch",
    cost: cost("1 cp"),
    weight: 1,
    desc: md`
      A Torch burns for 1 hour, casting Bright Light in a 20-foot radius and Dim Light for an
      additional 20 feet. When you take the Attack action, you can attack with the Torch, using it
      as a Simple Melee weapon. On a hit, the target takes 1 Fire damage.
    `,
    tags: ["Light Source"],
  }),
  createGear({
    id: "vial",
    name: "Vial",
    cost: cost("1 gp"),
    weight: 0,
    desc: md`
      A Vial holds up to 4 ounces.
    `,
  }),
  createGear({
    id: "wand",
    name: "Wand",
    cost: cost("10 gp"),
    weight: 1,
    desc: md`
      An Arcane Focus takes a specific form and is bejeweled or carved to channel arcane magic. A
      Sorcerer, Warlock, or Wizard can use such an item as a Spellcasting Focus.
    `,
    tags: ["Arcane Focus", "Spellcasting Focus"],
  }),
  createGear({
    id: "waterskin",
    name: "Waterskin",
    cost: cost("2 gp"),
    weight: 5,
    desc: md`
      A Waterskin holds up to 4 pints. If you don't drink sufficient water, you risk dehydration.
    `,
  }),
  createGear({
    id: "woodenStaff",
    name: "Wooden Staff",
    cost: cost("5 gp"),
    weight: 4,
    desc: md`
      A Druidic Focus takes one of the forms in the Druidic Focuses table as is carved, tied with
      ribbon, or painted to channel primal magic. A Druid or Ranger can use such an object as a
      Spellcasting Focus.
    `,
    tags: ["Druidic Focus", "Spellcasting Focus"],
  }),
  createGear({
    id: "yewWand",
    name: "Yew Wand",
    cost: cost("10 gp"),
    weight: 1,
    desc: md`
      A Druidic Focus takes one of the forms in the Druidic Focuses table as is carved, tied with
      ribbon, or painted to channel primal magic. A Druid or Ranger can use such an object as a
      Spellcasting Focus.
    `,
    tags: ["Druidic Focus", "Spellcasting Focus"],
  }),
];
