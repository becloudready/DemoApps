import React, { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Grid
} from '@mui/material'

const ROLES = ['Software Engineer', 'Product Manager', 'HR Specialist', 'Data Analyst',
  'DevOps Engineer', 'Accountant', 'UX Designer', 'Operations Manager', 'Marketing Lead', 'Recruiter']
const DEPARTMENTS = ['Engineering', 'HR', 'Finance', 'Marketing', 'Operations']
const STATUSES = ['active', 'inactive']

const EMPTY = { name: '', email: '', role: '', department: '', location: '', status: 'active', joined_date: '' }

export default function EmployeeForm({ open, onClose, onSave, employee }) {
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    setForm(employee ? { ...employee } : EMPTY)
  }, [employee, open])

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{employee ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2} mt={0}>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth label="Name" value={form.name} onChange={set('name')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth label="Email" type="email" value={form.email} onChange={set('email')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth select label="Role" value={form.role} onChange={set('role')}>
                {ROLES.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth select label="Department" value={form.department} onChange={set('department')}>
                {DEPARTMENTS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth label="Location" value={form.location} onChange={set('location')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth select label="Status" value={form.status} onChange={set('status')}>
                {STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Joined Date" type="date" value={form.joined_date} onChange={set('joined_date')} InputLabelProps={{ shrink: true }} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
