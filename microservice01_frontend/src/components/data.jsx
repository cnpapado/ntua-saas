import React, {Component} from 'react';
import Navbar from "./navbar";
import Dropdowns from "./dropdowns";
import Chart from "./chart";
import { UserAuth } from '../context/AuthContext';

class Data extends Component {
    
	state = {
        dd_shown_id: 1,
        email: "johndoe@gmail.com",
        cty: "?",
        ctyTo: "??",
        ctyList: ["CTY_1", "CTY_2", "CTY_3"],
		dateFrom: '01/01/2010'
        //TODO: notify Chart to show noChart: noChart={this.state.cty === this.state.ctyTo}
    }
    componentDidMount() {
        const newState = {...this.state}
        const ctyListFetched = ["CDM_CTY_1", "CDM_CTY_2", "CDM_CTY_3"]
        newState.ctyList = ctyListFetched;
        this.setState(newState);
	
	}
	//WIP - remove duplicate code and add into function
    handleQuantityChange = (obj) => {
        //console.log(obj.target.value);
        const newState = {...this.state}
        newState.dd_shown_id = parseInt(obj.target.value);
        this.setState(newState);
		const requestOptions = {
			method: 'GET',
			headers: { 'Quantity': newState.dd_shown_id,
			            'CountryFrom': newState.cty,
						'CountryTo': newState.ctyTo,
						'DateFrom':  newState.dateFrom},
			
			};
			fetch('https://reqres.in/api/posts', requestOptions)
				.then(response => response.json())
				.then(data => {this.setState({ postId: data.id });console.log(requestOptions)});
    }
    handleCtyChange = (obj) => {
        const newState = {...this.state}
        newState.cty = obj.target.value;
        this.setState(newState);
		const requestOptions = {
			method: 'GET',
			headers: { 'Quantity': newState.dd_shown_id,
			            'CountryFrom': newState.cty,
						'CountryTo': newState.ctyTo,
						'DateFrom':  newState.dateFrom},
			
			};
			fetch('https://reqres.in/api/posts', requestOptions)
				.then(response => response.json())
				.then(data => {this.setState({ postId: data.id });console.log(requestOptions)});
    }
    handleCtyToChange = (obj) => {
        const newState = {...this.state}
        newState.ctyTo = obj.target.value;
        this.setState(newState);
		const requestOptions = {
			method: 'GET',
			headers: { 'Quantity': newState.dd_shown_id,
			            'CountryFrom': newState.cty,
						'CountryTo': newState.ctyTo,
						'DateFrom':  newState.dateFrom},
			
			};
			fetch('https://reqres.in/api/posts', requestOptions)
				.then(response => response.json())
				.then(data => {this.setState({ postId: data.id });console.log(requestOptions)});
    }
	handleClick = (obj) =>{
		console.log(obj.target.value);
		const newState = {...this.state}
        newState.dateFrom = obj.target.value;
        this.setState(newState);
		const requestOptions = {
			method: 'GET',
			headers: { 'Quantity': newState.dd_shown_id,
			            'CountryFrom': newState.cty,
						'CountryTo': newState.ctyTo,
						'DateFrom':  newState.dateFrom},
			
			};
			fetch('https://reqres.in/api/posts', requestOptions)
				.then(response => response.json())
				.then(data => {this.setState({ postId: data.id });console.log(requestOptions)});
		
	
	}

    render() {
        return (
            <div>
                <Navbar/>

                <div className="container mt-3">
                    <div className="row">
                        <div className="col p-3 bg-light">
                            <div className="h-75">
                                From
                                <input onChange = {this.handleClick} type="date"/>

                                <Dropdowns ddShown={this.state.dd_shown_id}
                                           ctyList={this.state.ctyList}
                                           onQuantityChange={this.handleQuantityChange}
                                           onCtyChange={this.handleCtyChange}
                                           onCtyToChange={this.handleCtyToChange} />
                            </div>

                            <div className="d-flex align-items-end justify-content-end h-25">
                                <button className="btn btn-primary" type="button"
                                        onClick={() => console.log("refesh clicked")}>
                                    Refresh
                                </button>
                            </div>
                        </div>

                        <div className="col-8">
                            <Chart ddShown={this.state.dd_shown_id}
                                   cty={this.state.cty}
                                   ctyTo={this.state.ctyTo} />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Data;