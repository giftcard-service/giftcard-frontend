import { withRouter } from "react-router-dom";

const NavigationButton = ({ name, onClick }: { name: string; onClick?: () => void }) => {
  return (
    <div className="cursor-pointer hover:font-bold hover:text-green-600" onClick={onClick}>
      {name}
    </div>
  );
};

function NavigationBar({ history }: { history: any }) {
  return (
    <div className="navigation-bar flex flex-row justify-between bg-gray-600 text-gray-100 px-5 py-2 md:px-7 lg:px-10">
      <NavigationButton name="Giftcard" onClick={() => history.push("/")} />
      <NavigationButton name="Dashboard" onClick={() => history.push("/dashboard")} />
      <NavigationButton name="Login" onClick={() => history.push("/login")} />
      <NavigationButton name="Preferences" onClick={() => history.push("/preferences")} />
    </div>
  );
}

export default withRouter(NavigationBar);
