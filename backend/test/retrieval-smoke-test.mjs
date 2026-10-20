
const API_URL =
  process.env.API_URL || "http://localhost:5000/api/chat";

const testCases = [
  {
    name: "Known topic: Indus Valley Civilization",
    question:
      "What were the major cities and urban planning features of the Indus Valley Civilization?",
  },
  {
    name: "Cross-topic question: Roman and Mauryan Empires",
    question:
      "Compare the government and administration of the Roman Empire and the Mauryan Empire.",
  },
  {
    name: "Potential knowledge-base gap",
    question:
      "What was the exact daily weather in every major city of the Inca Empire in 1200 CE?",
  },
];

function extractPayload(data) {
  // Support common API response wrappers without assuming
  // that every backend returns the same structure.
  if (data && typeof data === "object" && data.data) {
    return data.data;
  }

  return data;
}

async function runTest(testCase) {
  console.log("\n" + "=".repeat(70));
  console.log(`TEST: ${testCase.name}`);
  console.log(`QUESTION: ${testCase.question}`);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: testCase.question,
      }),
      signal: AbortSignal.timeout(120000),
    });

    const rawText = await response.text();

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      console.error("Response was not valid JSON:");
      console.error(rawText);
      return;
    }

    console.log("HTTP STATUS:", response.status);

    if (!response.ok) {
      console.error("API ERROR:", data);
      return;
    }

    const result = extractPayload(data);

    console.log("\nANSWER:");
    console.log(result.answer ?? result);

    console.log("\nRETRIEVED SOURCES:");
    console.dir(result.sources ?? "No sources field returned", {
      depth: 5,
    });

    console.log("\nMANUAL REVIEW:");
    console.log("- Does the answer address the question?");
    console.log("- Do the sources support the answer?");
    console.log("- Does the answer acknowledge missing information?");
  } catch (error) {
    console.error("REQUEST FAILED:", error.message);
  }
}

async function main() {
  console.log("Planet Atlas — Retrieval Smoke Tests");
  console.log("API:", API_URL);

  for (const testCase of testCases) {
    await runTest(testCase);
  }

  console.log("\nAll test requests have finished.");
  console.log("Review the results above; this script does not");
  console.log("automatically measure retrieval accuracy.");
}

main();
