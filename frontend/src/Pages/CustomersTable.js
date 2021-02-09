import React, {Component} from 'react'
import CustomersTablePaginate from "./CustomersTablePaginate";

class CustomersTable extends Component {
    constructor (props) {
        super(props);
        this.state = {
            customers: null,
            size_per_page:10
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render () {
        return (
            <div className="w-100 p-3 mt-3">
                <div className="form-group bg-white text-dark p-3 d-flex">
                    <label className="col-form-label col-md-2">Results Per Page </label>
                    <select className="form-control col-md-10" value={this.state.size_per_page} name="size_per_page" id="size_per_page" onChange={this.handleInputChange}>
                        {[10,20,40,60].map( (value) => {
                            return <option key={value} value={value}> {value}</option>
                        })}
                    </select>
                </div>
                <table className="table table-bordered table-light table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                    </thead>
                        <CustomersTablePaginate size_per_page={this.state.size_per_page}/>
                </table>
            </div>
        )
    }
}

export default CustomersTable