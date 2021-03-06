import React from 'react';
import { movieapi, tvapi } from '../../api';
import SearchPresenter from'./SearchPresenter';

export default class extends React.Component{
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: '',
        loading: false,
        error: null
    };

    componentDidMount() {
        this.handleSubmit();
    }

    handleSubmit = () => {
        const { searchTerm } = this.state;
        if(searchTerm !== ''){
            this.searchByTerm(searchTerm);
        }
    }

    searchByTerm = async ()=> {
        const { searchTerm } = this.state;
        this.setState({loading: true})
        try{
            const {data: {results: movieResults}} = await movieapi.search(searchTerm);
            const {data: {result: tvResults}} = await tvapi.search(searchTerm);
            this.setState({
                movieResults,
                tvResults
            })
        }catch{
            this.setState({
                error: "can't find results."
            })
        }finally{
            this.setState({
                loading: false
            })
        }
    };

    render() {
        const {
            movieResults,
            tvResults,
            searchTerm,
            loading,
            error
        } = this.state;
        return <SearchPresenter 
            movieResults={movieResults}
            tvResults={tvResults}
            searchTerm={searchTerm}
            loading={loading}
            error={error}
            handleSubmit={this.handleSubmit}
        />
    }
}