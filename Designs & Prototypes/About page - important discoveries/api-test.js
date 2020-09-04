// ONLY FOR NODE DEBUGGING
// const fetch = require("node-fetch");
// const { toNamespacedPath, resolve } = require("path");
// const { get } = require("http");

(function fetchSciwheelAPI () {
  
  let comments = []; // This array will be passed in to addCommentsToMarkup() 
  
  let urls = [];
  // Ids of tags defined in Sciwheel: 243694: currentpi - 243695: historical - 243782: achievements
  let tagIdsArray = ['243782','243694','243695']

  // Sort categories provided by API
  let sortCategories = 
    ['relevance', 'title', 'firstAuthor', 'lastAuthor', 'publishedDate', 'addedDate', 
    'journalName', 'volume', 'doi', 'pubMedId', 'issue', 'publisher'];

  // For each tag ID, get two random references based on the API sorting key-value pairs
  tagIdsArray.forEach(tag => {
    let category = sortCategories[Math.floor(Math.random() * sortCategories.length)]
    urls.push(`https://sciwheel.com/extapi/work/references?projectId=475188&tagIds=${tag}&sort=${category}:desc&size=2`)
  })

  // Initial reference fetch
  const getReferences = (url) => {
    return fetch(url, {
      method: 'Get',
      headers: {'Authorization': 'Bearer 3E6D88C2CB9D47494DE94FFF891FB9E7',}
    })
    .then(response => response.json())
    .catch(err => console.log('error fetching references', err))
  }

  // Get notes for each reference
  const getReferenceNotes = (reference) => {
    return fetch(`https://sciwheel.com/extapi/work/references/${reference.id}/notes`, {
      method: 'Get',
      headers: {'Authorization': 'Bearer 3E6D88C2CB9D47494DE94FFF891FB9E7',}
    })
    .then(res => res.json())
    .catch(err => console.log('error fetching reference notes', err))
  }

  // Add comments to HTML 
  const addCommentsToMarkup = (commentsArray) => {
    const ul = document.createElement('ul');
    const body = document.body
    
    body.appendChild(ul) 
    
    commentsArray.forEach(comment => {
      const li = document.createElement('li')
      const textNode = document.createTextNode(comment)
      li.appendChild(textNode)
      ul.appendChild(li)
    })
  }

  // Get the references from the URLs
  return Promise.all(urls.map(url => getReferences(url))) 
    .then(data => {
      // Make a temporary array to store all references
      tempArray = [] 
      data.map(i => tempArray.push(i.results));
      // fetch the notes data for each reference 
      return Promise.all(tempArray.flat().map(ref => getReferenceNotes(ref)))
      .then(res => {
        // Push each reference's comment to the comments array
        res.flat().map(x => comments.push(x.comment))
        // Add the comments to the HTML markup
        return addCommentsToMarkup(comments)
      })
  }) 
    .catch(err => console.log('error accessing API data' , err))
  
})();


// * 1. Understand the problem:
// DONE Fetch Sciwheel entries, each categorized, from the appropriate references collection
// DONE pick 2-3 random entries from each category
// DONE Grab the 'note' from each entry and display as a list.
// DONE querySelector Web API to find the appropriate location in markup and replace the fallback/placeholder info. Determine markup later.
// DONE Repeat this process on each reload. This ensures no two lists are the same.
// Have a hard coded HTML fallback in case the fetch doesn't work.

// Labels: 
  // * function fetchSciwheelAPI
  // ? array to store the entries?
  // ? entries as object including entry id and note?
  // custom list element through createElement Web API.

// *2. Explore Concrete Examples
// I have 20 entries, with four categories
// Fetch 2 or so random entries per category
// Get the notes for each entry
// Display the notes as a list on the About page. Ex:
// - 1999: lipid discovered in plants
// - Current faculty body includes 5 NAS members
// If the fetch call fails, or no JS on site, fallback is there

// *3. Break it down into steps
// Fetch Sciwheel info: to determine if I can select categories in one call
// or do I need to make various calls for each category? YES, I need to make two calls
// Push results in a temp array
// For each object in an array, need another fetch method to get comments iteratively
// Add comments to HTML markup
// Have a fallback in case the fetch fails.


// *4. Solution and refactoring
// See above