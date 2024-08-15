// ModuleName - LeftHand-Macro.js
   // BIG RISK near line 76 - No idea if innerTEXT could be wrong
    // Global variables BEGIN
    //    var gblActiveTab; Moved to main HTML file
    // Global variables END

function getTabDescription() {
      //------------------------ This is called exploiting the gblActiveTab
      switch (gblActiveTab) {
        case "secB":
          return "Select";
        case "secC":
          return "Edit";
        case "secD":
          return "Field";
        default:
          return "Unknown";
      }
    }

function LXeadCol(span) {
      //----------------------- This is the MAIN FUNCTION

      const topicContext = getTabDescription(gblActiveTab);
      if (topicContext == "Edit") leadColEdit(span);
      if (topicContext == "Select") leadColSelect(span);

    }

function leadColEdit(span) {
    // Global change made at line 60
    const leadColGroup = document.querySelectorAll("#LeftPanel span");

    leadColGroup.forEach((s) => {
        s.style.backgroundColor = "#d9d9d9"; // Reset background color
    });

    // Change background color of the clicked span
    span.style.backgroundColor = "#40c940";

    const selectedText = span.innerText.trim();
    glblFocusedRowIndex = -1;

/*
    let count = 0;

    leadColGroup.forEach((t) => {
        if (selectedText === t.innerText.trim()) {
            glblFocusedRowIndex = count;
        }
        count++;
    });

    console.log("#### LINE 64 ## Index = " + glblFocusedRowIndex);
*/
    glblFocusedRowIndex = 2;
    if (glblFocusedRowIndex !== -1) {
        //span = leadColGroup[glblFocusedRowIndex];
        const result = rowFound(span); // Assuming rowFound processes the span correctly
        console.log("#### #### Giving back the result > " + result);
        updateRightPanel(result);
    }
}


function rowFound(span){
      //alert("rowFound means TROUBLEFOUND");
      let ret=[];
      let str = span.innerHTML;//span.innerText;
      console.log("#### #### and Text = "+str);
      let vectOfstr = str.split(":");  // used to be Split by ", "
      let keyFound = vectOfstr.pop();   // Get the last element after the split
      keyFound = keyFound.trim();       // Trim any extra whitespace


      ret = discoverData(keyFound);
      return ret;
    }

function updateRightPanel(resultStr){
      let resultToUse = "";
      const filledOut = "KEYgoes," + resultStr;
      const result = filledOut.split(",");
      result[0] = updatedRPColZero(result);
      //alert("Passed Line 91");
      for (var i = 0; i < result.length; i++) {
          // Construct the ID for the corresponding textarea
          var textareaId = "Field-" + ("00" + (i + 1)).slice(-3);

          // Get the textarea element by ID
          var textarea = document.getElementById(textareaId);
          
          if (textareaId === "Field-002") {
                resultToUse =globalSpanPic;
          } else {
                resultToUse =result[i].trim();
          }

          // Check if the textarea exists and update its value
          if (textarea) {
              textarea.value = resultToUse;
          }
      }
    }

function updatedRPColZero(vectToFix){
    console.log("### P.o.o.r.  C.o.l. Z.E.R.O.  cell > " + vectToFix[1]);
    let cellVect = vectToFix[1].split(":");
    console.log("### P.o.o.r.  C.o.l. Z.E.R.O.  VALUE > " + cellVect[1]);
    return(cellVect.pop());
} 


function leadColSelect(span)
    // Global change made using glblSelectChooser
    {
      console.log("Begin leadColSelect");

      const pageLocked = gblnDiscoverSelectionToggle();
      console.log("Outer LCS pageLocked is :" + pageLocked);
      if (!pageLocked) {
        leadMainColSelect(span);
      }
    }

    // This is the HUB VERSION OF IT 
    function leadMainColSelect(span)
    // Global change made using glblSelectChooser
    {
      const leadColGroup = document.querySelectorAll("#verticalNav span");

      leadColGroup.forEach((s) => {

        s.style.backgroundColor = "#d9d9d9";

      });


      // Change background color of the clicked span

      span.style.backgroundColor = "#40c940";

      const s = span.innerText.trim();
      glblSelectChooser = -1;

      let count = 0;

      leadColGroup.forEach((t) => {

        if (span.innerText == t.innerText) {

          glblSelectChooser = count;

        }

        count++;

      });

    }
