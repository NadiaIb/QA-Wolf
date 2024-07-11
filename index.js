// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  // Selecting the 1st 100 article timestamps
  const timeStamps = await page.$$eval(".age", (elements) =>
    elements.slice(0, 100).map((element) => element.getAttribute("title"))
  );

  // Convert to date obj
  const times = timeStamps.map((time) => new Date(time));

  // Check if they're sorted in descending order
  let sorted = true;
  for (let i = 1; i < times.length; i++) {
    if (times[i] > times[i - 1]) {
      console.log(`Articles are not sorted at index ${i}`);
      console.log(
        `Time at index ${i - 1}: ${times[
          i - 1
        ].toISOString()}, Time at index ${i}: ${times[i].toISOString()}`
      );
      sorted = false;
      break;
    }
  }
  if (sorted) {
    console.log("Articles are sorted from newest to oldest.", times);
  } else {
    console.log("Articles are not sorted correctly.", times);
  }
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
