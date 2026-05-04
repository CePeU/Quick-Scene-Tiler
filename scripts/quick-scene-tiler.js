/**
 * @fileOverview Quick Scene Tiler - A Foundry VTT module for exporting/importing scenes as tiled image sets
 * @module quick-scene-tiler
 * @version 1.0.0
 * 
 * Features:
 * - Export: Duplicate scene, split background into tiles, save tiles + walls + metadata as JSON
 * - Import: Load folder with tiles and JSON, reconstruct scene with correct coordinates
 * - FilePicker support for folder selection
 * - Spinner controls for tile dimensions and elevation
 * - Lock toggle for tiles
 * - PNG and WebP export with browser compatibility checking
 * - Localization support (EN/DE)
 * - Module settings for default values
 */

export const MODULE_ID = "quick-scene-tiler";

// Add at the top after imports
import { registerModuleSettings, getDefaultSettings, getSetting } from "./settings.js";

function qscDialog(){
        console.log("QST: Quick Scene Tiler has been initialized");
        
        const modeDialog = new Dialog({
          title: game.i18n.localize("QUICKSCENETILER.dialog.modeSelect.title"),
          content: `
            <p>${game.i18n.localize("QUICKSCENETILER.dialog.modeSelect.description")}</p>
            <div class="tile-macro-btn-row">
              <button type="button" data-mode="export">
                <i class="fas fa-file-export"></i> ${game.i18n.localize("QUICKSCENETILER.dialog.modeSelect.export")}
              </button>
            </div>
            <div class="tile-macro-btn-row">
              <button type="button" data-mode="import">
                <i class="fas fa-file-import"></i> ${game.i18n.localize("QUICKSCENETILER.dialog.modeSelect.import")}
              </button>
            </div>
          `,
          buttons: {},
          render: html => {
            html.find("button[data-mode='export']").click(() => {
              console.log("Export button clicked");
              modeDialog.close();
              openExportDialog();
            });
            
            html.find("button[data-mode='import']").click(() => {
              console.log("Import button clicked");
              modeDialog.close();
              openImportDialog();
            });
          }
        });
        
        modeDialog.render(true);
}

Hooks.once("init", () => {
  registerModuleSettings();
});

/**
 * SVG icon for the scene control tool
 * @type {string}
 */

/**
 * Register module settings on module initialization
 * @fires init
 */
/*
Hooks.once("init", () => {
  registerModuleSettings();
  console.log("QST: registered Module Settings")
});*/
/*
let major = 0;
Hooks.on("init", function () {
    //console.log("== This code runs once the Foundry VTT software begins its initialization workflow.");
    registerModuleSettings();
    console.log("QST: registered Module Settings")
    
    const version = game.version;  // e.g., "12.999"
    major = parseInt(version.split('.')[0]);  // 12 or 13
console.log("QST: Version: ",version," and major",major)
    // sheet and html are passed down to the following functions making sure the html of the respective button is changed
    if (major <= 12) {
/*
 * Register the scene control tool with Dfreds UI Extender
 * Creates the main UI button and mode selection dialog
 * @fires uiExtender.init
 /
console.log("QST: Branched into v12")
Hooks.once("uiExtender.init", (uiExtender) => {
  console.log("QST: Quick Scene Tiler has been initialized for v12");
  uiExtender.registerSceneControl({
    moduleId: MODULE_ID,
    name: "tiles",
    position: 99,
    tool: {
      name: game.i18n.localize("QUICKSCENETILER.tool.name"),
      title: game.i18n.localize("QUICKSCENETILER.tool.title"),
      icon: "quick-scene-tiler-icon",
      button: true,
      
      /**
       * Called when the tiles tool is activated
       * Opens the mode selection dialog (Export vs. Import)
       * @param {Event} event - The activation event
       * @param {boolean} active - Whether the tool is active
       /
      onClick: (event, active) => {
        qscDialog()
      }
    }
  });
});
    }


});

console.log("QST: Before branch major is: ",major)
if (major >= 13) {
      console.log("QST: Branched into v13")
/**
 * Register the scene control tool with Dfreds UI Extender
 * Creates the main UI button and mode selection dialog
 * @fires uiExtender.init
 /
Hooks.once("uiExtender.init", (uiExtender) => {
  console.log("QST: Quick Scene Tiler has been initialized for v13");
  uiExtender.registerSceneControl({
    moduleId: MODULE_ID,
    name: "tiles",
    tool: {
      name: game.i18n.localize("QUICKSCENETILER.tool.name"),
      title: game.i18n.localize("QUICKSCENETILER.tool.title"),
      icon: "quick-scene-tiler-icon",
      button: true,
      order: 99,
      
      /**
       * Called when the tiles tool is activated
       * Opens the mode selection dialog (Export vs. Import)
       * @param {Event} event - The activation event
       * @param {boolean} active - Whether the tool is active
       /
      onChange: (event, active) => {
        qscDialog()
      }
    }
  });
});
    };
*/
/**
 * Localizes a string key with optional placeholder replacements
 * @function
 * @param {string} key - The localization key (e.g., "QUICKSCENETILER.export.title")
 * @param {Object} [data={}] - Object containing placeholder values {key: value}
 * @returns {string} Localized string with placeholders replaced
 * @example
 * i18n("QUICKSCENETILER.notification.activating", { sceneName: "MyScene" })
 * // Returns: "New scene activated: MyScene"
 */
