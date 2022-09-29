import axios from "axios";

// fetch all posts
export async function getPosts() {
    let response = [];
    response = await fetch("https://gorest.co.in/public/v2/posts");
    response = await response.json();
    let users = await Promise.all(response.map((post) => getUser(post.user_id)));
    return response.map((post, index) => ({ ...post, user: users[index] }));
}

// fetch particular user details
export async function getUser(userId) {
    let response = await fetch(`https://gorest.co.in/public/v2/users/${userId}`);
    return response.json();
}

// fetch all comments under the post
export async function getComments(postId) {
    let response = await fetch(
        `https://gorest.co.in/public/v2/posts/${postId}/comments`
    );
    return response.json();
}

// comment on POST
export async function commentOnPost({ comment, post, name, email }) {
    const data = {
        body: comment,
        post: post,
        name,
        email
    };
    const options = {
        method: "POST",
        headers: {
            Authorization:
                "Bearer e30126007c0de0227e9e4b03a52ca24428c852137367d830941d147dc9cd8536"
        },
        data,
        url: `https://gorest.co.in/public/v2/posts/${post.id}/comments`
    };
    let response = await axios(options);

    response = response.json();
    return response;
}
