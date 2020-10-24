const wordEl = document.querySelector('#word');
const wrongLettersEl = document.querySelector('#wrong-letters');
const playAgainBtn = document.querySelector('#play-button');
const popup = document.querySelector('#popup-container');
const notification = document.querySelector('#notification-container');
const finalMessage = document.querySelector('#final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['doni','wirawan','desember','coding','programming'];

// const url =	'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
// function getRandomWord() {
// 	fetch(url)
// 		.then(res => res.json)
// 		.then(data => {
// 			console.log(data.word)
// 		})
// }
// getRandomWord();

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//show hidden word
function displayWord(){
	wordEl.innerHTML = `
		${selectedWord
			.split('')
			.map( letter => `

					<span class="letter">
						${correctLetters.includes(letter) ? letter : ''}
					</span>
				`
				)
			.join('')
		}

	`;
	const innerWord = wordEl.innerText.replace(/\n/g, '');

	if(innerWord === selectedWord){
		finalMessage.innerText = 'selamat anda menang!🤩';
		popup.style.display = 'flex';
	}
}


// update the wrong letters 
function updateWrongLettersEl(){

	//display wrong letters
	wrongLettersEl.innerHTML = `
		${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
		${wrongLetters.map(letter => `<span>${letter}</span>`)}
	`;

	//display parts
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;
		if(index < errors){
			part.style.display = 'block';
		}else{
			part.style.display = 'none';
		}
	});
	//check if lost
	if(wrongLetters.length === figureParts.length){
		finalMessage.innerText = 'Sayang sekali anda kalah. 😥';
		popup.style.display = 'flex';
	}


}


// show notification
function showNotification(){
	notification.classList.add('show');

	setTimeout( () =>{
		notification.classList.remove('show');
	},2000);

}





// keydown letter press 
window.addEventListener('keydown', e => {
	if(e.keyCode >=65 && e.keyCode <=90 ){
		const letter = e.key;

		if(selectedWord.includes(letter)){
			if(!correctLetters.includes(letter)){
				correctLetters.push(letter);

				displayWord();
			}else{
				showNotification();
			}
		}else{
			if(!wrongLetters.includes(letter)){
				wrongLetters.push(letter);

				updateWrongLettersEl();
			}else{
				showNotification();
			}
		}
	}
});

//restar the game and play again

playAgainBtn.addEventListener('click', () =>{
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();

	updateWrongLettersEl();

	popup.style.display = 'none';
});

// when game is over we press enter and start again
window.addEventListener('keydown', e =>{
	// console.log(e.keyCode);
	if(e.keyCode == 13){
		correctLetters.splice(0);
		wrongLetters.splice(0);

		selectedWord = words[Math.floor(Math.random() * words.length)];

		displayWord();

		updateWrongLettersEl();

		popup.style.display = 'none';
	}
});




displayWord();

