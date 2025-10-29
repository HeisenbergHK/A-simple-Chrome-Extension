const inputElement = document.getElementById("input-el");
const saveButton = document.getElementById("input-btn");
const deleteAllButton = document.getElementById("delete-btn");
const saveTabButton = document.getElementById("tab-gtn");

const leadListElement = document.getElementById("leadList-el");

render();
// localStorage.clear()

const tab = [
  {
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
  },
];

saveTabButton.addEventListener("click", async function () {
  const newLead = await getCurrentTabURL();
  console.log(newLead);
  if (newLead == "") {
    return;
  }
  renderNewLead(newLead);
  updateLocalStorage(newLead);
  clearInput();
});

saveButton.addEventListener("click", function () {
  const newLead = inputElement.value;
  if (newLead == "") {
    return;
  }
  renderNewLead(newLead);
  updateLocalStorage(newLead);
  clearInput();
});

deleteAllButton.addEventListener("dblclick", function () {
  deleteAllLeads();
});

async function getCurrentTabURL() {
  const queryOptions = { active: true, currentWindow: true };
  const tab = await chrome.tabs.query(queryOptions);

  return tab[0].url;
}

function deleteAllLeads() {
  //Remove myLead record in localstorage
  localStorage.removeItem("myLeads");

  // Render out the localstorage on the site witch now is empty!
  render();
}

function renderNewLead(newLead) {
  leadListElement.innerHTML += `<li><a target="_blank" href="${newLead}">${newLead}</a></li>`;
}

function clearInput() {
  inputElement.value = "";
}

function updateLocalStorage(newLead) {
  let localLeads = JSON.parse(localStorage.getItem("myLeads")) || [];
  localLeads.push(newLead);
  localStorage.setItem("myLeads", JSON.stringify(localLeads));
}

function render() {
  const localLeads = JSON.parse(localStorage.getItem("myLeads")) || [];

  // This new variable help the function to reduce DOM update to only 1 at the end
  let newInnerHTMLList = "";
  for (let i = 0; i < localLeads.length; i++) {
    newInnerHTMLList += `<li><a target="_blank" href="${localLeads[i]}">${localLeads[i]}</a></li>`;
  }

  leadListElement.innerHTML = newInnerHTMLList;
}
