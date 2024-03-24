document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const input = document.getElementById("userInput");

  function getUserInputValue() {
    return input.value;
  }

  searchBtn.addEventListener("click", async () => {
    const inputValue = getUserInputValue();
    let [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: checkExistingIds,
      args: [inputValue], // Pass inputValue as an argument to the content script
    }, (result) => {
      displayMessage(result[0].result); // Call displayMessage with the result returned by checkExistingIds
    });
  });
});

function checkExistingIds(inputValue) {
  const elementsWithIds = Array.from(document.querySelectorAll("[id]"));
  const idsArray = elementsWithIds.map((element) => element.id);
  console.log("IDs array:", idsArray);
  let usersId = idsArray.find((ele) => ele == inputValue);
  return usersId;
}

function displayMessage(usersId) {
  if (usersId) {
    console.log("id already exists");
    const existsMessage = document.getElementById("exists");
    existsMessage.style.display = "block";
  } else {
    console.log("id is avaliable");
    const avaliableMessage = document.getElementById("avaliable");
    avaliableMessage.style.display = "block";
  }
}
