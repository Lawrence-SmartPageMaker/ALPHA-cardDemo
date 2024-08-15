//Structure-Edit.js
// Watch line 111

function tryToRefresh() {
  //alert("In middle of tryToRefresh");
  secureRefreshedPageEdit();
  secureRefreshedPageField();
}
// Formally TearTheRightDown
function secureRefreshedPageEdit() {
  if (gblActiveTab != "secC") return;

  document.getElementById("RightPanel").innerHTML = "";
  // switched off
  const el = document.getElementById("widthToggle");
  let token = el.innerHTML.trim();
  //alert("I can see the token - " + token);

  const outwards = '{{ Width }}';
  const inwards = '}} Width {{';

  let reverse = token === outwards ? inwards : outwards;
  el.innerHTML = reverse;

  gstrCellHeight = toggledFoldPanelHt(reverse);
  strutureOffields();

}
function secureRefreshedPageField() {
  if (gblActiveTab != "secD") return;
  //alert("Secure the Refreshed Page FIELD");
  // Keep this as line 32
  FieldPagePrepare();
  // borrowed this for NOW BEGIN ...............................
  confirmDataContent();
  console.log("Titles are: " + GlobalTitle); // For debugging purposes
  let blnEqual = false;
  if (gint == GlobalTitle.length) {
    blnEqual = true;
  }

  let s = "Comparing (internal,total, blnEQUAL- ";
  s += "(internal,total, blnEQUAL) > ";
  s += gint + ", ";
  s += GlobalTitle.length + ", "
  s += blnEqual;

  console.log(s);

  // copy code from extensionsDriveBoth and then try to update the postset
  if (!blnEqual) {
    extensionsDriveBoth('Temp', 'Cool');
    extensionKeepLocal('Temp');
    extensionsDriveBoth('Volume', 'Loud');
    extensionKeepLocal('Volume');

    titlespostset = postset; // better to do the shallow copy bit!
  }

}
function extensionsDriveBoth(title, defaultValue) {
  if (checkFieldInsideList(title)) { return; }
  // no repeated action
  //extensionGlobalStorage(title,defaultValue); probably NOT !
  extensionShowLocal(title, defaultValue);

}
function checkFieldInsideList(item) {
  const table = document.getElementById('addedFields');
  // Get all td elements within the table
  const tdElements = table.querySelectorAll('td');      // Flag to check if "item" is found
  let itemValueFound = false;

  // Loop through each td element
  tdElements.forEach(td => {
    // Check if the text content of the td element is exactly "itemValue"
    if (td.textContent.trim() == item) {
      itemValueFound = true;
    }
  });

  return itemValueFound;
}

function extensionGlobalStorage(title, defaultValue) {
  GlobalTitle.push(title);
  contentExtendOne(defaultValue);
}

function extensionKeepLocal(oneTitle) {
  if (!postset.includes(oneTitle)) {
    postset.push(oneTitle)
  }
}

function extensionShowLocal(title, defaultValue) {
  const table = document.getElementById('addedFields');
  let newRow = table.insertRow(-1);
  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);

  cell1.textContent = title;
  cell2.textContent = defaultValue;

  document.getElementById('title').value = '';
  document.getElementById('defaultValue').value = '';
}

function FieldPagePrepare() {

  let coverTitle = CoverClosedRow(GlobalTitle);
  const canHave = "None," + coverTitle.join(',');
  let YouCanHave = canHave.split(",");
  populateDropdowns(YouCanHave);
  /* This populated the DropDown boxes and */
}

function populateDropdowns(boxWillGet) {
  //alert("Populating the dropdowns" + boxWillGet);
  const dropdowns = [
    document.getElementById("dropdown1"),
    document.getElementById("dropdown2"),
    document.getElementById("dropdown3")
  ];

  // Iterate over each dropdown and populate with options
  dropdowns.forEach(dropdown => {
    // Clear existing options
    dropdown.innerHTML = "";

    // Add new options from the YouCanHave array
    boxWillGet.forEach(optionText => {
      const option = document.createElement("option");
      option.value = optionText;
      option.text = optionText;
      dropdown.appendChild(option);
    });

    // Set default option to "None"
    dropdown.value = "None";
  });
}