function onFormSubmit(e) {

  NOTIFICATION_MAIL = PropertiesService.getScriptProperties().getProperty("NOTIFICATION_MAIL");

  const lock = LockService.getScriptLock();
  try {
    // ロックを取得する
    if (lock.tryLock(10 * 1000)) {

      var title = e.values[6];// 予定の名前
      var baseTime = new Date(e.values[4]);// 予約の日
      // 年入力短縮する場合
      // var baseTime = new Date(base.setFullYear(2021));
      var startTime = new Date(baseTime);

      let endTime = TimeResponse(e.values[5], baseTime);

      var appointTime = Utilities.formatDate(new Date(e.values[0]), 'Asia/Tokyo', 'HH:mm');

      var apointerContact = ContactsApp.getContact(e.values[1]);
      var apointerName = apointerContact.getFullName();

      // 最初に仮りで設定し、後ほど、replaceでsort_trgをurlに置き換える
      // var eventURL = "sort_trg";

      if (e.values[16] !== "") {

        var importantCheckList = ["以前にCASAを申し込んでいないかの確認", "対象外（eo光/auひかり)でないかの確認", "コンセント式(Airなど)のWi-Fiでないかの確認", "モデム有無の確認", "回線工事をしたかの確認", "回線契約書の準備の確認", "当日オーナーの立会い認識の確認"]

        result = ImportantChecklist(importantCheckList, e.values[17])

        var option = {
          description: "商材: " + e.values[2]
            + "\nアポインター: " + apointerName
            + "\n電話番号: " + e.values[8]
            + "\n担当者様: " + e.values[9]
            + "\n架電先: " + e.values[10]
            + "\n名乗り: " + e.values[11]
            + "\n通信回線: " + e.values[12]
            + "\nネガ: " + e.values[13]
            + "\n事前確認連絡: " + e.values[14]
            + "\n回線契約名義: " + e.values[16]
            + "\n重要確認事項↓ " + result
            + "\nアポ時間: " + appointTime
            + "\n備考: " + e.values[15] + "\n\n-----------------------" + "\n\n詳細:",
          location: e.values[7]
        }

        // var mailText = "商材: " + e.values[1]
        //   + "\nアポインター: " + apointerName
        //   + "\n店名/企業名: " + e.values[4]
        //   + "\n電話番号: " + e.values[6]
        //   + "\n住所: " + e.values[5]
        //   + "\n訪問日時: " + e.values[3]
        //   + "\n担当者様: " + e.values[7]
        //   + "\n架電先: " + e.values[8]
        //   + "\n名乗り: " + e.values[9]
        //   + "\n通信回線: " + e.values[10]
        //   + "\nネガ: " + e.values[11]
        //   + "\n事前確認連絡: " + e.values[12]
        //   + "\n回線契約名義: " + e.values[14]
        //   + "\n重要確認事項↓ " + result
        //   + "\nアポ時間: " + appointTime
        //   + "\n備考: " + e.values[13] + "\n\n" + eventURL;

      } else if (e.values[18] !== "") {
        var option = {
          description: "商材: " + e.values[2]
            + "\nアポインター: " + apointerName
            + "\n電話番号: " + e.values[8]
            + "\n担当者様: " + e.values[9]
            + "\n架電先: " + e.values[10]
            + "\n名乗り: " + e.values[11]
            + "\n通信回線: " + e.values[12]
            + "\nネガ: " + e.values[13]
            + "\n事前確認連絡: " + e.values[14]
            + "\nキャリア: " + e.values[18]
            + "\n提案した光回線: " + e.values[19]
            + "\n当日オーナーの立会い認識の確認: " + e.values[20]
            + "\nアポ時間: " + appointTime
            + "\n備考: " + e.values[15] + "\n\n-----------------------" + "\n\n詳細:",
          location: e.values[7]
        }

        // var mailText = "商材: " + e.values[1]
        //   + "\nアポインター: " + apointerName
        //   + "\n店名/企業名: " + e.values[4]
        //   + "\n電話番号: " + e.values[6]
        //   + "\n住所: " + e.values[5]
        //   + "\n訪問日時: " + e.values[3]
        //   + "\n担当者様: " + e.values[7]
        //   + "\n架電先: " + e.values[8]
        //   + "\n名乗り: " + e.values[9]
        //   + "\n通信回線: " + e.values[10]
        //   + "\nネガ: " + e.values[11]
        //   + "\n事前確認連絡: " + e.values[12]
        //   + "\nキャリア: " + e.values[16]
        //   + "\n提案した光回線: " + e.values[17]
        //   + "\n当日オーナーの立会い認識の確認: " + e.values[18]
        //   + "\nアポ時間: " + appointTime
        //   + "\n備考: " + e.values[13] + "\n\n" + eventURL;

      } else if (e.values[21] !== "") {
        var option = {
          description: "商材: " + e.values[2]
            + "\nアポインター: " + apointerName
            + "\n電話番号: " + e.values[8]
            + "\n担当者様: " + e.values[9]
            + "\n架電先: " + e.values[10]
            + "\n名乗り: " + e.values[11]
            + "\n通信回線: " + e.values[12]
            + "\nネガ: " + e.values[13]
            + "\n事前確認連絡: " + e.values[14]
            + "\n導入状況の確認: " + e.values[21]
            + "\nアポ時間: " + appointTime
            + "\n備考: " + e.values[15] + "\n\n-----------------------" + "\n\n詳細:",
          location: e.values[7]
        }

        // var mailText = "商材: " + e.values[1]
        //   + "\nアポインター: " + apointerName
        //   + "\n店名/企業名: " + e.values[4]
        //   + "\n電話番号: " + e.values[6]
        //   + "\n住所: " + e.values[5]
        //   + "\n訪問日時: " + e.values[3]
        //   + "\n担当者様: " + e.values[7]
        //   + "\n架電先: " + e.values[8]
        //   + "\n名乗り: " + e.values[9]
        //   + "\n通信回線: " + e.values[10]
        //   + "\nネガ: " + e.values[11]
        //   + "\n事前確認連絡: " + e.values[12]
        //   + "\n導入状況の確認: " + e.values[20]
        //   + "\nアポ時間: " + appointTime
        //   + "\n備考: " + e.values[13] + "\n\n" + eventURL;

      } else {
        var option = {
          description: "商材: " + e.values[2]
            + "\nアポインター: " + apointerName
            + "\n電話番号: " + e.values[8]
            + "\n担当者様: " + e.values[9]
            + "\n架電先: " + e.values[10]
            + "\n名乗り: " + e.values[11]
            + "\n通信回線: " + e.values[12]
            + "\nネガ: " + e.values[13]
            + "\n事前確認連絡: " + e.values[14]
            + "\nアポ時間: " + appointTime
            + "\n備考: " + e.values[15] + "\n\n-----------------------" + "\n\n詳細:",
          location: e.values[7]
        }

        //   var mailText = "商材: " + e.values[1]
        //     + "\nアポインター: " + apointerName
        //     + "\n店名/企業名: " + e.values[4]
        //     + "\n電話番号: " + e.values[6]
        //     + "\n住所: " + e.values[5]
        //     + "\n訪問日時: " + e.values[3]
        //     + "\n担当者様: " + e.values[7]
        //     + "\n架電先: " + e.values[8]
        //     + "\n名乗り: " + e.values[9]
        //     + "\n通信回線: " + e.values[10]
        //     + "\nネガ: " + e.values[11]
        //     + "\n事前確認連絡: " + e.values[12]
        //     + "\nアポ時間: " + appointTime
        //     + "\n備考: " + e.values[13] + "\n\n" + eventURL;
      }

      var salesmanContacts = ContactsApp.getContactsByName(e.values[3]);

      var salesmanEmail = salesmanContacts[0].getEmails()[0].getAddress();

      var cal = CalendarApp.getCalendarById(salesmanEmail);
      // カレンダーのタイムゾーンを"Asia/Tokyo"に変更する
      cal.setTimeZone("Asia/Tokyo");
      // カレンダーに日程を追加
      cal.createEvent(title, startTime, endTime, option);
      // var splitEventId = event.getId().split('@');
      // var eventURL = "https://www.google.com/calendar/event?eid=" + Utilities.base64Encode(splitEventId[0] + " " + salesmanEmail);

      // // ここで置き換え
      // mailText = mailText.replace('sort_trg', eventURL)

      // var mailTitle = "新規アポイント通知";

      // // var mailText = 上記で定義済み

      // let options = { from: "appoint@openstore-japan.com" };

      // GmailApp.sendEmail(salesmanEmail, mailTitle, mailText, options);
      return;
    }
  } catch (error) {
    console.error(printError(error));
  } finally {
    // ロック開放
    lock.releaseLock();
  }
}

