import { useNavigate } from "react-router-dom";

function NavigationHeader(props) {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        {props.navigations.map((nav, index) => {
          return (
            <li
              key={index}
              className={
                nav.current
                  ? "text-white cursor-pointer hover:text-yellow-300 text-yellow-300"
                  : "text-white cursor-pointer hover:text-yellow-300"
              }
              onClick={() => {
                if (nav.current) {
                  return;
                }
                navigate(nav.url, { state: nav.valueToPass });
              }}
            >
              {nav.display}
              {!nav.current && <span>{" >"}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NavigationHeader;
