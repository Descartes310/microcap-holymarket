import Typography from "@material-ui/core/Typography";
import React from "react";

export default function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}
