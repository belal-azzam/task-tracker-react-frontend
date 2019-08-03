
import React from 'react';
import {Card, Col, Modal} from "antd";
import {Draggable} from "react-beautiful-dnd";
import {connect} from "react-redux";
import "../../styles/tasks-panel.css"
import Task from "./Task.component";

class TaskCard extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            showModal: false
        };
        this.openTaskModal= this.openTaskModal.bind(this);
        this.closeTaskModal= this.closeTaskModal.bind(this);
    }

    openTaskModal()
    {
        this.setState({
            ...this.state,
            showModal: true
        })
    }

    closeTaskModal()
    {
        this.setState({
            ...this.state,
            showModal: false
        })
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
                                {this.props.task.content}
                            </Card>
                            </div>

                        );
                    }

                    }

                </Draggable>
                <Modal
                    visible={this.state.showModal}
                    onCancel={this.closeTaskModal}
                    footer={null}

                >
                <Task taskId={this.props.taskId}>

                </Task>
                </Modal>
            </div>

        )
    }
}
function mapStateToProps(state, ownProps) {
    return {
        task: state.tasks.tasks[ownProps.taskId]
    }
}


export default connect(mapStateToProps)(TaskCard);