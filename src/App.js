import React from 'react';
import './App.css';
import TasksPanel from "./components/tasks/TasksPanel.component";
import Message from "./components/general/Message.component";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import store from "./store";
import {Provider} from 'react-redux';

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <Message />
          <TasksPanel/>
        </div>
      </Provider>
  );
}

export default App;
