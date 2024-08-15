/*
    Watch Lines 150
               ##### 
GlobalTitle
    1. Overwrite: Function Lead-Column
    2. leave top of file until just before that function
    3. Do whatever else there is


*/
// ****** BEGIN ******** Global values
  var gint=0; // some sort of default? 
  var gblActiveTab;
  var glblInfoToShow;
  var glblFocusedRowIndex = -1; 
  var glblInfoToShow = [];
  var GlobalTitle = [];
  var globalSpanPic = "";
  var rowdata={};
  var preset=[];
  var postset=[];
  var globalReco = [0, -1]; // it continues 1,2,3....
// ****** END ******** Global values 

function GeneralInit() {
  globalSystemState = "EMPTY.OPEN";
  datasetGrandRemake({},[],[]);
  recoverySetup();
}

function recoverySetup(){
  for (let i = 1; i < 50; i++) {
            globalReco.push(i);
  };
}

function datasetGrandRemake(rowSource, presets, postsets) {
  //alert("datasetGrandRemake");
  
  FieldBuildAnticipate(presets, postsets);
  LoadData(rowSource);
  glblInfoToShow = readInFromRows();
  const linesOfContent = dataMakeLines();
  SendOnToSelPair(linesOfContent);   
  
  // console.log("rowSource => " + glblInfoToShow);
  const { dataStructure, keys } = buildDataStructure();
  gobjDataStructure = dataStructure;
  
  //confirmDataContent(); 






// This stays line 43 for TINY demo example comes from T81
  glblFocusedRowIndex = -1; // Initialize the focused row index
  EditSecPrepareButtons();
  initFieldFuture(presets,postsets); // We are certain That fields are made here!  

}

function confirmDataContent(){
  
  const { dataStructure, keys } = buildDataStructure();
  //gobjDataStructure = dataStructure; THAT was done before!!
  // DEFINATELY SOMETHING POINTLESS about at least one of the two lines above !
  const validKeys = keys.slice(0, 3); // Get the first three valid keys
  for (let i = 0; i < validKeys.length; i++) {
    let showMe = validKeys[i];
    let result = discoverData(showMe);
    console.log("To prove it using {" + showMe + "} " + result);
  }
  

}

function whereAreWeNow(){
    //alert("Where are we NOW");
    confirmDataContent();
    console.log("Titles are: " + GlobalTitle); // For debugging purposes
    console.log("of which the INTERNALS count as " + gint); 

}


function truncB4suffix(paragraph) {
    const index = paragraph.indexOf('e*o*L') - 1;
    return paragraph.slice(0, index);
}

function discoverData(key) {
  if (gobjDataStructure.hasOwnProperty(key)) {
    let p = gobjDataStructure[key];
    return p; // Retrieve the value associated with the key
  } else {
    return 'Key not found'; // Handle the case when the key is not present
  }
}
function buildDataStructure() {
  const ulElement = document.getElementById('HoldsRowContent');
  const listItems = ulElement.getElementsByTagName('li');

  const objHolder = {}; // Initialize an empty object to store the results
  const keys = []; // Initialize an array to store the keys

  for (const listItem of listItems) {
    const [key, ...values] = listItem.textContent.split(','); // Split the text by comma
    let line = values.join(','); // Join the remaining values back together

    objHolder[key] = truncB4suffix(line); // Assign the line up to the suffix
    keys.push(key); // Store the key in the array
  }
  return { dataStructure: objHolder, keys: keys }; // Return the built data structure and keys
}

