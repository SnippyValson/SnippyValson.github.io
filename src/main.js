import React from 'react'
import ReactDOM from 'react-dom';
import { Home } from './views/home/home';
import { DeltaAnimation } from './views/delta_animation/delta_animation';
import { GpuJsShowCase } from './views/gpujs_showcase/gpujs_showcase';
import { Benchmarks } from './views/benchmarks/benchmarks';
import { HashRouter, Switch, Route, BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/time-based-animation" component={DeltaAnimation}/>
      <Route path="/gpu-js-showcase" component={GpuJsShowCase}/>
      <Route path="/benchmarks" component={Benchmarks} />
    </Switch>
  </BrowserRouter>, 
  document.getElementById('root'));