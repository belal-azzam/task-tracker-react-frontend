
import React from 'react';
import {connect} from 'react-redux';
import {Alert} from 'antd';
import {removeMessage} from "../../state/general/actions";
class Message extends React.Component {
    constructor(props)
    {
        super(props)
    }

    componentDidUpdate()
    {
        console.log(this.props.message.message);
        if(this.props.message.message != "" && typeof this.props.message.message != 'undefined')
        {
            const $this = this;
            setTimeout(() => {
                $this.props.removeMessage();
            }, 3000)
        }
    }

    render()
    {
        const message = this.props.message.message;
        const messageType = this.props.message.type;
        return (
            <div className="message-container">
                {message  ? <Alert message={message} type={messageType} /> : ""}
            </div>

        )
    }
}
function mapStateToProps(state, ownProps) {
    return {
        message: state.general.message
    }
}


export default connect(mapStateToProps, {removeMessage})(Message);