const i18n = (key, data = {}) => {
  const localized = game.i18n.localize(key);
  return Object.entries(data).reduce((str, [k, v]) => 
    str.replace(`{${k}}`, v), localized);
};

/**
 * Register the scene control tool with Dfreds UI Extender
 * Creates the main UI button and mode selection dialog
 * @fires uiExtender.init
 */

Hooks.once("uiExtender.init", (uiExtender) => {
  console.log("QST: Quick Scene Tiler has been initialized");
  const version = game.version;  // e.g., "12.999"
  const major = parseInt(version.split('.')[0]);  // 12 or 13
  console.log("QST: Version: ",version," and major",major)
    // sheet and html are passed down to the following functions making sure the html of the respective button is changed
    if (major <= 12) {
    console.log("QST: Initialized for 12 minor: ",version)
    uiExtender.registerSceneControl({
    moduleId: MODULE_ID,
    name: "tiles",
    position: 99,
    tool: {
      name: game.i18n.localize("QUICKSCENETILER.tool.name"),
      title: game.i18n.localize("QUICKSCENETILER.tool.title"),
      icon:  "quick-scene-tiler-icon",   //"fas fa-th", //"quick-scene-tiler-icon",
      button: true,
      
      /**
       * Called when the tiles tool is activated
       * Opens the mode selection dialog (Export vs. Import)
       * @param {Event} event - The activation event
       * @param {boolean} active - Whether the tool is active
       */
      onClick: (event, active) => qscDialog()
      
    }
  });}
});

Hooks.once("uiExtender.init", (uiExtender) => {
  console.log("QST: Quick Scene Tiler has been initialized");
  const version = game.version;  // e.g., "12.999"
  const major = parseInt(version.split('.')[0]);  // 12 or 13
  console.log("QST: Version: ",version," and major",major)
    // sheet and html are passed down to the following functions making sure the html of the respective button is changed
  if (major >= 13) {
  console.log("QST: Initialized for v13 minor: ",version)
  uiExtender.registerSceneControl({
    moduleId: MODULE_ID,
    name: "tiles",
    tool: {
      name: game.i18n.localize("QUICKSCENETILER.tool.name"),
      title: game.i18n.localize("QUICKSCENETILER.tool.title"),
      icon: "quick-scene-tiler-icon",
      button: true,
      order: 99,
      
      /**
       * Called when the tiles tool is activated
       * Opens the mode selection dialog (Export vs. Import)
       * @param {Event} event - The activation event
       * @param {boolean} active - Whether the tool is active
       */
      onChange: (event, active) => {
        qscDialog()
      }
    }
  });}
});


// Helper: Probing for WebP support
function browserSupportsWebPExport() {
  try {
    const testCanvas = document.createElement("canvas");
    testCanvas.width = 1;
    testCanvas.height = 1;
    const dataUrl = testCanvas.toDataURL("image/webp");
    return dataUrl.startsWith("data:image/webp");
  } catch (e) {
    return false;
  }
}

/**
 * Compute minimum tile size along one axis given:
 * - imgSize: image length in pixels
 * - maxTileSize: maximum allowed tile size in pixels
 * Returns the smallest tile size that:
 *   - is ≤ maxTileSize
 *   - covers the image with minTiles tiles (all same size, rounded up to integer)
 */
function computeTileAxisDim(imgSize, maxTileSize) {
  imgSize = Math.max(1, Math.floor(imgSize));
  maxTileSize = Math.max(1, Math.floor(maxTileSize));

  // If max tile is already big enough to cover the whole axis in one tile
  if (imgSize <= maxTileSize) {
    return imgSize; // one tile fits exactly
  }

  // Step 1: minimum number of tiles needed
  const minTiles = Math.ceil(imgSize / maxTileSize);

  // Step 2: modulo remainder (pixels that don’t fit in full tiles)
  const remainder = imgSize % minTiles;

  // Step 3: base = throw away the remainder, then divide evenly
  const base = (imgSize - remainder) / minTiles;

  // Step 4: add 1 to get the smallest tile size that still fits
  // in minTiles, and always rounds up to integer size
  let tileSize = Math.floor(base + 1);

  // Enforce: we must still be ≥ the minimal size needed to cover
  tileSize = Math.max(tileSize, Math.ceil(imgSize / minTiles));

  // Finally, clamp to maxTileSize; if impossible, we simply use maxTileSize
  tileSize = Math.min(tileSize, maxTileSize);

  return tileSize;
}

/**
 * Loads an image from a given source URL
 * @async
 * @function
 * @param {string} src - The source URL of the image
 * @returns {Promise<HTMLImageElement>} Resolves to the loaded image element
 * @throws {Error} If the image fails to load
 */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload  = () => resolve(img);
    img.onerror = () => reject(new Error(`Bild konnte nicht geladen werden: ${src}`));
    img.src     = src;
  });
}

