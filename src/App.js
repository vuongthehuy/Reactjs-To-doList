import React, { Component } from 'react';
import './App.css';
import TaskFrom from './component/TaskForm';
import Control from './component/Control'
import TaskList from "./component/TaskList";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyword:''
        }
    }
    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState(
                {
                    tasks: tasks
                }
            );

        }
    }
    onSubmit = (data) => {
        var tasks = this.state.tasks;
        if (data.id === '') {
            data.id = this.generateID();

            tasks.push(data);

        }
        else {
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState(
            {
                tasks: tasks,
                taskEditing: null
            }
        );
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    Id() {
        return Math.floor((1 + Math.random()) * 0x100000).toString(16).substring(1);
    }
    generateID() {
        return this.Id() + this.Id() + this.Id() + this.Id();
    }
    hideAdd = () => {
        if (this.state.isDisplayForm && this.state.taskEditing !== null) {

            this.setState({

                isDisplayForm: true,
                taskEditing: null
            });
        }
        else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing: null
            });
        }
    }
    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        });
    }
    showCloseForm = () => {
        this.setState({
            isDisplayForm: true
        });
    }

    onUpDateStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
       
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;

            this.setState(
                {
                    tasks: tasks
                }
            );
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
    //Xoa objeact
    onDelete = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);

        if (index !== -1) {
            tasks.splice(index, 1);

            this.setState(
                {
                    tasks: tasks
                }
            );
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onCloseForm();
    }
    //Update
    onUpdate = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState(
            {
                taskEditing: taskEditing
            }
        );
        
        this.showCloseForm()

    }

    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;

            }
        });
        return result;
    }
    //tim kiem thinking
    onFilter = (filterName, filterStatus) => {

        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        })
    }
    //tim kiem button search
    onSearch=(keyword)=>{
        this.setState({
            keyword:keyword
        })
      
    }
    render() {
        //console.log(Number(true));
        var tasks = this.state.tasks;
        var { isDisplayForm, taskEditing, filter ,keyword } = this.state; //tasks=this.state.tasks;

        if (filter) {
            if (filter.name) {
                tasks = tasks.filter((task) => {

                    return task.name.toLowerCase().indexOf(filter.name) !== -1;

                });

           
            }
            tasks = tasks.filter((task) => {
                if (filter.status === -1) {
                   
                    return task

                }

                else {
                    return task.status === (filter.status === 1 ? true : false)
                }
                
            });

        }
        if(keyword){
            tasks = tasks.filter((task) => {

                return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;

            });
        }
        var iselem = isDisplayForm ? <TaskFrom onSubmit={this.onSubmit}
            CloseForm={this.onCloseForm}
            task={taskEditing}
        /> : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Workflow Management</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : " "}>

                        {iselem}
                    </div>
                    <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button type="button"
                            className="btn btn-primary fixmargin " onClick={this.hideAdd} >
                            <span className="fa fa-plus mr-5" />Add Work
                        </button>

                        <div className="row mt-15">
                            <Control onSearch={this.onSearch} />

                        </div>
                        <div className="row mt-15">

                            <TaskList tasks={tasks}
                                onUpDateStatus={this.onUpDateStatus}
                                onDelete={this.onDelete}
                                onUpdate={this.onUpdate}
                                onFilter={this.onFilter}
                            />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
