import React, {Component, Fragment} from 'react';
import StarsRating from "react-stars-rating";

class SearchResults extends Component{
	render () {
		const { data, isLoading } = this.props;
		
		return (
			<div className="search_results block">
				{isLoading && <p>Loading...</p>}
				
				{ ! data.length && !isLoading ? <p>Hotels not found :(</p> : ''}
				
				{ ( data.map(function(item) {
						return <ResultsItem key={item.name} item={item} />
					})
				) }
			</div>
		)
	}
}

class ResultsItem extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			'details': false
		};
		
		this.onToggleDetails = this.onToggleDetails.bind(this);
	}
	
	render() {
		const { item } = this.props;
		
		return (
			<Fragment>
				<div className="p-3 d-flex align-items-start flex-row flex-wrap w-100">
					
					<div className="w-25 mr-3">
						<img className="mw-100"
						     src={item.img} alt={item.name}/>
					</div>
					
					<div className="mr-3">
						<h3>{item.name}</h3>
						
						<StarsRating rating={Number(item.rate)} disabled />
					
					</div>
					
					<div className="text-right ml-auto">
						<p>
							<strong>
								$ {item.price.single}
							</strong>
						</p>
						
						<button className="btn btn-light"
						        onClick={this.onToggleDetails}>{(this.state.details ? 'Hide' : 'Show')} details</button>
					</div>
					
				</div>
				<div className={"details p-3 mt-3 " + (this.state.details ? 'd-block' : 'd-none')}>
					<h4>{item.address}</h4>
					
					<p className="small">{item.description}</p>
					
					<p className="text-success">Pool: {item.hasPool}</p>
				
				</div>
				<hr/>
			</Fragment>
			
		)
	}
	
	onToggleDetails() {
		
		this.setState({
			'details': ! this.state.details
		})
	}
}

export default SearchResults;