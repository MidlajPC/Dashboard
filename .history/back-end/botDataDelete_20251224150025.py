from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# --- Load environment variables ---
load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME")

if not MONGODB_URI or not DB_NAME:
    raise ValueError("Please set MONGODB_URI and DB_NAME in your .env file")

# --- MongoDB Setup ---
client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
bots_collection = db["Bot_History"]
bots_collection = db["Bot_History"]

# --- Delete ALL documents ---
result = bots_collection.delete_many({})

print(f"Deleted {result.deleted_count} documents from 'bots' collection.")
