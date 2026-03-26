import React, { useState } from 'react'
import { Box, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material'

const DEPARTMENTS = ['All', 'Engineering', 'HR', 'Finance', 'Marketing', 'Operations']

export default function SearchBar({ onSearch }) {
  const [name, setName] = useState('')
  const [department, setDepartment] = useState('All')

  const handleName = (e) => {
    const val = e.target.value
    setName(val)
    onSearch({ name: val, department: department === 'All' ? '' : department })
  }

  const handleDept = (e) => {
    const val = e.target.value
    setDepartment(val)
    onSearch({ name, department: val === 'All' ? '' : val })
  }

  return (
    <Box display="flex" gap={2} mb={2} flexWrap="wrap">
      <TextField
        label="Search by name"
        variant="outlined"
        size="small"
        value={name}
        onChange={handleName}
        sx={{ minWidth: 220 }}
      />
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Department</InputLabel>
        <Select value={department} label="Department" onChange={handleDept}>
          {DEPARTMENTS.map((d) => (
            <MenuItem key={d} value={d}>{d}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
