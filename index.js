function cleanText() {
  var inputText = document.getElementById('input-text').value;
  var cleanedText = inputText
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z ]/g, '')
      .replace(/\s+/g, ' ');

  findApi(cleanedText).then((response) => {
      document.getElementById('output-text').innerText = response;
  })
}

async function findApi(params) {
  const url = 'https://paraphraser1.p.rapidapi.com/';
  const headers = {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '3610573747msh014e8f123f802f1p149effjsnc811a920eea7',
      'X-RapidAPI-Host': 'paraphraser1.p.rapidapi.com'
  };

  const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ input: params })
  });

  if (response.ok) {
      const data = await response.json();
      if (data.output) {
          return data.output;
      } else {
          alert('No se pudo encontrar una frase similar');
      }
  } else {
      alert('Error en la solicitud de API');
  }
}

// Copy to clipboard function
function copyToClipboard() {
  const outputText = document.getElementById('output-text');
  const text = outputText.textContent || outputText.innerText;

  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = text;

  // Ensure the textarea element is off-screen
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';

  // Add the textarea element to the document
  document.body.appendChild(textarea);

  // Select and copy the text of the textarea element
  textarea.select();
  document.execCommand('copy');

  // Remove the textarea element from the document
  document.body.removeChild(textarea);
}

var botoninicial = document.getElementById('clean-button')
botoninicial?.addEventListener('click', cleanText);

var botoncopy = document.getElementById('Copy-button')
botoncopy?.addEventListener('click', copyToClipboard);

// Load scraped data
document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get('scrapedData', function(result) {
      if (result.scrapedData) {
          let dataContainer = document.getElementById('data-container');

          // Display each piece of scraped data
          for (let key in result.scrapedData) {
              let p = document.createElement('p');
              p.textContent = `${key}: ${result.scrapedData[key]}`;
              dataContainer.appendChild(p);
          }
      }
  });
});
