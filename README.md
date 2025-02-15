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

Once the server is running (by default at ws://localhost:6969), you can connect to it using WebSockets. For example, you can use the browser's WebSocket API:

```html
<script>
  const ws = new WebSocket('ws://localhost:6969');

  ws.onopen = function() {
    console.log('WebSocket connection established.');
    ws.send(JSON.stringify({ message: "Hello, server!" }));
  };

  ws.onmessage = function(event) {
    console.log('Received from server:', event.data);
  };

  ws.onerror = function(error) {
    console.error('WebSocket error:', error);
  };

  ws.onclose = function() {
    console.log('WebSocket connection closed.');
  };
</script>
```

Alternatively, you can use wscat from the command line:

```sh
wscat -c ws://localhost:6969
```

