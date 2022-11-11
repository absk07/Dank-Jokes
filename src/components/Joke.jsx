import React, { Component } from 'react';
import '../assets/css/Joke.css';

class Joke extends Component {
    getColorAndEmoji() {
        if(this.props.votes >= 15) {
            return {color: "#4CAF50", emoji: "em em-rolling_on_the_floor_laughing"};
        } else if(this.props.votes >= 12) {
            return {color: "#8BC34A", emoji: "em em-laughing"};
        } else if(this.props.votes >= 9) {
            return {color: "#CDDC4A", emoji: "em em-smiley"};
        } else if(this.props.votes >= 6) {
            return {color: "#FFEB3B", emoji: "em em-slightly_smiling_face"};
        } else if(this.props.votes >= 3) {
            return {color: "#FFC107", emoji: "em em-neutral_face"};
        } else if(this.props.votes >= 0) {
            return {color: "#FF9800", emoji: "em em-confused"};
        } else {
            return {color: "#F44336", emoji: "em em-angry"};
        }
    }
    getCategory() {
        if(this.props.category === "Dark") {
            return { color: "dark", category: "Dark" };
        } else if(this.props.category === "Pun") {
            return { color: "info", category: "Pun" };
        } else if(this.props.category === "Programming") {
            return { color: "warning", category: "Programming" };
        } else {
            return { color: "success", category: "Misc" };
        }
    }
    render() {
        const { votes, text, upVote, downVote } = this.props;
        return (
            <div className="card my-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-2 col-sm-2 text-center py-3">
                            <i className="upvote fa-solid fa-arrow-up px-2" onClick={upVote}></i>
                            <span className="vote px-4 py-3" style={{borderColor: this.getColorAndEmoji().color}}>
                                {votes}
                            </span>
                            <i className="downvote fa-solid fa-arrow-down px-2" onClick={downVote}></i>
                        </div>
                        <div className="col-lg-8 col-sm-8 py-3">
                            <h5 className="text-muted">
                                {text}
                            </h5>
                            <span className={`badge text-bg-${this.getCategory().color}`}>{this.getCategory().category}</span>
                        </div>
                        <div className="smiley col-lg-2 col-sm-2 text-center py-3">
                            <i className={this.getColorAndEmoji().emoji}></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Joke;