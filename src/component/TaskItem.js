import React, { Component } from 'react';

class TaskItem extends Component {

    onUpDateStatus = () => {
        
        this.props.onUpDateStatus(this.props.task.id);
    }
    //transmic data to tasklit
    onDelete = () => {

            this.props.onDelete(this.props.task.id);
    }
    onUpdate = () => {

        this.props.onUpdate(this.props.task.id);
    }
    render() {
        var {task, index}=this.props;

        return (

                    <tr>
                        <td>{index +1}</td>
                        <td>{task.name}</td>
                        <td className="text-center">
                        <span className={ task.status === true ? 'label label-success' : 'label label-danger'}
                              onClick={ this.onUpDateStatus }>
                            {task.status === true ? 'Active' : 'Hide' }
                        </span>
                        </td>
                        <td className="text-center">
                            <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
                                <span className="fa fa-pencil mr-5" />Sửa
                            </button>
                            &nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onDelete} >
                                <span className="fa fa-trash mr-5" />Delete
                            </button>
                        </td>
                    </tr>

        );
    }
}

export default TaskItem;
