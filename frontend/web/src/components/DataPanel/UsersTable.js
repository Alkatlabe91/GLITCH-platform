function UsersTable(props = { users: [] }) {
  return (
    <div className="overflow-x-auto" style={{ overflow: "scroll" }}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              First Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Last Name
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              User Name
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Registration Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.users.map((user, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex" style={{justifyContent: 'space-between' , alignItems:"center"}}>
                  <img
                    src={
                      user.profile_picture
                        ? `${URL}/users/load-picture/${user.profile_picture}`
                        : "/default-profile-pic.jpg"
                    }
                    alt="Profile"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  {user.first_name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.last_name}</td>

              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>

              <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>

              <td className="px-6 py-4 whitespace-nowrap">
                {user.registration_date}
              </td>

              {/* <td className="px-6 py-4 whitespace-nowrap">
                    {!progressItem.reviwed_by ? (
                      <></>
                    ) : (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className={`px-4 py-2 rounded ${
                          progressItem.passed
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {progressItem.passed ? "Passed" : "Failed"}
                      </div>
                    )}
                  </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default UsersTable;
