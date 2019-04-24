import React, { Component } from 'react';
import TaskItem from "./TaskItem";

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state={
            filterName:'',
            filterStatus: -1 //all=-1 ac=1 hide=0
        }
    }
    onChang_e=(event)=>{
        var target =event.target;
        var name =target.name;
        var value =target.value;
        this.props.onFilter(name === 'filterName' ? value : this.state.filterName,
                            name === 'filterStatus' ? value : this.state.filterStatus,
                            );
        this.setState(
            {
                [name]: value
            }
        )
    }
    render() {
        var {tasks} = this.props;
        var elem = tasks.map((task, index) =>{
            return <TaskItem
                key={index}
                index={index}
                task={task}
                onUpDateStatus= {this.props.onUpDateStatus}
                onDelete = {this.props.onDelete}
                onUpdate = {this.props.onUpdate}

            />
        });
        return (
                <div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Active</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td />
                                <td>
                                    <input type="text" 
                                    className="form-control"
                                    name="filterName"
                                    value={this.state.filterName}
                                    onChange={this.onChang_e}
                                    />
                                </td>
                                <td>
                                    <select className="form-control"
                                    name="filterStatus"
                                    value={this.state.filterStatus}
                                    onChange={this.onChang_e}
                                    >
                                        <option value={-1}>All</option>
                                        <option value={0}>Hide</option>
                                        <option value={1}>Active</option>
                                    </select>
                                </td>
                                <td />
                            </tr>
                            { elem }
                            </tbody>
                        </table>
                    </div>
                </div>
        );
    }
}

export default TaskList;
