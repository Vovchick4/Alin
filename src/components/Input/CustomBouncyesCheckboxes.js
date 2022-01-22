import React, { Component } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default class CustomBouncyesCheckboxes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // checked: false,
            services: this.props.additionalServices,
            arrayBounces: []
        };
    }

    componentDidMount() {
        let Temp = this.state.services
        let newData = []
        for (let i = 0; i < Temp.length; i++) {
            newData.push(
                {
                    ...Temp[i],
                    checked: false
                }
            )
        }
        this.setState({ arrayBounces: newData })
    }

    toggleChange(id) {
        // this.setState({ checked: !this.state.checked });
        const arrayBounces = this.state.arrayBounces
        const i = arrayBounces.findIndex(i => i.id === id)
        arrayBounces[i].checked = !arrayBounces[i].checked
        this.setState(arrayBounces)

        let checked = this.state.arrayBounces.map(item => item.checked)
        let result = []
        for (let i = 0; i < checked.length; i++) {
            if (checked[i]) {
                result.push(arrayBounces[i])
            }
        }
        this.props.setIsService(result)
        // this.state.arrayBounces.push(this.props.text)
        // console.log(this.state.arrayBounces);
        // if (!this.state.checked) {
        //     this.props.setState(this.props.text)
        // } else {
        //     this.props.setState(null)
        // }
    }
    render() {
        return (
            <React.Fragment>
                {this.state.services && this.state.services.map((item) => (
                    <BouncyCheckbox
                        key={item.id}
                        size={25}
                        style={{ marginTop: 8 }}
                        fillColor="#000"
                        unfillColor="#FFFFFF"
                        text={item.attributes.name}
                        iconStyle={{ borderColor: Colors.white }}
                        textStyle={{ color: Colors.white }}
                        onPress={() => this.toggleChange(item.id)}
                    />
                ))}
            </React.Fragment>
        );
    }
}