import React from 'react';
import { loadMicroApp, initGlobalState } from 'qiankun';
export default class MicroApp extends React.Component {
  
  microAppRef = null;
  
  componentDidMount() {
    const { onGlobalStateChange, setGlobalState } = initGlobalState();
    
    // this.microAppRef = loadMicroApp({ name, entry, container: '#sub-app-viewport2' });
  }
  
  componentWillUnmount() {
    // this.microAppRef.mountPromise.then(() => this.microAppRef.unmount());
  }
  
  render() {
  
    return (<div className="sub-app-viewport" id="sub-app-viewport2">
      <iframe width="100%" src="https://lexiangla.com"></iframe>
    </div>);
  }
}
