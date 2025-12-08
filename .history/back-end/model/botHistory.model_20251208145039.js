{
  "_id": "ObjectId",
  "UniqueCode": "String",
  "data": [
    {
      "Battery": "Number",
      "DistanceCovered": "Number",
      "Robotuptime": "Number",
      "Status": "String",
      "Wastetraystatus": "String",
      "date": "Date",
      "tide": "String",
      "humidity": "Number",
      "temp": "Number",
      "operator": "ObjectId",
      "position": {
        "city": "String",
        "lat": "String",
        "lng": "String"
      }
    }
  ],
  "name": "String",
  "operators": [
    {
      "date": "Date",
      "runtime": "Number",
      "user": "ObjectId"
    }
  ]
}
