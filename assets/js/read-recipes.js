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

readJSONFile(filePath);