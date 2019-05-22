import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MySiderPre from './SiderMenu';
import appActions from '../../../../redux/redux_app';
import { MenuToRouter } from '../../../../conf';
import util from '../../../../util/util';

const { updateModule } = appActions.actions;

class MySider extends React.PureComponent {
  state = {
    openKeys: [],
    selectedKey: '',
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  initMenu = (pathname) => {
    // console.log('调用initMenu+++++');
    let name = Object.keys(MenuToRouter).find(
      (key) => MenuToRouter[key] === pathname,
    );
    // console.log('Sider+的+initMenu', name);
    if (name) {
      let parentKeys = util
        .getParentMenusByName(this.props.openAccessMenu, name)
        .map((item) => {
          return item.name;
        });
      // console.log('Sider+的+initMenu的parentKeys当前menu组件的key', parentKeys);
      if (parentKeys.length > 0) {
        let currentModule = parentKeys[0];
        // console.log('Sider+的+initMenu的当前模块currentModule', currentModule);

        let accessMenu = this.props.accessMenu;
        let moduleList = accessMenu.filter((item) => {
          return item.leftMenu && item.name === currentModule;
        });
        // console.log('Sider+的+initMenu的当前模块moduleList', moduleList);
        if (moduleList.length > 0) {
          let moduleMenu = moduleList[0].children;
          // console.log('Sider+的+initMenu的模块菜单moduleMenu', moduleMenu);
          this.props.updateModule({
            currentModule,
            moduleMenu,
          });
        }
      }
      if (!this.props.collapsed) {
        // 菜单收缩状态，回退或前进显示菜单 BUG
        this.setState({
          openKeys: parentKeys,
        });
      }

      this.setState({
        selectedKey: name,
      });
    }
  };

  setOpenKeys = (collapsed) => {
    if (!collapsed) {
      this.setState({
        openKeys: [],
      });
    }
  };

  // menuClick = (e) => {
  //   this.setState({
  //     selectedKey: e.key,
  //   });
  // }; // 不需要点击事件,切换路由的时候会触发initMenu,选中相应菜单

  openMenu = (v) => {
    console.log('sider按钮展开的回调函数', v);
    let parentKeys = util
      .getParentMenusByName(this.props.openAccessMenu, v[v.length - 1])
      .map((item) => {
        return item.name;
      });
    this.setState({
      openKeys: parentKeys,
    });
  };

  render() {
    console.log('MySiderContainer render');
    return (
      <MySiderPre
        responsive={this.props.responsive}
        collapsed={this.props.collapsed}
        menus={this.props.menus}
        openMenu={this.openMenu}
        selectedKey={this.state.selectedKey}
        openKeys={this.state.openKeys}
      />
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('Sider 组件的 根包装组件', state);
  return {
    menus: state.app.moduleMenu,
    openAccessMenu: state.app.openAccessMenu,
    accessMenu: state.app.accessMenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateModule: (module) => {
      dispatch(updateModule(module));
    },
  };
};

MySider.propTypes = {
  onRef: PropTypes.func.isRequired,
  responsive: PropTypes.bool.isRequired,
  collapsed: PropTypes.bool.isRequired,
  menus: PropTypes.array.isRequired,
  openAccessMenu: PropTypes.array.isRequired,
  accessMenu: PropTypes.array.isRequired,
  updateModule: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MySider);