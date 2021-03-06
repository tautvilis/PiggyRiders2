﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditExpensesInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            category: '',
            spent: '',
            limit: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async getExpense() {
        let expenseId = this.props.match.params.id;
        const data = await fetch(`https://localhost:44312/api/ExpensesManagerInformations/${expenseId}`);
        const response = await data.json();
        this.setState({
            id: response.id,
            category: response.category,
            spent: response.spent,
            limit: response.limit
        }, () => {
                
        });
    }

    componentWillMount() {
        this.getExpense();
    }

    onSubmit(e) {
        const newLimit = {
            category: this.refs.category.value,
            spent: (this.refs.spent.value == "") ? null : this.refs.spent.value,
            limit: (this.refs.limit.value == "") ? null : this.refs.limit.value     
                }
        e.preventDefault();
        if (this.handleValidation(newLimit)) {
            this.editLimit(newLimit);
        }
    }
    handleValidation(newLimit) {
        var formIsValid = true;
        if (!newLimit.category) {
            formIsValid = false;
            alert("Category field cannot be empty!");
            return formIsValid;
        }
        else return formIsValid;
    }

    editLimit(newLimit) {
        fetch(`https://localhost:44312/api/ExpensesManagerInformations/${this.state.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ID: this.state.id,
                Category: newLimit.category,
                Spent: newLimit.spent,
                Limit: newLimit.limit,
                uID: 1
            })
        }).then(response => {
            this.props.history.push('/ExpensesManagerInformations')
        })
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <br />
                <Link to='/ExpensesManagerInformations'>Back</Link>
                <br />
                <h1>Edit Limit</h1>

                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="imput-field">
                        <label htmlFor="category">Category</label>
                        <input type="text" name="category" ref="category" value={this.state.category} onChange={this.handleInputChange} />                    
                    </div>
                    <div className="imput-field">
                        <label htmlFor="spent">Spent</label>
                        <input type="number" name="spent" ref="spent" value={this.state.spent} onChange={this.handleInputChange} />                       
                    </div>
                    <div className="imput-field">
                        <label htmlFor="limit">Limit</label>
                        <input type="number" name="limit" ref="limit" value={this.state.limit} onChange={this.handleInputChange} />                       
                    </div>
                    <input type="submit" value="Save" className="btn" />
                </form>

            </div>
        )
    }

}
export default EditExpensesInfo;