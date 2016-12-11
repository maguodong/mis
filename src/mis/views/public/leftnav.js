import React, { Component } from 'react'
import {
	Link,
	Router,
	Route,
} from 'react-router'
import Redux from '../public/appConfigReduxHigherFunction'
import {
	Row,
	Col,
	Button,
	Rate,
	Menu,
	Breadcrumb,
	Icon,
} from 'antd';

const SubMenu = Menu.SubMenu;

@Redux
class Node extends Component {
	// 构造
	constructor(props) {
		super(props);
		// 初始状态
		this.current = [];
		this.state = {
			openKeys: '1',
		};

		const { appConfigReducer } = props;
		const { menu } = appConfigReducer;
		const router = window.location.pathname;
		menu.admin.navList.map((v, k) => {
			if (v.submenu == undefined) {
				if (v.path == router) {
					this.current.push(k+'');
				}
			}
		});
	}

	componentWillMount() {
		const { appConfigReducer } = this.props;
		const { menu } = appConfigReducer;
		const router = window.location.pathname;
		menu.admin.navList.map((v, k) => {
			if (v.submenu == undefined) {
				if (v.path == router) {
					this.current.push(k+'');
				}
			}else{
				{v.submenu && v.submenu.map((vv,kk)=>{
					if (vv.path == router) {
						this.current.push(k + '-' + kk);
					}
				})}
			}
		});
	}


	render() {
		const { appConfigReducer } = this.props;
		return (

			<Menu mode="inline"
			      defaultOpenKeys={[this.state.openKeys]}
			      defaultSelectedKeys={this.current}>
				{appConfigReducer.menu.admin.navList.map((v, k) => {
					if (v.submenu == undefined) {
						return (
							<Menu.Item key={k}><Link to={`${window.appName}${v.path}`}><Icon type={v.icon}/>{v.name}
							</Link></Menu.Item>
						)
					} else {
						return (
							<SubMenu key={k} title={<span><Icon type={v.icon}/><span>{v.name}</span></span>}>

								{v.submenu && v.submenu.map((vv, kk) => {
									return (
										<Menu.Item key={k + '-' + kk}><Link
											to={`${window.appName}${vv.path}`}>{vv.name}</Link></Menu.Item>
									)
								})}
							</SubMenu>
						)
					}
				})}

			</Menu>
		)
	}
}

export default Node;
