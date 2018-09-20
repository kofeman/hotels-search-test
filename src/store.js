import React from "react";
import axios from "axios";

// create context for app state

export const DataContext = React.createContext();

// create store based on context api and bind event handlers

class DataStore extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			data: [],
			filteredData: [],
			rate: 0,
			term: '',
			pool: false,
			isLoading: false,
			isFilteringRate: false,
			isFilteringPool: false,
			isSearching: false
		};
		
		this.search = this.search.bind(this);
		this.filterPool = this.filterPool.bind(this);
		this.filterRating = this.filterRating.bind(this);
		
	}
	
	componentDidMount() {
		this.setState({
			isLoading: true
		});
		
		// fetch json and change state
		
		axios.get('https://kofeman.github.io/hotels-search-test/data.json')
			.then(response => {
				setTimeout(() => {
					console.log(response.data.hotels);
					
					this.setState({
						isLoading: false,
						data: response.data.hotels,
						filteredData: response.data.hotels
					})
				}, 1000)
				
			}).catch(error => {
			console.log(error);
		})
	};
	
	// event handlers for filters
	
	search(term) {
		
		this.setState({
			term,
			isSearching: true
		},() => {
			this.filterAll()
		});
	};
	
	filterPool(checkboxValue){
		this.setState({
			pool: checkboxValue,
			isFilteringPool: true
		},() => {
			this.filterAll()
		});
	};
	
	filterRating(starsValue) {
		this.setState({
			rate: starsValue,
			isFilteringRate: true
		},() => {
			this.filterAll()
		});
	};
	
	// filtering based on all filter conditions (search, has pool, rating)
	
	filterAll() {
		const term = this.state.term;
		const rate = this.state.rate;
		const pool = this.state.pool;
		
		let searchingData = [];
		let poolingData = [];
		let ratingData = [];
		
		
		if ( this.state.isSearching ) {
			searchingData = this.state.data.filter(item => {
				return item.name.toLowerCase().includes(term.toLowerCase());
			});
		} else {
			searchingData = this.state.data;
		}
		
		
		if ( this.state.isFilteringPool ) {
			poolingData = searchingData.filter(item => {
				return String(item.hasPool) === String(pool);
			});
		} else {
			poolingData = searchingData;
		}
		
		
		if (this.state.isFilteringRate) {
			ratingData = poolingData.filter(item => {
				return item.rate == rate;
			});
		} else {
			ratingData = poolingData;
		}
		
		
		this.setState({
			filteredData: ratingData,
		})
	}
	
	// passing app state via provider (context api)
	
	render() {
		return (
			<DataContext.Provider
				value={{
					data: this.state.data,
					filteredData: this.state.filteredData,
					isLoading: this.state.isLoading,
					rate: this.state.rate,
					onSearch: this.search,
					onFilterRating: this.filterRating,
					onFilterPool: this.filterPool
				}}
			>
				{this.props.children}
			</DataContext.Provider>
		);
	}
}

export default DataStore;