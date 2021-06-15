function onFormSubmit(e) {

  const lock = LockService.getScriptLock();
  try {
    // ロックを取得する
    if (lock.tryLock(10 * 1000)) {

      var title = e.values[3];// 予定の名前
      var baseTime = new Date(e.values[8]);// 予約の日
      Logger.log(baseTime);
      var endTime = new Date(baseTime.setHours(baseTime.getHours() + 1));// 予約の日
      Logger.log(endTime);
      var startTime = new Date(e.values[8]);
      Logger.log(startTime);

      var option = {
        description: "商材: " + e.values[1] + "\nアポインター: " + e.values[2] + "\n都道府県名: " + e.values[4] + "\n電話番号: " + e.values[6] + "\n担当者様: " + e.values[9] + "\n備考: " + e.values[10] + "\n\n-----------------------" + "\n\n結果:" + "\n\n詳細:",
        location: e.values[5]
      };

      var closer = e.values[7];

      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート2');

      var closers = sheet.getRange(1, 1, 12).getValues();
      var closerList = Array.prototype.concat.apply([], closers);

      var adresses = sheet.getRange(1, 2, 12).getValues();
      var adressList = Array.prototype.concat.apply([], adresses);

      for (var i = 1; i < 13; i++) {
        Logger.log(closerList[i]);
        if (closerList[i] == closer) {
          var gestAdress = adressList[i];

          var cal = CalendarApp.getCalendarById(gestAdress);
          // カレンダーのタイムゾーンを"Asia/Tokyo"に変更する
          cal.setTimeZone("Asia/Tokyo");
          // カレンダーに日程を追加
          var event = cal.createEvent(title, startTime, endTime, option);
          var splitEventId = event.getId().split('@');
          var eventURL = "https://www.google.com/calendar/event?eid=" + Utilities.base64Encode(splitEventId[0] + " " + gestAdress);

          var mailTitle = "新規アポイント通知";
          var mailText = "商材: " + e.values[1] + "\nアポインター: " + e.values[2] + "\n店名/企業名: " + e.values[3] + "\n都道府県名: " + e.values[4] + "\n電話番号: " + e.values[6] + "\n住所: " + e.values[5] + "\n訪問日時: " + e.values[8] + "\n担当者様: " + e.values[9] + "\n備考: " + e.values[10] + "\n\n" + eventURL;

          let options = { from: "appoint@openstore-japan.com" };

          GmailApp.sendEmail(gestAdress, mailTitle, mailText, options);
          return 0;
        }
      }
    }
  } catch (e) {
    Logger.log(e);
  } finally {
    // ロック開放
    lock.releaseLock();
  }
}