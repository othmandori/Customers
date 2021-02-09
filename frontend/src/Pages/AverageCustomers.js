import React, {Component} from 'react'
import axios from "axios";

class AverageCustomers extends Component {
    constructor (props) {
        super(props);
        this.state = {
            average_type: "",
            average_result: 0,
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.getCustomersData(e.target.value)
    };

     getCustomersData(average_type) {
         if (average_type) {
             axios.get(`/customers/average?average_type=${average_type}`)
                 .then(res => this.setState({average_result: res.data}))
                 .catch(e =>  console.log(e.response.data.errors));
         }
    }

    render () {
        return (
            <div className="w-100 p-3 mt-3">
                <div className="form-group bg-white text-dark p-3 d-flex">
                    <label className="col-form-label col-md-2">Average Of Last </label>
                    <select className="form-control col-md-8" value={this.state.average_type} name="average_type" id="average_type" onChange={this.handleInputChange}>
                        <option value=""> Please Select </option>
                        <option value="24-hours"> 24 Hours </option>
                        <option value="week"> Week </option>
                        <option value="month"> Month </option>
                        <option value="3-months"> 3 Months </option>
                        <option value="1-year"> 1 Year </option>
                    </select>
                    <span className="pl-3">{this.state.average_result}</span>
                </div>
            </div>
        )
    }
}

export default AverageCustomers