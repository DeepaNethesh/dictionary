const getWordMeaning= async (word) => {
    let response = await fetch(` https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);
    let data = await response.json();
    return data;
    
    }


let button = document.querySelector('#speak')
let reset = document.querySelector('#reset')
let speech = document.querySelector('#textarea')
let result = document.querySelector('#textresult')
let synonyms = document.querySelector('#synonyms')
let example = document.querySelector('#example')
let speak = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speak();
let meaning


speech.addEventListener('click', () => {
    recognition.start()
    speech.innerHTML= '...speaking'
    if(speech.innerHTML === '...speaking' || speech.innerHTML === '') {
        result.innerHTML = ''
        synonyms.innerHTML =''
        example.innerHTML = ''
    }
})

recognition.onresult = function (e) {
    console.log(e)
    let result2 = e.results[0][0].transcript 
    speech.innerHTML = result2

//    result.addEventListener('click', (event) => {
//        event.preventDefault()
        
        let item1 = result2
        getWordMeaning(item1)
        .then(data => {
          
          // get the data we need for our html from the response   
        meaning = data
       let result1 = meaning[0].meanings[0].definitions[0].definition
       console.log(result1)
       if(result1) {
       result.innerHTML = result1
       } 
        })
    
// })
// synonyms.addEventListener('click', (event) => {
//     event.preventDefault()
    
     let item2 = result2
     getWordMeaning(item2)
     .then(data => {
       
       // get the data we need for our html from the response   
    
    let result3 = meaning[0].meanings[0].definitions[0].synonyms
    console.log(result3)
    if(result3) {
    synonyms.innerHTML = result3
    }
     })
 
// })
// example.addEventListener('click', (event) => {
//     event.preventDefault()
    
     let item3 = result2
     getWordMeaning(item3)
     .then(data => {
       
       // get the data we need for our html from the response   
    
    let result4 = meaning[0].meanings[0].definitions[0].example
    console.log(result4)
    if(result4) {
   example.innerHTML = result4
    }
     })
 
// })
}
