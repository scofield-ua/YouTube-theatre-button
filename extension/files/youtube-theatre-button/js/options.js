// Saves options to chrome.storage.sync.
function save_options() {
    var closeCurrentTab = document.getElementById('closeCurrentTab').checked;

    chrome.storage.sync.set({
        closeCurrentTab: closeCurrentTab,
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Saved';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
      // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get(['closeCurrentTab'], function(items) {
        document.getElementById('closeCurrentTab').checked = items.closeCurrentTab;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
