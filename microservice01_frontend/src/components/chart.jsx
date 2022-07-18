import React, {Component} from 'react';
import Highcharts from "highcharts";
import Footer from "./footer";
require("highcharts/modules/exporting")(Highcharts);    //<-- Top-right hamburger menu
require("highcharts/modules/export-data")(Highcharts);  //<-- Download as CSV from hamburger menu

class Chart extends Component {
    componentDidUpdate() {
        let data = this.props.data;
		console.log("ok",data[0].hasOwnProperty('ActualGenerationOutput'));
        if(data[0].hasOwnProperty('Error')) {  //=> no data for this country
            data = []
			Highcharts.chart('container',  {
            title: {
                text: ''    //<--- Inserting title will move the diagram down
            },
            xAxis: {
                categories: data.map( (e) => {
                    return new Date(e['DateTime']._seconds * 1000).toISOString().substr(11, 8);
                    //https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
                })
            },
            series: [
                {
                    name: this.props.cty,
                    data: data
                }
            ]
			})
        }
		else if(data[0].hasOwnProperty('ActualGenerationOutput')) { 
            Highcharts.chart('container',  {
            title: {
                text: ''    //<--- Inserting title will move the diagram down
            },
            xAxis: {
                categories: data.map( (e) => {
                    return new Date(e['DateTime']._seconds * 1000).toISOString().substr(11, 8);
                    //https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
                })
            },
            series: [
                {
                    name: this.props.cty,
                    data: data.map( (e) => { return parseInt(e['ActualGenerationOutput']) })
                }
            ]
        })
        }
		else if(data[0].hasOwnProperty('TotalLoadValue')){
			Highcharts.chart('container',  {
            title: {
                text: ''    //<--- Inserting title will move the diagram down
            },
            xAxis: {
                categories: data.map( (e) => {
                    return new Date(e['DateTime']._seconds * 1000).toISOString().substr(11, 8);
                    //https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
                })
            },
            series: [
                {
                    name: this.props.cty,
                    data: data.map( (e) => { return parseInt(e['TotalLoadValue']) })
                }
            ]
        })
		}
		else if(data[0].hasOwnProperty('FlowValue')){
			console.log("f");
			Highcharts.chart('container',  {
            title: {
                text: ''    //<--- Inserting title will move the diagram down
            },
            xAxis: {
                categories: data.map( (e) => {
                    return new Date(e['DateTime']._seconds * 1000).toISOString().substr(11, 8);
                    //https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
                })
            },
            series: [
                {
                    name: this.props.cty,
                    data: data.map( (e) => { console.log(e['FlowValue']);return parseInt(e['FlowValue']) })
                }
            ]
        })
		}
		
    }

    printCtyFlow() {
        if(this.props.ddShown === 3)
            return (
                <div>
                    {this.props.cty} -> {this.props.ctyTo}
                </div>
            )
        else
            return (
                <div>
                    {this.props.cty}
                </div>
            )
    }

    notifyUserToUseChartMenu() {
        alert('Press the button on top right of the chart for this functionality.')
    }

    render() {
        const topLeftMsg = ["ZERO_INDEX", "Actual total load", "Generation per type", "Cross border flows"]

        return (
            <div>
                <div className="d-flex flex-row pt-3 pb-2">
                        <h4>{topLeftMsg[this.props.ddShown]}</h4>
                    <div className="ms-auto">
                       <h4>{this.printCtyFlow()}</h4>
                    </div>
                </div>

                <figure id="container"></figure>

                <div className="mt-3">
                    Latest update DD.MM.YYY HH:MM
                </div>
                <br/>

                <div className="text-end">
                    <button className="me-3 btn btn-primary" type="button" onClick={this.notifyUserToUseChartMenu}>
                        Download image
                    </button>
                    <button className="btn btn-primary" type="button" onClick={this.notifyUserToUseChartMenu}>
                        Download data
                    </button>
                </div>
                <br/>

                <Footer/>
            </div>
        );
    }

}

export default Chart;