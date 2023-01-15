// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '"',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
  let options = {
    noCharacters: null,
    whichCharacters: {
      lowerCase: false,
      upperCase: false,
      numeric: false,
      special: false,
    },
    lowerCasedCharacters: lowerCasedCharacters,
    upperCasedCharacters: upperCasedCharacters,
    numericCharacters: numericCharacters,
    specialCharacters: specialCharacters,
  }
  options.noCharacters = prompt("Choose password length between 10 and 64 characters.");
  // check that users input isn't over 2 characters (to catch decimal entries and other oddities) 
  // and that it parses as an Int and is between 10 and 64 (inclusive)
  if(options.noCharacters.length>2 || !(parseInt(options.noCharacters)) || parseInt(options.noCharacters)<10 || parseInt(options.noCharacters)>64){
    alert("You have chosen either too many or too few characters for your password. Please enter between 10 and 64 characters.");
    options = getPasswordOptions();
  } else {
    options.whichCharacters.lowerCase = confirm("Choose OK to include lowercase characters in the password or Cancel to exclude these characters.");
    options.whichCharacters.upperCase = confirm("Choose OK to include uppercase characters in the password or Cancel to exclude these characters.");
    options.whichCharacters.numeric = confirm("Choose OK to include numbers in the password or Cancel to exclude these characters.");
    options.whichCharacters.special = confirm("Choose OK to include special characters in the password or Cancel to exclude these characters.");
    // check to make sure at least one character type is selected
    if(options.whichCharacters.lowerCase===false && options.whichCharacters.upperCase===false && options.whichCharacters.numeric===false && options.whichCharacters.special===false){
      alert("You must choose at least one character type for the password!")
      options = getPasswordOptions();
    }
  }
  return options;
}

// Function for getting a random element from an array
function getRandom(arr) {
  let position = Math.floor(Math.random() * arr.length);
  let letter = arr[position];
  return letter;
}

// Function to generate password with user input
function generatePassword() {
  // use getPasswordOptions to get the user to select what options they want and store in variable
  let options = getPasswordOptions();
  let passwordArray = [];
  let characterTypesSelected = [];
  // series of if statements to ensure that all selected character types get selected at least once
  // each if statement selects a random character from the relevant array and pushes it onto the
  // password array
  if(options.whichCharacters.lowerCase===true){
    passwordArray.push(getRandom(lowerCasedCharacters));
    characterTypesSelected.push('lowerCasedCharacters');
  }
  if(options.whichCharacters.upperCase===true){
    passwordArray.push(getRandom(upperCasedCharacters));
    characterTypesSelected.push('upperCasedCharacters');
  }
  if(options.whichCharacters.numeric===true){
    passwordArray.push(getRandom(numericCharacters));
    characterTypesSelected.push('numericCharacters');
  }
  if(options.whichCharacters.special===true){
    passwordArray.push(getRandom(specialCharacters));
    characterTypesSelected.push('specialCharacters');
  }
  // loop through while loop until length of passwordArray is the same as number of characters selected
  while(passwordArray.length < options.noCharacters){
    let nextCharacterType = Math.floor(Math.random() * characterTypesSelected.length);
    let nextCharacter = getRandom(options[characterTypesSelected[nextCharacterType]]);
    // picking a random position to insert next character to further randomise
    let nextPosition = Math.floor(Math.random() * passwordArray.length);
    passwordArray.splice(nextPosition, 0, nextCharacter);
    } 
  
  // using join to turn the array into a string - read about the join function on the below page
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
  let password = passwordArray.join('');
  return password;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);