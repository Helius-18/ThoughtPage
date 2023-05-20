import requests
import json
url = "https://data.mongodb-api.com/app/data-ubmkm/endpoint/data/v1/action/insertOne"

payload = json.dumps({
    "collection": "notes",
    "database": "notes",
    "dataSource": "Cluster0",
    "document": {
        "data": "hai"
      }
})
headers = {
  'Content-Type': 'application/json',
  'Access-Control-Request-Headers': '*',
  'api-key': 'cI2FKRcQFY3kR3gUGjINKNvafvGiPYsoCVdIuGrQuXgWxcXSbRHuP5zmHsiYhawX', 
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
