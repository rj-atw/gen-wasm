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
    return _this;
  }

  _createClass(WasmGraph, [{
    key: "renderGraph",
    value: function renderGraph() {
      var prefix = this.props.name;
      var arrayInputId = prefix + "_array";
      var modInputId = prefix + "_mod";

      var array = document.getElementById(this.props.arrayElement).value.split(',');
      var id = document.getElementById(modInputId).value;

      id = id.endsWith('.wasm') ? id : id + '.wasm';

      //let rv = await init(id);

      return init(id).then(function (rv) {
        // And afterwards we can use all the functionality defined in wasm.
        var result = reduce(rv, array);
        console.log(id + " " + ("" + result));

        //document.getElementById('response').value = id + " " + result
      });
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
  }, {
    key: "render",
    value: function render() {
      var prefix = this.props.name;
      var arrayInputId = prefix + "_array";
      var modInputId = prefix + "_mod";

      return React.createElement(
        "div",
        { className: "col card" },
        React.createElement(
          "label",
          { htmlFor: arrayInputId },
          "Array"
        ),
        React.createElement("input", { type: "text", id: arrayInputId }),
        React.createElement(
          "label",
          { htmlFor: modInputId },
          "Wasm Module"
        ),
        React.createElement("input", { type: "text", id: modInputId }),
        React.createElement(
          "button",
          { onClick: this.renderGraph },
          "submit"
        )
      );
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      console.log(error);
      return { hasError: true };
    }
  }]);

  return WasmGraph;
}(React.Component);