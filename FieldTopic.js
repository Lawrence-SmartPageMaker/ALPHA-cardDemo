// watch 248 The CLEVER bit
function redrawUpdate() {
  //alert("Oh dear I cant get that field in :(");
  redrawRows();

}

// Extra Validation and EXIT STUFF

function allowedToChangeFeedSubject(subject) {
  let ret = true;
  let vect = globalSystemState.split(".");

  if (vect[1] !== "OPEN") {
    alert("Sorry CANT change subject after SORTING");
    return false;
  }

  globalSystemState = subject + ".OPEN";
  return ret;
}

function allowedToUseSort(actionName) {
  ret = true;
  let vect = globalSystemState.split(".");

  if (vect[0] === "EMPTY") {
    alert("Sorry CANT apply SORTING without a SUBJECT");
    return false; // "Sorting button LOCKED";
  }

  globalSystemState = vect[0] + "." + actionName;

  return ret;
}


function redrawRows() {
  // Get dropdown values
  const dropdown1 = document.getElementById("dropdown1").value;
  const dropdown2 = document.getElementById("dropdown2").value;
  const dropdown3 = document.getElementById("dropdown3").value;
  // Process each row

  let coveredIndexList = [];
  let coverWith = [];
  coverWith.push(dropdown1);
  console.log("This is the column marker as an INDEX  =====>");
  coveredIndexList.push(getFieldIndex(coverWith[0]) - 1);

  if (dropdown2 !== "None") {
    coverWith.push(dropdown2);
    coveredIndexList.push(getFieldIndex(coverWith[1]) - 1);
  }


  if (dropdown3 !== "None") {
    coverWith.push(dropdown3);
    coveredIndexList.push(getFieldIndex(coverWith[2]) - 1);
  }


  console.log(coveredIndexList[0]);

  let rows = CoverReturnDataFeed();
  console.log("These were old rows =====>");
  console.log(rows);


  //"We started with the-one-field-we-had"
  let newRows = [];
  for (let i = 0; i < rows.length; i++) {
    const str = rows[i];
    const rowAllFields = str.split(",");


    let itemToSave = rowAllFields[coveredIndexList[0]]; //begin with 1st dropdown
    itemToSave = supressTrailingColon(itemToSave);

    if (coveredIndexList.length >= 2) {
      itemToSave += ":" + rowAllFields[coveredIndexList[1]]; //so get the second dropdown
      itemToSave = supressTrailingColon(itemToSave);
    }

    if (coveredIndexList.length >= 3) {
      itemToSave += ":" + rowAllFields[coveredIndexList[2]]; //so get the third once
      itemToSave = supressTrailingColon(itemToSave);
    }

    let pkAtEnd = getLastCoveredSegment(rowAllFields[0]);
    // As the last of those dropdowns were added we still need the PK
    itemToSave += ":" + pkAtEnd;

    newRows.push(itemToSave);
  }

  if (allowedToUseSort('redrawing')) {
    console.log("allowedToUseSort MUST have been TRUE");
    console.log("These are the new Rows =====>");
    console.log(newRows);
    writeUniqueToLeft(newRows);
    //alert("New rows were WRITTEN");
  }
}

function getLastCoveredSegment(str) {
  // Split the string by ':'
  const segments = str.split(':');
  // Return the last element of the array
  return segments.pop();
}

function supressTrailingColon(input) {
  //console.log("Trim trailing whitespace");
  let trimmedString = input.trimEnd();

  // Check if the last character is a colon
  if (trimmedString.endsWith(':')) {
    // Remove the last character
    trimmedString = trimmedString.slice(0, -1);
  }

  return trimmedString;
}



function rewriteSelector(rows) {
  // Get a reference to the dropdown element
  const dropdown = document.getElementById('dropdown');

  // Remove all existing options
  while (dropdown.firstChild) {
    dropdown.removeChild(dropdown.firstChild);
  }

  // Add new options based on the provided rows
  for (const row of rows) {

    /*==== bypassed this BEGIN
    const [value, text] = row.split(':'); // Assuming each row is in the format "value:text"
     ===== bypassed this END */
    const option = document.createElement('option');
    const [key, text] = row.split(','); // Assuming each row is in the format "key,text"

    option.value = key;
    option.textContent = key;
    dropdown.appendChild(option);
  }
}


function getFieldIndex(candidate) {
  let coverTitle = CoverClosedRow(GlobalTitle);
  const canHave = "None," + coverTitle.join(',');
  let YouCanHave = canHave.split(",");

  let found = -1;

  for (let i = 0; i < YouCanHave.length; i++) {
    if (YouCanHave[i] === candidate) {
      found = i;
      break; // Stop the loop once the candidate is found
    }
  }

  return found;
}


// keep this as line 69
function CoverFindUsNow() {
  // based on original whereAreWeNow()
  //alert("Where are we NOW");
  CoverconfDataContent();
  let coverTitle = CoverClosedRow(GlobalTitle);
  const canHave = "None," + coverTitle.join(',');
  let YouCanHave = canHave.split(",");




  console.log("Cover Titles are: " + CoverClosedRow(GlobalTitle)); // For debugging purposes
  console.log("of which the useful count comes to " + coverTitle.length);
  console.log("Of particular interest are the listboxe content of", YouCanHave);

}

function CoverconfDataContent() {
  const { dataStructure, keys } = buildDataStructure();
  // gobjDataStructure = dataStructure; // Already done elsewhere

  // Use the entire keys array
  const validKeys = keys;

  for (let i = 0; i < validKeys.length; i++) {
    let showMe = validKeys[i];
    let result = discoverData(showMe);
    console.log("To prove it using {" + showMe + "} " + result);
  }
}

