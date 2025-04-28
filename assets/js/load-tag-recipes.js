document.addEventListener("DOMContentLoaded", () => {
    const recipeGrid = document.querySelector(".recipe-grid");

    // Function to add a recipe item
    const addRecipeItem = (recipe) => {
        const recipeItem = document.createElement("li");
        recipeItem.classList.add("recipe-item");

        recipeItem.innerHTML = `
            <a href="${"recipe.html?id="+recipe.id}">
                <img src="${recipe.img}" alt="${recipe.title}">
                <h2>${recipe.title}</h2>
                <p>${recipe.description}</p>
            </a>
            <p class="image-license">${recipe.imgCredits}</p>
            <div class="tags">
                ${recipe.tags.map(tag => `<a href="tags/${tag.toLowerCase()}.html" class="tag">${tag}</a>`).join("")}
            </div>
        `;

        recipeGrid.appendChild(recipeItem);
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
    const getTagIDFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        console.log(params.get("id"));
        return params.get("id");
    };
    recipes.then(data => {
        let recipeList = data.filter(recipe => {
            console.log(recipe.tags)
            return recipe.tags.includes(getTagIDFromURL())
        });
        console.log(recipeList);
        recipeList.forEach(element => {
            console.log(element)
            addRecipeItem(element);
        });
        console.log("Recipe loaded successfully");
    }).catch(error => {
        console.error('Error reading or parsing the JSON file:', error);
    });

});