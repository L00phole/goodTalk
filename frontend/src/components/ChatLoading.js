import React from "react";
import { Box, Skeleton } from "@mui/material";

const ChatLoading = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <Skeleton style={{height: "50px"}} />
            <Skeleton style={{height: "50px"}} animation="wave" />
            <Skeleton style={{height: "50px"}} />
            <Skeleton style={{height: "50px"}} animation="wave" />
            <Skeleton style={{height: "50px"}} />
            <Skeleton style={{height: "50px"}} animation="wave" />
            <Skeleton style={{height: "50px"}} />
            <Skeleton style={{height: "50px"}} animation="wave" />
            <Skeleton style={{height: "50px"}} />
            <Skeleton style={{height: "50px"}} animation="wave" />
            <Skeleton style={{height: "50px"}} />
            <Skeleton style={{height: "50px"}} animation="wave" />
        </Box>
    );
};

export default ChatLoading;