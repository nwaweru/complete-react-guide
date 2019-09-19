import React, { Component } from 'react';

import './Blog.css';
import axios from '../../axios';
import Post from '../../components/Post/Post';
import NewPost from '../../components/NewPost/NewPost';
import FullPost from '../../components/FullPost/FullPost';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    };

    componentDidMount() {
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
            this.setState({ error: true });
        });
    }

    showPostHandler = id => {
        this.setState({ selectedPostId: id });
    };

    render () {
        let posts = <p style={{ textAlign: 'center', color: 'red' }}>Could not fetch posts from the server.</p>;
        let fullPost = null;

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    showPost={() => this.showPostHandler(post.id)}
                />
            });

            fullPost = <FullPost id={this.state.selectedPostId} />;
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    {fullPost}
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
