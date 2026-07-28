/**
 * Test Sambungan Database
 */
function testDatabase() {

  const ss = getSpreadsheet();

  Logger.log("Nama Spreadsheet : " + ss.getName());

  Logger.log("Spreadsheet ID : " + ss.getId());

}
/**
 * Test Staff
 */
function testStaff() {

  const data = getStaff();

  Logger.log("Jumlah Staff : " + data.length);

  Logger.log(data[0]);

}
function clearSmartHubCache() {

  CacheService
    .getScriptCache()
    .remove("staff");

  Logger.log("Cache dibersihkan.");

}
function testRawData() {

  const sheet = getSheet(CONFIG.SHEETS.STAFF);

  const row = sheet.getRange(2, 1, 1, 15).getValues()[0];

  Logger.log(row);

}
function testApi() {

  const e = {
    parameter: {
      action: "staff"
    }
  };

  const result = apiRouter(e);

  Logger.log(result.getContent());

}
function testCommittee() {

  const data = getStaffCommittee("ST054");

  Logger.log(data);

}