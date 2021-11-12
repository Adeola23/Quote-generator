const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


let apiQuotes = []

const loading = () => {
    loader.hidden = false
    quoteContainer.hidden = true
}

const complete=() => {
    loader.hidden = true
    quoteContainer.hidden =  false
}

const newQuote = () => {
    loading()
    const quotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if (!quotes.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quotes.author;

    }

    if(quotes.text.length > 50){
        quoteText.classList.add('long-quote')
    }else {
        quoteText.classList.remove('long-quote')
    }

    quoteText.textContent = quotes.text
    complete()
}


const getQuotes = async () => {
    loading()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes)
        newQuote()
    } catch (error) {
        alert(error)
    }
}
const tweetQuote=()=>{
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)


//on Load
getQuotes();



