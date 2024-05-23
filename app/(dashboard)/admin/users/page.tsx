import React from "react";
import { UsersList } from "../../_components/users-table";

const AllUsersListPage = () => {
  return (
    <div className="bg-white p-4 h-full">
      <h1 className="text-lg my-3">Users List</h1>
      <p className="mb-3">
        This is the page where you can see all the users and their details.
      </p>
      <div>
        <UsersList />
      </div>
    </div>
  );
};

export default AllUsersListPage;
