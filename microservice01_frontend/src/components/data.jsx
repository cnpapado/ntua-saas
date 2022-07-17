import React, {Component} from 'react';
import Navbar from "./navbar";
import Dropdowns from "./dropdowns";
import Chart from "./chart";
import { UserAuth } from '../context/AuthContext';
import axios from 'axios';


class Data extends Component {
    
	state = {
        dd_shown_id: 1,
        email: "johndoe@gmail.com",
        cty: "?",
        ctyTo: "??",
        ctyList:["Greece","Portugal", "Ireland", "Malta","Cyprus", "Belgium","Luxembourg","Italy","Austria","Slovakia","Czech Republic","Moldova","Ukraine","Belarus",
		"Latvia","Albania","Bosnia and Herzegovina","Bulgaria","Croatia","Hungary","Montenegro","Romania","Serbia","Slovenia","North Macedonia","Lithuania","Russia",
		"Estonia","Denmark","Finland","Germany","Netherlands","VVLAND","Poland","Sweden","Turkey","United Kingdom","France","Spain","Switzerland"],
		dateFrom: '01/01/2010'
        //TODO: notify Chart to show noChart: noChart={this.state.cty === this.state.ctyTo}
    }
	
    async componentDidMount() {
		
        
		
		const newState = {...this.state}
        const ctyListFetched = ["Greece","Portugal", "Ireland", "Malta","Cyprus", "Belgium","Luxembourg","Italy","Austria","Slovakia","Czech Republic","Moldova","Ukraine","Belarus",
		"Latvia","Albania","Bosnia and Herzegovina","Bulgaria","Croatia","Hungary","Montenegro","Romania","Serbia","Slovenia","North Macedonia","Lithuania","Russia",
		"Estonia","Denmark","Finland","Germany","Netherlands","VVLAND","Poland","Sweden","Turkey","United Kingdom","France","Spain","Switzerland"]
        newState.ctyList = ctyListFetched;
        this.setState(newState);
	
	}
	stopTimer = () => {
		console.log("stoooop");
		for(let i=0; i<100; i++)
		{
			clearInterval(i);
		}
		clearInterval(this.timer);
	};

    launchTimer = () => {
		const newState = {...this.state}
		console.log(newState);
		this.timer = setInterval(() => (axios.get('http://localhost:8080/ATL',{
													 headers: { 'Quantity': newState.dd_shown_id,
																'CountryFrom': newState.cty,
																'CountryTo': newState.ctyTo,
																'DateFrom':  newState.dateFrom.replace(/-/g,"/")}
													}))
		.then(data => {console.log(data);this.setState({ data: data })})
		.catch(error => console.log(error)), 15*60*1000);
	};
	
	

 
	//WIP - remove duplicate code and add into function
    handleQuantityChange = (obj) => {
		
        //console.log(obj.target.value);
        const newState = {...this.state}
		console.log(newState);
        newState.dd_shown_id = parseInt(obj.target.value);
        this.setState(newState);
		const requestOptions = {
			method: 'GET',
			headers: { 'Quantity': newState.dd_shown_id,
			            'CountryFrom': newState.cty,
						'CountryTo': newState.ctyTo,
						'DateFrom':  newState.dateFrom.replace(/-/g,"/")},
			
			};
		fetch('http://localhost:8080/ATL', requestOptions)
			.then(response => {response.json();console.log(requestOptions);this.timer = this.stopTimer()})
			.then(data => {this.setState({ postId: data });console.log(data);this.timer = this.launchTimer()});
	
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
						'DateFrom':  newState.dateFrom.replace(/-/g,"/")},
			
			};
			fetch('http://localhost:8080/ATL', requestOptions)
				.then(response => {response.json();this.timer = this.stopTimer();})
				.then(data => {this.setState({ postId: data });console.log(data);this.timer = this.launchTimer();});
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
						'DateFrom':  newState.dateFrom.replace(/-/g,"/")},
			
			};
			fetch('http://localhost:8080/ATL', requestOptions)
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
						'DateFrom':  newState.dateFrom.replace(/-/g,"/")},
			
			};
			fetch('http://localhost:8080/ATL', requestOptions)
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