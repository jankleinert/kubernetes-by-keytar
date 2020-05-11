function subscribeToPods(cb) {
    const Http = new XMLHttpRequest();
    const url='http://0.0.0.0:8080/getPods/';
    
    window.setTimeout(function(){
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const response = JSON.parse(Http.response);
                cb(null, response.result);
            }
        }
        subscribeToPods(cb);
    }, 1000);
}

function subscribeToServices(cb) {
    const Http = new XMLHttpRequest();
    const url='http://0.0.0.0:8080/getServices/';
    
    window.setTimeout(function(){
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const response = JSON.parse(Http.response);
                cb(null, response.result);
            }
        }
        subscribeToServices(cb);
    }, 1000);
}

function subscribeToDeployments(cb) {
    const Http = new XMLHttpRequest();
    const url='http://0.0.0.0:8080/getDeployments/';
    
    window.setTimeout(function(){
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const response = JSON.parse(Http.response);
                cb(null, response.result);
            }
        }
        subscribeToDeployments(cb);
    }, 1000);
}

export { subscribeToPods }
export { subscribeToServices }
export { subscribeToDeployments }