import { useEffect, useState } from "react";
import { getPosts } from "../utils/api";
import Comments from "./Comments";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import Card from "@mui/material/Card";

import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function Posts({ store }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    async function fetchComments() {
        let posts = await getPosts();
        setPosts(posts);
    }

    return (
        <Box>
            <Typography variant="h5" sx={{ m: 2 }}>
                Latest Posts:
            </Typography>
            <Box sx={{ mb: 2 }}>
                {posts.map((post) => {
                    return (
                        <Card
                            key={`post_${post.id}`}
                            style={{
                                padding: 16,
                                margin: 16
                            }}
                        >
                            <Typography variant="h6">{post.title}</Typography>
                            <Typography variant="body2" sx={{ mt: 2 }} color="#787878">
                                {post.body}
                            </Typography>
                            {(post.user.name || post.user.email) && (
                                <Typography style={{ float: "right" }} sx={{ mt: 2 }}>
                                    - {post.user.name} ({post.user.email})
                                </Typography>
                            )}
                            <Box sx={{ mt: 8 }}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        Comments
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Comments post={{ ...post, id: 1715 }} store={store} />
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </Card>
                    );
                })}
            </Box>
        </Box>
    );
}
