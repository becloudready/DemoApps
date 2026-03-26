import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, IconButton, Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  if (!employees.length) {
    return (
      <Typography color="text.secondary" mt={4} textAlign="center">
        No employees found.
      </Typography>
    )
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.100' }}>
            {['Name', 'Email', 'Role', 'Department', 'Location', 'Status', 'Actions'].map((h) => (
              <TableCell key={h} sx={{ fontWeight: 600 }}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id} hover>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.role}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell>{emp.location}</TableCell>
              <TableCell>
                <Chip
                  label={emp.status}
                  size="small"
                  color={emp.status === 'active' ? 'success' : 'default'}
                />
              </TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => onEdit(emp)}><EditIcon fontSize="small" /></IconButton>
                <IconButton size="small" color="error" onClick={() => onDelete(emp.id)}><DeleteIcon fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
