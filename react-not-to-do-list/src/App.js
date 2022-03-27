import React, { useEffect } from "react";

import { Container, Row, Col, Alert, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { AddForm } from "./components/form/AddForm";
import "./App.css";
import { TaskLists } from "./components/taskList/TaskLists";
import { deleteTask } from "./components/taskList/taskAction";
import { NoToDoList } from "./components/taskList/NoToDoList";

import { fetchTaskLists } from "./components/taskList/taskAction.js";

const App = () => {
  const dispatch = useDispatch();
  const { isPending, message, status, totalHrs, itemToDelete } = useSelector(
    (state) => {
      return state.task;
    }
  );

  useEffect(() => {
    dispatch(fetchTaskLists());
  }, [dispatch]);

  return (
    <div className="main">
      <Container>
        <Row>
          <Col>
            <div className="text-center mt-5">
              <h1>Not To Do List</h1>
            </div>
          </Col>
        </Row>
        <hr />

        <div>
          {message && (
            <Alert variant={status === "success" ? "success" : "danger"}>
              {message}
            </Alert>
          )}

          {isPending && <Spinner variant="primary" animation="border" />}
        </div>

        <AddForm />
        <hr />
        {/* list items */}
        <Row>
          <Col>
            <TaskLists />
          </Col>
          <Col>
            <NoToDoList />
          </Col>
        </Row>
        <Alert variant="primary">
          Your total allocated time = {totalHrs} / 168 hours
        </Alert>
        <hr />
        <Button
          onClick={() => {
            dispatch(deleteTask(itemToDelete));
          }}
        >
          DELETE
        </Button>
      </Container>
    </div>
  );
};

export default App;
