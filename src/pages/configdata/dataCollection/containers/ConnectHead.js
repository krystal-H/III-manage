import { connect } from "react-redux";
import {
  switchMenu,
  getListForEvent,
  openAddModalForAPP,
  openAddModalForEvent
} from "../store/action";
import Head from "../components/Head";

const mapStateToProps = (state, ownProps) => {
  const { menuList, menuName, isLoadListForEvent } = state.get(
    "dataCollection"
  );
  return { menuList, menuName, isLoadListForEvent };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  switchMenu: menuName => dispatch(switchMenu(menuName)),
  getListForEvent: () => dispatch(getListForEvent()),
  openAddModalForAPP: () => dispatch(openAddModalForAPP()),
  openAddModalForEvent: () => dispatch(openAddModalForEvent())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Head);
