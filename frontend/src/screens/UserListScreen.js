import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userAction";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
const UserListScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			navigate("/login");
		}
	}, [dispatch, userInfo, navigate, successDelete]);
	const deleteHandler = (id) => {
		// console.log(id);
		if (window.confirm("Are you sure")) {
			dispatch(deleteUser(id));
		}
	};
	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table className="table-sm" hover responsive bordered striped>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>

					<tbody>
						{users &&
							users.map((user) => (
								<tr key={user._id}>
									<td>{user._id}</td>
									<td>{user.name}</td>
									<td>
										<a href={`mailto:${user.email}`}> {user.email}</a>
									</td>
									<td>
										{user.isAdmin ? (
											<i
												className="fas fa-check"
												style={{ color: "green" }}
											></i>
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/admin/user/${user._id}/edit`}>
											<Button variant="light" className="btn-sm">
												<i className="fas fa-edit"></i>
											</Button>
										</LinkContainer>
										<Button
											variant="danger"
											className="btn-sm"
											onClick={() => deleteHandler(user._id)}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListScreen;