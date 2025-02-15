const micButton = document.getElementById('micButton');
const tooltip = document.getElementById('tooltip');
let isRecording = false;
let mediaRecorder = null;
let audioChunks = [];

function showTooltip(message) {
    tooltip.textContent = message;
    tooltip.classList.add('visible');
}

function hideTooltip() {
    tooltip.classList.remove('visible');
}

async function setupRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            
            // Create audio element for playback
            const audio = new Audio(audioUrl);
            console.log('Playing recorded audio...');
            audio.play();
            
            // Clear chunks for next recording
            audioChunks = [];
        };
        
        return true;
    } catch (error) {
        console.error('Error setting up recording:', error);
        showTooltip('Microphone access denied');
        micButton.classList.add('error');
        return false;
    }
}

async function toggleRecording() {
    if (!isRecording) {
        // Start recording
        if (!mediaRecorder) {
            showTooltip('Requesting microphone access...');
            const setupSuccess = await setupRecording();
            if (!setupSuccess) return;
        }
        
        isRecording = true;
        micButton.classList.add('recording');
        showTooltip('Recording... Click to stop');
        
        // Start recording
        audioChunks = [];
        mediaRecorder.start();
        console.log('Recording started');
    } else {
        // Stop recording
        isRecording = false;
        micButton.classList.remove('recording');
        showTooltip('Click to start recording');
        
        // Stop recording and play
        mediaRecorder.stop();
        console.log('Recording stopped, playing back...');
    }
}

// Show tooltip on hover
micButton.addEventListener('mouseenter', () => {
    if (!isRecording) {
        showTooltip('Click to start recording');
    }
});

// Hide tooltip when not hovering
micButton.addEventListener('mouseleave', () => {
    if (!isRecording && !micButton.classList.contains('error')) {
        hideTooltip();
    }
});

// Clean up resources when the page is closed
window.addEventListener('beforeunload', () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
});

// Handle button clicks
micButton.addEventListener('click', toggleRecording); 