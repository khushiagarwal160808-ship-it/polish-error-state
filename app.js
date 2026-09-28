const statusMessage = document.getElementById('status-message'); // An element to show text/spinners
const resultsGrid = document.getElementById('results-grid'); // Your image container

async function searchImages(query) {
  // 1. LOADING STATE
  // Show this immediately before fetching
  statusMessage.innerHTML = '<span class="spinner"></span> Searching...';
  resultsGrid.innerHTML = ''; // Clear old results

  try {
    const response = await fetch(`YOUR_API_URL_HERE&q=${query}`);
    
    // Catch bad responses (e.g., 404, 500)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    // Adjust 'data.query.pages' based on your specific API structure
    const items = Object.values(data.query.pages || {}); 

    // 2. EMPTY STATE
    // Check if the results array is empty
    if (items.length === 0) {
      statusMessage.textContent = "No results for that word. Try another search.";
    } else {
      // 3. RESULTS STATE (Happy Path + Polish)
      statusMessage.textContent = `Showing ${items.length} results for "${query}".`;
      renderImages(items); // Your existing function to draw the image cards
    }

  } catch (error) {
    // 4. ERROR STATE
    // Catches network failures or the thrown error above
    statusMessage.textContent = "Something went wrong. Please try again.";
    console.error("Search failed:", error);
  }
}