function TimeResponse(time, baseTime) {
  let endTime = new Date(baseTime);

  if ("30分" == time) {
    endTime.setMinutes(baseTime.getMinutes() + 30)
  } else if ("1時間" == time) {
    endTime.setHours(baseTime.getHours() + 1);
  } else if ("1時間30分" == time) {
    endTime.setHours(baseTime.getHours() + 1);
    endTime.setMinutes(baseTime.getMinutes() + 30)
  } else if ("2時間" == time) {
    endTime.setHours(baseTime.getHours() + 2);
  }
  return endTime
}

function ImportantChecklist(importantCheckList, e) {

  for (var i = 0; i < importantCheckList.length; i++) {
    var arrow = importantCheckList[i]

    if (e.includes(arrow)) {
      importantCheckList[i] = '\n   ' + arrow + ': ○'
    } else {
      importantCheckList[i] = '\n   ' + arrow + ': ✖'
    }
  }

  // 返却データをStringデータに変換して「","」を消去
  returnText = "";
  for (var i = 0; i < importantCheckList.length; i++) {
    returnText = returnText + importantCheckList[i];
  }

  return returnText
}

function printError(error) {

  var mailTitle = "エラー通知";
  var mailText = "テレアポ\n\n" +
    "[名前] " + error.name + "\n\n" +
    "[場所] " + error.fileName + "(" + error.lineNumber + "行目)\n\n" +
    "[メッセージ]" + error.message + "\n\n" +
    "[StackTrace]\n" + error.stack;

  GmailApp.sendEmail(NOTIFICATION_MAIL, mailTitle, mailText);
  
  return "[名前] " + error.name + "\n" +
    "[場所] " + error.fileName + "(" + error.lineNumber + "行目)\n" +
    "[メッセージ]" + error.message + "\n" +
    "[StackTrace]\n" + error.stack;
}

