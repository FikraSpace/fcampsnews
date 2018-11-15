// add async/await feature to babel (ES7 Compiler)
import 'babel-polyfill'

// decalre global variables to be assigned later 
let news;
let search;

window.addEventListener('popstate', (state)=>{
  console.log(state)
  getNews(state.state.searchterm)
})

// make sure that all elements are being loaded on the page
document.addEventListener('DOMContentLoaded', ()=>{

  let searchterm = window.location.pathname.substr(1)
  console.log(searchterm)
  // get an instance from elements in the page 
  news = document.getElementById('news');
  search = document.getElementById('search')

  // an event on the search box, that fires only when a user type something
  search.addEventListener('keyup', (event)=>{
    
    // don't load news unless the user hits enter
    if(event.key == 'Enter') {
      history.pushState({
        searchterm: search.value
      }, "", search.value)
      getNews(search.value)
    }

  })

  // default news
  getNews(searchterm === '' ? 'iraq' : searchterm)
})


// get news from newsapi.org
async function getNews(query) {

  // using async/await to get rid of callback hell
  let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=978d6c3818ff431b8c210ae86550fb1f`)
  let content = await response.json()
  
  console.log(content)

  // match between the data returned from fetch() with template
  updateUI(content.articles.map(createArticle).join('\n'))

}


function updateUI(content) {
  news.innerHTML = content
}

function createArticle(article, i) {
  return `

    <article id="${i}">
      <img width="124px" height="124px" src="${article.urlToImage}" alt="">
      <div id="text">
        <h1>${article.title}</h1>
        <p>${article.description}</p>
        <time>${article.publishedAt}</time>
      </div>
      <div id="voter">
        <img height="13px" src="${require('./assets/upvote.svg')}" alt="">
        <div>0</div>
        <img  height="13px" src="${require('./assets/downvote.svg')}" alt="">
      </div>
    </article>
  `
}