
//Watch 112
// Global variables == BEGIN
        var gintEndFixed = 5;
        var gstrCellHeight = '1px';
// Global variables == END

function fieldForSides(index) {
    let t = '000' + (index + 1).toString();
    t = "Field-" + t.substring(t.length - 3);
    return t;
}

function captionOneTableSide(value, index) {
    let id = fieldForSides(index);
    return '<td><label class="tdlabel" for="' + id + '">' + value + '</label></td>';
 }

function captionSide(value, index) {
    let id = fieldForSides(index);
    return '<td><label class="tdlabel" for="' + id + '">' + value + '</label></td>';
 }

function editOneRowSide(index) {
    let id = fieldForSides(index);
    const currRowFrom = document.getElementById("RightPanel");
    let cWidth = currRowFrom.style.width;
    cWidth = (parseInt(cWidth.replace("px", "")) * 2 / 3);

    let ret= '<td><textarea class="tdValueWithin" id="' + id + '"';
    ret+= ' style="width:' + cWidth + 'px ';
    ret+='"></textarea></td>';


    // Fixed at line 35
    return ret;
}

function editOneTableSide(index) {
    let ret = "";
    let cHeight = gstrCellHeight;

    let id = fieldForSides(index);
    const currRowFrom = document.getElementById("RightPanel");
    let cWidth = currRowFrom.style.width;
    cWidth = (parseInt(cWidth.replace("px", "")) * 7 / 8);

    ret += '<td><textarea style="width:' + cWidth + 'px ';
    ret += ';height:' + cHeight + '"';
    ret += ' id="' + id + '"></textarea></td>';

    return ret;
}

function oneRowPerName(values, i) {
    //alert("CALLED row code");
    let ret = "<tr>";
    ret += captionSide(values[i], i) + editOneRowSide(i) + '</tr>';
    console.log('Whole row within function gives: ' + ret);
    
    return ret;
}

function oneTablePerName(values, i) {
    //alert("CALLED table code");
    let ret = "<table><tr>";
    let rowDiv = "</tr><tr>";
    ret += captionOneTableSide(values[i], i) + rowDiv + editOneTableSide(i) + '</tr></table>';
    console.log('Whole table within function gives: ' + ret);
    return ret;
}

 function updateDivWithCSV(csvLine) {
    let values = csvLine.split(',');
    let lineThru = "<table>"; // Start the first table correctly

    // Loop for the first fixed fields (0 to 1)
    for (var i = 0; i < 2; i++) {
        lineThru += oneRowPerName(values, i);
    }
    lineThru += '</tr></table>'; // Close the first table properly

    // Append middle content
    let gint = 5; // Assuming gint is defined appropriately
    for (var i = 2; i < gint; i++) {
        lineThru += oneTablePerName(values, i);
    }

    lineThru += "<table>";
    let j = gintEndFixed;
            
    // Loop for fields beyond the fixed ones
    for (var i = j; i < values.length; i++) {
        lineThru += oneRowPerName(values, i);
    }
    lineThru += '</table>'; // Close the second table properly

    document.getElementById("RightPanel").innerHTML = lineThru;
}

function ForceUpdate() {
    console.log("Force Update >>>>>");
     strutureOffields();
}

function strutureOffields() {
    console.log("Structure-Titles > " + GlobalTitle); // For debugging purposes
    console.log("of which the INTERNALS count as > " + gint);  
    joint = GlobalTitle.join(",");

    updateDivWithCSV(joint);
}


function toggleFoldablePanel() {
    const button = document.getElementById('widthToggle');
    const outwards = '{{ Width }}';
    const inwards = '}} Width {{';

    let reverse = button.innerHTML.trim() === outwards ? inwards : outwards;
    button.innerHTML = reverse;

    gstrCellHeight = toggledFoldPanelHt(reverse);
    strutureOffields();
}

function toggledFoldPanelHt(newState) {
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    const takeFirst = 24; // It was 36 which fits multiples 72 and 144
                          //    ######   
    let updatedHeight = '105px';
    let n = -4 + (takeFirst * 4);
    leftPanel.style.width = n + 'px';
    let updatedWidth = (360 - n) +'px'; // left behind
    
    const lpTargetWind = newState.slice(0, 2);
    if (lpTargetWind == "}}") {
        updatedHeight = '70px';
        n = -2 + (takeFirst * 2);
        updatedWidth = (360 - n) +'px'; // left behind
     }
     
     leftPanel.style.width = n + 'px';
     rightPanel.style.width = updatedWidth;
     rightPanel.style.left = leftPanel.style.width;
return updatedHeight;
            
}
