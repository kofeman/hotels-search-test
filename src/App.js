import React, {Component} from 'react';
import SearchResults from "./components/search_results";
import DataStore, {DataContext} from "./store";
import Search from "./components/search";
import Filters from "./components/filters";
import './styles/bootstrap.css';
import './styles/styles.css';

class App extends Component {
	render() {
		return (
			<DataStore>
				<div className="App">
					<header className="header mb-4">
						<div className="container">
							<div className="row w-100">
								<div className="col-xs-12 w-100">
									<h1 className="text-center px-2 py-2 text-secondaryy">
										Search Hotels App
									</h1>
								</div>
							</div>
						</div>
					</header>
					<div className="main">
						<div className="container">
							<div className="row">
								<div className="col-md-4 col-xs-12 h-25">
									
									// passing state down into components
									
									<DataContext.Consumer>
										{({ onFilterRating, onFilterPool, onSearch, rate }) => (
											<div className="filters-wrapper w-100">
												<Search onSearch={onSearch}/>
												<Filters
													rate={rate}
													onFilterRating={onFilterRating}
													onFilterPool={onFilterPool}
												/>
											</div>
										)}
									</DataContext.Consumer>
									
								</div>
								
								<div className="col-md-8 col-xs-12">
									
									// passing state down into components
									
									<DataContext.Consumer>
										{({ filteredData, isLoading }) => (
											<SearchResults
												isLoading={isLoading}
												data={filteredData}/>
										)}
									</DataContext.Consumer>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DataStore>
		);
	}
}

export default App;
