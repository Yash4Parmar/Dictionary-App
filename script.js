const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result")
const sound = document.getElementById("sound")
const btn = document.getElementById("search-btn")
const inpt = document.getElementById("inp-word")

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value
    fetchData(inpWord);
})

inpt.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-btn").click();
    }
});

function fetchData(inpWord) {

    fetch(`${url}${inpWord}`)
        .then((Response) => Response.json())
        .then((data) => {
            result.innerHTML = `
             <div class="word">
            <h3>${inpWord}</h3>
            <button onClick="playSound()">
            <i class="fa fa-volume-up" style="font-size:20px"></i>
            </button>
        </div>
        <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetic}/</p>
        </div>
        <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition} <br>
            ${data[0].meanings[0].definitions[1] && data[0].meanings[0].definitions[1].definition}
            </p>
        <p class="word-example">
            ${data[0].meanings[0].definitions[0].example || ""} 
        </p>`;
            sound.setAttribute("src", `${data[0].phonetics[0].audio}`)
        }).catch(() => {
            result.innerHTML = `<h3> Sorry couldn't find the word!!</h3>`
        });
}

function playSound() {
    sound.play();
}