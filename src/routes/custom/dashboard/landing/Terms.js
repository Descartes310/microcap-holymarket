import { Helmet } from "react-helmet";
import React, { Component } from 'react';
import { getFilePath } from "Helpers/helpers";

export default class Terms extends Component {
  render() {
    return (
      <div className="terms-wrapper p-20" >
        <Helmet>
          <title>CONDITIONS GENERALES D’UTILISATION </title>
          <meta name="description" content="Conditions générales MicroCap" />
        </Helmet>
        <iframe
          src={getFilePath("files/cgu/cgu.pdf")}
          style={{ width: "90vw", height: "100vh", border: "none", marginLeft: "5vw" }}
          title="PDF Viewer"
        />
      </div>
    );
  }
}
