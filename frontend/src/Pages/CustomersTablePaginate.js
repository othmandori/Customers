import React, {Component, Fragment} from 'react'
import axios from "axios";
import Pagination from "react-js-pagination";

class CustomersTablePaginate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: null,
            size_per_page: this.props.size_per_page
        }
    }

    async componentWillMount() {
        await this.getCustomersData();
    }

    async getCustomersData(page = 1) {
        axios.get(`/customers/list?page=${page}&size_per_page=${this.props.size_per_page}`)
            .then(res => this.setState({customers: res.data}))
            .catch(e => this.setState({errors: e.response.data.errors}));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.size_per_page !== this.props.size_per_page){
            this.getCustomersData(1);
        }
    }


    renderCustomers() {
        const {data, current_page, total} = this.state.customers;
        return (
            <Fragment >
                <tbody>
                {data.map((customer) => {
                    return (
                        <tr key={customer.id}>
                            <td key={`first_name_${customer.id}`}>{customer.first_name}</td>
                            <td key={`email_${customer.id}`}>{customer.email}</td>
                            <td key={`phone_number_${customer.id}`}>{customer.phone_number}</td>
                        </tr>
                    )
                })}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="3">
                        <Pagination
                            activePage={current_page}
                            itemsCountPerPage={parseInt(this.props.size_per_page)}
                            totalItemsCount={total}
                            pageRangeDisplayed={5}
                            onChange={(page) => this.getCustomersData(page)}
                            itemClass="page-item"
                            linkClass="page-link"
                            firstPageText="First"
                            lastPageText="Last"
                        />
                    </td>
                </tr>
                </tfoot>
            </Fragment>
        );
    }


    render() {
        return (
            <Fragment>
                { this.state.customers != null ? this.renderCustomers() : null}
            </Fragment>
        )
    };
}

export default CustomersTablePaginate