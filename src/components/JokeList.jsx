import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import { v4 as uuidv4 } from 'uuid';
// import logo from '../assets/img/dark.jpg';
import '../assets/css/JokeList.css';

class JokeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
            loading: false
        }
        this.seenJokes = new Set(this.state.jokes.map(j => j.text));
        // console.log(this.seenJokes);
    }
    componentDidMount() {
        if(this.state.jokes.length === 0) {
            this.loadJokes();
        }    
    }
    async loadJokes() {
        //load 10 jokes initially
        let jokes = [];
        try {
            let res = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single&amount=10');
            // console.log(res.data);
            for(let data of res.data.jokes) {
                let newJoke = data.joke;
                if(!this.seenJokes.has(newJoke)) {
                    jokes.push({id: uuidv4(), text: newJoke, votes: 0, category: data.category});
                }
            }
            this.setState(st => ({
                loading: false,
                jokes: [...st.jokes, ...jokes]
            }), () => {
                return window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
            });
        } catch(e) {
            console.log(e);
            alert("Oops!....something went wrong.");
            this.setState({ loading: false });
        }
    }
    handleVote = (id, delta) => {
        this.setState(st => ({
            jokes: st.jokes.map(j => j.id === id ? { ...j, votes: j.votes + delta } : j)
        }), () => {
            return window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
        });
    }
    handleClick = e => {
        this.setState({ loading: true }, this.loadJokes);
        this.state.jokes.sort((a, b) => b.votes - a.votes);
    }
    render() {
        if(this.state.loading) {
            return(
                <div className="loading">
                    <i className="far fa-8x fa-sharp fa-solid fa-laugh fa-spin"></i>
                </div>
            );
        }
        return (
            <>
                <div className="row">
                    <div className="bg-dark col-lg-3" style={{ height: '100vh' }}>
                        <div className="sidebar">
                            <h1 className="title text-center px-4 py-4" style={{ color: '#fff' }}>
                                <span>Dank</span> Jokes
                            </h1>
                            <div className="text-center">
                                <img className="laugh-emoji img-fluid" style={{ height: "40vh", width: "40vh" }} src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="logo" />
                                <div className="py-5">
                                    <button className="get-more btn btn-success btn-lg py-3" onClick={this.handleClick}>More Jokes</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="joke-list col-lg-9 col-sm-12" style={{ height: '100vh' }}>
                        {
                            this.state.jokes.map(j => 
                                <Joke
                                    key={j.id} 
                                    text={j.text}
                                    category={j.category}
                                    votes={j.votes}
                                    upVote={() => this.handleVote(j.id, 1)}
                                    downVote={() => this.handleVote(j.id, -1)}
                                />
                            )
                        }
                    </div>
                </div>
            </>
        );
    }
}
 
export default JokeList;