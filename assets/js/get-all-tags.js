document.addEventListener("DOMContentLoaded", () => {
    const tagsList = document.querySelector(".tags-list");

    // Function to add a recipe item
    const addTags = (tags) => {

        tags.forEach((tag) => {
            const tagName = tag.charAt(0).toUpperCase() + tag.slice(1);
            const tagItem = document.createElement("li");
            tagItem.classList.add("tags");
            tagItem.innerHTML = `
                <a class="tag" href="${"tag.html?id=" + tag}">${tagName}</a></li>
            `;
            tagsList.appendChild(tagItem);
        })
    };

    async function readJSONFile(filePath) {
        try {
          const response = await fetch(filePath);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const jsonData = await response.json();
          console.log(jsonData);
          return jsonData; // Optionally return the parsed JSON data
        } catch (error) {
          console.error('Error reading or parsing the JSON file:', error);
          return null; // Or throw the error, depending on your error handling
        }
      }
    
    const filePath = 'assets/recipes/recipe-list.json';
    
    const recipes = readJSONFile(filePath);
    const tags = new Set();
    recipes.then(data => {
        data.forEach(recipe => {
            recipe.tags.forEach((tag) => tags.add(tag));   
        });
        console.log("tags loaded successfully");
        const orderedTags = Array.from(tags).sort((a, b) => a.localeCompare(b));
        addTags(orderedTags);
        console.log("Tags added successfully");
    }).catch(error => {
        console.error('Error reading or parsing the JSON file:', error);
    });

});