/**
 * Converts a string to a URL-safe slug
 * Removes special characters, converts to lowercase, replaces spaces with hyphens
 * @function
 * @param {string} [str=""] - The string to slugify
 * @returns {string} The slugified string, or "scene" if empty
 * @example
 * slugify("My Beautiful Scene") // Returns: "my-beautiful-scene"
 */
function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "scene";
}

/**
 * Ensures a directory exists, creates it if necessary
 * Recursively creates parent directories if needed
 * @async
 * @function
 * @param {string} source - The source (usually "data" for /data folder)
 * @param {string} targetPath - The full path to ensure exists
 * @throws {Error} If directory cannot be created
 */
async function ensureDirectory(source, targetPath) {
  try {
    await FilePicker.browse(source, targetPath);
  } catch (e) {
    ui.notifications.info(i18n("QUICKSCENETILER.notification.creatingDirectory", { path: targetPath }));
    await FilePicker.createDirectory(source, targetPath);
  }
}

// ============================================================================
// EXPORT DIALOG
// ============================================================================

/**
 * Opens the export dialog for splitting a scene into tiles
 * Validates that a scene with background image exists
 * Presents options for tile size, format, elevation, and storage location
 * @async
 * @function
 * @throws {string} Shows error notification if no scene or background found
 */
