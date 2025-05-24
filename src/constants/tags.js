// Base tag enum
export const Tags = Object.freeze({
  // Plumber
  PIPE_INSTALLATION: 'pipe installation',
  LEAK_REPAIR: 'leak repair',
  WATER_HEATER: 'water heater',
  BATHROOM_SETUP: 'bathroom setup',
  DRAIN_CLEANING: 'drain cleaning',

  // Electrician
  WIRING: 'wiring',
  LIGHTING: 'lighting',
  CIRCUIT_BREAKER: 'circuit breaker',
  ELECTRICAL_REPAIR: 'electrical repair',
  PANEL_UPGRADE: 'panel upgrade',

  // Painter
  WALL_PAINTING: 'wall painting',
  INTERIOR: 'interior',
  EXTERIOR: 'exterior',
  SPRAY_PAINT: 'spray paint',
  COLOR_MATCHING: 'color matching',

  // Carpenter
  WOODWORKING: 'woodworking',
  CUSTOM_FURNITURE: 'custom furniture',
  CABINETRY: 'cabinetry',
  DOOR_REPAIR: 'door repair',
  SHELVING: 'shelving',

  // Tiler
  FLOOR_TILING: 'floor tiling',
  WALL_TILING: 'wall tiling',
  GROUT_REPAIR: 'grout repair',
  CERAMIC: 'ceramic',
  MOSAIC: 'mosaic',

  // Cleaner
  DEEP_CLEANING: 'deep cleaning',
  MOVE_OUT_CLEANING: 'move-out cleaning',
  CARPET_CLEANING: 'carpet cleaning',
  DISINFECTION: 'disinfection',
  WINDOW_CLEANING: 'window cleaning',

  // Plasterer
  WALL_FINISHING: 'wall finishing',
  DRYWALL: 'drywall',
  CEILING_WORK: 'ceiling work',
  SKIM_COATING: 'skim coating',
  PATCH_REPAIR: 'patch repair',

  // Aluminum and Glass Technician
  GLASS_REPAIR: 'glass repair',
  WINDOW_INSTALLATION: 'window installation',
  SHOWER_ENCLOSURES: 'shower enclosures',
  ALUMINUM_FRAMES: 'aluminum frames',
  SLIDING_DOORS: 'sliding doors',
});

export const TagValues = Object.values(Tags);

export const TagsByCraft = {
  Plumber: [
    Tags.PIPE_INSTALLATION,
    Tags.LEAK_REPAIR,
    Tags.WATER_HEATER,
    Tags.BATHROOM_SETUP,
    Tags.DRAIN_CLEANING,
  ],
  Electrician: [
    Tags.WIRING,
    Tags.LIGHTING,
    Tags.CIRCUIT_BREAKER,
    Tags.ELECTRICAL_REPAIR,
    Tags.PANEL_UPGRADE,
  ],
  Painter: [
    Tags.WALL_PAINTING,
    Tags.INTERIOR,
    Tags.EXTERIOR,
    Tags.SPRAY_PAINT,
    Tags.COLOR_MATCHING,
  ],
  Carpenter: [
    Tags.WOODWORKING,
    Tags.CUSTOM_FURNITURE,
    Tags.CABINETRY,
    Tags.DOOR_REPAIR,
    Tags.SHELVING,
  ],
  Tiler: [
    Tags.FLOOR_TILING,
    Tags.WALL_TILING,
    Tags.GROUT_REPAIR,
    Tags.CERAMIC,
    Tags.MOSAIC,
  ],
  Cleaner: [
    Tags.DEEP_CLEANING,
    Tags.MOVE_OUT_CLEANING,
    Tags.CARPET_CLEANING,
    Tags.DISINFECTION,
    Tags.WINDOW_CLEANING,
  ],
  Plasterer: [
    Tags.WALL_FINISHING,
    Tags.DRYWALL,
    Tags.CEILING_WORK,
    Tags.SKIM_COATING,
    Tags.PATCH_REPAIR,
  ],
  'Aluminum and Glass Technician': [
    Tags.GLASS_REPAIR,
    Tags.WINDOW_INSTALLATION,
    Tags.SHOWER_ENCLOSURES,
    Tags.ALUMINUM_FRAMES,
    Tags.SLIDING_DOORS,
  ],
};

export const TagToCraft = Object.entries(TagsByCraft).reduce(
  (acc, [craft, tagList]) => {
    tagList.forEach(tag => {
      acc[tag] = craft;
    });
    return acc;
  },
  {},
);
