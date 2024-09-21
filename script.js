let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");
let passBox = document.getElementById("passBox");
let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
let genBtn = document.getElementById("genBtn");
let copyIcon = document.getElementById("copyIcon");

// Showing input slider value 
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener('input', () => {
    sliderValue.textContent = inputSlider.value;
});

// Add event listeners to checkboxes to trigger password generation
lowercase.addEventListener('change', generatePasswordAndUpdate);
uppercase.addEventListener('change', generatePasswordAndUpdate);
numbers.addEventListener('change', generatePasswordAndUpdate);
symbols.addEventListener('change', generatePasswordAndUpdate);

genBtn.addEventListener('click', () => {
    passBox.value = generatePassword();
});

let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allNumbers = "0123456789";
let allSymbols = "~!@#$%^&*";

// Function to generate Password
function generatePassword() {
    let genPassword = "";
    let allChars = "";

    allChars += lowercase.checked ? lowerChars : "";
    allChars += uppercase.checked ? upperChars : "";
    allChars += numbers.checked ? allNumbers : "";
    allChars += symbols.checked ? allSymbols : "";

    if (allChars === "") {
        return genPassword;
    }

    // Ensure at least one character from each selected character set
    if (lowercase.checked) genPassword += lowerChars.charAt(Math.floor(Math.random() * lowerChars.length));
    if (uppercase.checked) genPassword += upperChars.charAt(Math.floor(Math.random() * upperChars.length));
    if (numbers.checked) genPassword += allNumbers.charAt(Math.floor(Math.random() * allNumbers.length));
    if (symbols.checked) genPassword += allSymbols.charAt(Math.floor(Math.random() * allSymbols.length));

    // Fill the remaining length of the password
    while (genPassword.length < inputSlider.value) {
        genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    // Shuffle the password to avoid predictable patterns
    genPassword = shufflePassword(genPassword);

    return genPassword;
}

function generatePasswordAndUpdate() {
    passBox.value = generatePassword();
}

// Function to shuffle the generated password
function shufflePassword(password) {
    let array = password.split('');
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

copyIcon.addEventListener('click', () => {
    if (passBox.value !== "" || passBox.value.length >= 1) {
        navigator.clipboard.writeText(passBox.value);
        copyIcon.innerText = "check";
        copyIcon.title = "Password Copied";

        setTimeout(() => {
            copyIcon.innerHTML = "content_copy";
            copyIcon.title = "";
        }, 3000);
    }
});
