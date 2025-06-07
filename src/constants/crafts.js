export const Crafts = Object.freeze({
  PLASTERER: 'Plasterer',
  PLUMBER: 'Plumber',
  ELECTRICIAN: 'Electrician',
  PAINTER: 'Painter',
  TILER: 'Tiler',
  CARPENTER: 'Carpenter',
  ALUMINUM_GLASS_TECHNICIAN: 'Aluminum and Glass Technician',
  CLEANER: 'Cleaner',
});

export const CraftList = Object.values(Crafts);

export const CraftIcons = {
  [Crafts.PLASTERER]: 'hammer-outline',
  [Crafts.PLUMBER]: 'water-outline',
  [Crafts.ELECTRICIAN]: 'flash-outline',
  [Crafts.PAINTER]: 'color-palette-outline',
  [Crafts.TILER]: 'grid-outline',
  [Crafts.CARPENTER]: 'construct-outline',
  [Crafts.ALUMINUM_GLASS_TECHNICIAN]: 'cube-outline',
  [Crafts.CLEANER]: 'broom-outline',
};
