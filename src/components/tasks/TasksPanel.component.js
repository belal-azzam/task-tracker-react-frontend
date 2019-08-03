import React from 'react';
import {Row, Col, Card} from 'antd';
import "../../styles/tasks-panel.css"
import TasksColumn from "./TasksColumn.component";
import {DragDropContext} from "react-beautiful-dnd";
import { connect } from "react-redux";
import {moveTask} from "../../state/tasks/actions";
class TasksPanel extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = props.tasks;
        this.updateTask = this.updateTask.bind(this);
    }

    updateTask(result)
    {
        console.log(result);
        console.log(this.props);
        this.props.moveTask(result);
        // document.body.style.color = 'inherit';


    }


    render()
    {
        const data = this.state;

        return(
            <div>
                <DragDropContext
                    onDragEnd={(result) => this.updateTask(result)}
                >
                <div className="task-columns-container">
                    {data.columnOrder.map((column) => {

                        return <TasksColumn key={column} column={column}/>
                    })}
                </div>
                </DragDropContext>
            </div>
        )
    }
}
const mapStateToProps = state => (
    {
        tasks: state.tasks
    }
)
export default connect(mapStateToProps, {moveTask})(TasksPanel);