import React, { Component } from "react";
import PSPDFKit from "./components/pspdfkit";
import "./App.css";

const LICENSE_KEY =
  process.env.REACT_APP_PSPDFKIT_LICENSE_KEY &&
  process.env.REACT_APP_PSPDFKIT_LICENSE_KEY.trim();

if (!LICENSE_KEY || LICENSE_KEY === "YOUR_LICENSE_KEY_GOES_HERE") {
  throw new Error(`No or invalid PSPDFKit license key found.
Please open package.json and assign it to REACT_APP_PSPDFKIT_LICENSE_KEY.

To request a trial license, please go to:

  https://pspdfkit.com/try/.

After requesting a trial license, you can find your license key by opening the
link in the email and going to:

  https://pspdfkit.com/guides/web/current/standalone/integration/#toc_example-application`);
} else if (LICENSE_KEY.length < 120) {
  throw new Error(`The supplied PSPDFKit license key is too short.

This usually happens when using the NPM_KEY instead of the LICENSE_KEY.

After requesting a trial license, you can find your license key by opening the
link in the email and going to:

  https://pspdfkit.com/guides/web/current/standalone/integration/#toc_example-application`);
}

const baseUrl = `${window.location.protocol}//${window.location.host}/${
  process.env.PUBLIC_URL
}`;

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: "example.pdf",
      inputValue: "https://r360-media-production.s3.us-east-1.amazonaws.com/media/esign_documents/101/df673a109e6e1a98167c57e1c5b2e5f3"
    };
    this.openAnother = this.openAnother.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  openAnother() {
    const {inputValue} = this.state;
    this.setState({
      document: inputValue
    });
  }

  updateInputValue(evt){
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-viewer">
          <PSPDFKit
            documentUrl={this.state.document}
            licenseKey={LICENSE_KEY}
            baseUrl={baseUrl}
          />
        </div>
        <input className="App-input" value={this.state.inputValue} onChange={this.updateInputValue}/>
        <button className="App-button" onClick={this.openAnother}>
          Open input document
        </button>
      </div>
    );
  }
}

export default App;
