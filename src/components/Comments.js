import { useEffect, useState } from "react";
import { commentOnPost, getComments } from "../utils/api";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function Comments({ post, store }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        fetchComments(post.id);
    }, [post]);

    async function fetchComments(postId) {
        let response = await getComments(postId);
        setComments(response);
    }

    function onInputChange(event) {
        setComment(event.target.value);
    }

    async function onPostComment() {
        await commentOnPost({
            comment,
            post,
            ...store.profile
        });
    }

    return (
        <Box>
            {comments.map((comment) => {
                return (
                    <Box
                        key={`comment_${comment.id}`}
                        style={{ padding: 16, float: "right" }}
                    >
                        <Typography variant="body2" sx={{ mt: 2 }} color="#787878">
                            {comment.body}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ mt: 2 }}
                            color="#787878"
                            style={{ float: "right" }}
                        >
                            - {comment.name} ({comment.email})
                        </Typography>
                    </Box>
                );
            })}
            <Box className="commentBoxContainer">
                <TextField
                    id="outlined-basic"
                    label="Type your comment here..."
                    variant="outlined"
                    onChange={onInputChange}
                    value={comment}
                    size="small"
                    style={{ width: "100%" }}
                    sx={{ mr: 2 }}
                />

                <Button
                    color="primary"
                    variant="outlined"
                    onClick={onPostComment}
                    size="medium"
                    style={{ width: 200 }}
                >
                    Comment
                </Button>
            </Box>
        </Box>
    );
}
