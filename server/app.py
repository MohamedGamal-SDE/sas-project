# Initial Setup
import json
from flask import Flask, jsonify, request, abort

app = Flask(__name__)
db_path = 'db/db.txt'

# API setup:
# ===================================== #
# # Create (POST) Functionality:
# ## Record-Builder helper function
# ===================================== #


def build_record(id, name, idea, url):
    record = {
        "id": id,
        "name": name,
        "idea": idea,
        "url": url,
    }
    # Add new record to db file and create the file if not exist
    with open(db_path, "a+") as db_file:
        db_file.write(f"{json.dumps(record)} \n")


# ## Create Record (Handle POST request)
@app.route('/', methods=['POST'])
def create_record():
    # Check guard : JSON data only (or)
    # If Incoming request not including "id" which means its invalid or empty
    # Cancel request and send BAD request error
    if not request.json or not "id" in request.json:
        abort(400)

    # Build record
    r_id = request.json["id"]
    r_name = request.json["name"]
    r_idea = request.json["idea"]
    r_url = request.json["url"]

    build_record(r_id, r_name, r_idea, r_url)

    return jsonify({"message": "Created!", "success": True})


# ===================================== #
# READ (Get) Functionality:
# ## Read-All Records helper function
# ===================================== #
def read_records():
    with open(db_path, "r") as db_list:
        records = []

        for record in db_list:
            records.append(json.loads(record))

        return records


@app.route('/', methods=["GET"])
def get_all():
    records = read_records()
    return jsonify({"data": records})
