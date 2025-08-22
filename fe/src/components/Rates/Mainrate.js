import MetalRateForm from "./MetalRateForm";
import MetalRateList from "./MetalRateList";
import { useState } from "react";
import { Drawer, Button, Box, IconButton, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import CloseIcon from "@mui/icons-material/Close";
const Mainrate = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };
  return (
    <Box
      display="flex"
      gap={2}
      sx={{ margin: "30px 20px" }}
      alignItems="flex-start"
    >
      <Box flex={1}>
        <MetalRateForm />
      </Box>
      <Box>
        <Box sx={{ p: 2 }}>
          <Button
            onClick={toggleDrawer(true)}
            variant="outlined"
            startIcon={<ListIcon />}
          >
            View List
          </Button>

          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            <Box
              sx={{
                width: 500,
                p: 2,
                height: "100%",
                position: "relative",
              }}
            >
              <IconButton
                onClick={toggleDrawer(false)}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <CloseIcon />
              </IconButton>

              <Typography variant="h6" sx={{ mb: 2 }}>
                Metal Rate List
              </Typography>

              <MetalRateList />
            </Box>
          </Drawer>
        </Box>
      </Box>
    </Box>
  );
};

export default Mainrate;
