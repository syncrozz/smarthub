/**
 * ============================================================
 * KPMBP SmartHub
 * Config.gs
 * Version : 1.0.0
 * ============================================================
 */

const CONFIG = Object.freeze({

  // ==========================================================
  // APPLICATION
  // ==========================================================

  APP_NAME: "KPMBP SmartHub",
  APP_VERSION: "1.0.0",
  APP_OWNER: "Kolej Profesional MARA Bandar Penawar",

  // ==========================================================
  // GOOGLE SHEET
  // Gantikan dengan Sheet ID sebenar
  // ==========================================================

  SPREADSHEET_ID: "1D5LCyHw3o6v6cGh_-IkYTzNL7tEEaPZvewE4iMFJL0c",

  SHEETS: {
    STAFF: "Staff"
  },

  // ==========================================================
  // CACHE
  // ==========================================================

  CACHE_SECONDS: 300,

  // ==========================================================
  // PAGINATION
  // ==========================================================

  PAGE_SIZE: 20,

  // ==========================================================
  // DEBUG
  // ==========================================================

  DEBUG: true,

  // ==========================================================
  // STATUS
  // ==========================================================

  STATUS: {
    ACTIVE: "Aktif",
    INACTIVE: "Tidak Aktif"
  },

  // ==========================================================
  // DEFAULT AVATAR
  // ==========================================================

  DEFAULT_AVATAR:
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",

  

PHOTO_FOLDER_ID:
  "1XTnhVz5x4r_iC9Eg1zA1H4x5X9xPzMf_"

});


/**
 * ==========================================================
 * STAFF COLUMN INDEX
 * (0-based)
 * ==========================================================
 */

const STAFF_COLUMN = Object.freeze({

  ID: 0,
  BAHAGIAN: 1,
  DEPARTMENT_ID: 2,
  NAMA: 3,
  JAWATAN: 4,
  KELULUSAN: 5,
  PENGKHUSUSAN : 6,
  DAERAH_ASAL  : 7,
  TELEFON      : 8,
  SAMBUNGAN    : 9,
  WHATSAPP     : 10,
  EMAIL        : 11,
  URL_PROFIL   : 12,
  SUMBER       : 13,
  STATUS       : 14,
  LAST_SYNC    : 15,
  GRED         : 16,

  TAHUN_LAHIR  : 17,
  PLAT_1       : 18,
  PLAT_2       : 19,
  PLAT_3       : 20

});


/**
 * ==========================================================
 * UI CONFIG
 * ==========================================================
 */

const UI = Object.freeze({

  THEME: "light",

  ENABLE_DARK_MODE: true,

  ENABLE_FAVOURITE: true,

  ENABLE_SEARCH: true,

  ENABLE_FILTER: true,

  ENABLE_MODAL: true,

  ENABLE_PAGINATION: true

});


/**
 * ==========================================================
 * RESPONSE TEMPLATE
 * ==========================================================
 */

function response(success, data, message) {

  return {
    success: success,
    data: data || [],
    message: message || "",
    version: CONFIG.APP_VERSION,
    timestamp: new Date()
  };

}