//This  stays line 101
function smallBar(callerId){
    //alert("smallBar : => :" + callerId);
    let msg = "";
    postset = []; // should be global
    titlespostset=postset; // better to do the shallow copy bit!
    
    if (!allowedToChangeFeedSubject(callerId)) {
      return "Nothing";
    }

// ===== From here on you ARE allowed to change the subject !
    switch (callerId) {
        case "tiny":
          rowdata = {
            "T61": "SortingStub:T61,Mammal,Land,Elephant,e*o*L,#",
            "T81": "SortingStub:T81,Mammal,Land,Horse,e*o*L,#",
            "S41": "SortingStub:S41,Fish,Water,Gold Fish,e*o*L,#",
            "R91": "SortingStub:R91,Bird,Air,Seagull,e*o*L,#"
          };

          preset=["ID","Runner",
                      "Type","Environment","Name"];
          postset=[];

          //alert("smallbar called TINY");
          datasetGrandRemake(rowdata,preset,postset);
          break;          
        case "mix":
          rowdata = {
            "M10": "SortingStub:M10,Land,Mammal,Large with long nose called a trunk,Elephant,Warm,Serious trumpet,e*o*L,#",
            "M20": "SortingStub:M32,Water,Fish, Charge about both fresh and salt ,Salmon,Cold,Loud splash,e*o*L,#",
            "M30": "SortingStub:M30,Air,Bird,King of them all,Eagle,Cold,Quiet doesn't need to,e*o*L,#",
            "M40": "SortingStub:M40,Air,Bird,screechy w-drawn hunts in the sea WITHOUT swimming,Seagull,Cold,Loud,e*o*L,#"
          };
          preset=["id", "Runner", "Enviroment", "Type", "Content"]; 
          postset=["Name", "Volume"];

          //alert("smallbar called MIX");
          datasetGrandRemake(rowdata,preset,postset);

          extensionsDriveBoth('Temp','Cool');
          extensionsDriveBoth('Volume','Loud');
          
          break;
        case "stand":
          rowdata = LoadDataAnticipateBlank();
          preset=["ID","Runner","Prompt",
                      "Clue","Content"];
          postset=[];

          //alert("smallbar called STANDARD");
          datasetGrandRemake(rowdata,preset,postset); 
          break;
        case "electro":
          tearTheRightDown();
          break;
        default:
          alert("Case error smallBar - NOT FOUND: "+callerId);
    }
    
    
}

function FieldBuildAnticipate(presets,postsets) {
  //alert("Incase initFieldFuture() was called with BLANKS");
  GlobalTitle = [];// truncate on purpose
  titlespreset = Array.from(presets);
  gint = titlespreset.length; // Have to use right now
  const titlespostset = Array.from(postsets);
  const bothPrePost = [...titlespreset, ...titlespostset]; // Concatenate pre & post
  GlobalTitle = bothPrePost; 

  console.log("Title is now: " + GlobalTitle); // For debugging purposes
  console.log("and the global gint is now  => " + gint); 

}

function initFieldFuture(presets,postsets) {
  FieldBuildAnticipate(presets,postsets); // THIS was a suspect TROUBLE-maker
  FieldBuildOriginal();
  FieldEditInit();
}

function FieldBuildOriginal() {
  //console.log("## ### FieldBuildOriginal BEGAN");
  // This puts in the PRESETS
  const table = document.getElementById('addedFields');
  // This will become EMPTY THAT TABLE
  const minContent = "<tr><th>Title</th><th>Value</th></tr>"; //minimum of Contents allowed
  table.innerHTML =minContent;
// table is now RESET ready for presets

  // Loop through the preset array
  for (let i = 0; i < gint; i++) {
    let newRow = table.insertRow(-1);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);

    cell1.textContent = GlobalTitle[i]; // This had been titlespreset[i]
    cell2.textContent = ' - orig data - ';
  }
  //console.log("## #### FieldBuildOriginal ENDED");
}

function FieldEditInit() {
  setUpFieldVariable();
}

function setUpFieldVariable() {
  document.getElementById('addFieldForm').addEventListener('submit', function (event) {
    event.preventDefault();
    extendStoreDisplay();
  }); // Added closing bracket here
}

function extendStoreDisplay() {
  // This really should have been the .onsubmit event
  // corresponding to FieldAdd
  //                 ##########

  let title = document.getElementById('title').value;
  let result = false;
  if (title.length > 0) {
    result = true;
  }

  if (result) {
    

    let defaultValue = document.getElementById('defaultValue').value;

      if (!titlespostset.includes(title)) {

        titlespostset.push(title);
        titles.push(title);
// Extension to GlobalStorage
        extensionGlobalStorage(title,defaultValue)          
      }
      else {
        return
    }
// Extension to ShowLocal
    extensionShowLocal(title,defaultValue);
  }    

// Stays as line 249  
}


function displayArrayInPopup(array) {
  // Open a new popup window
  var popup = window.open('', 'popup', 'width=600,height=400');

  // Start writing into the popup
  popup.document.write('<html><head><title>Popup Content</title></head><body>');
  popup.document.write('<h1>Array Contents:</h1>');

  // Write each array item as a list element
  popup.document.write('<ul>');
  array.forEach(function (item) {
    popup.document.write('<li>' + item + '</li>');
  });
  popup.document.write('</ul>');

  // Close the popup's document
  popup.document.write('</body></html>');
  popup.document.close();
}

