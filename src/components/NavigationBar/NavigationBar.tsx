import { Fragment } from "react";
import { withRouter } from "react-router-dom";

import NavigationButton from "./NavigationButton";
import useTokens from "../../utils/useTokens";

function NavigationBar({ history }: { history: any }) {
  const { isLoggedIn } = useTokens();

  return (
    <div className="navigation-bar flex flex-row justify-between bg-gray-600 text-gray-100 py-2 px-5 md:px-7 lg:px-10">
      <NavigationButton name="메인" onClick={() => history.push("/")} />
      <NavigationButton name="QR 인식" onClick={() => history.push("/qr")} />
      {!isLoggedIn ? (
        <NavigationButton name="로그인" onClick={() => history.push("/login")} />
      ) : (
        <Fragment>
          <NavigationButton name="프로필" onClick={() => history.push("/profile")} />
          <NavigationButton name="알림" onClick={() => history.push("/alerts")} />
          <div className="hidden md:inline">
            <NavigationButton
              name="로그아웃"
              onClick={() => {
                localStorage.clear();
                alert("로그아웃 되었습니다.");
                history.push("/");
                window.location.reload();
              }}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default withRouter(NavigationBar);
