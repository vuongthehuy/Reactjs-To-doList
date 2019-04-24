import React from 'react';
import Children from './Children';

export default class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parent: 0,
            dataFromChildren: 0
        };
        this.buttonParent = this.buttonParent.bind(this);
    }

    buttonParent() {
        this.setState({
            parent: this.state.parent + 1
        })
    }

    getHandleButtonChildrenClick (children) {
        this.setState({
            dataFromChildren: children
        })
    }

    render() {
        return (
            <div className="parent">
                <p>Data parent: {this.state.parent}</p>
                <p>Data from children: {this.state.dataFromChildren}</p>
                <button type="button" onClick={this.buttonParent}>Parent sends to Children</button>
                <Children
                    parent={this.state.parent}
                    handleButtonChildrenClick={(children) => this.getHandleButtonChildrenClick(children)}
                />
            </div>
        )
    }
}