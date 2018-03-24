(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-transition-group/CSSTransitionGroup'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-transition-group/CSSTransitionGroup'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactAddonsCssTransitionGroup);
        global.index = mod.exports;
    }
})(this, function (exports, _react, _reactAddonsCssTransitionGroup) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var elementName = '__react-sticky-dynamic-header__';
    var componentOK = true;

    var DynamicHeader = function (_React$Component) {
        _inherits(DynamicHeader, _React$Component);

        function DynamicHeader(props) {
            _classCallCheck(this, DynamicHeader);

            var _this = _possibleConstructorReturn(this, (DynamicHeader.__proto__ || Object.getPrototypeOf(DynamicHeader)).call(this, props));

            if (!_this.props.children || !_this.props.children.length || _this.props.children.length < 2) {
                console.log('ERROR [react-sticky-dynamic-header]: 2 components must be passed as children!');
                componentOK = false;
            } else if (_this.props.children.length > 2) {
                console.log('WARNING [react-sticky-dynamic-header]: more than 2 components were passed as children, only the first 2 are used, the rest will be ignored!');
                if (!_this.props.children[0].type || !_this.props.children[1].type) {
                    componentOK = false;
                }
            } else if (!_this.props.children[0].type || !_this.props.children[1].type) componentOK = false;

            _this.state = {
                headerType: 'big',
                bigElementHeight: 0,
                smallElementHeight: 0,
                alreadyCalculated: false,
                bigIndex: 0,
                smallIndex: 1
            };
            return _this;
        }

        _createClass(DynamicHeader, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var h1 = parseInt(this.refs[elementName + '_1'].children[0].offsetHeight);
                var h2 = parseInt(this.refs[elementName + '_2'].children[0].offsetHeight);
                this.setState({
                    bigElementHeight: h1,
                    smallElementHeight: h2,
                    alreadyCalculated: true
                });
                window.addEventListener('scroll', this._calcTranslation.bind(this, h1, h2));
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                window.removeEventListener('scroll', this._calcTranslation);
            }
        }, {
            key: '_calcTranslation',
            value: function _calcTranslation(h1, h2) {
                var _window = window;
                var heightDiff = parseInt(h1) - parseInt(h2);
                if (heightDiff <= 0 || !this.props.useHeadersDifference) heightDiff = parseInt(h1);
                var scrollPos = _window.scrollY;
                if (scrollPos > heightDiff) {
                    this.setState({
                        headerType: 'small'
                    });
                } else {
                    this.setState({
                        headerType: 'big'
                    });
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var tmpEle;
                var returnEle;
                if (!componentOK) {
                    tmpBigComponent = _react2.default.createElement(
                        'div',
                        { style: { height: '50px', backgroundColor: '#666', width: '100%', position: 'relative', top: 0, zIndex: 1039, textAlign: 'center' } },
                        _react2.default.createElement(
                            'div',
                            { style: { paddingTop: '15px' } },
                            'ERROR [react-sticky-dynamic-header]: 2 components must be passed as children!'
                        )
                    );
                    tmpSmallComponent = _react2.default.createElement(
                        'div',
                        { style: { height: '50px', backgroundColor: '#ccc', width: '100%', position: 'fixed', top: 0, zIndex: 1039, textAlign: 'center' } },
                        _react2.default.createElement(
                            'div',
                            { style: { paddingTop: '15px' } },
                            'ERROR [react-sticky-dynamic-header]: 2 components must be passed as children!'
                        )
                    );
                    tmpEle = _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'div',
                            { style: { position: 'absolute', top: '-10000px' }, ref: elementName + '_1' },
                            tmpBigComponent
                        ),
                        _react2.default.createElement(
                            'div',
                            { style: { position: 'absolute', top: '-20000px' }, ref: elementName + '_2' },
                            tmpSmallComponent
                        )
                    );
                } else {
                    tmpEle = _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'div',
                            { style: { position: 'absolute', top: '-10000px' }, ref: elementName + '_1' },
                            this.props.children[0]
                        ),
                        _react2.default.createElement(
                            'div',
                            { style: { position: 'absolute', top: '-20000px' }, ref: elementName + '_2' },
                            this.props.children[1]
                        )
                    );
                }
                if (this.state.alreadyCalculated) {
                    tmpEle = '';
                }
                var styleEle = _react2.default.createElement(
                    'style',
                    null,
                    '\
        .' + elementName + '_1' + '-enter {\
          opacity: 0.01;\
          transition: opacity ' + this.props.effectDuration + 'ms ease-in;\
        }\
            .' + elementName + '_1' + '-enter.' + elementName + '_1' + '-enter-active {\
          opacity: 1;\
        }\
            .' + elementName + '_1' + '-leave {\
          opacity: 1;\
          transition: opacity 0.1s ease-in;\
        }\
            .' + elementName + '_1' + '-leave.' + elementName + '_1' + '-leave-active {\
          opacity: 0.01;\
        }\
            .' + elementName + '_2' + '-enter {\
          opacity: 0.01;\
          transition: opacity ' + this.props.effectDuration + 'ms ease-in;\
        }\
            .' + elementName + '_2' + '-enter.' + elementName + '_2' + '-enter-active {\
          opacity: 1;\
        }\
            .' + elementName + '_2' + '-leave {\
          opacity: 1;\
          transition: opacity 0.1s ease-in;\
        }\
            .' + elementName + '_2' + '-leave.' + elementName + '_2' + '-leave-active {\
          opacity: 0.01;\
        }\
      '
                );
                if (this.state.headerType == 'big') {
                    var bigHeaderComponent = _react2.default.createElement(
                        'div',
                        { key: elementName + '_1', style: { height: '50px', backgroundColor: '#666', width: '100%', position: 'relative', top: 0, zIndex: 1039, textAlign: 'center' } },
                        _react2.default.createElement(
                            'div',
                            { style: { paddingTop: '15px' } },
                            'ERROR [react-sticky-dynamic-header]: 2 components must be passed as children!'
                        )
                    );
                    if (componentOK) {
                        bigHeaderComponent = _react2.default.cloneElement(this.props.children[this.state.bigIndex], { key: elementName + '_1' });
                    }
                    returnEle = _react2.default.createElement(
                        'div',
                        null,
                        tmpEle,
                        styleEle,
                        _react2.default.createElement(
                            _reactAddonsCssTransitionGroup2.default,
                            { transitionName: elementName + '_1', transitionAppear: false, transitionEnterTimeout: 500, transitionLeaveTimeout: 500, transitionLeave: false, transitionEnter: this.props.hasEffect },
                            bigHeaderComponent
                        )
                    );
                } else {
                    var smallHeaderComponent = _react2.default.createElement(
                        'div',
                        { key: elementName + '_2', style: { height: '50px', backgroundColor: '#ccc', width: '100%', position: 'fixed', top: 0, zIndex: 1039, textAlign: 'center' } },
                        _react2.default.createElement(
                            'div',
                            { style: { paddingTop: '15px' } },
                            'ERROR [react-sticky-dynamic-header]: 2 components must be passed as children!'
                        )
                    );
                    if (componentOK) {
                        smallHeaderComponent = _react2.default.cloneElement(this.props.children[this.state.smallIndex], { key: elementName + '_2' });
                    }
                    returnEle = _react2.default.createElement(
                        'div',
                        null,
                        tmpEle,
                        styleEle,
                        _react2.default.createElement(
                            _reactAddonsCssTransitionGroup2.default,
                            { transitionName: elementName + '_2', transitionAppear: false, transitionEnterTimeout: 500, transitionLeaveTimeout: 500, transitionLeave: false, transitionEnter: this.props.hasEffect },
                            smallHeaderComponent
                        ),
                        _react2.default.createElement('div', { style: { height: this.state.bigElementHeight + 'px', width: '100%', clear: 'both' } })
                    );
                }
                return returnEle;
            }
        }]);

        return DynamicHeader;
    }(_react2.default.Component);

    DynamicHeader.defaultProps = {
        hasEffect: true,
        effectDuration: 600,
        useHeadersDifference: false
    };

    exports.default = DynamicHeader;
});
