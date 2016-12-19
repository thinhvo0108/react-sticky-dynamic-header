import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const elementName = '__react-sticky-dynamic-header__';
let componentOK = true;

class DynamicHeader extends React.Component {

    constructor(props) {
        super(props);

        if (!(this.props.children) || !(this.props.children.length) || (this.props.children.length < 2)) {
            console.log('ERROR [react-sticky-dynamic-header]: 2 components must be passed as children!');
            componentOK = false;
        } else if (this.props.children.length > 2) {
            console.log('WARNING [react-sticky-dynamic-header]: more than 2 components were passed as children, only the first 2 are used, the rest will be ignored!');
            if (!this.props.children[0].type || !this.props.children[1].type) {
                componentOK = false;
            }
        } else 
			if (!this.props.children[0].type || !this.props.children[1].type) componentOK = false;
			
        this.state = {
            headerType: 'big',
            bigElementHeight: 0,
            smallElementHeight: 0,
            alreadyCalculated: false,
            bigIndex: 0,
            smallIndex: 1,
        };
    }

    componentDidMount() {
        var h1 = parseInt(this.refs[elementName+'_1'].children[0].offsetHeight);
        var h2 = parseInt(this.refs[elementName+'_2'].children[0].offsetHeight);
        this.setState({
            bigElementHeight: h1,
            smallElementHeight: h2,
            alreadyCalculated: true,
        });
        window.addEventListener('scroll', this._calcTranslation.bind(this, h1, h2));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._calcTranslation)
    }
    _calcTranslation(h1, h2) {
        var _window = window;
        var heightDiff = parseInt(h1) - parseInt(h2);
        if ((heightDiff <= 0) || (!this.props.useHeadersDifference)) heightDiff = parseInt(h1);
        var scrollPos = _window.scrollY;
        if (scrollPos > heightDiff) {
            this.setState({
                headerType: 'small',
            });
        } else {
            this.setState({
                headerType: 'big',
            });
        }
    }

    render() {
        var tmpEle;
        var returnEle;
        if (!componentOK) {
            tmpBigComponent = (
        <div style={{height: '50px', backgroundColor: '#666', width: '100%', position: 'relative', top: 0, zIndex: 1039, textAlign: 'center',}}>
          <div style={{paddingTop: '15px',}}>ERROR [react-sticky-dynamic-header]: 2 components must be passed as children!</div>
        </div>
      );
            tmpSmallComponent = (
        <div style={{height: '50px', backgroundColor: '#ccc', width: '100%', position: 'fixed', top: 0, zIndex: 1039, textAlign: 'center', }}>
          <div style={{paddingTop: '15px',}}>ERROR [react-sticky-dynamic-header]: 2 components must be passed as children!</div>
        </div>
      );
            tmpEle = (
        <div>
          <div style={{position: 'absolute', top: '-10000px', }} ref={elementName+'_1'}>{tmpBigComponent}</div>
          <div style={{position: 'absolute', top: '-20000px', }} ref={elementName+'_2'}>{tmpSmallComponent}</div>
        </div>
      )
        } else {
            tmpEle = (
        <div>
          <div style={{position: 'absolute', top: '-10000px', }} ref={elementName+'_1'}>{this.props.children[0]}</div>
          <div style={{position: 'absolute', top: '-20000px', }} ref={elementName+'_2'}>{this.props.children[1]}</div>
        </div>
      )
        }
        if (this.state.alreadyCalculated) {
            tmpEle = '';
        }
        var styleEle = (
      <style>{'\
        .'+elementName+'_1'+'-enter {\
          opacity: 0.01;\
          transition: opacity '+this.props.effectDuration+'ms ease-in;\
        }\
            .'+elementName+'_1'+'-enter.'+elementName+'_1'+'-enter-active {\
          opacity: 1;\
        }\
            .'+elementName+'_1'+'-leave {\
          opacity: 1;\
          transition: opacity 0.1s ease-in;\
        }\
            .'+elementName+'_1'+'-leave.'+elementName+'_1'+'-leave-active {\
          opacity: 0.01;\
        }\
            .'+elementName+'_2'+'-enter {\
          opacity: 0.01;\
          transition: opacity '+this.props.effectDuration+'ms ease-in;\
        }\
            .'+elementName+'_2'+'-enter.'+elementName+'_2'+'-enter-active {\
          opacity: 1;\
        }\
            .'+elementName+'_2'+'-leave {\
          opacity: 1;\
          transition: opacity 0.1s ease-in;\
        }\
            .'+elementName+'_2'+'-leave.'+elementName+'_2'+'-leave-active {\
          opacity: 0.01;\
        }\
      '}</style>
    );
        if (this.state.headerType == 'big') {
            let bigHeaderComponent = (
        <div key={elementName+'_1'} style={{height: '50px', backgroundColor: '#666', width: '100%', position: 'relative', top: 0, zIndex: 1039, textAlign: 'center', }}>
          <div style={{paddingTop: '15px',}}>ERROR [react-sticky-dynamic-header]: 2 components must be passed as children!</div>
        </div>
      );
            if (componentOK) {
                bigHeaderComponent = React.cloneElement(this.props.children[this.state.bigIndex], {key: elementName+'_1'});
            }
            returnEle = (
        <div>
          {tmpEle}
          {styleEle}
          <ReactCSSTransitionGroup transitionName={elementName+'_1'} transitionAppear={false} transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionLeave={false} transitionEnter={this.props.hasEffect}>
            {bigHeaderComponent}
          </ReactCSSTransitionGroup>
        </div>
      );
        } else {
            let smallHeaderComponent = (
        <div key={elementName+'_2'} style={{height: '50px', backgroundColor: '#ccc', width: '100%', position: 'fixed', top: 0, zIndex: 1039, textAlign: 'center', }}>
          <div style={{paddingTop: '15px',}}>ERROR [react-sticky-dynamic-header]: 2 components must be passed as children!</div>
        </div>
      );
            if (componentOK) {
                smallHeaderComponent = React.cloneElement(this.props.children[this.state.smallIndex], {key: elementName+'_2'});
            }
            returnEle = (
        <div>
          {tmpEle}
          {styleEle}
          <ReactCSSTransitionGroup transitionName={elementName+'_2'} transitionAppear={false} transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionLeave={false} transitionEnter={this.props.hasEffect}>
            {smallHeaderComponent}
          </ReactCSSTransitionGroup>
          <div style={{height: (this.state.bigElementHeight + 'px'), width: '100%', clear: 'both'}}></div>
        </div>
      );
        }
        return returnEle;
    }
}

DynamicHeader.defaultProps = {
    hasEffect: true,
    effectDuration: 600,
    useHeadersDifference: false,
};

export default DynamicHeader;
