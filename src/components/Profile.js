import { useState } from "react";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

export default function Profile({ store, dispatch }) {
    const [profile, setProfile] = useState({
        name: store.name,
        email: store.email
    });

    const onChangeInput = (key) => (event) => {
        setProfile((prev) => ({
            ...prev,
            [key]: event.target.value
        }));
    };

    const onSaveProfile = () => {
        dispatch({ type: "UPDATE_PROFILE", payload: profile });
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ m: 2 }}>
                Your Information
            </Typography>
            <Box className="profile">
                <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    onChange={onChangeInput("name")}
                    value={profile.name}
                    sx={{ mr: 2 }}
                    size="small"
                    color="primary"
                />

                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={onChangeInput("email")}
                    value={profile.email}
                    sx={{ mr: 2 }}
                    size="small"
                    color="primary"
                />

                <Button color="primary" variant="outlined" onClick={onSaveProfile}>
                    Update Profile
                </Button>
            </Box>
        </Box>
    );
}
