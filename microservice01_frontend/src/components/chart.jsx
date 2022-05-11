import React, {Component} from 'react';
import Highcharts from "highcharts";
import Footer from "./footer";

class Chart extends Component {
    componentDidMount() {
        Highcharts.chart('container',  {
            xAxis: {
                categories: ['cat1', 'cat2', 'cat3']
            },
            series: [
                {
                    name: 'John',
                    data: [1, 2, 3]
                }
            ]
        })
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
                    <button className="me-3 btn btn-primary" type="button">
                        Download image
                    </button>
                    <button className="btn btn-primary" type="button">
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