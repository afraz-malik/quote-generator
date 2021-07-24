let quote = []
let quotation = '';
let author = '';
let name = localStorage.name; 
let counter = localStorage.counter;
const loader = document.getElementById('loader');
const quoteBox = document.getElementById('quote-box');

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }

const displayName = () =>{
    let namediv = document.getElementById('name');
    let counterdiv = document.getElementById('counter');
    if(name.length){
        namediv.innerHTML = `Welcome, ${name},`
        counterdiv.innerHTML = `You have read ${counter} quotes`
        localStorage.setItem("name", name);
        localStorage.setItem('counter', counter);
    }
}
const getValue = (event) =>{
    name = event.target.value;
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById('input').value = ''
    counter = 0;
    displayName();

}

const showLoading=()=>{
    loader.hidden = false;
    quoteBox.hidden = true;   
}
const hideLoading=()=>{
    loader.hidden= true;
    quoteBox.hidden = false;
}


const newQuote =(data) =>{
    const quoteText = document.getElementById('quote');
    const quoteAuthor = document.getElementById('author');

    quote = data[Math.floor(Math.random() * data.length)];
    quotation = quote.text;
    author = quote.author

    quoteText.innerHTML = quotation;
    quoteAuthor.innerHTML = '~' +  author;
    hideLoading(); 

    counter = parseInt(counter) + 1
    displayName();
}

const getQuote = () =>{
    showLoading();
    fetch('https://type.fit/api/quotes')
    .then(response => response.json())
    .then(data => newQuote(data))
    .catch(err =>  document.getElementById('error').innerHTML = 'Internet Seems to be out of order')
}

const tweet = () =>{
    const twitterUrl  = `https://twitter.com/intent/tweet?text=${quotation}~${author}`
    open(twitterUrl, '_blank')
}




getQuote();
displayName();
// showLoading()
// hideLoading()