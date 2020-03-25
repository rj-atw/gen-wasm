import init,{ reduce } from './hello_world.js';

export class WasmGraph extends React.Component {
  constructor(props) {
    super(props)
    this.renderGraph = this.renderGraph.bind(this)
    this.state = {response: 0}	  
  }
  renderGraph() {
    //const array= document.getElementById(this.props.arrayElement).value.split(',')
    const array= this.props.arrayElement

    if(!array) return
    let id = this.props.name
    id = (id.endsWith('.wasm')) ? id : id + '.wasm'
    if(!id) return

    //let rv = await init(id);

    return init(id).then(rv => {
    // And afterwards we can use all the functionality defined in wasm.
    const result = reduce(rv, array);

    
    const value = id + " " + result
    console.log(value)
    if(this.state.response != value) { 
      this.setState({response: value})
    }
    return result
    //document.getElementById(responseId).value = id + " " + result
    })
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
		    // You can also log the error to an error reporting service
         console.log(error, errorInfo);
  }
  render() {
    const name = this.props.name

    this.renderGraph()

    return <div className="col card"> 
        <div className="row">{this.state.response}</div>
      </div>; 
  }
}



class WasmGraphList extends React.Component {
  constructor(props) {
    super(props)
    this.renderGraph = this.renderGraph.bind(this)
    this.addNode = this.addNode.bind(this)
    this.state = {arr: 0, nodes: []}	  
  }

  renderGraph() {
    const vals = document.getElementById("arr").value.split(',')
    this.setState({arr: vals})
    console.log(vals)
  }

  addNode() {
    this.setState({
      nodes: this.state.nodes.concat(document.getElementById("wasmModule").value)
    })
    console.log(this.state.nodes)
  }

  render() { 
    const nodes = this.state.nodes.map( wasmModule => 
       <div className="row">
         <WasmGraph name={wasmModule} arrayElement={this.state.arr} />
       </div>
    )

    return <div className="col">
       <div className="row">
         <label htmlFor="arr">Array</label>     
         <input type="text" id="arr" onChange={this.renderGraph}/> 
       </div>

       <div className="row">
         <label htmlFor="add">Wasm Module</label>     
         <input type="text" id="wasmModule"/> 
	 <input type="button" value="Add" onClick={this.addNode}/>
       </div>

       {nodes}

     </div>
  }
}

ReactDOM.render(<WasmGraphList/>, document.getElementById('graph'));
