import React, { useState, useEffect, useCallback } from 'react'
import {
  Container, Box, Typography, Button, Alert, CircularProgress, CssBaseline
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useMediaQuery } from 'react-responsive'
import SearchBar from './components/SearchBar'
import EmployeeTable from './components/EmployeeTable'
import EmployeeForm from './components/EmployeeForm'
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from './services/api'

export default function App() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [filters, setFilters] = useState({ name: '', department: '' })

  const isMobile = useMediaQuery({ maxWidth: 767 })

  const load = useCallback(async (params = filters) => {
    try {
      setLoading(true)
      setError('')
      const res = await getEmployees(params)
      setEmployees(res.data)
    } catch {
      setError('Failed to load employees.')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => { load() }, [])

  const handleSearch = (params) => {
    setFilters(params)
    load(params)
  }

  const handleSave = async (data) => {
    try {
      if (selected) {
        await updateEmployee(selected.id, data)
      } else {
        await createEmployee(data)
      }
      setFormOpen(false)
      setSelected(null)
      load()
    } catch (err) {
      setError(err.response?.data?.detail || 'Save failed.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return
    try {
      await deleteEmployee(id)
      load()
    } catch {
      setError('Delete failed.')
    }
  }

  const handleEdit = (emp) => {
    setSelected(emp)
    setFormOpen(true)
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight={700}>
            Employee Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => { setSelected(null); setFormOpen(true) }}
            size={isMobile ? 'small' : 'medium'}
          >
            {isMobile ? 'Add' : 'Add Employee'}
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}

        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        ) : (
          <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
        )}

        <EmployeeForm
          open={formOpen}
          onClose={() => { setFormOpen(false); setSelected(null) }}
          onSave={handleSave}
          employee={selected}
        />
      </Container>
    </>
  )
}
