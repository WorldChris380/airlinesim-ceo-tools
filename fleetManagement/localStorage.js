// localStorage.js

// Speichere Tag in localStorage
function saveTagToLocalStorage(tagId, tagName, colorClass) {
  var tags = JSON.parse(localStorage.getItem("tags")) || [];
  tags.push({ id: tagId, name: tagName, color: colorClass });
  localStorage.setItem("tags", JSON.stringify(tags));
}

function loadTagsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tags")) || []; // Gibt ein leeres Array zurück, wenn keine Tags vorhanden sind
}

// Entferne Tag aus localStorage
function removeTagFromLocalStorage(tagId) {
  var tags = JSON.parse(localStorage.getItem("tags")) || [];
  tags = tags.filter(function(tag) {
    return tag.id !== tagId;
  });
  localStorage.setItem("tags", JSON.stringify(tags)); // Aktualisiere localStorage
}