function doGet(e) {

  if (e.parameter.action) {
    return apiRouter(e);
  }

  return HtmlService
    .createTemplateFromFile('Index')
    .evaluate()
    .setTitle('KPMBP SmartHub');
}

function include(filename) {
  return HtmlService
    .createHtmlOutputFromFile(filename)
    .getContent();
}