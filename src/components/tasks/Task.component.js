import React from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import {addTask, updateTask} from "../../state/tasks/actions";
import {Link} from "react-router-dom";
class Task extends React.Component{

    constructor(props)
    {
        super(props);
        this.saveTask = this.saveTask.bind(this);
        this.state = {
            task: props.task
        }
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.task.id !== this.state.task.id) {
            this.setState({ task: nextProps.task });
        }
    }

    saveTask(evt){
        evt.preventDefault();
        if(this.state.task.id)
        {
            this.props.updateTask(this.state.task.id,this.state.task);
        }else{
            this.props.addTask(this.state.task);
        }
    }

    updateState(evt){
        this.setState({
            ...this.state,
            task: {
                ...this.state.task,
                [evt.target.id]: evt.target.value
            }
        })

    }

    render(){
        const task = this.state.task;
        return (
            <div>
                <h4></h4>
                <hr/>
                <form onChange={(evt) => this.updateState(evt)} name='form'  onSubmit={(evt) => this.saveTask(evt)}>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="title">Title</label>
                            <input  required value={this.state.task.title} type="text" className="form-control" id="title" placeholder="Title" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="description">Description</label>
                            <textarea  value={this.state.task.description} name='description' className="form-control" id="description" rows="6"></textarea>
                        </div>
                    </div>

                    <div className="form-row">

                        <div className="form-group col-md-6">
                            <label htmlFor="status_id">Status</label>
                            <select required value={this.state.task.status_id} id="status_id" name="status_id" className="form-control">
                                {Object.keys(this.props.statuses).map(statusId => {
                                    return <option key={statusId} value={this.props.statuses[statusId].id}>{this.props.statuses[statusId].name}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="assigned_user_id">Assignee</label>
                            <select required onChange={(evt) => this.updateState(evt)}  value={this.state.task.assigned_user_id} id="assigned_user_id" name="assigned_user_id" className="form-control">
                                <option value="">Select Assignee</option>
                                {Object.keys(this.props.users).map(userId => {
                                    return <option key={userId} value={this.props.users[userId].id}>{this.props.users[userId].username}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="type_id">Type</label>
                            <select  required value={this.state.task.type_id} id="type_id" name="type_id" className="form-control">
                                {Object.keys(this.props.types).map(typeId => {
                                    return <option key={typeId} value={this.props.types[typeId].id}>{this.props.types[typeId].name}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="task_id">Parent</label>
                            <select  value={this.state.task.task_id} id="task_id" name="task_id" className="form-control">
                                <option value="0"></option>
                                {Object.keys(this.props.tasks).map(taskId => {
                                    if(taskId == task.id)
                                    {
                                        return null;
                                    }
                                    return <option key={taskId} value={this.props.tasks[taskId].id}>{this.props.tasks[taskId].title}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="time_estimate">Time Estimate</label>
                            <input  value={this.state.task.time_estimate}  name="time_estimate" type="number" className="form-control" id="time_estimate"  />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="actual_time">Actual Time</label>
                            <input    value={this.state.task.actual_time} name="actual_time" type="number" className="form-control" id="actual_time"  />
                        </div>

                    </div>
                    <div className="text-right">
                    <button type="submit" className="btn pull-right btn-primary">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}
const mapSstateToProps = (state, props) => {

    let task = {
        title: '',
        description: '',
        status_id: state.tasks.statuses[Object.keys(state.tasks.statuses)[0]].id,
        type_id: state.tasks.types[Object.keys(state.tasks.types)[0]].id,
        task_id: null,
        time_estimate: null,
        actual_time: null,
        assigned_user_id: null,

    };
    if(props.taskId)
    {
        task =  state.tasks.tasks[props.taskId];
    }else{

    }
    return {
        task: task,
        tasks: state.tasks.tasks,
        statuses: state.tasks.statuses,
        types: state.tasks.types,
        users: state.users.users,
    }

}
export default connect(mapSstateToProps,{updateTask, addTask})(Task);