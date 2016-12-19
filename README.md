# react-sticky-dynamic-header
React component that makes a header sticky with different content before and after being sticky

## Install

```bash
npm install react-sticky-dynamic-header
```

## Usage

### Example

```javascript
import DynamicHeader from 'react-sticky-dynamic-header';

class MyApp extends React.Component {
    render() {
    	// You can put any 2 components inside the <DynamicHeader>...</DynamicHeader>, they can be React components, DOM elements, but cannot be plain text!
        return (
            <DynamicHeader hasEffect={true} effectDuration={600} useHeadersDifference={true}>
              <div style={{height: "100px", backgroundColor: "#666", width: "100%", position: "relative", top: 0, zIndex: 1039, textAlign: "center",}}>
                <div style={{paddingTop: "65px",}}>Header Component 1 - Bigger Component</div>
              </div>
              <div style={{height: "50px", backgroundColor: "#ccc", width: "100%", position: "fixed", top: 0, zIndex: 1039, textAlign: "center", }}>
                <div style={{paddingTop: "15px",}}>Header Component 2 - Sticky Component</div>
              </div>
            </DynamicHeader>
        );
    }
}
```

### Props

- `hasEffect: Boolean (default: "true")` - Whether or not fading effect will be applied when the header changes its inner content on page scroll
- `effectDuration: Number (miliseconds, default: 600)` - Duration for the above fading effect
- `useHeadersDifference: Boolean (default: "false")` -  Whether or not the header will change its inner content when scroll-position just reaches the difference in height between the 2 components (or the changing will take place after the first header component is scrolled out of view))

## Thank you

- [React NPM Boilerplate](https://github.com/juliancwirko/react-npm-boilerplate)

## License

MIT