function openExportDialog() {
  if (!canvas.scene) {
    ui.notifications.error(game.i18n.localize("QUICKSCENETILER.notification.noScene"));
    return;
  }

  const scene = canvas.scene; // source scene init
  
  const bg    = scene.background ?? {};
  const bgSrc = bg.src || scene.img;

  if (!bgSrc) {
    ui.notifications.error(game.i18n.localize("QUICKSCENETILER.notification.noBackground"));
    return;
  }

  // Load defaults from module settings
  const defaults = getDefaultSettings();
  const defaultBasePath  = defaults.basePath;
  const defaultSubfolder = slugify(scene.name);
  const webPSupported    = browserSupportsWebPExport();
  let lockTiles          = defaults.lockTiles;
  let symmetricTiling    = defaults.symmetricTiling;

  let radioPNG = "checked"
  let radioWEBP = ""

  if (webPSupported) {
    radioPNG =""
    radioWEBP="checked"
  }
  
  const dialog = new Dialog({
    title: game.i18n.localize("QUICKSCENETILER.export.title"),
    content: `
      <form>

        <div class="form-group">
          <label>${game.i18n.localize("QUICKSCENETILER.export.format.label")}</label>
          <div class="format-row">
            <label>
              <input type="radio" name="tileFormat" value="png" ${radioPNG}/>
              ${game.i18n.localize("QUICKSCENETILER.export.format.png")}
            </label>
            <label>
              <input type="radio" name="tileFormat" value="webp" ${radioWEBP}/>
              ${game.i18n.localize("QUICKSCENETILER.export.format.webp")} ${!webPSupported ? game.i18n.localize("QUICKSCENETILER.export.format.webpUnsupported") : ""}
            </label>
          </div>
          ${!webPSupported
            ? `<div class="webp-warning">
                 <i class="fas fa-exclamation-triangle"></i>
                 ${game.i18n.localize("QUICKSCENETILER.export.format.warning")}
               </div>`
            : ""}
        </div>

        <div class="form-group">
          <label>${game.i18n.localize("QUICKSCENETILER.export.tileWidth.label")}</label>
          <div class="spinner-group">
            <button type="button" data-action="dec" data-target="tileW">−</button>
            <input type="number" name="tileW" value="${defaults.tileWidth}" min="1"/>
            <button type="button" data-action="inc" data-target="tileW">+</button>
          </div>
        </div>

        <div class="form-group">
          <label>${game.i18n.localize("QUICKSCENETILER.export.tileHeight.label")}</label>
          <div class="spinner-group">
            <button type="button" data-action="dec" data-target="tileH">−</button>
            <input type="number" name="tileH" value="${defaults.tileHeight}" min="1"/>
            <button type="button" data-action="inc" data-target="tileH">+</button>
          </div>
        </div>

        <div class="form-group">
          <label>${game.i18n.localize("QUICKSCENETILER.export.symmetricTiling.label")}</label>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" name="symmetricTiling" ${symmetricTiling ? "checked" : ""}/>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>${game.i18n.localize("QUICKSCENETILER.export.elevation.label")}</label>
          <div class="spinner-group">
            <button type="button" data-action="dec" data-target="elevation">−</button>
            <input type="number" name="elevation" value="${defaults.elevation}" step="1"/>
            <button type="button" data-action="inc" data-target="elevation">+</button>
          </div>
        </div>

        <div class="filepicker-group">
          <div class="filepicker-row">
            <label>${game.i18n.localize("QUICKSCENETILER.export.basePath.label")}</label>
            <button type="button" data-action="browseBase" title="${game.i18n.localize("QUICKSCENETILER.export.button.browse")}" class="browse-btn">
              <i class="fas fa-folder-open"></i>
            </button>
          </div>
          <div class="basepath-row">
            <input type="text" name="basePath" value="${defaultBasePath}"/>
          </div>
        </div>

        <div class="form-group">
          <label>${game.i18n.localize("QUICKSCENETILER.export.subfolder.label")}</label>
          <input type="text" name="subfolder" value="${defaultSubfolder}"/>
        </div>

        <div class="form-group">
          <label>${game.i18n.localize("QUICKSCENETILER.export.lock.label")}</label>
          <div class="lock-toggle">
            <button type="button" data-action="toggleExportLock" class="lock-on">
              <i class="fas fa-lock"></i> ${game.i18n.localize("QUICKSCENETILER.export.lock.locked")}
            </button>
          </div>
        </div>

      </form>
    `,
    buttons: {
      ok: {
        label: game.i18n.localize("QUICKSCENETILER.export.button.start"),
        callback: async (html) => {
          const tileFormat = html.find('[name="tileFormat"]:checked').val() || "png";
          let tileW        = parseInt(html.find('[name="tileW"]').val(), 10);
          let tileH        = parseInt(html.find('[name="tileH"]').val(), 10);
          const elevation  = parseInt(html.find('[name="elevation"]').val(), 10) || 0;
          const basePath   = html.find('[name="basePath"]').val().trim();
          const subfolder  = html.find('[name="subfolder"]').val().trim();
          symmetricTiling  = html.find('[name="symmetricTiling"]').is(":checked");

          if (tileFormat === "webp" && !browserSupportsWebPExport()) {
            ui.notifications.error(game.i18n.localize("QUICKSCENETILER.notification.webpUnsupported"));
            return;
          }

          if (!tileW || !tileH || tileW <= 0 || tileH <= 0) {
            ui.notifications.error(game.i18n.localize("QUICKSCENETILER.notification.tileSize"));
            return;
          }
          if (!basePath) {
            ui.notifications.error(game.i18n.localize("QUICKSCENETILER.notification.emptyBasePath"));
            return;
          }
          if (!subfolder) {
            ui.notifications.error(game.i18n.localize("QUICKSCENETILER.notification.emptySubfolder"));
            return;
          }

          const targetPath = `${basePath.replace(/\/+$/, "")}/${subfolder.replace(/^\/+/, "")}`;
          await exportSceneToTiles(canvas.scene, bgSrc, tileW, tileH, elevation, targetPath, lockTiles, tileFormat, symmetricTiling);
          dialog.close();
        }
      },
      cancel: { 
        label: game.i18n.localize("QUICKSCENETILER.export.button.cancel"),
        callback: () => {
          dialog.close();
        }
      }
    },
    default: "ok",
    render: html => {

      // Initialize lock button with correct state
      const exportLockBtn = html.find("button[data-action='toggleExportLock']");
      if (lockTiles) {
        exportLockBtn.html(`<i class="fas fa-lock"></i> ${game.i18n.localize("QUICKSCENETILER.export.lock.locked")}`);
        exportLockBtn.addClass("lock-on").removeClass("lock-off");
      } else {
        exportLockBtn.html(`<i class="fas fa-lock-open"></i> ${game.i18n.localize("QUICKSCENETILER.export.lock.unlocked")}`);
        exportLockBtn.addClass("lock-off").removeClass("lock-on");
      }

      // Spinner +/- for tile dimensions
      html.find("button[data-action='inc']").click(ev => {
        const target = ev.currentTarget.dataset.target;
        const input  = html.find(`[name="${target}"]`);
        const step   = target === "elevation" ? 1 : 256;
        const cur    = parseInt(input.val(), 10) || 0;
        input.val(cur + step);
      });

      html.find("button[data-action='dec']").click(ev => {
        const target = ev.currentTarget.dataset.target;
        const input  = html.find(`[name="${target}"]`);
        const step   = target === "elevation" ? 1 : 256;
        const min    = target === "elevation" ? -9999 : 1;
        const cur    = parseInt(input.val(), 10) || 0;
        input.val(Math.max(min, cur - step));
      });

      // FilePicker for base path
      html.find("button[data-action='browseBase']").click(async () => {
        //TEST
        //await ensureDirectory("data", "assets/scenetiles");
        new FilePicker({
          type: "folder",
          current: html.find('[name="basePath"]').val().trim() || `assets`,//`worlds/${game.world.id}/tiles`,
          callback: (path) => {
            html.find('[name="basePath"]').val(path);
          }
        }).render(true);
      });

      // Lock-Toggle Button for EXPORT
      exportLockBtn.click(() => {
        lockTiles = !lockTiles;
        if (lockTiles) {
          exportLockBtn.html(`<i class="fas fa-lock"></i> ${game.i18n.localize("QUICKSCENETILER.export.lock.locked")}`);
          exportLockBtn.removeClass("lock-off").addClass("lock-on");
        } else {
          exportLockBtn.html(`<i class="fas fa-lock-open"></i> ${game.i18n.localize("QUICKSCENETILER.export.lock.unlocked")}`);
          exportLockBtn.removeClass("lock-on").addClass("lock-off");
        }
      });
    }
  });

  dialog.render(true);
}

// ============================================================================
// IMPORT DIALOG
// ============================================================================

