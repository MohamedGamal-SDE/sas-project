# Initial Setup
import json
from flask import Flask, jsonify, request, abort, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
db_path = 'static/db/db.txt'


# App route Setup:
# ===================================== #
# # HTML/CSS/JS get handlers
# ===================================== #


def get_html(page_name):
    """
    This function used to read HTML files

    Parameters:
    page_name (string) : html file name

    Returns:
    HTML files content
    """
    with open(page_name + '.html', 'r') as html_file:
        content = html_file.read()
    return content

# ===================================== #
# # Main Routes
# ===================================== #


@app.route('/')
def home_route():
    html = get_html("index")
    return html


@app.route('/dashboard')
def dashboard_route():
    html = get_html("dashboard")
    return html


@app.route('/login')
def login_route():
    html = get_html("login")
    return html


@app.route('/request')
def request_route():
    html = get_html("request")
    return html


@app.route('/view')
def view_route():
    html = get_html("view")
    return html

# 404 Client Edition


@app.errorhandler(404)
def not_found(e):
    html = get_html("404")
    return html

# API setup:
# ===================================== #
# # Create (POST) Functionality:
# ===================================== #


def build_record(id, name, idea, url):
    """
    Record-Builder helper function
    - Accept incoming record data and build record object
    - Add new record to db file and create the file if not exist

    Parameters:
    id, name, idea, url (string) : record inputs
    """
    record = {
        "id": id,
        "name": name,
        "idea": idea,
        "url": url,
    }

    with open(db_path, "a+") as db_file:
        db_file.write(f"{json.dumps(record)} \n")


# ## Create Record (Handle POST request)
@app.route('/api/v1', methods=['POST'])
def create_record():
    """
    Create Record (Handle POST request) function
    - Check for JSON data only and If Incoming request not including "id" which means its invalid or empty
    - Cancel request and send BAD request error
    - If check passed it build new record from incoming data

    Returns:
    JSON response with success confirmation
    """

    if not request.is_json or not "id" in request.json:
        abort(400)

    r_id = request.json["id"]
    r_name = request.json["name"]
    r_idea = request.json["idea"]
    r_url = request.json["url"]

    build_record(r_id, r_name, r_idea, r_url)

    return jsonify({"message": "Created!", "success": True})


# ===================================== #
# ## Handle Record NOT found as JSON
#    not as default flask HTML response
#    For server responses options
# ===================================== #

def target_not_found(target):
    # Check guard : not found (404)
    # Cancel request and send 404 error
    if len(target) == 0:
        abort(404)


@app.errorhandler(400)
def bad_request(e):
    return make_response(jsonify({"message": "Bad Request!", "success": False}), 400)


# ===================================== #
# Read (Get) Functionality:
# ===================================== #
def read_records():
    """
    Read-All Records helper function
    - Check for potential file not exist

    Returns:
    Records list or []
    """

    try:
        records = []
        with open(db_path, "r") as db_list:

            for record in db_list:
                records.append(json.loads(record))

        return records
    except:
        return []


@app.route('/api/v1', methods=["GET"])
def get_all():
    """
    Read (Get) Functionality
    - Read-All Records

    Returns:
    JSON response with the records list
    """

    records = read_records()
    return jsonify({"result": records})


# ------------------------------------- #
# # Read "GET" get single record functionality:
# ------------------------------------- #
@app.route('/api/v1/<incoming_id>', methods=["GET"])
def get_one(incoming_id):
    """
    Read (Get) Functionality
    - Read-All Records
    - Check for target record

    Parameters:
    incoming_id (string): Id of the desired record

    Returns:
    JSON response with target record and confirmation
    or
    Generate 404 if no match found
    """

    records = read_records()
    target = []

    for record in records:
        if record["id"] == incoming_id:
            target.append(record)

    target_not_found(target)

    return jsonify({"result": target[0], "message": "Found!", "success": True})


# ===================================== #
# # Update record (PUT) functionality:
# ===================================== #
def rebuild_records(new_record):
    """
    ReBuild New Records DB

    Parameters:
    new_record (dictionary): New record to be added to DB
    """
    with open(db_path, "a+") as db_file:
        db_file.write(f"{json.dumps(new_record)} \n")


@app.route('/api/v1/<incoming_id>', methods=['PUT'])
def update_record(incoming_id):
    """
    Update record (PUT) functionality
    - Read Records
    - Look for target record and rebuild it if found match
    - Save updated record
    - ReBuild new_records list
    - Clear old_records and add new_records

    Parameters:
    incoming_id (string): Id of the desired record

    Returns:
    JSON response with success confirmation
    or
    Generate 404 if no match found
    """
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
@app.route('/api/v1/<incoming_id>', methods=["DELETE"])
def del_record(incoming_id):
    """
    DELETE record (DELETE) functionality:
    - Read Records
    - Look for target record and delete it if found match
    - Save target record to be available if need to be send in the response later
    - Make copy of records list to ReBuild new_records
    - Clear old_records and add new_records

    Parameters:
    incoming_id (string): Id of the desired record

    Returns:
    JSON response with success confirmation
    or
    Generate 404 if no match found
    """
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
    app.run(debug=False)
