import { React } from "react";
import "../../../../main.css";
import "./gpujs_benchmarks.css";

export class GpuJsBenchmarks extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <button className = "pixel-button pixel-text-medium">Start</button>
                    <label className="pixel-text-medium">FPS : </label>
                </div>
                <canvas id="renderPanel" className="render-panel"></canvas>
            </div>
        );
    }
}