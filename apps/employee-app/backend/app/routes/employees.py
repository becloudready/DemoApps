from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId
from typing import Optional
from app.database import get_db
from app.models import EmployeeCreate, EmployeeUpdate

router = APIRouter(prefix="/employees", tags=["employees"])


def serialize(doc) -> dict:
    doc["id"] = str(doc.pop("_id"))
    return doc


@router.get("")
async def list_employees(
    name: Optional[str] = Query(None),
    department: Optional[str] = Query(None),
):
    db = get_db()
    query = {}
    if name:
        query["name"] = {"$regex": name, "$options": "i"}
    if department:
        query["department"] = department
    docs = await db.employees.find(query).to_list(length=1000)
    return [serialize(d) for d in docs]


@router.post("", status_code=201)
async def create_employee(payload: EmployeeCreate):
    db = get_db()
    existing = await db.employees.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")
    result = await db.employees.insert_one(payload.model_dump())
    doc = await db.employees.find_one({"_id": result.inserted_id})
    return serialize(doc)


@router.get("/{id}")
async def get_employee(id: str):
    db = get_db()
    try:
        oid = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID")
    doc = await db.employees.find_one({"_id": oid})
    if not doc:
        raise HTTPException(status_code=404, detail="Employee not found")
    return serialize(doc)


@router.put("/{id}")
async def update_employee(id: str, payload: EmployeeUpdate):
    db = get_db()
    try:
        oid = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID")
    update_data = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = await db.employees.update_one({"_id": oid}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
    doc = await db.employees.find_one({"_id": oid})
    return serialize(doc)


@router.delete("/{id}", status_code=204)
async def delete_employee(id: str):
    db = get_db()
    try:
        oid = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID")
    result = await db.employees.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
