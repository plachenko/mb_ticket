import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto("https://www.shopmarketbasket.com/weekly-flyer");

let $ = cheerio;

page
  .$eval(".item", function (heading) {
    $ = $.load(heading.innerHTML);
    console.log($);
    // console.log($('h2').text());
    return heading.innerHTML;
  })
  .then(function (result) {
    console.info(result);
    browser.close();
  });

