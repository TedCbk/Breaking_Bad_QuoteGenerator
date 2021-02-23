const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function GetQuote() {
    loading();
    const apiUrl = 'https://breaking-bad-quotes.herokuapp.com/v1/quotes';
    try {
        // Work without proxy, but just in case putting it
        // const proxyUrl = 'https://cors-anywhere.herokuapp.com';
        // const response = await fetch(proxyUrl + apiUrl);

        const response = await fetch(apiUrl);
        const data = await response.json();


        authorText.innerText = data[0].author;
        quoteText.innerText = data[0].quote;
        console.log(data);
        //Stop Loader, show quote
        complete();
    } catch(error){
        // displaying the quote to see how much can be error
        GetQuote();
    }
}

// Tweet quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', GetQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
GetQuote();

new TypeIt('#title', {
    strings: "Breaking Bad Quotes",
    speed: 150,
    loop: false,
}).go()