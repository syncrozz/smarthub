/**
 * ============================================================
 * KPMBP SmartHub
 * Utils.gs
 * Version : 1.0.0
 * ============================================================
 */


/**
 * Buka Spreadsheet
 */
function getSpreadsheet() {

  return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

}


/**
 * Return JSON Output
 */
function jsonOutput(data) {

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);

}


/**
 * Buka Sheet
 */
function getSheet(sheetName) {

  const ss = getSpreadsheet();

  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    throw new Error("Sheet tidak dijumpai : " + sheetName);
  }

  return sheet;

}


/**
 * Ambil semua data
 */
function getAllValues(sheetName) {

  const sheet = getSheet(sheetName);

  return sheet.getDataRange().getValues();

}


/**
 * Tukar Row kepada Object
 */

function mapStaff(row, photoMap) {

  return {

    id: row[STAFF_COLUMN.ID],

    bahagian: row[STAFF_COLUMN.BAHAGIAN],

    departmentId: row[STAFF_COLUMN.DEPARTMENT_ID],

    nama: row[STAFF_COLUMN.NAMA],

    jawatan: row[STAFF_COLUMN.JAWATAN],

    gred: row[STAFF_COLUMN.GRED],

tahunLahir: row[STAFF_COLUMN.TAHUN_LAHIR],

platNo1: row[STAFF_COLUMN.PLAT_1],
platNo2: row[STAFF_COLUMN.PLAT_2],
platNo3: row[STAFF_COLUMN.PLAT_3],

kelulusan: row[STAFF_COLUMN.KELULUSAN],

    pengkhususan: row[STAFF_COLUMN.PENGKHUSUSAN],

    daerahAsal: row[STAFF_COLUMN.DAERAH_ASAL],

    telefon: row[STAFF_COLUMN.TELEFON],

    sambungan: row[STAFF_COLUMN.SAMBUNGAN],

    whatsapp: row[STAFF_COLUMN.WHATSAPP],

    email: row[STAFF_COLUMN.EMAIL],

    urlProfil: row[STAFF_COLUMN.URL_PROFIL],

    sumber: row[STAFF_COLUMN.SUMBER],

    status: row[STAFF_COLUMN.STATUS],

    lastSync: row[STAFF_COLUMN.LAST_SYNC],

    photo:
      photoMap[row[STAFF_COLUMN.ID]]
      ||
      CONFIG.DEFAULT_AVATAR

  };

}


/**
 * Buang Header
 */
function removeHeader(data) {

  if (!data || data.length <= 1) {
    return [];
  }

  return data.slice(1);

}


/**
 * Trim String
 */
function clean(text) {

  if (text === null || text === undefined) {
    return "";
  }

  return String(text).trim();

}


/**
 * Cari kosong
 */
function isEmpty(value) {

  return value === "" ||
         value === null ||
         value === undefined;

}


/**
 * Format Tarikh
 */
function formatDate(value) {

  if (!value) return "";

  return Utilities.formatDate(
    new Date(value),
    Session.getScriptTimeZone(),
    "dd/MM/yyyy HH:mm"
  );

}


/**
 * Cache
 */
function getCache() {

  return CacheService.getScriptCache();

}


/**
 * Debug Log
 */
function debug(data) {

  if (CONFIG.DEBUG) {
    Logger.log(data);
  }

}
function getPhotoMap() {

  const map = {};

  const folder = DriveApp.getFolderById(CONFIG.PHOTO_FOLDER_ID);

  Logger.log("Folder = " + folder.getName());

  const files = folder.getFiles();

  while (files.hasNext()) {

    const file = files.next();

    Logger.log("File = " + file.getName());

    const name = file.getName();

    if (!/\.(jpg|jpeg|png)$/i.test(name)) continue;

    const staffId = name.replace(/\.[^/.]+$/, "");

    map[staffId] =
      "https://drive.google.com/thumbnail?id=" +
      file.getId() +
      "&sz=w300";

  }

  Logger.log(map);

  return map;

}