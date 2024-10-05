// creatingTagsFunctionality.js

document.addEventListener("DOMContentLoaded", () => {
    function createTagButton(tagName, colorClass) {
      // Get the first as-panel for creating buttons
      const createDiv = document.querySelector(".as-panel");
  
      if (!createDiv) {
        console.error("as-panel not found!");
        return;
      }
  
      const tagButton = document.createElement("button");
      tagButton.classList.add("btn", "btn-default", colorClass);
      tagButton.innerText = tagName;
      tagButton.style.margin = "5px"; // Optional: Add margin for spacing
  
      console.log("Creating button:", tagButton);
      createDiv.appendChild(tagButton); // Append button to the first as-panel
    }
  
    const createTagCreationButton = document.querySelector('button[type="submit"]');
  
    if (createTagCreationButton) {
      createTagCreationButton.addEventListener("click", function (event) {
        event.preventDefault();
  
        const tagNameInput = document.querySelector('input[placeholder="Name tag"]');
        const selectedColor = document.querySelector("select").value; // Get the selected color
  
        console.log("Tag Name:", tagNameInput.value);
        console.log("Selected Color:", selectedColor);
  
        createTagButton(tagNameInput.value, selectedColor); // Call the function to create the button
  
        tagNameInput.value = ""; // Clear the input field after creating the tag
      });
    } else {
      console.error("Create Tag button not found!");
    }
  });
  