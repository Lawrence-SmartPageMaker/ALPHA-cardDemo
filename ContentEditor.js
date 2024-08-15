
// Code Module FOR now try to prefix everything PUBLIC with cont

// Aprox Content


function contentExtendOne(newDataSuffix){
	alert("Lookee HERE");
	let catchEm = contOverwiteToExtend(newDataSuffix);
	contResendList(catchEm);
    const { dataStructure, keys } = buildDataStructure();
    // which is within dataOpen
    gobjDataStructure = dataStructure;
	// From a correct gobjDataStructure
    // the Edit-page and Field-page should be reset
    // exactly as they appear in the "Hardwire page" 
}

function contOverwiteToExtend(newDataSuffix) {
  const ulElement = document.getElementById('HoldsRowContent');
  const listItems = ulElement.getElementsByTagName('li');

  //const objHolder = {}; // Initialize an empty object to store the results
  const retContent = []; // Initialize an array to store the keys

  for (const listItem of listItems) {
    const [key, ...values] = listItem.textContent.split(','); // Split the text by comma
    let line = values.join(','); // Join the remaining values back together
    line = truncB4suffix(line);
    line = key + "," + line + "," + newDataSuffix + ",e*o*L,#"
    retContent.push(line);
    console.log("## P ## E ## A ## K > " + line );
  }
  return retContent;
}

function contResendList(catchEm) {
    const ulElement = document.getElementById('HoldsRowContent');
    ulElement.innerHTML = ""; // Clear previous content

    // Loop through the catchEm array
    for (let i = 0; i < catchEm.length; i++) {
        const liElement = document.createElement('li'); 
             // Create a new <li> element
        liElement.textContent = catchEm[i]; 
             // Set the text content of the <li> element
        ulElement.appendChild(liElement); 
              // Append the <li> element to the <ul> element
    }
}


