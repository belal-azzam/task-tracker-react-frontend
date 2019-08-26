
import React from 'react';
import {Card, Col, Modal} from "antd";
import {Draggable} from "react-beautiful-dnd";
import {connect} from "react-redux";
import "../../styles/tasks-panel.css"
import Task from "./Task.component";
import {showTaskModal} from "../../state/tasks/actions";

class TaskCard extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            showModal: false
        };
        this.openTaskModal= this.openTaskModal.bind(this);
    }

    openTaskModal()
    {
       this.props.showTaskModal(this.props.task.id);
    }


    render()
    {
        return (
            <div className="task-parent">
                <Draggable
                    draggableId={this.props.task.id}
                    index={this.props.index}
                >
                    { (provided, snapshot) =>
                    {
                        return (
                            <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                innerRef={provided.innerRef}
                            >
                            <Card
                                onClick={this.openTaskModal}
                                >
                                <strong>{this.props.task.title}</strong>
                            </Card>
                            </div>

                        );
                    }

                    }

                </Draggable>

            </div>

        )
    }
}
function mapStateToProps(state, ownProps) {
    return {
        task: state.tasks.tasks[ownProps.taskId]
    }
}


export default connect(mapStateToProps, {showTaskModal})(TaskCard);