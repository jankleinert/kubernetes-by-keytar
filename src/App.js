import { subscribeToPods } from './api';
import { subscribeToServices } from './api';
import { subscribeToDeployments } from './api';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const podGroup = Object.keys(this.state.pods).map(key => 
      <>
        <circle cy="200" cx={key * (800/this.state.pods.length) + (800/this.state.pods.length/2)} r={this.state.podSize} className={this.state.pods[key].objectStatus}/>
        <text x={key * (800/this.state.pods.length) + (800/this.state.pods.length/2)} y="168" textAnchor="middle" stroke="#fff" fill="#fff" className="podlabel">{this.state.pods[key].objectType}</text>
        <text x={key * (800/this.state.pods.length) + (800/this.state.pods.length/2)} y="208" textAnchor="middle" stroke="#fff" fill="#fff" className="podlabel">{this.state.pods[key].objectName}</text>
      </>
    )

    const serviceGroup = Object.keys(this.state.services).map(key => 
      <>
        <rect x="300" y="320" width="200" height="75" rx="15" ry="15" className="service"/>
        <text x="400" y="345" textAnchor="middle" fill="#444" stroke="#444" className="podlabel">{this.state.services[key].objectType}</text>
        <text x="400" y="375" textAnchor="middle" fill="#444" stroke="#444" className="podlabel">{this.state.services[key].objectName}</text>
      </>
    )
    
    const serviceToPodLines = Object.keys(this.state.pods).map(key => 
      <line className={"service-"+this.state.services.length} x1={key * (800/this.state.pods.length) + (800/this.state.pods.length/2)} y1="265" x2="400" y2="320"  />
    )

    const deploymentGroup = Object.keys(this.state.deployments).map(key => 
      <>
        <rect x="300" y="0" width="200" height="75" rx="15" ry="15" className="deployment"/>
        <text x="400" y="25" textAnchor="middle" fill="#fff" stroke="#fff" className="podlabel">{this.state.deployments[key].objectType}</text>
        <text x="400" y="55" textAnchor="middle" fill="#fff" stroke="#fff" className="podlabel">{this.state.deployments[key].objectName}</text>
      </>
    )

    const deploymentToPodLines = Object.keys(this.state.pods).map(key => 
      <line className={"deployment-"+this.state.deployments.length} x1={key * (800/this.state.pods.length) + (800/this.state.pods.length/2)} y1="135" x2="400" y2="75"  />
    )

    

    return (
      <div className="App">
        <div className="svg-wrapper">
          <svg width={this.state.chartWidth} height={this.state.chartHeight}>
            <g id="pods">
              {podGroup}
            </g> 
            <g id="services">
              {serviceGroup}
            </g> 
            <g id="serviceToPodLines">
              {serviceToPodLines}
            </g> 
            <g id="deployments">
              {deploymentGroup}
            </g>        
            <g id="deploymentToPodLines">
              {deploymentToPodLines}
            </g>
          </svg>
        </div>
        <div className="App-images">
   
      
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);
    subscribeToPods((err, pods) => this.setState({ 
      pods 
    }));
    subscribeToServices((err, services) => this.setState({ 
      services 
    }));
    subscribeToDeployments((err, deployments) => this.setState({ 
      deployments 
    }));
  }

  state = {
    pods: [],
    chartWidth: 800,
    chartHeight: 400,
    podSize: 65,
    services: [],
    deployments: []
  };
}

export default App;
