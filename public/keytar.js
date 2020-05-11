if (navigator.requestMIDIAccess) {
    console.log('WebMIDI is supported in this browser.');
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

} else {
    console.log('WebMIDI is not supported in this browser.');
    document.querySelector('.note-info').textContent = 'Error: This browser does not support WebMIDI.';
}

function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
    }
}

function onMIDIFailure() {
    document.querySelector('.note-info').textContent = 'Error: Could not access MIDI devices. Connect a device and refresh to try again.';
}

function getMIDIMessage(message) {
    var command = message.data[0];
    var note = message.data[1];
    var velocity = message.data[2];

    switch (command) {
        case 144: // noteOn
            if (velocity > 0) {
                 noteOnListener(note);
            }
        break;    
    }
}

function noteOnListener(note) {
    const Http = new XMLHttpRequest();
    let url = '';
    switch (note) {
        case 50: // D below middle c, delete random pod, Beethoven's 5th
                // G G G Eflat, F F F D
            console.log('d below middle c');
            url='http://0.0.0.0:8080/deletePod/';
            Http.open("GET", url);
            Http.send();

            Http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const response = JSON.parse(Http.response);
                    console.log(response.result);
                }
            }
            break;
        case 60: // middle C, create pod - Jump
                // GBD GCE FAC FAC GBD GBD GCE FAC CFA CEG CDG
            console.log('C');
            url='http://0.0.0.0:8080/createPod/';
            Http.open("GET", url);
            Http.send();

            Http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const response = JSON.parse(Http.response);
                    console.log(response.result);
                }
            }
            break;
        case 77: // F above high C, create deployment, Final Countdown
                // ED E A | FE F E D | FE F A | DC DCBD | C
            console.log('B');
            url='http://0.0.0.0:8080/createDeployment/';
            Http.open("GET", url);
            Http.send();

            Http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const response = JSON.parse(Http.response);
                    console.log(response.result);    
                }
            }
            break;
        case 78: // F# above high C, create service, Take On Me
                // A G# A | E F# E
            console.log('F#');
            url='http://0.0.0.0:8080/createService/';
            Http.open("GET", url);
            Http.send();

            Http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const response = JSON.parse(Http.response);
                    console.log(response.result);
                }
            }
            break;
    }
}

      



