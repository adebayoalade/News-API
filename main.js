const button = document.getElementById("btnsubmit");

button.addEventListener("click", (event) => {
event.preventDefault();

const query = document.getElementById("query").value;

const apiKey = "10cabfacc21f4844ad33832b07f4483b";
const url = `https://newsapi.org/v2/everything?q=${query}`;

const requestObj = {
  method: "GET",
  headers: {
    Authorization: apiKey,
  },
};

fetch(url, requestObj).then(
  (response) => {
    if(!response.ok) {
      throw new Error("something went wrong: " + response.statusText);
    }
    return response.json();
  }
).then(
  (data) => {console.log(data);

  displayResults(data);
}).catch(
  (error) => console.error("Error:", error)
)
});

function displayResults(data) {
  const resultDiv = document.getElementById("results");
  resultDiv.classList.add("resultDiv");
  resultDiv.innerHTML = "";

  if (data.articles.length === 0) {
    resultDiv.innerHTML = "<p>No articles found. </p>";
    return;
  }

 data.articles.forEach((article) => {
  const articleDiv = document.createElement("div");
  articleDiv.className = "article";
 
const title = document.createElement("h2");
title.textContent = article.title;

const para = document.createElement("p");
para.textContent = article.description;

const link = document.createElement("a");
link.href = article.url;
link.textContent = "Readmore";
link.target = "_blank";

const img = document.createElement("img");
img.src = article.urlToImage;
img.alt = "cardImage";
img.style.width = "100%";

articleDiv.appendChild(title);
articleDiv.appendChild(para);
articleDiv.appendChild(link);
articleDiv.appendChild(img);

resultDiv.appendChild(articleDiv);
});
}


