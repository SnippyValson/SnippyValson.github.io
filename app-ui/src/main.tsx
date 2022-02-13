import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { Home } from './views/home/Home';
import { ThreeJSShowCase } from './views/threejs_showcase/threejs_showcase';
import { GpuJsShowCase } from './views/gpujs_showcase/GpuJsShowcase';
import { Benchmarks } from './views/benchmarks/benchmarks';
import { HashRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/threejs-showcase" component={ThreeJSShowCase}/>
      <Route path="/gpu-js-showcase" component={GpuJsShowCase}/>
      <Route path="/benchmarks" component={Benchmarks} />
    </Switch>
  </HashRouter>, 
document.getElementById('root'));