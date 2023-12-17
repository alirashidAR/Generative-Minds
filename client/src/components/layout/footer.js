import React from 'react';

function Footer() {
    return(
        <div className="container-fluid bg-dark text-white py-3">
        <div className="row">
          <div className="col-md-6">
            <span>&copy; 2022 Generative Minds. All rights reserved.</span>
          </div>
          <div className="col-md-6 text-md-right">
            <span>Email: support@generativeminds.com</span>
            <span className="ml-2">Phone: +1-123-456-7890</span>
            <span className="ml-2">Twitter: @generativeminds</span>
          </div>
        </div>
      </div>
    );
}

export default Footer;