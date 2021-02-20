import "./../../main.css";
import "./benchmarks.css";
import { Style } from "../../common/style";
import React from "react";
import { Switch, Route} from "react-router-dom"
import { SortingBenchmark } from "./subviews/sorting_benchmarks/sorting_benchmarks";
import { GpuJsBenchmarks } from "./subviews/gpujs_benchmarks/gpujs_benchmarks";
import { Strings } from "./localization/strings";
import { TopBar } from './../../common/common_components/top_bar';
import { ButtonList } from './../../common/common_components/button_list';


export class Benchmarks extends React.Component {
    
    list_items;
    localStrings;
    style;

    constructor(props) {
        super(props);
        this.style = new Style();
        this.localStrings = new Strings();
        this.list_items = [];
        this.list_items.push({ tag : 'sorting-benchmarks', displayText : 'Sorting' });
        this.list_items.push({ tag : 'matrix-benchmarks', displayText : 'Matrix'});
        this.state = { status : "Idle" };
        this.onItemClicked = this.onItemClicked.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    componentDidMount() {
        this.style.applyStyle();
        this.onItemClicked(null, 'sorting-benchmarks');
    }

    componentWillUnmount() {

    }

    onItemClicked(button, item) {
        let {match} = this.props;
        switch (item) {
            case "sorting-benchmarks": {
                this.props.history.push(`${match.url}/sorting-benchmarks`)
            }
            break;
            case "matrix-benchmarks": {
               this.props.history.push(`${match.url}/matrix-benchmarks`)
            }
            break;
        }
    }

    handleStateChange(state){
        switch(state) {
            case "busy": {
                this.setBusy();
            }break;
            case "idle": {
                this.setIdle();
            }break;
            default: break; 
        }
    }

    setIdle() {
        this.setState({ status : this.localStrings.localized.Idle });
    }
    
    setBusy() {
        this.setState({ status : this.localStrings.localized.BusyIndicator});
    }

    render(){
        let {match} = this.props;
        return (
            <div style = {{width : '99%', height : '99%', margin : '0px', padding : '0px'}} className = "pixel-app-container">
                <div className = "pixel-app-header">
                    <TopBar>
                        <label className="pixel-text-medium" style = {{ marginLeft : '5px' }}>{this.state.status}</label>
                    </TopBar>
                </div>
                <div className = "pixel-app-side-panel">
                    <ButtonList onItemClicked = { this.onItemClicked } items = { this.list_items }></ButtonList>
                </div>
                 <div className="pixel-app-content" >   
                    <Switch>
                        <Route path={`${match.url}/sorting-benchmarks`} >
                            <SortingBenchmark onStateChanged = {this.handleStateChange} />
                        </Route>
                        <Route path={`${match.url}/matrix-benchmarks`} >
                            <GpuJsBenchmarks onStateChanged = {this.handleStateChange} />
                        </Route>
                    </Switch>
                 </div> 
            </div>
        );
    }
}
  
