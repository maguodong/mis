import React, {Component} from 'react'

class Node extends Component {
	// 构造
	constructor(props) {
		super(props);
		// 初始状态
		this.state = {};
	}

	render() {
		return (
			<div style={{height:"2000px"}}>this item</div>
		)
	}
}

export default Node;