function CoverReturnDataFeed() {
  let ret = [];
  const { dataStructure, keys } = buildDataStructure();
  // gobjDataStructure = dataStructure; // Already done elsewhere

  // Use the entire keys array
  const validKeys = keys;

  for (let i = 0; i < validKeys.length; i++) {
    let showMe = validKeys[i];
    ret.push(discoverData(showMe));
    //console.log("To prove it using {" + showMe + "} " + result);
  }
  return ret;
}

function CoverdiscData(key) {
  if (gobjDataStructure.hasOwnProperty(key)) {
    let p = gobjDataStructure[key];
    // The hop skip and jump probably gets in here
    return CoverClosedRow(p); // Retrieve the ClosedRow value associated with the key
  } else {
    return 'Key not found'; // Handle the case when the key is not present
  }
}
// reco should be covered by GeneralInit somewhere
/* let unclosedRow = ["E41T", "WhatEverWeget:E41T", "What is a pipe", "Bit Like a straw", "Cylinder with both ends open"]; */
// Keep this as 199
function CoverClosedRow(unclosedRow) {
  let out = [];

  for (let j = 0; j < unclosedRow.length; j++) {
    let i = globalReco[j + 1];
    if (i > -1) {
      out.push(unclosedRow[i]);
    };
  };
  return out;
}

function renumInPlace() {
  if (!allowedToUseSort('renumbering')) {
    return "Nothing";
  }
  //alert("Continue renum in PLACE .....")
  let coverKeysBack = getRightmostSegment(); // This is the CLEVER bit
  //alert("Now populate the editPage and selectPage " + coverKeysBack);

  writeUniqueToLeft(coverKeysBack);
}

function demoOfRHS() {
  let contentsForLeft = [];
  contentsForLeft = getRightmostSegment();
}

function getRightmostSegment() {
  const LeadColDiv = document.getElementById('LeftPanel');
  const spanTextValues = [];
  // Get all span elements within FieldLeadColumn
  const spanElements = LeadColDiv.getElementsByTagName('span');

  // Iterate through the span elements pushing the innerHTML content to the array
  for (let i = 0; i < spanElements.length; i++) {
    const s = segmentSuffixOnly(spanElements[i].innerHTML.trim());
    spanTextValues.push(coverTheeDig(i * 5) + " : " + s);
  }

  // Log the list of text values
  console.log(spanTextValues);

  //alert("Rightmost segment from the Left whatsit of the Edit Page");
  return (spanTextValues);
}
function segmentSuffixOnly(item) {
  const vect = item.split(":");
  return vect.pop();
}











// Keep this as line 275
function writeUniqueToLeft(lineNotYetSorted) {
  /*
      If globalSystemState ends with "renumbering", it leaves
      the lineNotYetSorted array as-is. Otherwise, it creates
      a sorted copy of lineNotYetSorted.
  
  */

  let lineList = [];
  const vect = globalSystemState.split("."); // feedSubj.ActionVerb
  if (vect[1] !== 'renumbering') {
    lineList = lineNotYetSorted.slice().sort();
  } else {
    lineList = lineNotYetSorted; // DONT want to sort it
  }

  const editPageTarget = document.getElementById("LeftPanel");
  const selectPageTarget = document.getElementById("verticalNav");

  let wholeString = "";
  let uniqueItems = new Set();

  for (let i = 0; i < lineList.length; i++) {
    if (!uniqueItems.has(lineList[i])) {
      uniqueItems.add(lineList[i]);
      let str = '<span onclick="LeadCol(this)">';
      str += lineList[i];
      str += '</span><br>';
      wholeString += str;
    }
  }

  editPageTarget.innerHTML = wholeString;
  selectPageTarget.innerHTML = wholeString;
}

// keep as line 242
function CoveredNumberFive() {
  const { dataStructure, keys } = buildDataStructure();
  const validKeys = keys; // Use all keys
  let listToSort = []; // empty array
  for (let i = 0; i < validKeys.length; i++) {
    let showMe = validKeys[i];
    let result = discoverData(showMe);
    const allThru = result.split(",");
    listToSort.push(allThru[0]);
    console.log("To prove it using {" + showMe + "} " + result);
    console.log(" ===| The sortItem is " + allThru[0]);
  }

  // Sort the listToSort then NUMBER it as "array in place"
  listToSort.sort();
  const arrayInPlace = [];
  for (let i = 0; i < listToSort.length; i++) {
    let itemSuffixKey = listToSort[i];
    let vectorHoldsKey = itemSuffixKey.split(":");
    let extract = coverTheeDig(i * 5) + " : " + vectorHoldsKey.pop(); // NOW with COLON

    arrayInPlace.push(extract);
  }
  return arrayInPlace;

}


function coverTheeDig(num) {
  // Function to pad a number with leading zeros until it is three characters long
  return num.toString().padStart(2, '0');
}



function setAsAddSort(selObjective) {
  const maskForAdd = ["block", "block", "none", "none"];
  const maskForSort = ["none", "none", "block", "block"];
  let mask = [];

  if (selObjective === "ADDING") {
    mask = maskForAdd;
  } else if (selObjective === "SORTING") {
    mask = maskForSort;
  }

  if (mask.length > 0) {
    const eleVect = [
      document.getElementById('addFieldForm'),
      document.getElementById('addedFields'),
      document.getElementById('decidePriotityDown'),
      document.getElementById('ShowRunningPriotity')
    ];

    for (let i = 0; i < eleVect.length; i++) {
      eleVect[i].style.display = mask[i];
    }
  }
  tryToRefresh();
}
