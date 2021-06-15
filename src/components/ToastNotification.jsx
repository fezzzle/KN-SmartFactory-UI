import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Toast from 'react-bootstrap/Toast';
  
export default function ToastNotification(props) {
  return (
    <div style={{ display: 'block',
                  width: 700, 
                  padding: 30 }}>
      <h4>React-Bootstrap Toast Component</h4>
      <Toast>
        <Toast.Header>
          <strong className="mr-auto">
             Business Unit Deleted {props.details.name}
          </strong>
          <small>
             Last Seen: 1 hour ago 
          </small>
        </Toast.Header>
        <Toast.Body>
             Greetings from GeeksforGeeks
        </Toast.Body>
      </Toast>
    </div>
  );
}