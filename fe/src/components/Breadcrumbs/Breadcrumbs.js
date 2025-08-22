import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BackBreadcrumb({ label = "Back", onBack }) {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <Link
        underline="hover"
        color="inherit"
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        onClick={onBack || (() => window.history.back())}
      >
        <ArrowBackIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        {label}
      </Link>
    </Breadcrumbs>
  );
}
