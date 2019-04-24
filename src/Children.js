import React from 'react';

export default class Children extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: 0,
        }
        this.buttonChildren = this.buttonChildren.bind(this);
    }

    buttonChildren () {
        this.setState({
            children: this.state.children + 1,
        });
        this.props.handleButtonChildrenClick(this.state.children);
    }

    render() {
        const { parent } = this.props;
        return (
            <div className="children">
                <p>Data from parent: {parent}</p>
                <p>Data Children: {this.state.children}</p>
                <button type="button" onClick={this.buttonChildren}>Children sends to Parent</button>
            </div>
        )
    }
}