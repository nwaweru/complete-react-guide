import React, { Component } from 'react';

import './Posts.css';
import axios from '../../../axios';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
// import { Link } from 'react-router-dom';
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
        // this.props.history.push(`/${id}`);
        this.props.history.push({ pathname: `/posts/${id}` });
    };

    render() {
        let posts = <p style={{ textAlign: 'center', color: 'red' }}>Could not fetch posts from the server.</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={`/posts/${post.id}`} key={post.id}>
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            showPost={() => this.showPostHandler(post.id)}
                        />
                    // </Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>

                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;
