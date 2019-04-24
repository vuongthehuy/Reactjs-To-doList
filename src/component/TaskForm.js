import React, { Component } from 'react';

class TaskFrom extends Component {
    constructor(props){
        super(props);
        this.state ={
            id: '',
            name : '',
            status: true
        }
    }
    componentWillMount(){
        if(this.props.task){
            this.setState({
               id: this.props.task.id,
                name:this.props.task.name,
                status: this.props.task.status
            });
        }

    }
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){ 
            this.setState({
                id: nextProps.task.id,
                 name:nextProps.task.name,
                 status: nextProps.task.status
             });
        }
        else if(!nextProps.task){
            this.setState({
                id: '',
                name : '',
                status: false
            });
        }
    }
    CloseForm = () =>{
        this.props.CloseForm();
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type ==='status' ? target.status : target.value;
        console.log(value.status);
        this.setState({
            [name] : value
        });
    }
    onSubmit = (event) => {
        event.preventDefault();
    console.log(this.state.status);
        this.props.onSubmit(this.state);
        this.onClear();
        this.CloseForm();
    }
    onClear =() =>{
        this.setState({
            name: '',
            status: false
        });

    }
    render() {
        var {id}=this.state;
        return (
            <div>

                    <div className="panel panel-warning">
                        <div className="panel-heading">
                            <h3 className="panel-title">{ id !== '' ? 'Update work' : 'Add work'}
                                <span className="fa fa-times-circle text-right"
                                      onClick={this.CloseForm}
                                > </span></h3>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Name :</label>
                                    <input type="text"
                                           className="form-control"
                                            name="name"
                                           value={this.state.name}
                                           onChange={this.onChange}
                                    />
                                </div>
                                <label>Status :</label>
                                <select className="form-control"
                                        required="required"
                                        name="status"
                                        value={this.state.status}
                                        onChange={this.onChange}

                                >
                                    <option value={true}>Active</option>
                                    <option value={false}>Hide</option>
                                </select>
                                <br />
                                <div className="text-center">
                                    <button type="submit"
                                            className="btn btn-warning"
                                    >Add</button>&nbsp;
                                    <button type="submit"
                                            className="btn btn-danger"
                                            onClick={this.onClear}

                                    >Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>

            </div>
        );
    }
}

export default TaskFrom;
