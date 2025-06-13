import * as React from 'react'
import { createRoot } from 'react-dom/client';
import { Home } from './views/home/Home';
import { ThreeJSShowCase } from './views/threejs_showcase/threejs_showcase';
import { GpuJsShowCase } from './views/gpujs_showcase/GpuJsShowcase';
import { Benchmarks } from './views/benchmarks/benchmarks';
import { HashRouter, Routes, Route } from 'react-router-dom';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/threejs-showcase" element={<ThreeJSShowCase />} />
      <Route path="/gpu-js-showcase" element={<GpuJsShowCase />} />
      <Route path="/benchmarks" element={<Benchmarks />} />
    </Routes>
  </HashRouter>
);