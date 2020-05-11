const Client = require('kubernetes-client').Client;
const http = require('http');
const express = require('express');
const app = express();
const host = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
const port = 8080;

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
  	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  	next();
});

app.get('/getPods/', async function(req, res, next) {
    var result;
    try {
        const client = new Client({version: '1.13'});
        const podManifest = require('./pod.json');
        const podList = await client.api.v1.namespaces('jandemo').pods().get({qs: {labelSelector: "run=hello-k8s"}});
 
        let podArray = [];
        for (var i = 0; i < podList.body.items.length; i++) {
            podArray.push({objectStatus: podList.body.items[i].status.phase, objectName: podList.body.items[i].metadata.name, objectType: "Pod" })
        }
        res.send({
            success: true,
            result: podArray
        });
    } catch (err) {
        console.error('Error: ' + err);
        res.send({success: false,
                    result: 'error'});
    }	
});

app.get('/getServices/', async function(req, res, next) {
    var result;
    
    try {
        const client = new Client({version: '1.13'});
        const serviceList = await client.api.v1.namespaces('jandemo').services().get({qs: {labelSelector: "run=hello-k8s"}});
 
        let serviceArray = [];
        for (var i = 0; i < serviceList.body.items.length; i++) {
            serviceArray.push({objectStatus: serviceList.body.items[i].status.phase, objectName: serviceList.body.items[i].metadata.name, objectType: "Service" })
        }
        res.send({
            success: true,
            result: serviceArray
        });
    } catch (err) {
        console.error('Error: ' + err);
        res.send({success: false,
                    result: 'error'});
    }
});

app.get('/getDeployments/', async function(req, res, next) {
    var result;
    
    try {
        const client = new Client({version: '1.13'});
        const deploymentList = await client.apis.apps.v1.namespaces('jandemo').deployments().get({qs: {labelSelector: "run=hello-k8s"}});
 
        let deploymentArray = [];
        for (var i = 0; i < deploymentList.body.items.length; i++) {
            deploymentArray.push({objectStatus: deploymentList.body.items[i].status.phase, objectName: deploymentList.body.items[i].metadata.name, objectType: "Deployment" })
        }
        res.send({
            success: true,
            result: deploymentArray
        });
    } catch (err) {
        console.error('Error: ' + err);
        res.send({success: false,
                    result: 'error'});
    }
});

app.get('/createPod/', async function (req, res, next) {
    var result;
    
    try {
        const client = new Client({version: '1.13'});
        const podManifest = require('./pod.json');
        const createPod = await client.api.v1.namespaces('jandemo').pods.post({body: podManifest});
        const pod = await client.api.v1.namespaces('jandemo').pods().get({qs: {labelSelector: "run=hello-k8s"}});
        res.send({success: true,
            result: pod.body});
    } catch (err) {
        console.error('Error: ' + err);
        res.send({success: false,
            result: 'error'});
    }
});

app.get('/createService/', async function (req, res, next) {
    var result;
    
    try {
        const client = new Client({version: '1.13'});
        const serviceManifest = require('./service.json');
        client.api.v1.namespaces('jandemo').services.post({body: serviceManifest});     
        res.send({success: true,
            result: "service created"});
    } catch (err) {
        console.error('Error: ' + err);
        res.send({success: false,
            result: 'error'});
    }	
});

app.get('/createDeployment/', async function (req, res, next) {
    var result;
    
    try {
        const client = new Client({version: '1.13'});
        const deploymentManifest = require('./deployment.json');
        client.apis.apps.v1.namespaces('jandemo').deployments.post({body: deploymentManifest});     
        res.send({success: true,
            result: "deployment created"});
    } catch (err) {
        console.error('Error: ' + err);
        res.send({success: false,
            result: 'error'});
    }	
});

app.get('/deletePod/', async function (req, res, next) {
    var result;
    
    try {
        const client = new Client({version: '1.13'});
        console.log("client created")
        const podList = await client.api.v1.namespaces('jandemo').pods().get({qs: {labelSelector: "run=hello-k8s"}});
        console.log("deleting " + podList.body.items[0].metadata.name);
        const deletePod = await client.api.v1.namespaces('jandemo').pods(podList.body.items[0].metadata.name).delete();
        res.send({success: true,
            result: "pod deleted"});
    } catch (err) {
        console.error('Error: ' + err);
        res.send({success: false,
            result: 'error'});
    }

});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something went wrong.')
});

app.listen(port, host);
console.log('Kubernetes by Keytar started on: ' + host + ':' + port);