import React from 'react';
import { Icon} from 'antd';
import "../../styles/tasks-panel.css"
import TasksColumn from "./TasksColumn.component";
import {DragDropContext} from "react-beautiful-dnd";
import { connect } from "react-redux";
import {getTasks, moveTask, showTaskModal, updateTaskStatus} from "../../state/tasks/actions";
import TaskModal from './TaskModal.component';
import {getUsers} from "../../state/users/actions";
class TasksPanel extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = props.tasks;
        this.updateTask = this.updateTask.bind(this);
        this.showTaskModal = this.showTaskModal.bind(this);
    }

    updateTask(result)
    {
        this.props.updateTaskStatus(result);
    }

    showTaskModal()
    {
        this.props.showTaskModal();
    }

    componentDidMount()
    {
        this.props.getTasks();
        this.props.getUsers();
    }

    render()
    {
        const data = this.props.tasks;
        return(
            <div id="tasks-panel">
                <Icon onClick={this.showTaskModal} className="addTask" type="plus-circle" />
                <DragDropContext
                    onDragEnd={(result) => this.updateTask(result)}
                >
                <div className="task-columns-container">
                    {data.status_order.map((status) => {

                        return <TasksColumn key={status} status={status}/>
                    })}
                </div>
                </DragDropContext>
                <TaskModal/>
            </div>
        )
    }
}
const mapStateToProps = state => (
    {
        tasks: state.tasks
    }
)
export default connect(mapStateToProps, {getUsers, showTaskModal,updateTaskStatus, getTasks})(TasksPanel);