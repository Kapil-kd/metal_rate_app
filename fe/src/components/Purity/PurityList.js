import { useState, useEffect } from "react";
import {
  getPurities,
  createPurity,
  updatePurity,
  deletePurity,
} from "../../api/purity";
import PurityForm from "./PurityForm";
import { Paper, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PurityList() {
  const [purities, setPurities] = useState([]);
  const [editing, setEditing] = useState(null);


  const token = localStorage.token;

  const fetchPurities = async () => {
    try {
      const data = await getPurities(token);
      setPurities(data);
    } catch (error) {
      console.error("Failed to load purities:", error);
    }
  };
  useEffect(() => {
    fetchPurities();
  }, [token]);

  const handleCreate = async (data) => {
    await createPurity(token, data);
    fetchPurities();
  };
  const handleUpdate = async (id, data) => {
    await updatePurity(token, id, data);
    setEditing(null);
    fetchPurities();
  };
  const handleDelete = async (id) => {
    if (window.confirm("Delete?")) {
      await deletePurity(token, id);
      fetchPurities();
    }
  };

  return (
    <>
      <PurityForm
        onSubmit={
          editing ? (data) => handleUpdate(editing._id, data) : handleCreate
        }
        initial={editing}
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "flex-start",
          maxWidth: "100%",
          margin: "15px",
          mt: 2,
        }}
      >
        {purities && purities.length > 0 ? (
          purities.map((p) => (
            <Paper
              key={p._id}
              elevation={3}
              sx={{
                p: 2,
                minWidth: 250,
                maxWidth: 300,
                flex: "1 1 280px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {p.metal} – {p.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Value: {p.value}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  onClick={() => setEditing(p)}
                  aria-label="edit"
                  size="small"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(p._id)}
                  aria-label="delete"
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          ))
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ width: "100%", textAlign: "center", mt: 4 }}
          >
            No purities found.
          </Typography>
        )}
      </Box>
    </>
  );
}
