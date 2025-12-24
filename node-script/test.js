import * as cheerio from 'cheerio';

const $ = cheerio.load(
  `<ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>`,
);

const nextItem = $('li:first').next();
const prevItem = $('li:eq(1)').prev();

console.log('Next:', nextItem.text());
console.log('Prev:', prevItem.text());