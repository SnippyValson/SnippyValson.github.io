import "./../../main.css";
import "./benchmarks.css";
import { Style } from "@shared/style";
import * as React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { SortingBenchmark } from "./sorting_benchmarks/sorting_benchmarks";
import { GpuJsBenchmarks } from "./gpujs_benchmarks/gpujs_benchmarks";
import { TopBar } from '../../shared/components/TopBar';
import { ButtonList } from '../../shared/components/NavgationPanel';

type IProps = {
    children?: React.ReactNode;
}

type IState = { 
    status: string
}

export class Benchmarks extends React.Component<IProps, IState> {
    list_items: any;
    style: any;
    state: Readonly<IState> = {
        status: "Idle" 
    }

    constructor(props: IProps) {
        super(props);
        this.style = new Style();
        this.list_items = [];
        this.list_items.push({ tag: 'sorting-benchmarks', displayText: 'Sorting' });
        this.list_items.push({ tag: 'matrix-benchmarks', displayText: 'Matrix'});
        this.onItemClicked = this.onItemClicked.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    componentDidMount() {
        this.style.applyStyle();
        this.onItemClicked(null, 'sorting-benchmarks');
    }

    componentWillUnmount() {

    }

    onItemClicked(button: any, item: string) {
        const navigate = useNavigate();
        switch (item) {
            case "sorting-benchmarks": {
                navigate('/sorting-benchmarks');
            }
            break;
            case "matrix-benchmarks": {
                navigate('/matrix-benchmarks');
            }
            break;
        }
    }

    handleStateChange(state: string) {
        switch(state) {
            case "busy": {
                this.setBusy();
            } break;
            case "idle": {
                this.setIdle();
            } break;
            default: break; 
        }
    }

    setIdle() {
        this.setState({ status: "Idle" });
    }
    
    setBusy() {
        this.setState({ status: "Busy" });
    }

    render() {
        return (
            <div style={{ width: '99%', height: '99%', margin: '0px', padding: '0px' }} className="pixel-app-container">
                <div className="pixel-app-header">
                    <TopBar>
                        <label className="pixel-text-medium" style={{ marginLeft: '5px' }}>{this.state.status}</label>
                    </TopBar>
                </div>
                <div className="pixel-app-side-panel">
                    <ButtonList onItemClicked={this.onItemClicked} items={this.list_items}></ButtonList>
                </div>
                <div className="pixel-app-content">   
                    <Routes>
                        <Route path="sorting-benchmarks" element={<SortingBenchmark onStateChanged={this.handleStateChange} />} />
                        <Route path="matrix-benchmarks" element={<GpuJsBenchmarks />} />
                    </Routes>
                </div> 
            </div>
        );
    }
}
  
