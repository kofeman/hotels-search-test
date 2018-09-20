import React, { Component } from 'react';
import StarsRating from 'react-stars-rating';
import PropTypes from "prop-types";

class Filters extends Component{
	constructor(props){
		super(props);
		
		this.state = {
			isChecked: false,
		};
		
		this.onClickHandler= this.onClickHandler.bind(this);
		this.onPoolChange= this.onPoolChange.bind(this);
	}
	
	render () {
		return (
			<div className="filters block p-3">
				<h5>Filters</h5>
				
				<div className="filters__item mb-2">
					<StarsRating rating={this.props.rate} onRatingClick={this.onClickHandler} />
				</div>
				
				<div className="filters__item">
					<label htmlFor="hasPool">
						<input type="checkbox" id="hasPool"
						       checked={this.state.isChecked}
						      onChange={this.onPoolChange}
						/>
						
						<span className="d-inline-block ml-2">with pool</span>
					</label>
				</div>
			</div>
		)
	}
	
	onClickHandler(starsValue) {
		this.props.onFilterRating(starsValue)
	}
	
	onPoolChange() {
		this.setState({
			isChecked: !this.state.isChecked,
		},() => {
			this.props.onFilterPool(this.state.isChecked)
		});
	}
}

Filters.propTypes = {
	onFilterPool: PropTypes.func.isRequired,
	onFilterRating: PropTypes.func.isRequired,
	rate: PropTypes.number.isRequired
};

export default Filters;