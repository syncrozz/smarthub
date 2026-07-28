/**
 * ============================================================
 * KPMBP SmartHub
 * Committee.js
 * ============================================================
 */

/**
 * Ambil semua jawatan / keahlian staf
 */
function getStaffCommittee(staffId) {

  const ss = getSpreadsheet();

  const sheet = ss.getSheetByName("StaffCommittee");

  if (!sheet) {

    throw new Error("Sheet 'StaffCommittee' tidak dijumpai.");

  }

  const values = sheet.getDataRange().getValues();

  const headers = values.shift();

  return values

    .filter(row => row[1] == staffId)

    .map(row => {

      const obj = {};

      headers.forEach((h, i) => {

        obj[h] = row[i];

      });

      return obj;

    });

}