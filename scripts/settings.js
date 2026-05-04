import { MODULE_ID } from "./quick-scene-tiler.js";
//const MODULE_ID = "quick-scene-tiler";

// Helper function for localization
/*const i18n = (key, data = {}) => {
  const localized = game.i18n.localize(key);
  return Object.entries(data).reduce((str, [k, v]) => 
    str.replace(`{${k}}`, v), localized);
};*/

/**
 * Register all module settings for Quick Scene Tiler
 * Called from Hooks.once("init")
 */
export function registerModuleSettings() {
  game.settings.register(MODULE_ID, "symmetricTiling", {
    name: game.i18n.localize("QUICKSCENETILER.settings.symmetricTiling.name"),
    hint: game.i18n.localize("QUICKSCENETILER.settings.symmetricTiling.hint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  
  // =========================================================================
  // TILE WIDTH SETTING
  // =========================================================================
  game.settings.register(MODULE_ID, "defaultTileWidth", {
    name: game.i18n.localize("QUICKSCENETILER.settings.tileWidth.name"),
    hint: game.i18n.localize("QUICKSCENETILER.settings.tileWidth.hint"),
    scope: "world",
    config: true,
    type: Number,
    default: 4096,
    range: {
      min: 256,
      max: 16384,
      step: 256
    }
  });

  // =========================================================================
  // TILE HEIGHT SETTING
  // =========================================================================
  game.settings.register(MODULE_ID, "defaultTileHeight", {
    name: game.i18n.localize("QUICKSCENETILER.settings.tileHeight.name"),
    hint: game.i18n.localize("QUICKSCENETILER.settings.tileHeight.hint"),
    scope: "world",
    config: true,
    type: Number,
    default: 4096,
    range: {
      min: 256,
      max: 16384,
      step: 256
    }
  });

  // =========================================================================
  // Z-LEVEL (ELEVATION) SETTING
  // =========================================================================
  game.settings.register(MODULE_ID, "defaultElevation", {
    name: game.i18n.localize("QUICKSCENETILER.settings.elevation.name"),
    hint: game.i18n.localize("QUICKSCENETILER.settings.elevation.hint"),
    scope: "world",
    config: true,
    type: Number,
    default: 0,
    range: {
      min: -50,
      max: 50,
      step: 1
    }
  });

   // =========================================================================
  // EXPORT TILES
  // =========================================================================
  /*game.settings.register(MODULE_ID, "defaultExportTiles", {
    name: game.i18n.localize("QUICKSCENETILER.settings.exportTiles.name"),
    hint: game.i18n.localize("QUICKSCENETILER.settings.exportTiles.hint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });*/

  // =========================================================================
  // BASE PATH SETTING
  // =========================================================================
  game.settings.register(MODULE_ID, "defaultBasePath", {
    name: game.i18n.localize("QUICKSCENETILER.settings.basePath.name"),
    hint: game.i18n.localize("QUICKSCENETILER.settings.basePath.hint"),
    scope: "world",
    config: true,
    type: String,
    default: "assets/scenetiles"
  });

  // =========================================================================
  // LOCK TILES SETTING
  // =========================================================================
  game.settings.register(MODULE_ID, "defaultLockTiles", {
    name: game.i18n.localize("QUICKSCENETILER.settings.lockTiles.name"),
    hint: game.i18n.localize("QUICKSCENETILER.settings.lockTiles.hint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
}

/**
 * Get all default settings as an object
 * @returns {Object} Object containing all default settings
 */
export function getDefaultSettings() {
  return {
    basePath: game.settings.get(MODULE_ID, "defaultBasePath") ?? "assets/scenetiles",
    tileWidth: game.settings.get(MODULE_ID, "defaultTileWidth") ?? 4096,
    tileHeight: game.settings.get(MODULE_ID, "defaultTileHeight") ?? 4096,
    elevation: game.settings.get(MODULE_ID, "defaultElevation") ?? 0,
    lockTiles: game.settings.get(MODULE_ID, "defaultLockTiles") ?? false,
    symmetricTiling: game.settings.get(MODULE_ID, "symmetricTiling") ?? true
  };
}

/**
 * Get a single setting value
 * @param {string} settingKey - The setting key
 * @returns {any} The setting value
 */
export function getSetting(settingKey) {
  return game.settings.get(MODULE_ID, settingKey);
}

/**
 * Update a single setting value
 * @param {string} settingKey - The setting key
 * @param {any} value - The new value
 */
export async function updateSetting(settingKey, value) {
  return await game.settings.set(MODULE_ID, settingKey, value);
}