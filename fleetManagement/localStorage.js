// localStorage.js

// Speichere Tag in localStorage
function saveTagToLocalStorage(tagId, tagName, colorClass) {
  const tags = JSON.parse(localStorage.getItem("tags")) || [];
  tags.push({ id: tagId, name: tagName, color: colorClass });
  localStorage.setItem("tags", JSON.stringify(tags));
}

// Lade Tags aus localStorage
function loadTagsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tags")) || []; // Gibt ein leeres Array zurück, wenn keine Tags vorhanden sind
}

// Entferne Tag aus localStorage
function removeTagFromLocalStorage(tagId) {
  const tags = JSON.parse(localStorage.getItem("tags")) || [];
  const updatedTags = tags.filter(function(tag) {
    return tag.id !== tagId;
  });
  localStorage.setItem("tags", JSON.stringify(updatedTags)); // Aktualisiere localStorage
}

// Beispielaufrufe
// saveTagToLocalStorage("tag1", "My Tag", "red");
// const allTags = loadTagsFromLocalStorage();
// console.log(allTags);
// removeTagFromLocalStorage("tag1");
