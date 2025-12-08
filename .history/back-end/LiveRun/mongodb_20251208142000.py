from pymongo.mongo_client import MongoClient
from bson.objectid import ObjectId
from pymongo.server_api import ServerApi
from pprint import pprint
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone, UTC
import os

load_dotenv()

DB1_NAME = "drube_cred"
COLLECTION_NAME = "rcs" 
  
def get_data(db):
    
    # print("\nGetting data from database\n")
    try:
        client=get_client()
        database = client[db[0]]
        collection = database[db[1]]
        all_documents = list(collection.find())
        # for doc in all_documents:
        #     pprint(doc)
        
        return all_documents
    except Exception as e:
        print(e)
    # print("\nGetting data from database\n")
    # try:
    #     database = client["D-RubeLabs"]
    #     collection_list = database["bots"]
    #     all_documents = list(collection_list.find())
    #     for doc in all_documents:
    #         pprint(doc)
    # except Exception as e:
    #     print(e)

def push_onedata(data,db):
    
    
    try:
        client=get_client()
        print("\nPushing data to database\n")
        database = client["D-RubeLabs"]
        collection = database[db]
        result = collection.insert_one(data)
        print(f"Inserted document ID: {result.inserted_id}")
    except Exception as e:
        print(e)
    
def push_manydata(push_data,db):
    
    try:
        client = get_client()
        print("\nPushing data to database",push_data['UniqueCode'])
        database = client[db[0]]
        collection = database[db[1]]

        if isinstance(push_data, dict):
            docs = [push_data]
        else:
            docs = list(push_data)

        if not docs:
            raise ValueError("push_data must be a non-empty dict or iterable of dicts")

        normalized = []
        for d in docs:
            if not isinstance(d, dict):
                raise TypeError("each item must be a dict")
            doc = dict(d)  # copy
            doc.setdefault("_id", ObjectId())
            normalized.append(doc)

        result = collection.insert_many(normalized)
        print(f"Inserted document IDs: {result.inserted_ids}")
        return result.inserted_ids
    except Exception as e:
        print(e)
        return None
        
def update_data(update_data, db):
    client = get_client()
    
    print(f"\nUpdating data in database for UniqueCode: {update_data['UniqueCode']}")
    
    database = client[db[0]]
    collection = database[db[1]]

    try:
        result = collection.update_one(
            {"UniqueCode": update_data["UniqueCode"]},
            {"$set": {"data.0": update_data["data"][0],"operators": update_data["operators"]}}
        )

        if result.matched_count == 0:
            print("❌ No document found with this _id.")
        elif result.modified_count == 0:
            print("⚠ Document found but no changes made.")
        else:
            print("✅ Successfully updated data[0].")

    except Exception as e:
        print("❌ Update error:", e)

        
    
def get_client():

    uri = os.getenv("MONGODB_URI")
    if not uri:
        raise EnvironmentError("Set MONGODB_URI environment variable with your MongoDB connection string.")
    client = MongoClient(uri, server_api=ServerApi('1'))
    return client




