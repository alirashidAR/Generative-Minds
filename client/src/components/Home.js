import React from 'react';
import Header from './layout/header';
import Footer from './layout/footer';

function Home() {
  return (
    <div> 
      <Header/>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
              <h1> Home </h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;