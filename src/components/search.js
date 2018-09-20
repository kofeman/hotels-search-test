import React, { Component } from 'react';
import PropTypes from "prop-types";

class Search extends Component{
	constructor(props){
		super(props);
		
		this.onInputChange= this.onInputChange.bind(this);
	}
	
	render () {
		return (
			<div className="search block p-3">
				<input type="search" className="form-control"
				       placeholder="Enter hotel name.."
				       onChange={this.onInputChange}/>
			</div>
		)
	}
	
	onInputChange(event) {
		this.props.onSearch(event.target.value);
	}
}

Search.propTypes = {
	onSearch: PropTypes.func.isRequired,
};

export default Search;