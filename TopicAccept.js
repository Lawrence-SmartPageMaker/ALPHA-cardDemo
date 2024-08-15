//
// =======================================================
// 
// This part of the code is basically static so it gets
// 
//      called TopicAcceptGeneral
//
// Although it calls TopicAcceptSectionBased
//
//  That HAS to be in a  file called   TopicAcceptSection
//                                     ================== 
//  When THAT file is made it will have much resemblance to 
//   taskEmbedContent AGAIN and AGAIN
//
//==========================================================
//
// ********** BEGIN ********* STAYS BEHIND in Upper Topic Accept
function toggleSection(sectionId) {
    alert("Called ToggleSection");
    const foundPrev = findStamp(sectionId);
    placeViaName(sectionId, foundPrev);
    alert("Going to call ReadViaName");
    readViaName(sectionId);
    saveStamp(sectionId);
    // find,place,read and save will be in the module "TopicAccept"
}
// *********** END ******** STAYS BEHIND  in Upper Topic Accept

// ********** BEGIN ********* STAYS BEHIND Middling Topic Accept
function stubForPushChange() {
    takeEmbedContent('secEARLYWORLD');
}
// *********** END ******** STAYS BEHIND  in Middling Topic Accept

function takeEmbedContent(sectionId) {
    /* Works using User defined data-stats in EVERY CASE */

    if (sectionId != "secEARLYWORLD") return;
    alert("Working on -- takeEmbedContent");
    const str = document.getElementById('ThatList').getAttribute('data-stats');
    const objBack = JSON.parse(str);

    let toFind = objBack["listText"];

    alert(toFind);

    // Get all the list items
    const listItems = document.querySelectorAll('#ThatList li');

    // Loop through each list item
    listItems.forEach(function (item) {

        // Check if the text content matches 'Something Later'
        if (item.textContent === toFind) {
            // Replace the text content
            item.textContent = "##" + toFind;
        }
    });

}

function findStamp(sectionId) {
    let oldSource = "Empty";
    let fullSearchId = ["secA", "secB", "secC", "secD", "secE", "secF"];

    for (let i = 0; i < fullSearchId.length; i++) {
        let cap = fullSearchId[i];
        let el = document.getElementById(cap);
        if (el.getAttribute('name') === "Borrowed") {
            if (sectionId != cap) {
                oldSource = cap;
                const el = document.getElementById(cap);
                el.setAttribute('name', cap);
            }
        }
    }
    return oldSource;
}

function placeViaName(sectionId, foundPrev) {
    if (foundPrev != 'Empty') {
        saveOldTopicStruct(foundPrev);
        saveOldTopicValue(foundPrev);
    }
}

function readViaName(sectionId) {
    if (sectionId == "secB") {
        alert("readViaName-Select");
    }
    if (sectionId == "secC") {
        alert("readViaName-Edit");
        toggleFoldablePanel();
    }

    loadNewTopicStruct(sectionId);
    loadNewTopicValue(sectionId);
}

function saveStamp(sectionId) {
    findStamp(sectionId);
    const Source = document.getElementById(sectionId);
    Source.setAttribute('name', "Borrowed");
}

function loadNewTopicStruct(sectionId) {
    const section = document.getElementById(sectionId);
    const SourceArticle = section.querySelector('article');
    const clonedArticle = SourceArticle.cloneNode(true);

    clonedArticle.querySelectorAll('*').forEach(element => {
        // Check if the element has an ID attribute
        if (element.id) {
            // Replace the ID with the element's name attribute
            const name = element.getAttribute('name');
            if (name == "secBnainSubject") {
                alert("secB main Subject!");
            }
            if (name) {
                element.id = element.name;
            }
        }
    }); // <-- close the forEach loop

    const dest = document.getElementById("workAtSelector");
    dest.innerHTML = clonedArticle.innerHTML;
}

function loadNewTopicValue(sectionId) {
    const section = document.getElementById(sectionId);
    const loadingSource = section.querySelector('article');
    const BringHome = document.getElementById("workAtSelector");
    /*
        loadingSource.querySelectorAll('*').forEach(element => {
            // Check if the element has an ID attribute
            if (element.id) {
                // Replace the ID with the element's name attribute
                const name = element.getAttribute('name');
                if (name) {
                    let correspondingElement = BringHome.querySelector("#" + name);
                    const avoidThem = ["secBMainSubject", "EXXditFieldAreaPage", "sXXecBmainSubject"];
                    
                    if (avoidThem.includes(name) == false) {
                        let s = " #### TopicValue[" + element.id;
                        s += "] brings back the value " + element.value;
                        console.log(s);
                        correspondingElement.value = element.value;
                    } // End if excluded
                }
            }
        }); // <-- close the forEach loop
    */
}

function saveOldTopicStruct(cap) {
    const dest = document.getElementById(cap);
    const DestArticle = dest.querySelector('article'); // This is to WHERE it is going OUT

    const SourceArticle = document.getElementById("workAtSelector");
    const clonedArticle = SourceArticle.cloneNode(true);


    clonedArticle.querySelectorAll('*').forEach(element => {
        // Check if the element has an ID attribute
        if (element.id) {
            // Replace the ID with the element's name attribute
            const name = element.getAttribute('name');
            if (name) {
                element.id = nonClashReName(element.name);
            }
        }
    }); // <-- close the forEach loop

    DestArticle.innerHTML = clonedArticle.innerHTML;
    //console.log(clonedArticle.innerHTML); 
}
function saveOldTopicValue(cap) {
    const SourceMain = document.getElementById("workAtSelector");

    const TargetBack = document.getElementById(cap);

    // Get all elements in SourceMain
    const elementsInSourceMain = SourceMain.querySelectorAll("[id]");

    // Loop through each element in SourceMain
    elementsInSourceMain.forEach(function (element) {
        var id = element.id;
        var correspondingId = nonClashReName(id);

        // Find corresponding element in TargetBack
        var correspondingElement = TargetBack.querySelector("#" + correspondingId);

        // If corresponding element exists, copy the value
        if (correspondingElement) {
            correspondingElement.value = element.value;
        }
    });
}

function removeOldLabel(sectionId) {
    const Source = document.getElementById(sectionId);
    Source.setAttribute('name', "Borrowed");
}

function nonClashReName(pureId) {
    if (pureId.length <= 2) {
        return pureId; // No mangling for strings with 2 or fewer characters
    }

    let ret = pureId[0];
    const leftover = pureId.length - 1;
    ret += 'XX';
    ret += pureId.slice(-leftover);

    return ret;
}
