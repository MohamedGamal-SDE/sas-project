# Initial Setup
import json
from flask import Flask, jsonify, request, abort, make_response

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
# ## Handle Record NOT found as JSON
#    not as default flask HTML response
# ===================================== #

def is_json():
    # Check guard : JSON data only
    # Cancel request and send BAD request error
    if not request.json:
        abort(400)


def target_not_found(target):
    # Check guard : not found (404)
    # Cancel request and send 404 error
    if len(target) == 0:
        abort(404)


@app.errorhandler(404)
def not_found(e):
    return make_response(jsonify({"message": "Not found", "success": False}), 404)


@app.errorhandler(400)
def bad_request(e):
    return make_response(jsonify({"message": "Bad Request!", "success": False}), 400)


# ===================================== #
# Read (Get) Functionality:
# ## Read-All Records helper function
# ===================================== #
def read_records():
    # Check guard : for potential file not exist
    try:
        records = []
        with open(db_path, "r") as db_list:

            for record in db_list:
                records.append(json.loads(record))

        return records
    except:
        return []


@app.route('/', methods=["GET"])
def get_all():
    is_json()

    records = read_records()
    return jsonify({"data": records})


# ------------------------------------- #
# # Read "GET" get single record functionality:
# ------------------------------------- #
@app.route('/<int:incoming_id>', methods=["GET"])
def get_one(incoming_id):
    # Check guard : JSON data only
    is_json()

    records = read_records()
    target = []

    for record in records:
        if record["id"] == incoming_id:
            target.append(record)

    # Check guard : no match found (404)
    target_not_found(target)

    return jsonify({"data": target[0], "message": "Found!", "success": True})


# ===================================== #
# # Update record (PUT) functionality:
# ## Add Update DB file helper function
# ===================================== #
def rebuild_records(new_record):
    with open(db_path, "a+") as db_file:
        db_file.write(f"{json.dumps(new_record)} \n")


@app.route('/<int:incoming_id>', methods=['PUT'])
def update_record(incoming_id):
    # Check guard : JSON data only
    is_json()

    records = read_records()
    new_records = []
    target = []

    for record in records:
        if record["id"] == incoming_id:
            # ReBuild target record
            record['name'] = request.json['name']
            record['idea'] = request.json['idea']
            record['url'] = request.json["url"]
            target.append(record)

        # ReBuild new_records list
        new_records.append(record)

    # Check guard : no match found (404)
    target_not_found(target)

    # Clear old_records and add new_records
    with open(db_path, "w"):
        for record in new_records:
            rebuild_records(record)

    return jsonify({"message": "Updated!", "success": True})


# ===================================== #
# # DELETE record (DELETE) functionality:
# ===================================== #
@app.route('/<int:incoming_id>', methods=["DELETE"])
def del_record(incoming_id):
    # Check guard : JSON data only
    is_json()

    records = read_records()
    target = []

    for record in records:
        if record["id"] == incoming_id:
            target.append(record)
            records.remove(record)

    # Check guard : no match found (404)
    target_not_found(target)

    # Make copy of records list to ReBuild new_records
    new_records = records

    # Clear old_records and add new_records
    with open(db_path, "w"):
        for record in new_records:
            rebuild_records(record)

    return jsonify({"message": "Removed!", "success": True})


if __name__ == '__main__':
    app.run(debug=True)
