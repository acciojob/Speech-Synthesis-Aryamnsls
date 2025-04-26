const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Function to populate voices
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Function to set the voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  restart();
}

// Function to toggle speaking
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

// Function to set options (rate, pitch, text)
function setOption() {
  msg[this.name] = this.value;
  restart();
}

// Function to restart speech when changes are made
function restart() {
  if (speechSynthesis.speaking) {
    toggle(true);
  }
}

// Event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', () => toggle(true));
stopButton.addEventListener('click', () => toggle(false));

// Set initial text, rate, and pitch values
msg.text = document.querySelector('[name="text"]').value;
msg.rate = document.querySelector('[name="rate"]').value;
msg.pitch = document.querySelector('[name="pitch"]').value;
