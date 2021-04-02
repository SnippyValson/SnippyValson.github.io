import "./../../main.css";
import "./benchmarks.css";
import { Style } from "../../shared/style";
import * as React from "react";
import { Switch, Route} from "react-router-dom"
import { SortingBenchmark } from "./sorting_benchmarks/sorting_benchmarks";
import { GpuJsBenchmarks } from "./gpujs_benchmarks/gpujs_benchmarks";
import { TopBar } from '../../shared/components/TopBar';
import { ButtonList } from '../../shared/components/NavgationPanel';
import { RouteComponentProps } from 'react-router';

type IProps = { } & RouteComponentProps

type IState = { 
    status: string
 }

export class Benchmarks extends React.Component<IProps, IState> {
    
    list_items: any;
    style: any;
    state: Readonly<IState>={
        status : "Idle" 
    }

    constructor(props: IProps) {
        super(props);
        this.style = new Style();
        this.list_items = [];
        this.list_items.push({ tag : 'sorting-benchmarks', displayText : 'Sorting' });
        this.list_items.push({ tag : 'matrix-benchmarks', displayText : 'Matrix'});
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

    handleStateChange(state: string){
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
        this.setState({ status : "Idle" });
    }
    
    setBusy() {
        this.setState({ status : "Busy" });
    }

    render(){
        let { match } = this.props;
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
                            <GpuJsBenchmarks />
                        </Route>
                    </Switch>
                 </div> 
            </div>
        );
    }
}
  
