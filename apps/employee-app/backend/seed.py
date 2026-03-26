import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "employee_db")

EMPLOYEES = [
    {"name": "Alice Johnson", "email": "alice@example.com", "role": "Software Engineer", "department": "Engineering", "location": "New York", "status": "active", "joined_date": "2021-03-15"},
    {"name": "Bob Smith", "email": "bob@example.com", "role": "Product Manager", "department": "Marketing", "location": "San Francisco", "status": "active", "joined_date": "2020-07-01"},
    {"name": "Carol White", "email": "carol@example.com", "role": "HR Specialist", "department": "HR", "location": "Chicago", "status": "active", "joined_date": "2022-01-10"},
    {"name": "David Lee", "email": "david@example.com", "role": "Data Analyst", "department": "Finance", "location": "Austin", "status": "inactive", "joined_date": "2019-11-20"},
    {"name": "Eva Martinez", "email": "eva@example.com", "role": "DevOps Engineer", "department": "Engineering", "location": "Seattle", "status": "active", "joined_date": "2021-08-05"},
    {"name": "Frank Brown", "email": "frank@example.com", "role": "Accountant", "department": "Finance", "location": "Boston", "status": "active", "joined_date": "2020-04-22"},
    {"name": "Grace Kim", "email": "grace@example.com", "role": "UX Designer", "department": "Engineering", "location": "Los Angeles", "status": "active", "joined_date": "2023-02-14"},
    {"name": "Henry Davis", "email": "henry@example.com", "role": "Operations Manager", "department": "Operations", "location": "Denver", "status": "inactive", "joined_date": "2018-06-30"},
    {"name": "Iris Chen", "email": "iris@example.com", "role": "Marketing Lead", "department": "Marketing", "location": "Miami", "status": "active", "joined_date": "2022-09-01"},
    {"name": "Jack Wilson", "email": "jack@example.com", "role": "Recruiter", "department": "HR", "location": "Portland", "status": "active", "joined_date": "2023-05-18"},
]


async def seed():
    client = AsyncIOMotorClient(MONGODB_URI)
    db = client[DB_NAME]
    await db.employees.drop()
    await db.employees.create_index("email", unique=True)
    await db.employees.create_index("department")
    await db.employees.create_index("status")
    await db.employees.insert_many(EMPLOYEES)
    print(f"Seeded {len(EMPLOYEES)} employees.")
    client.close()


if __name__ == "__main__":
    asyncio.run(seed())
