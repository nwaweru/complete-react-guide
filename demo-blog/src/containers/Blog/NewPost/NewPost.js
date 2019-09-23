import React, { Component } from 'react';

import './NewPost.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Ndirangu',
        submitted: false
    }

    componentDidMount() {
        // if unauth => this.props.history.replace('/posts');
        console.log(this.props);
    }

    addPostHandler = () => {
        const post = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };

        axios.post('/posts', post).then(response => {
            console.log(response);
            // this.props.history.push('/posts');
            this.setState({ submitted: true });
        });
    };

    render () {
        let redirect = null;

        if (this.state.submitted) {
            redirect = <Redirect to="posts" />;
        }

        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Ndirangu">Ndirangu</option>
                    <option value="Waweru">Waweru</option>
                </select>
                <button onClick={this.addPostHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;
