function updateStatus(toggle) {
      const statusText = toggle.checked
            ? 'Locked'
            : 'Unlocked for editing';
      document.getElementById('status').textContent =
            statusText;
}

function forceToON() {
      const toggleSwitch =
            document.getElementById("toggleSwitch");
      toggleSwitch.checked = true;
      updateStatus(toggleSwitch);
}

function forceToOFF() {
      const toggleSwitch =
            document.getElementById("toggleSwitch");
      toggleSwitch.checked = false;
      updateStatus(toggleSwitch);
}

function gblnDiscoverSelectionToggle() {
      const tog = document.getElementById("toggleSwitch");
      return (tog.checked);
}