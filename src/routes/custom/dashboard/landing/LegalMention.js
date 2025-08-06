import { Helmet } from "react-helmet";
import React, { Component } from 'react';
import { getFilePath } from "Helpers/helpers";

export default class LegalMention extends Component {
  render() {
    return (
      <div className="terms-wrapper p-20" >
        <Helmet>
          <title>MENTIONS LEGALES</title>
          <meta name="description" content="Mentions légales MicroCap" />
        </Helmet>
        
        <iframe
          src={getFilePath("files/legal-mention/legal-mention.pdf")}
          style={{ width: "90vw", height: "100vh", border: "none", marginLeft: "5vw" }}
          title="PDF Viewer"
        />
      </div>
    );
  }
}
