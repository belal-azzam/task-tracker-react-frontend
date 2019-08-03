import React from 'react';
import {Col, Row} from "antd";
import TaskCard from "./TaskCard.component";
import {Droppable} from "react-beautiful-dnd";
import "../../styles/tasks-panel.css"
import {connect} from "react-redux";

class TasksColumn extends React.Component {
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div className="tasks-column" >
                <div>
                    <div>
                        <h1 style={{textAlign: "center"}}>
                            {this.props.column}
                        </h1>
                    </div>
                </div>

                <Droppable
                    droppableId={this.props.column}
                    // type={this.props.column}
                >
                    {(provided, snapshot) => (
                        <div
                            className="tasks-container"
                            ref={provided.innerRef}
                            innerRef={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.taskIds.map((task, index) => {
                                return <TaskCard key={index} index={index} taskId={task}/>
                            })}
                            {provided.placeholder}
                        </div>

                    )}

                </Droppable>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        taskIds: state.tasks.columns[ownProps.column].taskIds
    }
}


export default connect(mapStateToProps)(TasksColumn);