document.addEventListener("DOMContentLoaded", () => {


    const createTags = (tags) => {
        return tags.map(tag => `<a href="tags/${tag.toLowerCase()}.html" class="tag">${tag.charAt(0).toUpperCase() + tag.slice(1)}</a>`).join("");
    }

    // Function to add a recipe item
    const addRecipeDetails = (currentRecipe) => {
        const pageTitle = document.querySelector("title");
        pageTitle.textContent = currentRecipe.title;
        
        const recipeTitle = document.querySelector(".recipe-title");
        recipeTitle.textContent = currentRecipe.title;
        const recipeImage = document.querySelector(".recipe-image");
        console.log(currentRecipe.img)
        recipeImage.src = currentRecipe.img;
        recipeImage.alt = currentRecipe.title;
        const recipeDescription = document.querySelector(".recipe-description");
        recipeDescription.textContent = currentRecipe.description;
        const imageSource = document.querySelector(".image-license");
        imageSource.textContent = currentRecipe.imageLicense;

        const recipeInfo = document.querySelector(".recipe-info");
        recipeInfo.innerHTML = `
            <p><strong>Serves:</strong> ${currentRecipe.serves} people</p>
            <p><strong>Prep Time:</strong> ${currentRecipe.prep} minutes</p>
            <p><strong>Cook Time:</strong> ${currentRecipe.cook} minutes</p>
            <p><strong>Total Time:</strong> ${currentRecipe.prep + currentRecipe.cook} minutes</p>
            <div class="tags">
            ${createTags(currentRecipe.tags)}
            </div>
        `;

        const ingredientsList = document.querySelector(".ingredients-list");
        console.log(ingredientsList)
        ingredientsList.innerHTML = `
            <h2 class="section-title">Ingredients</h2>
            ${currentRecipe.ingredients.map(ingredient => `<li class="ingredient-item">${ingredient}</li>`).join("")}
        `;

        const toolsList = document.querySelector(".tools-list");
        toolsList.innerHTML = `
            <h2 class="section-title">Tools</h2>
            ${currentRecipe.tools.map(tool => `<li class="ingredient-item">${tool}</li>`).join("")}
        `;

        const instructionsList = document.querySelector(".instructions-list");
        instructionsList.innerHTML = `
            ${currentRecipe.instructions.map((instruction) => `<li class="instruction-item">${instruction}</li>`).join("")}
        `;
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
    const currentRecipeID = window.location.pathname.split("/").pop().replace(".html", "");
    const recipes = readJSONFile(filePath);
    recipes.then(data => {
        let currentRecipe = data.find(recipe => recipe.id === currentRecipeID);
        if (!currentRecipe) {
            console.error('Recipe not found, using onigiri');
            currentRecipe = data.find(recipe => recipe.id === "onigiri");
        }
        addRecipeDetails(currentRecipe);
        console.log("Recipe loaded successfully");
    }).catch(error => {
        console.error('Error reading or parsing the JSON file:', error);
    });
    

});