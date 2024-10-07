function DominesTable(props = { domaines: [] }) {
    console.log({ props });
  
    return (
      <div className="overflow-x-auto" style={{ overflow: "scroll" }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
             
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Id
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
  
           
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {props.domaines.map((domain, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {domain.domain_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {domain.domain_name}
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
  export default DominesTable;
  