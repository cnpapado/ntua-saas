import React, {Component} from 'react';

class Dropdowns extends Component {
    render() {
        const dd_quantity = (
            <div className="form-floating mt-3" onInput={this.props.onQuantityChange}>
                <select className="form-select" id="dd_quantity">
                    <option value="1">Actual total load</option>
                    <option value="2">Generation per type</option>
                    <option value="3">Cross border flows</option>
                </select>
                <label htmlFor="dd_quantity">Quantity</label>
            </div>
        )
        const dd_c = (
            <div className="form-floating mt-3" onInput={this.props.onCtyChange}>
                <select className="form-select" id="dd_c">
                    <option defaultValue hidden value="NO_CTY"> --- </option>
                    {this.props.ctyList.map( cty =>
                        <option key={cty} value={cty}> {cty} </option>
                    )}
                </select>
                <label htmlFor="dd_c">Country</label>
            </div>
        )
        const dd_type = (
            <div className="form-floating mt-3">
                <select className="form-select" id="dd_type">
                    <option value="1">INSERT type DATA HERE</option>
                </select>
                <label htmlFor="dd_type">Generation type</label>
            </div>
        )
        const dd_cfrom = (
            <div className="form-floating mt-3" onInput={this.props.onCtyChange}>
                <select className="form-select" id="dd_cfrom">
                    <option defaultValue hidden value="NO_CTY"> --- </option>
                    {this.props.ctyList.map( cty =>
                        <option key={cty} value={cty}> {cty} </option>
                    )}
                </select>
                <label htmlFor="dd_cfrom">Country (from)</label>
            </div>
        )
        const dd_cto = (
            <div className="form-floating mt-3" onInput={this.props.onCtyToChange}>
                <select className="form-select" id="dd_cto">
                    <option defaultValue hidden value="NO_CTY"> --- </option>
                    {this.props.ctyList.map( cty =>
                        <option key={cty} value={cty}> {cty} </option>
                    )}
                </select>
                <label htmlFor="dd_cto">Country (to)</label>
            </div>
        )

        switch (this.props.ddShown) {
            case 1:
                return (
                    <div>
                        {dd_quantity}
                        {dd_c}
                    </div>
                )
            case 2:

                return (
                    <div>
                        {dd_quantity}
                        {dd_c}
                        {dd_type}
                    </div>
                )
            case 3:
                return (
                    <div>
                        {dd_quantity}
                        {dd_cfrom}
                        {dd_cto}
                    </div>
                )
            default:
                return (
                    <div className="bg-danger">
                        ERROR! - NO DROPDOWN TO LIST
                    </div>
                )
        }
    }


}

export default Dropdowns;