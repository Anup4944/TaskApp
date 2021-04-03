import React from "react";
import {  Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { taskSwitch } from "./taskAction.js";
import { setItemToDelete } from "./taskSlice.js";

export const TaskLists = () => {
	const{taskLists, itemToDelete} = useSelector(state =>state.task);
	const dispatch = useDispatch()

	return (
		<>
			<h2>Task Lists</h2>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Task</th>
						<th>Hours</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{taskLists.map((row, i) => (
						<tr key={i}>
							<td>
								<input
									type="checkbox"
									defaultValue={row._id}
									onChange={e => {dispatch(setItemToDelete(e.target))}}
									checked={itemToDelete.includes(row._id)}
								/>{" "}
								<label>{row?.title}</label>
							</td>

							<td>{row?.hr}</td>
							<td>
							<Button onClick={() =>dispatch(taskSwitch({_id:row._id, todo:false}))}>
									Mark As Not To
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};
