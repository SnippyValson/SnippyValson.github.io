import React from 'react'
import ReactDOM from 'react-dom';
import { Home } from './views/home/home';
import { DeltaAnimation } from './views/delta_animation/delta_animation';
import { GpuJsShowCase } from './views/gpujs_showcase/gpujs_showcase';
import { Benchmarks } from './views/benchmarks/benchmarks';
import { HashRouter, Switch, Route } from 'react-router-dom';


ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/">
          <Home />
      </Route>
      <Route path="/time-based-animation">
        <DeltaAnimation />
      </Route>
      <Route path="/gpu-js-showcase">
        <GpuJsShowCase />
      </Route>
      <Route path="/benchmarks">
        <Benchmarks />
      </Route>
    </Switch>
  </HashRouter>, 
  document.getElementById('root'));