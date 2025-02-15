# ai-speech-chat

## Installation

1. Clone the repository:

   git clone https://github.com/yourusername/ai-speech-chat.git

2. Change into the project directory:

   cd ai-speech-chat

3. Install dependencies:

   npm install

4. Start the server:

   npm start

## Usage

Once the server is running (by default at http://localhost:6969), you can send messages to the server via HTTP requests. For example, you can use the browser's fetch API:

```html
<script>
  fetch('http://localhost:6969/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: "Hello, server!" })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
</script>
```

Alternatively, you can use cURL from the command line:

```sh
curl -X POST http://localhost:6969/message -H "Content-Type: application/json" -d '{"message": "Hello, server!"}'
```