/**
 * Opens the import dialog for reconstructing a scene from tiles
 * Allows user to select folder, scene name, elevation handling, and lock settings
 * @async
 * @function
 */
 function openImportDialog() {

  //get settings for init of variables
  const defaults = getDefaultSettings();
  let lockTilesImport = defaults.lockTiles;
  let defaultBasePath = defaults.basePath

  const dialog = new Dialog({
    title: game.i18n.localize("QUICKSCENETILER.import.title"),
    content: `
      <form>

        <div class="filepicker-group">
        <div class="filepicker-row">
          <label>${game.i18n.localize("QUICKSCENETILER.import.folder.label")}</label>
          <button type="button" data-action="browseImport" title="${game.i18n.localize("QUICKSCENETILER.import.button.browse")}" class="browse-btn">
              <i class="fas fa-folder-open"></i>
            </button>
          </div>
          <div class="basepath-row">
            <input type="text" name="importFolder" value="${defaultBasePath}"/>
          </div>
        </div>

        <div class="form-group">
          <label>${game.i18n.localize("QUICKSCENETILER.import.sceneName.label")}</label>
          <input type="text" name="sceneName" value="${game.i18n.localize("QUICKSCENETILER.import.sceneName.default")}"/>
        </div>

        <div class="form-group">
          <label>${game.i18n.localize("QUICKSCENETILER.import.elevation.label")}</label>
          <div class="elevation-override-row">
            <label>
              <input type="radio" name="elevationMode" value="json" checked/>
              ${game.i18n.localize("QUICKSCENETILER.import.elevation.fromJson")}
            </label>
            <label>
              <input type="radio" name="elevationMode" value="manual"/>
              ${game.i18n.localize("QUICKSCENETILER.import.elevation.manual")}
            </label>
          </div>
          <div class="spinner-group" id="elevationManualGroup" style="display:none; margin-top:0.4rem;">
            <button type="button" data-action="dec" data-target="importElevation">−</button>
            <input type="number" name="importElevation" value="0" step="1"/>
            <button type="button" data-action="inc" data-target="importElevation">+</button>
          </div>
        </div>

        <div class="form-group">
          <label>${game.i18n.localize("QUICKSCENETILER.import.lock.label")}</label>
          <div class="lock-toggle">
            <button type="button" data-action="toggleLockImport" class="lock-off">
              <i class="fas fa-lock-open"></i> ${game.i18n.localize("QUICKSCENETILER.import.lock.unlocked")}
            </button>
          </div>
        </div>

      </form>
    `,
    buttons: {
      ok: {
        label: game.i18n.localize("QUICKSCENETILER.import.button.start"),
        callback: async (html) => {
          const folder          = html.find('[name="importFolder"]').val().trim();
          const sceneName       = html.find('[name="sceneName"]').val().trim() || game.i18n.localize("QUICKSCENETILER.import.sceneName.default");
          const elevationMode   = html.find('[name="elevationMode"]:checked').val();
          const manualElevation = parseInt(html.find('[name="importElevation"]').val(), 10) || 0;

          if (!folder) {
            ui.notifications.error(game.i18n.localize("QUICKSCENETILER.notification.import.noFiles"));
            return;
          }
         // Execute import and close dialog when complete
          await importSceneFromTiles(folder, sceneName, lockTilesImport, elevationMode, manualElevation);

           // Close the dialog after import completes
          dialog.close();
        }
      },
      cancel: { 
        label: game.i18n.localize("QUICKSCENETILER.import.button.cancel"),
        callback: () => {
          dialog.close();
        }
      }
    },
    default: "ok",
    render: html => {
  
      // Get the lock button
      const lockBtn = html.find("button[data-action='toggleLockImport']");
      
      // Initialize lock button with correct state from settings
      if (lockTilesImport) {
        lockBtn.html(`<i class="fas fa-lock"></i> ${game.i18n.localize("QUICKSCENETILER.import.lock.locked")}`);
        lockBtn.addClass("lock-on").removeClass("lock-off");
      } else {
        lockBtn.html(`<i class="fas fa-lock-open"></i> ${game.i18n.localize("QUICKSCENETILER.import.lock.unlocked")}`);
        lockBtn.addClass("lock-off").removeClass("lock-on");
      }

      // FilePicker for import folder
      html.find("button[data-action='browseImport']").click(() => {
        new FilePicker({
          type: "folder",
          current: `assets`,
          callback: (path) => {
            html.find('[name="importFolder"]').val(path);
          }
        }).render(true);
      });

      // Elevation mode toggle (JSON vs. manual)
      html.find('[name="elevationMode"]').change(ev => {
        const isManual = ev.currentTarget.value === "manual";
        html.find("#elevationManualGroup").toggle(isManual);
      });

      // Spinner for manual elevation
      html.find("button[data-action='inc']").click(ev => {
        const target = ev.currentTarget.dataset.target;
        if (target !== "importElevation") return;
        const input = html.find('[name="importElevation"]');
        input.val((parseInt(input.val(), 10) || 0) + 1);
      });
      
      html.find("button[data-action='dec']").click(ev => {
        const target = ev.currentTarget.dataset.target;
        if (target !== "importElevation") return;
        const input = html.find('[name="importElevation"]');
        input.val((parseInt(input.val(), 10) || 0) - 1);
      });

      // Lock-Toggle Button für IMPORT
      lockBtn.click(() => {
        lockTilesImport = !lockTilesImport;
        if (lockTilesImport) {
          lockBtn.html(`<i class="fas fa-lock"></i> ${game.i18n.localize("QUICKSCENETILER.import.lock.locked")}`);
          lockBtn.removeClass("lock-off").addClass("lock-on");
        } else {
          lockBtn.html(`<i class="fas fa-lock-open"></i> ${game.i18n.localize("QUICKSCENETILER.import.lock.unlocked")}`);
          lockBtn.removeClass("lock-on").addClass("lock-off");
        }
      });
    }
  });

  dialog.render(true);
}

