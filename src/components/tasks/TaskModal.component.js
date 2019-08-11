import React from 'react';
import {connect} from 'react-redux';
import {Modal} from "antd";
import Task from "./Task.component";
import {hideTaskModal} from "../../state/tasks/actions";

class TaskModal extends React.Component{

    constructor(props)
    {
        super(props);

    }



    render()
    {
        return (
            <Modal
                visible={this.props.task_modal.isShown}
                onCancel={this.props.hideTaskModal}
                footer={null}

            >
                <Task taskId={this.props.task_modal.taskId}>
                </Task>
            </Modal>
        )
    }
}

const mapStateToProps = (state) =>
{
    return {
        task_modal: state.tasks.task_modal
    }
}

export default connect(mapStateToProps, {hideTaskModal})(TaskModal);