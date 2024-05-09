var outputElement =
	document.querySelector("#ouput");
var range =
	document.querySelector("#range");
var lowerCheckbox =
	document.querySelector("#lower");
var upperCheckbox =
	document.querySelector("#upper");
var numberCheckbox =
	document.querySelector("#number");
var symbolCheckbox =
	document.querySelector("#symbol");
var generateBtn =
	document.querySelector(
		"#generate-btn"
	);

var length = 10;

range.addEventListener("input", () => {
	length = range.value;
});

function generatePassword() {
	var upper = upperCheckbox.checked;
	var lower = lowerCheckbox.checked;
	var number = numberCheckbox.checked;
	var symbol = symbolCheckbox.checked;

	output.value = getPassword(
		upper,
		lower,
		number,
		symbol
	);
}

const randomLowercase = () => {
	var alphabets =
		"abcdefghijklmnopqrstuvwxyz";
	alphabets = alphabets.toLowerCase();

	let lowerIndex = Math.floor(
		Math.random() * alphabets.length
	);
	return alphabets[lowerIndex];
};

const randomUppercase = () => {
	var alphabets =
		"abcdefghijklmnopqrstuvwxyz";
	alphabets = alphabets.toUpperCase();

	let upperIndex = Math.floor(
		Math.random() * alphabets.length
	);
	return alphabets[upperIndex];
};

const randomNumber = () => {
	var numbers = "0123456789";

	let numberIndex = Math.floor(
		Math.random() * numbers.length
	);
	return numbers[numberIndex];
};

const randomSymbol = () => {
	var symbols =
		"@#$_&-+()/*:;!?£¢€¥^°={}✓™©%";

	let symbolIndex = Math.floor(
		Math.random() * symbols.length
	);
	return symbols[symbolIndex];
};

var allFunctions = {
	upper: randomUppercase,
	lower: randomLowercase,
	number: randomNumber,
	symbol: randomSymbol,
};

const getPassword = (
	upper,
	lower,
	number,
	symbol
) => {
	var password = "";
	var checkedCount =
		upper + lower + number + symbol;

	if (checkedCount === 0) {
		return "You must check at least one box";
	}

	var checkedArr = [
		{ upper },
		{ lower },
		{ number },
		{ symbol },
	].filter(
		item => Object.values(item)[0]
	);

	for (
		let i = 0;
		i < length;
		i += checkedCount
	) {
		checkedArr.forEach(item => {
			var funcIndex =
				Object.keys(item)[0];
			password +=
				allFunctions[funcIndex]();
		});
	}
	return password.slice(0, length);
};

generateBtn.addEventListener(
	"click",
	generatePassword
);
