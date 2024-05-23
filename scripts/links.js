const baseURL = "https://luroblesf.github.io/wdd230/";
const linksURL = "https://luroblesf.github.io/wdd230/data/links.json";



const displayLinks = (weeks) => {
    weeks.forEach(
        week => {
            let article = document.createElement('article');

            let url= document.createElement('h3');
            url.textContent = week.url;
    
            let title = document.createElement('h4');
            title.textContent = song.title;

            article.appendChild(url);
            article.appendChild(title);

            document.querySelector('#linkInfo').appendChild(article);
        }
    )
}

async function getLinks(){
    const response = await fetch(linksURL);
    const data = await response.json();
    displayLinks.log(data);
}

getLinks();


