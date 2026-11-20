// Copy the ID between /d/ and /edit in your Google Sheet URL.
const SPREADSHEET_ID = "PASTE_SPREADSHEET_ID_HERE";
const SHEET_NAME = "Christmas cards";

function doPost(e) {
  const fields = e && e.parameter;
  const result = (message) => ContentService.createTextOutput(message);
  if (!fields || fields.website) return result("OK");

  const type = fields.type;
  if (type !== "letter" && type !== "email") return result("Invalid card type");

  const read = (name, limit) => String(fields[name] || "").trim().slice(0, limit);
  const name = read("name", 150);
  const email = read("email", 254);
  const byPost = type === "letter";
  const address1 = byPost ? read("address1", 180) : "";
  const town = byPost ? read("town", 100) : "";

  if (!name || (byPost && (!address1 || !town)) || (!byPost && !email)) {
    return result("Missing required fields");
  }
  if (email && !/^[^\s@]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*$/i.test(email)) {
    return result("Invalid email address");
  }

  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  // Keep form entries as literal text in Sheets, including postcodes and leading zeroes.
  const asText = (value) => value ? "'" + value : "";
  sheet.appendRow([
    new Date(),
    type,
    asText(name),
    asText(email),
    asText(address1),
    asText(byPost ? read("address2", 180) : ""),
    asText(town),
    asText(byPost ? read("county", 100) : ""),
    asText(byPost ? read("country", 100) || "Ireland" : ""),
    asText(byPost ? read("eircode", 30) : ""),
    fields.irish === "yes" ? "Yes" : "No",
    asText(read("note", 500)),
  ]);
  return result("OK");
}
