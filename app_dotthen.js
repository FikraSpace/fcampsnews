let news;

document.addEventListener('DOMContentLoaded', ()=>{
  news = document.getElementById('news')
  getNews()
})

function getNews() {
  fetch('https://newsapi.org/v2/everything?q=iraq&apiKey=978d6c3818ff431b8c210ae86550fb1f')
  .then((response)=>{ return response.json()})
  .then((data)=>{
    let content = data.articles.map(createArticle).join('\n');
    updateUI(content)
  })
}

function updateUI(content){
  news.innerHTML = content;
}

function createArticle(article) {
  return `
    <article>
      <img width="124px" height="124px" src="${article.urlToImage}" alt="">
      <div>
        <h1>${article.title}</h1>
        <p>${article.description}</p>
        <time>${article.publishedAt}</time>
      </div>
    </article>
  `
}