function EditSecDownTheList() {

  glblFocusedRowIndex++;
  EditSecListChanged();
}

function EditSecUpTheList() {
  glblFocusedRowIndex--;
  EditSecListChanged();
}

function EditSecListChanged() {
  const leadColGroup = document.querySelectorAll("#FieldLeadColumn span");
  const max = leadColGroup.length;

  if (glblFocusedRowIndex < 0) {
    glblFocusedRowIndex = 0;
  }
  if (glblFocusedRowIndex >= max) {
    glblFocusedRowIndex = max - 1;
  }

  const span = leadColGroup[glblFocusedRowIndex];
  let s = "Inside : EditSecListChanged";
  s += "   >  " + span.innerText;
  console.log(s);
  LeadCol(span);

  s = "    After LeadCol - we know the code must work within [";
  s += gblActiveTab + "]";
  console.log(s);

  let t = getTabDescription(gblActiveTab);

  s = "    That awful code means: " + t;
  console.log(s);

}

function getTabDescription(gblActiveTab) {
  switch (gblActiveTab) {
    case "secB":
      return "Select";
    case "secC":
      return "Edit";
    case "secD":
      return "Field";
    case "secE":
      return "Hardwire";
    default:
      return "Unknown";
  }
}

function LoadDataAnticipateBlank() {
  const data = {
    "a10": "SortingStub:a10,Tell me about the Mouse:,Small rodent,It is smaller than most rats. It has a very long tail. It adapts to many places. It is considered Urban.,e*o*L,#",
    "a20": "SortingStub:a20,Tell me about the Rabbit:,Hops and has long ears,It hops and has long ears.e*o*L,#",
    "a30": "SortingStub:a30,Tell me about the Squirrel:,Bushy tail,It has a bushy tail. It is known for storing food and endless climbing. It is considered Forest.e*o*L,#",
    "a35": "SortingStub:a35,Tell me about the Rat:,Smart with Long tail and bites a lot,It is smaller than most cats and has a very long tail. It is particularly intelligent and is one of the least liked within its family of species. It is also considered urban.e*o*L,#",
    "a40": "SortingStub:a40,Tell me about the Kangaroo:,Hops and has a pouch,It hops and has a pouch.e*o*L,#",
    "a60": "SortingStub:a60,Tell me about the Bat:,Flies and screeches at night,It is a nocturnal mammal that can fly.e*o*L,#",
    "a70": "SortingStub:a70,Tell me about the Elephant:,Large ears and Long nose,It is the largest land animal with distinctive large ears.e*o*L,#",
    "a80": "SortingStub:a80,Tell me about the Tiger:,Predator with Striped coat,It has a distinctive striped coat and is the largest cat species.e*o*L,#",
    "a90": "SortingStub:a90,Tell me about the Zebra:,Horse-like Striped animal,It is known for its distinctive black and white stripes.e*o*L,#",
    "b10": "SortingStub:b10,Tell me about the Bear:,Large mammal that stands up,It is a large mammal found in various habitats.e*o*L,#",
    "b20": "SortingStub:b20,Tell me about the Eagle:,Big bird of prey,It is a bird of prey known for its keen eyesight and powerful talons.e*o*L,#",
    "b30": "SortingStub:b30,Tell me about the Giraffe:,Long Neck,It is known for its long neck and distinctively patterned coat.e*o*L,#",
    "b50": "SortingStub:b50,Tell me about the Owl:,Nocturnal bird,It is a nocturnal bird known for its silent flight.e*o*L,#",
    "b60": "SortingStub:b60,Tell me about the Peacock:,Beautiful plumage,It is known for its vibrant and colorful plumage.e*o*L,#",
    "b80": "SortingStub:b80,Tell me about the Wolf:,Canine predator,It is a carnivorous mammal that lives and hunts in packs. The wolf as a meat-eater hunts where the prey is found such as grasslands. However - for shelter and protecting their young - they do better in the forest.e*o*L,#",
    "c10": "SortingStub:c10,Tell me about the Forest Owlet:,Hoots in the trees, It is a typical owlet with a rather unspotted crown and heavily banded wings and tail. They have a relatively large skull and beak.They can see at night so the forest doesn’t bother them.e*o*L,#",
    "c15": "SortingStub:c15,Tell me about the Bull Frog:,Noisy Amphibian,It typically inhabits large permanent water bodies (wetland) such as swamps ponds and lakes.e*o*L,#",
    "c30": "SortingStub:c30,Tell me about the Black Bear:,American eats EVERYTHING,They eat plants like skunk cabbage - grasses berries acorns and nuts. They also eat bees - ants  termites eggs and small animals. Black bears rely on wetland habitats to find shelter and safely raise their cubs.e*o*L,#",
    "c40": "SortingStub:c40,Tell me about the Marsh Deer:,Deer paddles and swims,The marsh deer lives only in (wetland) marsh areas. In those places - the level of water is less than 70cm deep.e*o*L,#"
  };
  
  return data;
}


