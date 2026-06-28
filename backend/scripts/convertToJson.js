//reading the file history.txt
const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "../data/history.txt");

const text = fs.readFileSync(inputFile, "utf8");

// console.log(text.substring(0, 500));


//metadata object creation for extra and robust json creation
const metadata = {
    "Indus Valley Civilization": {
        era: "Ancient",
        region: "Indian Subcontinent"
    },

    "Ancient Egypt": {
        era: "Ancient",
        region: "North Africa"
    },

    "Mesopotamia": {
        era: "Ancient",
        region: "Middle East"
    },

    "Ancient Greece": {
        era: "Classical",
        region: "Southern Europe"
    },

    "Roman Empire": {
        era: "Classical",
        region: "Europe"
    },

    "Mauryan Empire": {
        era: "Ancient",
        region: "Indian Subcontinent"
    },

    "Gupta Empire": {
        era: "Classical",
        region: "Indian Subcontinent"
    },

    "Han Dynasty": {
        era: "Ancient",
        region: "China"
    },

    "Maya Civilization": {
        era: "Classical",
        region: "Mesoamerica"
    },

    "Inca Empire": {
        era: "Medieval",
        region: "South America"
    }
};

//adding variables to keep track of things 
let history = [];

let currentCivilization = "";

let currentSection = "";


// split the text into lines
const lines = text
    .split(/\r?\n/)
    .map(line => line.trim());
//print 1st 15 lines - testing
// console.log(lines.slice(0, 15));


//start looping all 10 civilizations
for (const line of lines) {

    //printing all non empty lines to confirm that our loop works
    if (!line) continue;
    // console.log(line);

    //detecting civilization names
    if (
        !line.startsWith("Paragraph") &&
        !line.endsWith(".")
    ) {
        currentCivilization = line
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase());
        // console.log(currentCivilization);
        continue;
    }

    //detecting section headings
    if (line.startsWith("Paragraph")) {

        currentSection = line.replace(/Paragraph \d+:\s*/, "");
        // console.log(currentSection);
        continue;

    }

    history.push({

        civilization: currentCivilization,

        section: currentSection,
        //?. - is optional chaining - if there is any error in civilization then instead of crashing the script will replace era and religion with - ""
        era: metadata[currentCivilization]?.era || "",

        region: metadata[currentCivilization]?.region || "",

        paragraph: line

    });

}

//check working before writing json
// console.log(history.length);

// console.log(history[0]);

// console.log(history[1]);

//creating history.json
const outputFile = path.join(__dirname, "../data/history.json");

fs.writeFileSync(
    outputFile,
    JSON.stringify(history, null, 2),
    "utf8"
);

console.log("✅ history.json created successfully!");