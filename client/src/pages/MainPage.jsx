import { useSelector } from "react-redux";

const MainPage = () => {
  const component = useSelector((state) => state.component.component);
  return component;
};

export default MainPage;
