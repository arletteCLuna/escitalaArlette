function removeAccents(input) {
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function encrypt() {
  const message = removeAccents(document.getElementById("message").value);
  const columns = parseInt(document.getElementById("columns").value);
  const encryptedMessage = doTranspositionEncryption(message, columns);
  document.getElementById("result").innerText = encryptedMessage;
}

function decrypt() {
  const ciphertext = removeAccents(document.getElementById("decryptedMessage").value);
  const columns = parseInt(document.getElementById("columns").value);
  const decryptedMessage = doTranspositionDecryption(ciphertext, columns);
  document.getElementById("decryptedResult").innerText = decryptedMessage;
}

function doTranspositionEncryption(message, columns) {
  let result = "";
  const messageWithoutSpaces = message.replace(/\s/g, '');
  for (let i = 0; i < columns; i++) {
    for (let j = i; j < messageWithoutSpaces.length; j += columns) {
      result += messageWithoutSpaces[j];
    }
  }
  let index = 0;
  for (let i = 0; i < message.length; i++) {
    if (message[i] === ' ') {
      result = result.slice(0, i) + ' ' + result.slice(i);
    }
  }
  return result;
}

function doTranspositionDecryption(ciphertext, columns) {
  let result = "";
  const messageWithoutSpaces = ciphertext.replace(/\s/g, '');
  const rows = Math.ceil(messageWithoutSpaces.length / columns);
  const cols = columns;
  const matrix = new Array(rows);

  for (let i = 0; i < rows; i++) {
    matrix[i] = new Array(cols);
  }

  let index = 0;

  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows; i++) {
      matrix[i][j] = messageWithoutSpaces[index];
      index++;
    }
  }

  index = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (messageWithoutSpaces[index] === ' ') {
        result = result.slice(0, index) + ' ' + result.slice(index);
      } else {
        result += matrix[i][j];
      }
      index++;
    }
  }

  return result;
}
