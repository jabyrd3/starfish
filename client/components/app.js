import React from 'react';
import {connect} from 'react-redux';

class AppBody extends React.Component{
  render(){
    return <div>
      <div className="container-fluid">
        <h1>its working</h1>
      </div>
    </div>;
  }
}

export default connect(state => {
  return {
  };
})(AppBody);
