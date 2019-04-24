import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
      this.state={
        keyword:''
      }
    }
    on_Change=(event)=>{
        var target = event.target;
        var name = target.name;
        var value=target.value;

        this.setState({
            [name]:value
        })
    }
    on_click =()=>{
       
        this.props.onSearch(this.state.keyword);
        console.log(this.state.keyword);
    }
    render() {
        return (
                <div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div className="input-group">
                            <input type="text" 
                            className="form-control"
                             placeholder="Type Keywords...."
                             name="keyword"
                             value={this.state.keyword}
                             onChange={this.on_Change}
                             />
                            <span className="input-group-btn">
                    <button 
                    className="btn btn-primary"
                     type="button"
                     onClick={this.on_click}
                     >
                      <span className="fa fa-search mr-5" />Search
                    </button>
                  </span>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Search;
