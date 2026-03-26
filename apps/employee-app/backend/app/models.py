from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import date


class EmployeeCreate(BaseModel):
    name: str
    email: EmailStr
    role: str
    department: str
    location: str
    status: str = "active"
    joined_date: str = Field(default_factory=lambda: date.today().isoformat())


class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[str] = None
    department: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None
    joined_date: Optional[str] = None
