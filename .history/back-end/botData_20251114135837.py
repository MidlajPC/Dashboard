import time
import random
import os
import math
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv

# --- Load environment variables ---
load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME")

if not MONGODB_URI or not DB_NAME:
    raise ValueError("Please set MONGODB_URI and DB_NAME in your .env file")

# --- MongoDB Setup ---
client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
bots_collection = db["bots"]

# # --- Beach coordinates ---
# KOCHI_BEACH = (9.961476, 76.237107)
# CHENNAI_BEACH = (12.935697, 80.258991)

# --- Operators ---
# KOCHI_OPERATORS = ["68820908d984f13a82d34868", "68fe0e02e425e00682ab8b97"]
# CHENNAI_OPERATORS = ["68355f014e6577b52aaa7066", "68fe07ece425e00682ab8834"]

# # --- Helper functions ---


# def km_to_deg(km):
#     return km / 111.0  # rough conversion


# def haversine_distance(lat1, lon1, lat2, lon2):
#     R = 6371
#     phi1, phi2 = math.radians(lat1), math.radians(lat2)
#     dphi = math.radians(lat2 - lat1)
#     dlambda = math.radians(lon2 - lon1)
#     a = (math.sin(dphi / 2) ** 2 +
#          math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2)
#     return 2 * R * math.atan2(math.sqrt(a), math.sqrt(1 - a))


# def generate_beach_position(center, city, existing=None, min_distance_km=5):
#     existing = existing or []
#     while True:
#         radius_deg = km_to_deg(10)
#         lat_offset = random.uniform(-radius_deg, radius_deg)
#         lng_offset = random.uniform(-radius_deg, radius_deg)
#         lat, lng = center[0] + lat_offset, center[1] + lng_offset
#         too_close = any(haversine_distance(
#             lat, lng, e["lat"], e["lng"]) < min_distance_km for e in existing)
#         if not too_close:
#             return {"lat": lat, "lng": lng, "city": city}


# def gradual_change(current, change_range=(-2, 2), min_val=0, max_val=100):
#     delta = random.uniform(*change_range)
#     new_value = max(min_val, min(max_val, current + delta))
#     return round(new_value, 2)


# def get_operator_for_day(city, bot_index):
#     ops = KOCHI_OPERATORS if city == "Kochi" else CHENNAI_OPERATORS
#     return ops[bot_index % len(ops)]


# def ensure_operator_runtime(bot, operator_label, uptime_increment):
#     """Track runtime for each operator daily."""
#     today = datetime.now().strftime("%Y-%m-%d")
#     found = False
#     for op in bot.get("operators", []):
#         if op.get("user") == operator_label and op.get("date") == today:
#             found = True
#             bots_collection.update_one(
#                 {"_id": bot["_id"], "operators.user": operator_label,
#                     "operators.date": today},
#                 {"$inc": {"operators.$.runtime": uptime_increment}}
#             )
#             break
#     if not found:
#         bots_collection.update_one(
#             {"_id": bot["_id"]},
#             {"$push": {"operators": {"user": operator_label,
#                                      "date": today, "runtime": uptime_increment}}}
#         )


# # --- Create Bots if none exist ---
# if bots_collection.count_documents({}) == 0:
#     print("🌊 Creating initial beach bots...")
#     existing_positions = []

#     for i in range(5):
#         pos = generate_beach_position(KOCHI_BEACH, "Kochi", existing_positions)
#         existing_positions.append(pos)
#         op = get_operator_for_day("Kochi", i)
#         bots_collection.insert_one({
#             "name": f"Kochi_Bot_{i+1}",
#             "UniqueCode": 1000 + i,
#             "temperature": random.uniform(25, 35),
#             "data": [{
#                 "operator": op,
#                 "date": datetime.now(),
#                 "Status": "Idle",
#                 "Battery": 100,
#                 "DistanceCovered": 0,
#                 "Wastetraystatus": "Empty",
#                 "humidity": random.uniform(60, 80),
#                 "temp": random.uniform(25, 35),
#                 "Robotuptime": 0,
#                 "position": pos
#             }],
#             "operators": [{"user": op, "date": datetime.now().strftime("%Y-%m-%d"), "runtime": 0}]
#         })

#     for i in range(5):
#         pos = generate_beach_position(
#             CHENNAI_BEACH, "Chennai", existing_positions)
#         existing_positions.append(pos)
#         op = get_operator_for_day("Chennai", i)
#         bots_collection.insert_one({
#             "name": f"Chennai_Bot_{i+1}",
#             "UniqueCode": 2000 + i,
#             "temperature": random.uniform(25, 35),
#             "data": [{
#                 "operator": op,
#                 "date": datetime.now(),
#                 "Status": "Idle",
#                 "Battery": 100,
#                 "DistanceCovered": 0,
#                 "Wastetraystatus": "Empty",
#                 "humidity": random.uniform(60, 80),
#                 "temp": random.uniform(25, 35),
#                 "Robotuptime": 0,
#                 "position": pos
#             }],
#             "operators": [{"user": op, "date": datetime.now().strftime("%Y-%m-%d"), "runtime": 0}]
#         })

#     print("✅ 10 bots created at beach locations.")

# --- Simulation Loop ---
print("🚀 Running live bot simulation...")

bots_collection._delete

# # while True:
#     bots = list(bots_collection.find({}))
#     for i, bot in enumerate(bots):
#         if not bot.get("data"):
#             continue

#         d = bot["data"][0]
#         city = d["position"]["city"]
#         operator = get_operator_for_day(city, i)

#         # Adjust data
#         status = d["Status"]
#         battery = gradual_change(d["Battery"], (-1.5, -0.3), 0, 100)
#         if battery <= 15:
#             status = "Charging"
#         elif status == "Charging" and battery >= 100:
#             status = "Active"

#         humidity = gradual_change(d["humidity"], (-0.5, 0.5), 30, 90)
#         temp = gradual_change(d["temp"], (-0.5, 0.5), 20, 40)
#         uptime = d["Robotuptime"] + 5
#         distance = d["DistanceCovered"] + random.uniform(0.02, 0.08)

#         waste = d["Wastetraystatus"]
#         if waste == "Empty" and random.random() < 0.1:
#             waste = "Half"
#         elif waste == "Half" and random.random() < 0.1:
#             waste = "Full"
#         elif waste == "Full" and random.random() < 0.3:
#             waste = "Empty"

#         pos = d["position"]
#         if status != "Charging":
#             lat = pos["lat"] + random.uniform(-0.0003, 0.0003)
#             lng = pos["lng"] + random.uniform(-0.0003, 0.0003)
#         else:
#             lat, lng = pos["lat"], pos["lng"]

#         new_data = {
#             "operator": operator,
#             "date": datetime.now(),
#             "Status": status,
#             "Battery": round(battery, 2),
#             "DistanceCovered": round(distance, 2),
#             "Wastetraystatus": waste,
#             "humidity": humidity,
#             "temp": temp,
#             "Robotuptime": uptime,
#             "position": {"lat": lat, "lng": lng, "city": city}
#         }

#         # Update data[0]
#         bots_collection.update_one({"_id": bot["_id"]}, {
#                                    "$set": {"data.0": new_data}})

#         # Add runtime for operator
#         ensure_operator_runtime(bot, operator, 5)

#         print(
#             f"🟢 {bot['name']} [{city}] | Op: {operator} | Batt: {battery:.1f}% | Runtime +5s | Status: {status}")

#     time.sleep(5)
