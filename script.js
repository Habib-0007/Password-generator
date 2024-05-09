var outputElement =
	document.querySelector("#ouput");
var copyBtn =
	document.querySelector(".copy");
var copied = document.querySelector(
	".copy-box p"
);
var range =
	document.querySelector("#range");
var charLength = document.querySelector(
	".char_value"
);
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
var strengths = document.querySelector(
	"#strengths"
);
var strengthValue =
	strengths.querySelector("p");
var length = 10;

range.addEventListener("input", () => {
	length = range.value;

	const value =
		((range.value - range.min) /
			(range.max - range.min)) *
		100;
	range.style.backgroundSize =
		value + "%";
	charLength.textContent = range.value;
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

	if (length > 0 && length <= 6) {
		strengths.className = "";
		strengths.classList.add("too_weak");
		strengthValue.textContent = "TOO WEAK"
	} else if (
		length > 6 &&
		length <= 8
	) {
		strengths.className = "";
		strengths.classList.add("weak");
		strengthValue.textContent = "WEAK"
	} else if (
		length > 9 &&
		length <= 10
	) {
		strengths.className = "";
		strengths.classList.add("medium");
		strengthValue.textContent = "MEDIUM"
	} else if (
		length > 10 &&
		length <= 20
	) {
		strengths.className = "";
		strengths.classList.add("strong");
		strengthValue.textContent = "STRONG"
	}
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

generatePassword();

async function copyTextToClipboard() {
	var text = output.value;
	try {
		await navigator.clipboard.writeText(
			text
		);
		setTimeout(() => {
			copied.style.opacity = "1";
			copied.style.visibility =
				"visible";
			copied.style.transform =
				"translateY(0)";
			setTimeout(() => {
				copied.style.opacity = "0";
				copied.style.visibility =
					"hidden";
				copied.style.transform =
					"translateY(-100%)";
			}, 2000);
		}, 200);
	} catch (error) {
		console.error(
			"Error copying text to clipboard",
			error
		);
	}
}

generateBtn.addEventListener(
	"click",
	generatePassword
);
copyBtn.addEventListener(
	"click",
	copyTextToClipboard
);