// ============================================================================
// EXPORT OPERATIONS
// ============================================================================

/**
 * Main export function: duplicates scene, splits background into tiles, saves metadata
 * @async
 * @function
 * @param {Scene} sourceScene - The scene to export
 * @param {string} imageSrc - URL of the background image
 * @param {number} tileW - Width of each tile in pixels
 * @param {number} tileH - Height of each tile in pixels
 * @param {number} elevation - Z-level for tiles
 * @param {string} targetPath - Path where tiles will be saved (under /data)
 * @param {boolean} lockTiles - Whether to lock tiles by default
 * @param {string} tileFormat - Image format: "png" or "webp"
 * @throws {Error} Caught and displayed as notification
 */
async function exportSceneToTiles(sourceScene, imageSrc, tileW, tileH, elevation, targetPath, lockTiles, tileFormat, symmetricTiling = true) {
  try {
    ui.notifications.info(game.i18n.localize("QUICKSCENETILER.notification.duplicating"));
    const newScene = await duplicateSceneWithTilesName(sourceScene);
    await ensureDirectory("data", targetPath);

    await newScene.activate();
    ui.notifications.info(i18n("QUICKSCENETILER.notification.activating", { sceneName: newScene.name }));

    const { tiles, meta } = await tileBackgroundOnScene(
      newScene, imageSrc, tileW, tileH, elevation, targetPath, lockTiles, tileFormat, symmetricTiling
    );

    meta.lockTiles = lockTiles;
    meta.elevation = elevation;
    meta.tileFormat = tileFormat;
    meta.symmetricTiling = symmetricTiling;

    await saveSceneMetaJson(newScene, tiles, meta, targetPath);

    ui.notifications.info(game.i18n.localize("QUICKSCENETILER.notification.exportComplete"));
    
  } catch (err) {
    console.error(err);
    ui.notifications.error(i18n("QUICKSCENETILER.notification.exportError", { error: err.message }));
  }
}

/**
 * Duplicates a scene and appends "(tiled)" to the name
 * @async
 * @function
 * @param {Scene} scene - The scene to duplicate
 * @returns {Promise<Scene>} The newly created scene
 * @throws {Error} If scene creation fails
 */
async function duplicateSceneWithTilesName(scene) {
  const data = scene.toObject();
  const sceneFallbackName = `Scene ${data._id}` 
  data.name = `${scene.name ?? sceneFallbackName} (tiled)`;
  delete data._id;
  return await Scene.create(data);
}



/**
 * Splits a background image into tiles and creates tile documents in the scene
 * Handles image canvas operations, file uploads, and tile document creation
 * Accounts for scene padding and background offset in coordinate calculations
 * @async
 * @function
 * @param {Scene} scene - The destination scene
 * @param {string} imageSrc - URL of the background image to split
 * @param {number} tileW - Width of each tile in pixels
 * @param {number} tileH - Height of each tile in pixels
 * @param {number} elevation - Z-level for created tiles
 * @param {string} targetPath - Path where tiles will be saved
 * @param {boolean} [lockTiles=false] - Whether to lock tiles
 * @param {string} [tileFormat="png"] - Image format: "png" or "webp"
 * @returns {Promise<Object>} Object containing tiles array and metadata
 * @throws {Error} If image cannot be loaded or tiles cannot be created
 */

