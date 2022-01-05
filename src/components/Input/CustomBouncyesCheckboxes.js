import React, { Component } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default class CustomBouncyesCheckboxes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        };
    }
    toggleChange() {
        this.setState({ checked: !this.state.checked });
        console.log(this.state);
    }
    render() {
        return (
            <React.Fragment>
                <BouncyCheckbox
                    size={25}
                    style={{ marginTop: 8 }}
                    fillColor="#000"
                    unfillColor="#FFFFFF"
                    text={this.props.text}
                    iconStyle={{ borderColor: Colors.white }}
                    textStyle={{ color: Colors.white }}
                    isChecked={this.state.checked}
                    onPress={() => this.toggleChange(this)}
                />
            </React.Fragment>
        );
    }
}