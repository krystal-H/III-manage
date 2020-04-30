import { connect } from "react-redux";
import Content from "../components/Content";

const mapStateToProps = (state, ownProps) => {
  const { menuName } = state.get("dataCollection");
  return { menuName };
};

export default connect(mapStateToProps)(Content);