// ============================================================================
// Split background into tiles, upload, create tile documents in scene
// ============================================================================
async function tileBackgroundOnScene(scene, imageSrc, tileW, tileH, elevation, targetPath, lockTiles = false, tileFormat = "png", symmetricTiling = true) {
  ui.notifications.info(game.i18n.localize("QUICKSCENETILER.notification.loading"));

  const img  = await loadImage(imageSrc);
  const imgW = img.width;
  const imgH = img.height;

  if (!imgW || !imgH) {
    throw new Error(game.i18n.localize("QUICKSCENETILER.notification.noImage")); 
  }
  
  const bg      = scene.background ?? {};
  const scaleX  = bg.scaleX ?? 1;
  const scaleY  = bg.scaleY ?? 1;

  // Create symmetric tiles if enabled
  if (symmetricTiling) {
    tileW = computeTileAxisDim(imgW, tileW);
    tileH = computeTileAxisDim(imgH, tileH);
  }

  // Calculate scene padding and background offset
  // This ensures tiles are placed at the exact same world coordinates as the original background
  const sceneDimension = scene.dimensions
  // KORREKTUR: Padding-Offset einberechnen
  // Walls liegen in Canvas-Koordinaten, die den Padding-Versatz enthalten.
  // Das Hintergrundbild startet ebenfalls bei (paddingX, paddingY) + bg.offsetX/Y.
  const paddingX = sceneDimension.sceneX
  const paddingY = sceneDimension.sceneY
  const offsetX  = paddingX + (bg.offsetX ?? 0);
  const offsetY  = paddingY + (bg.offsetY ?? 0);

  ui.notifications.info(i18n("QUICKSCENETILER.notification.imageInfo", {
    width: imgW,
    height: imgH,
    paddingX,
    paddingY,
    offsetX,
    offsetY
  }));

  // Create canvas for tile extraction
  const canvasEl = document.createElement("canvas");
  const ctx      = canvasEl.getContext("2d");

  const tileMetaList = [];
  const tileDocsData = [];

  // Loop through image and create tiles
  for (let y = 0; y < imgH; y += tileH) {
    for (let x = 0; x < imgW; x += tileW) {
      const w = Math.min(tileW, imgW - x);
      const h = Math.min(tileH, imgH - y);

      // Draw tile portion to canvas
      canvasEl.width  = w;
      canvasEl.height = h;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, x, y, w, h, 0, 0, w, h);

      // Convert to blob with specified format
      const mimeType = tileFormat === "webp" ? "image/webp" : "image/png";
      const fileExt  = tileFormat === "webp" ? "webp" : "png";
      const fileName = `tile_x${x}_y${y}_w${w}_h${h}.${fileExt}`;

      const blob = await new Promise((resolve) =>
        canvasEl.toBlob(resolve, mimeType)
      );
      if (!blob) {
        throw new Error(`Fehler beim Erzeugen des Tile-Blobs bei (${x}, ${y}).`); //TODO:Localization
      }

    
      // Upload tile file
    
      const file     = new File([blob], fileName, { type: mimeType });
      const fpResult = await FilePicker.upload("data", targetPath, file, {});
      const uploaded = fpResult?.path ?? `${targetPath}/${fileName}`;
      
      // Calculate world coordinates (including padding and scaling)
      const tileX      = offsetX + x * scaleX;
      const tileY      = offsetY + y * scaleY;
      const tileWidth  = w * scaleX;
      const tileHeight = h * scaleY;

      // Store tile metadata
      tileMetaList.push({
        imgX:      x,
        imgY:      y,
        imgW:      w,
        imgH:      h,
        worldX:    tileX,
        worldY:    tileY,
        worldW:    tileWidth,
        worldH:    tileHeight,
        src:       uploaded,
        fileName,
        locked:    lockTiles,
        elevation
      });

      // Create tile document data
      tileDocsData.push({
        x:         tileX,
        y:         tileY,
        width:     tileWidth,
        height:    tileHeight,
        elevation,
        texture:   { src: uploaded },
        locked:    lockTiles
      });
    }
  }

  ui.notifications.info(i18n("QUICKSCENETILER.notification.uploading", { count: tileMetaList.length }));

  // Create all tile documents in the scene
  await scene.createEmbeddedDocuments("Tile", tileDocsData);
  
  // Remove the original background image
  await scene.update({ "background.src": null });

  return {
    tiles: tileMetaList,
    meta: {
      background: {
        offsetX:  bg.offsetX ?? 0,
        offsetY:  bg.offsetY ?? 0,
        paddingX,
        paddingY,
        scaleX,
        scaleY,
        src:      imageSrc
      },
      image:     { width: imgW, height: imgH },
      tileSize:  { tileW, tileH },
      scene: {
        width:   scene.width,
        height:  scene.height,
        padding: scene.padding ?? 0
      },
      targetPath
    }
  };
}

/**
 * Saves scene metadata and wall information as JSON file
 * Exports tile positions, wall data, and scene information for later reconstruction
 * @async
 * @function
 * @param {Scene} scene - The source scene
 * @param {Array} tiles - Array of tile metadata objects
 * @param {Object} meta - Metadata object containing scene and tile information
 * @param {string} targetPath - Path where JSON will be saved
 * @returns {Promise<string>} The path to the saved JSON file
 * @throws {Error} If JSON file cannot be created or uploaded
 */
async function saveSceneMetaJson(scene, tiles, meta, targetPath) {
  // Collect all walls from the scene
  const walls = scene.walls.contents.map(w => w.toObject());

  // Create export data structure
  const exportData = {
    sceneName: scene.name,
    sceneId:   scene.id,
    tiles,
    walls,
    meta
  };

  // Convert to JSON and create file
  const jsonStr  = JSON.stringify(exportData, null, 2);
  const blob     = new Blob([jsonStr], { type: "application/json" });
  const jsonName = `${slugify(scene.name)}.json`;
  const file     = new File([blob], jsonName, { type: "application/json" });

  // Upload JSON file
  const fpResult = await FilePicker.upload("data", targetPath, file, {});
  const uploaded = fpResult?.path ?? `${targetPath}/${jsonName}`;

  ui.notifications.info(i18n("QUICKSCENETILER.notification.savingJson", { path: uploaded }));
  return uploaded;
}