function LoadData(sourceOfRows) {
  let dataASsourceOfRows = {};

  // Check if sourceOfRows is empty
  if (Object.keys(sourceOfRows).length === 0) {
    //console.log("sourceOfRows was empty.");
    dataASsourceOfRows = LoadDataAnticipateBlank();
    
  } else {
    dataASsourceOfRows = sourceOfRows;
  }


  // Get the UL element
  const ulRows = document.getElementById('HoldsRowContent');
  ulRows.innerHTML = ""; // removed ALL the elements


  // Loop through each item in the data object
  for (const [key, value] of Object.entries(dataASsourceOfRows)) {
    const listItem = document.createElement('li');
    listItem.textContent = key + "," + value;
    ulRows.appendChild(listItem);
  }
}

function readInFromRows() {
  // Get the UL element
  const ulRows = document.getElementById('HoldsRowContent');
  let rows = [];
  ulRows.childNodes.forEach((node, index) => {
    if (node.nodeName === 'LI') {
      const listItemText = LeadFromIndex(index) + node.textContent;
      rows.push(listItemText);
    }
  });
  //alert("This gives an idea of HOW to make rows "+rows);
  return rows;
}

function readInAsColumns() {
  let cols = [];
  const ulColumns = 
    document.getElementById('HoldsColumnStructure'); 
  // Assume you have column data (e.g., an array of column values)
  // Loop through the column data and create <li> elements
  for (const columnValue of columnData) {
    const columnListItem = document.createElement('li');
    columnListItem.textContent = columnValue;
    ulColumns.appendChild(columnListItem);
    cols.push(columnValue);
  }
  return cols;
}

function LeadFromIndex(index) {
  let ret = (index * 10).toString();
  ret = '0' + ret + ",";
  return ret.slice(-4);
}

// LeadCol has already been updated


function LeadCol(span) {
 globalSpanPic = span.innerHTML; // Global updated 

 //alert("Reached line 312");
 const selectElement = document.getElementById('topic-select');
 const selectedValue = selectElement.value;
 const topicContext = getTabDescription(selectedValue);
 console.log("After line 431 # We are on page : " + topicContext); 

 if (topicContext == "Edit") leadColEdit(span);
 if (topicContext == "Select") leadColSelect(span);

}



function LeadFromIndex(index) {
  let ret = (index * 10).toString();
  ret = '0' + ret + ",";
  return ret.slice(-4);
}
// Delete most of whats left below HERE
function EditSecPrepareButtons() {
  document.addEventListener('keydown', function (event) {
    if (event.key === 'PageDown') {
      document.getElementById('EditDownButton').click();
      event.preventDefault(); // Prevent default PageDown behavior (scrolling)
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'PageUp') {
      document.getElementById('EditUpButton').click();
      event.preventDefault(); // Prevent default PageUp behavior (scrolling)
    }
  });
}
function dataMakeLines(){
  let str = "";

  const prefix = "<span onclick='LeadCol(this)'>";
  const suffix = "</span><br>";

  glblInfoToShow.forEach((s) => {
    let parts = s.split(',');
    const t = " " + parts[0] + " : " + parts[1] + " "; // changed to COLON
    str += prefix + t + suffix;
    });
  return str;
 }

function SendOnToSelPair(Content) {
      //alert("Expect something horrid shortly")
      const FieldLeadColumn = document.getElementById("FieldLeadColumn");
      FieldLeadColumn.innerHTML = Content;
      const verticalNav = document.getElementById("verticalNav");
      verticalNav.innerHTML = Content;
    }

//stays as line 499
    
// Formally tearTheRightDown
