const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://www.amazon.com/Axis-Mundo-Networks-Chicano-L/dp/3791356690'

axios.get(url)
  .then(response => {
    const $ = cheerio.load(response.data);

    let author = [];
    let title = $('#productTitle').text().trim();
    $('#bylineInfo a').not('.showMoreLink').each((i, el) => {
      author.push($(el).text().trim())
    });

    //The most complicated part to scrape, basically instead of scraping the text, scrape the html
    // then use regex to change it into readable text.
    let description = $('#bookDescription_feature_div').find('.a-expander-partial-collapse-content').html().trim();
    description = description.replace(/(<br\s*\/?>)/g, '\n').replace(/<[^>]*>/g, '').replace(/&.*;/g, '');

    let pages = $('#rpi-attribute-book_details-fiona_pages').find('.rpi-attribute-value').text().trim()
    let publisher = $('#rpi-attribute-book_details-publisher').find('.rpi-attribute-value').text().trim();
    let language = $('#rpi-attribute-language').find('.rpi-attribute-value').text().trim()
    let date = $('#rpi-attribute-book_details-publication_date').find('.rpi-attribute-value').text().trim();
    
    console.log(`Book Title: ${title}`);
    console.log(`Author: ${author.join(', ')}`);
    console.log(`\nDescription: ${description}`)
    console.log(`\nPages: ${pages}`);
    console.log(`Language: ${language}`);
    console.log(`Date Published: ${date}`);
    console.log(`Publisher: ${publisher}`);
  });


// request(url, (error, response, html) => {
//     if(!error && response.statusCode == 200) {
//         let $ = cheerio.load(html);

//         let title = $('#productTitle').text().trim();
//         let author = $('#bylineInfo').find('a').text().trim();

//         let description = $('#bookDescription_feature_div').find('.a-expander-partial-collapse-content').html().trim();
//         description = description.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]*>/g, '').replace(/&.*;/g, '');

//         let pages = $('#rpi-attribute-book_details-fiona_pages').find('.rpi-attribute-value').text().trim()
//         let publisher = $('#rpi-attribute-book_details-publisher').find('.rpi-attribute-value').text().trim();
//         let language = $('#rpi-attribute-language').find('.rpi-attribute-value').text().trim()
//         let date = $('#rpi-attribute-book_details-publication_date').find('.rpi-attribute-value').text().trim();
    
//         console.log(`Book Title: ${title}`);
//         console.log(`Author: ${author}`);
//         console.log(`\nDescription: ${description}`)
//         console.log(`\nPages: ${pages}`);
//         console.log(`Language: ${language}`);
//         console.log(`Date Published: ${date}`);
//         console.log(`Publisher: ${publisher}`);
//     }
    

// })

