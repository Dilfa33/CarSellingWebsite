document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "74168602bc2b4bf4880dadac4f64875d";
    const url = `https://newsapi.org/v2/everything?q=BMW OR Audi&language=en&pageSize=6&apiKey=${apiKey}`;




    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const newsSection = document.getElementById("news-section");
            let newsHTML = "";

            if (data.articles && data.articles.length > 0) {
                data.articles.forEach((article) => {
                    {
                        newsHTML += `
              <div class="col-lg-4 col-md-6">
                <div class="news-card">
                  <img src="${article.urlToImage || "https://via.placeholder.com/400"}" alt="News Image" />
                  <h5><a href="${article.url}" target="_blank" class="text-decoration-none">${article.title}</a></h5>
                </div>
              </div>`;
                    }
                });
                newsSection.innerHTML = newsHTML || "<p>No car-related articles found.</p>";
            } else {
                newsSection.innerHTML = "<p>No articles found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error fetching news:", error);
            document.getElementById("news-section").innerHTML =
                "<p>Failed to load news.</p>";
        });
});
