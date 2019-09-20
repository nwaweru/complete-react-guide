import React, { Component } from 'react';

import './Posts.css';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';

class Posts extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        console.log(this.props);
        
        axios.get('/posts').then(response => {
            const posts = response.data.slice(0, 4);

            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Ndirangu Waweru',
                };
            });

            this.setState({ posts: updatedPosts });
        }).catch(error => {
            console.log(error);
            // this.setState({ error: true });
        });
    }    
    
    showPostHandler = id => {
        this.setState({ selectedPostId: id });
    };

    render() {
        let posts = <p style={{ textAlign: 'center', color: 'red' }}>Could not fetch posts from the server.</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    showPost={() => this.showPostHandler(post.id)}
                />
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;
