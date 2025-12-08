import random
from bson.objectid import ObjectId
from datetime import datetime, timezone
import time
import mongodb as mg_db  # your existing MongoDB helper
from math import radians, sin, cos, sqrt, atan2

# Robot positions
pos = {
    "loc_1": {"loc1": ["10.149782243735608", "76.17570833504477"],
              "loc2": ["10.14980345924374", "76.17577497142892"],
              "loc3": ["10.14971633152989", "76.17580715793524"],
              "loc4": ["10.149701810241934", "76.1757287033261"],
              "place": "kochi"},
    "loc_2": {"loc1": ["13.061060308257739", "80.28535842976925"],
              "loc2": ["13.061495555619986", "80.28554833497522"],
              "loc3": ["13.06135049316529", "80.28599921689438"],
              "loc4": ["13.060937467653995", "80.28584202870239"],
              "place": "chennai"},
    "loc_3": {"loc1": ["12.999146947177506", "80.27269772429922"],
              "loc2": ["12.999128402719268", "80.27281541064534"],
              "loc3": ["12.999004916075164", "80.27278322413903"],
              "loc4": ["12.999034971031246", "80.27266386584478"],
              "place": "chennai"},
    "loc_4": {"loc1": ["9.492648721408777", "76.31777112479394"],
              "loc2": ["9.492525590673779", "76.31781308409457"],
              "loc3": ["9.492486569814872", "76.31757839081936"],
              "loc4": ["9.492617521154278", "76.31755290983519"],
              "place": "alapuzha"},
    "loc_5": {"loc1": ["8.386594422857588", "76.97667729624705"],
              "loc2": ["8.386696583622943", "76.97670411833565"],
              "loc3": ["8.386662087783101", "76.97681274779445"],
              "loc4": ["8.386573858024965", "76.97677452631821"],
              "place": "tvm"}
}

status = ["idle", "cleaning", "charging", "error"]
humidity = [80, 86, 78, 89, 79, 90]
temperature = [30, 28, 32, 27, 31]
batteries = [40, 50, 80, 100, 70, 60]
wastetray = ["empty", "half", "full", "error"]
tide = ["low", "mid", "high", "n/a"]

r_name = ["r_001", "r_002", "r_003", "r_004", "r_005"]
userid = ["68355f014e6577b52aaa7066", "684ed8b2f8a8bf79bf0e4595",
          "68317531db31434570f3d067", "68820908d984f13a82d34868", "6888f3213651eedf2d796391"]
unique_id = ["1123", "1124", "1125", "1126", "1127"]

random.shuffle(batteries)
today = datetime.now(timezone.utc)

# --- Functions ---

def init_data(userid_list):
    data = []
    for i in range(len(userid_list)):
        robot_data = {
            "UniqueCode": unique_id[i],
            "data": [{
                "Battery": batteries[i],
                "DistanceCovered": 0,
                "Robotuptime": 5125,
                "Status": status[0],
                "Wastetraystatus": wastetray[0],
                "date": today,
                "tide": random.choice(tide),
                "humidity": random.choice(humidity),
                "temp": random.choice(temperature),
                "operator": ObjectId(userid_list[i]),
                "position": {
                    "city": pos[f"loc_{i+1}"]["place"],
                    "lat": pos[f"loc_{i+1}"]["loc1"][0],
                    "lng": pos[f"loc_{i+1}"]["loc1"][1]
                }
            }],
            "name": r_name[i],
            "operators": [{"date": today, "runtime": 0, "user": ObjectId(userid_list[i])}]
        }
        data.append(robot_data)
    return data


def rotate_list(lst):
    first = lst.pop(0)
    lst.append(first)
    return lst


def distance_(db_data, i):
    lat1 = float(db_data[i]['data'][0]['position']['lat'])
    lon1 = float(db_data[i]['data'][0]['position']['lng'])
    next_lat = float(pos[f'loc_{i+1}']['loc2'][0])
    next_lng = float(pos[f'loc_{i+1}']['loc2'][1])
    # Haversine
    R = 6371
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, next_lat, next_lng])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance_km = R * c
    return distance_km, [next_lat, next_lng]


def loop_data(data, db_data, i, TOTAL_SECONDS):
    distance_cov, next_pos = distance_(db_data, i)
    data['distance_cov'] = distance_cov
    data['position'] = next_pos
    # Update wastetray
    if TOTAL_SECONDS > 18000:
        data['wastetray'] = wastetray[2]
    elif TOTAL_SECONDS > 7200:
        data['wastetray'] = wastetray[1]
    else:
        data['wastetray'] = db_data[i]['data'][0]['Wastetraystatus']
    return data


def time_now():
    now = datetime.now()
    return now.hour == 0 and now.minute == 0


# --- Main Loop ---
def main():
    INTERVAL_SECONDS = 6
    TOTAL_SECONDS = 0
    update_db1 = ['D-RubeLabs', "bots"]
    push_db2 = ['D-RubeLabs', "Bot_History"]

    # Check DB
    db_data = mg_db.get_data(update_db1)
    if len(db_data) < 1:
        print("Db is empty, pushing initial data")
        data_init = init_data(userid)
        for item in data_init:
            item['_id'] = ObjectId()
            mg_db.push_manydata(item, update_db1)
            mg_db.push_manydata(item, push_db2)

    while True:
        db_data = mg_db.get_data(update_db1)
        TOTAL_SECONDS += INTERVAL_SECONDS
        user_list = rotate_list(userid)

        for i in range(len(db_data)):
            data = loop_data({}, db_data, i, TOTAL_SECONDS)

            # Update battery and status
            robot = db_data[i]
            if robot['data'][0]['Battery'] > 0:
                robot['data'][0]['Battery'] -= 0.035
                robot['data'][0]['position']['lat'] = data['position'][0]
                robot['data'][0]['position']['lng'] = data['position'][1]
                robot['data'][0]['Wastetraystatus'] = data['wastetray']
                robot['data'][0]['DistanceCovered'] = data['distance_cov']
                robot['data'][0]['Status'] = status[1]
                robot['data'][0]['Robotuptime'] += TOTAL_SECONDS
            else:
                robot['data'][0]['Status'] = status[2]

            # Update other values
            robot['data'][0]['date'] = today
            robot['data'][0]['humidity'] = random.choice(humidity)
            robot['data'][0]['temp'] = random.choice(temperature)
            robot['data'][0]['tide'] = random.choice(tide)
            robot['operators'][0]['runtime'] += TOTAL_SECONDS

            robot['_id'] = ObjectId()
            mg_db.update_data(robot, update_db1)
            mg_db.push_manydata(robot, push_db2)
            print("Data pushed for robot:", robot['name'])

        time.sleep(INTERVAL_SECONDS)


if __name__ == "__main__":
    main()
