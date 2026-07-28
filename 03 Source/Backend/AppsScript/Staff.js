function getStaff() {

  // const cache = CacheService.getScriptCache();

  // const cached = cache.get("staff");

  // if (cached) {
  //   return JSON.parse(cached);
  // }

  const sheet = getSheet(CONFIG.SHEETS.STAFF);

  const values = sheet.getDataRange().getValues();

  // Ambil semua gambar dari Google Drive
  const photoMap = getPhotoMap();

  const data = values
    .slice(1)
    .map(row => mapStaff(row, photoMap));

  // cache.put(
  //   "staff",
  //   JSON.stringify(data),
  //   CONFIG.CACHE_SECONDS
  // );

  return data;

}