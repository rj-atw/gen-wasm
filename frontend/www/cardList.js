var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import init, { reduce } from './hello_world.js';

export var WasmGraph = function (_React$Component) {
  _inherits(WasmGraph, _React$Component);

  function WasmGraph(props) {
    _classCallCheck(this, WasmGraph);

    var _this = _possibleConstructorReturn(this, (WasmGraph.__proto__ || Object.getPrototypeOf(WasmGraph)).call(this, props));

    _this.renderGraph = _this.renderGraph.bind(_this);
    _this.state = { response: 0 };
    return _this;
  }

  _createClass(WasmGraph, [{
    key: 'renderGraph',
    value: function renderGraph() {
      var _this2 = this;

      //const array= document.getElementById(this.props.arrayElement).value.split(',')
      var array = this.props.arrayElement;

      if (!array) return;
      var id = this.props.name;
      id = id.endsWith('.wasm') ? id : id + '.wasm';
      if (!id) return;

      //let rv = await init(id);

      return init(id).then(function (rv) {
        // And afterwards we can use all the functionality defined in wasm.
        var result = reduce(rv, array);

        var value = id + " " + result;
        console.log(value);
        if (_this2.state.response != value) {
          _this2.setState({ response: value });
        }
        return result;
        //document.getElementById(responseId).value = id + " " + result
      });
    }
  }, {
    key: 'componentDidCatch',
    value: function componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
  }, {
    key: 'render',
    value: function render() {
      var name = this.props.name;

      this.renderGraph();

      return React.createElement(
        'div',
        { className: 'col card' },
        React.createElement(
          'div',
          { className: 'row' },
          this.state.response
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromError',
    value: function getDerivedStateFromError(error) {
      console.log(error);
      return { hasError: true };
    }
  }]);

  return WasmGraph;
}(React.Component);

var WasmGraphList = function (_React$Component2) {
  _inherits(WasmGraphList, _React$Component2);

  function WasmGraphList(props) {
    _classCallCheck(this, WasmGraphList);

    var _this3 = _possibleConstructorReturn(this, (WasmGraphList.__proto__ || Object.getPrototypeOf(WasmGraphList)).call(this, props));

    _this3.renderGraph = _this3.renderGraph.bind(_this3);
    _this3.addNode = _this3.addNode.bind(_this3);
    _this3.state = { arr: 0, nodes: [] };
    return _this3;
  }

  _createClass(WasmGraphList, [{
    key: 'renderGraph',
    value: function renderGraph() {
      var vals = document.getElementById("arr").value.split(',');
      this.setState({ arr: vals });
      console.log(vals);
    }
  }, {
    key: 'addNode',
    value: function addNode() {
      this.setState({
        nodes: this.state.nodes.concat(document.getElementById("wasmModule").value)
      });
      console.log(this.state.nodes);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var nodes = this.state.nodes.map(function (wasmModule) {
        return React.createElement(
          'div',
          { className: 'row' },
          React.createElement(WasmGraph, { name: wasmModule, arrayElement: _this4.state.arr })
        );
      });

      return React.createElement(
        'div',
        { className: 'col' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'label',
            { htmlFor: 'arr' },
            'Array'
          ),
          React.createElement('input', { type: 'text', id: 'arr', onChange: this.renderGraph })
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'label',
            { htmlFor: 'add' },
            'Wasm Module'
          ),
          React.createElement('input', { type: 'text', id: 'wasmModule' }),
          React.createElement('input', { type: 'button', value: 'Add', onClick: this.addNode })
        ),
        nodes
      );
    }
  }]);

  return WasmGraphList;
}(React.Component);

ReactDOM.render(React.createElement(WasmGraphList, null), document.getElementById('graph'));