// ============================================================================
// IMPORT OPERATIONS
// ============================================================================

/**
 * Main import function: reads folder, loads JSON, reconstructs scene with tiles and walls
 * @async
 * @function
 * @param {string} folderPath - Path to folder containing tiles and JSON metadata
 * @param {string} newSceneName - Name for the newly created scene
 * @param {boolean} [lockTilesOverride=false] - Force lock all tiles (overrides JSON setting)
 * @param {string} [elevationMode="json"] - How to determine tile elevation: "json" or "manual"
 * @param {number} [manualElevation=0] - Manual elevation value if elevationMode is "manual"
 * @throws {string} Shows error notification if operation fails
 */
async function importSceneFromTiles(folderPath, newSceneName, lockTilesOverride = false, elevationMode = "json", manualElevation = 0) {
  ui.notifications.info(i18n("QUICKSCENETILER.notification.import.reading", { path: folderPath }));

  // Read folder contents
  let browse;
  try {
    browse = await FilePicker.browse("data", folderPath);
  } catch (e) {
    ui.notifications.error(i18n("QUICKSCENETILER.notification.import.folderNotFound", { path: folderPath }));
    console.error(e);
    return;
  }

  // Check if folder has files
  const files = browse.files ?? [];
  if (!files.length) {
    ui.notifications.error(game.i18n.localize("QUICKSCENETILER.notification.import.noFiles"));
    return;
  }

  // Find JSON file in folder
  const jsonFiles = files.filter(f => f.toLowerCase().endsWith(".json"));
  if (!jsonFiles.length) {
    ui.notifications.error(game.i18n.localize("QUICKSCENETILER.notification.import.noJson"));
    return;
  }

  // Load and parse JSON metadata
  const jsonFilePath = jsonFiles[0];
  const fetchUrl     = jsonFilePath.startsWith("/") ? jsonFilePath : `/${jsonFilePath}`;

  let jsonData;
  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    jsonData = await response.json();
  } catch (e) {
    ui.notifications.error(i18n("QUICKSCENETILER.notification.import.loadJsonError", { error: e.message }));
    console.error(e);
    return;
  }

  // Extract data from JSON
  const { tiles = [], walls = [], meta = {} } = jsonData;

  // Validate that tiles exist
  if (!tiles.length) {
    ui.notifications.error(game.i18n.localize("QUICKSCENETILER.notification.import.noTiles"));
    return;
  }

  // Create new scene with same dimensions as original
  // This is critical for correct tile placement (padding must match)
  const sceneData = {
    name:    newSceneName,
    width:   meta.scene?.width   ?? meta.image?.width  ?? 4096,
    height:  meta.scene?.height  ?? meta.image?.height ?? 4096,
    padding: meta.scene?.padding ?? 0,
  };
 
  //grid: CONST.GRID_TYPES.GRIDLESS // TODO: Check if this makes still sense Gridless for pixel-perfect placement

  let newScene;
  try {
    newScene = await Scene.create(sceneData);
  } catch (e) {
    ui.notifications.error(i18n("QUICKSCENETILER.notification.import.createSceneError", { error: e.message }));
    console.error(e);
    return;
  }

  ui.notifications.info(i18n("QUICKSCENETILER.notification.import.sceneCreated", { sceneName: newScene.name }));

  // Prepare tile documents: use world coordinates from JSON, apply elevation override if needed
  const tileDocsData = tiles.map(t => {
    const locked = lockTilesOverride ? true : (t.locked ?? meta.lockTiles ?? false);
    const elevation = elevationMode === "manual"
      ? manualElevation
      : (t.elevation ?? meta.elevation ?? 0);

    return {
      x:         t.worldX,
      y:         t.worldY,
      width:     t.worldW,
      height:    t.worldH,
      elevation,
      texture:   { src: t.src },
      locked
    };
  });

  // Create all tiles in the scene
  if (tileDocsData.length) {
    try {
      await newScene.createEmbeddedDocuments("Tile", tileDocsData);
      ui.notifications.info(i18n("QUICKSCENETILER.notification.import.tilesCreated", { count: tileDocsData.length }));
    } catch (e) {
      ui.notifications.error(i18n("QUICKSCENETILER.notification.import.tilesError", { error: e.message }));
      console.error(e);
      return;
    }
  }

  // Recreate walls from JSON data
  // Coordinates are preserved since they were calculated with the same padding
  if (walls.length) {
    try {
      await newScene.createEmbeddedDocuments("Wall", walls);
      ui.notifications.info(i18n("QUICKSCENETILER.notification.import.wallsCreated", { count: walls.length }));
    } catch (e) {
      ui.notifications.error(i18n("QUICKSCENETILER.notification.import.wallsError", { error: e.message }));
      console.error(e);
      return;
    }
  }

  // Activate the newly created scene
  await newScene.activate();
  ui.notifications.info(game.i18n.localize("QUICKSCENETILER.notification.import.complete"));
}
