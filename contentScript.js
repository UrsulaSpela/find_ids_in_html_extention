// contentScript.js

function getAllIds() {
  const elementsWithIds = Array.from(document.querySelectorAll('[id]'));
  const idsArray = elementsWithIds.map(element => element.id);
  return idsArray;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getIds") {
    const ids = getAllIds();
    sendResponse(ids);
  }
});
