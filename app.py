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
    html_file = open(page_name + '.html')
    content = html_file.read()
    html_file.close()
    return content


def get_css(file_name):
    css_file = open('static/css/' + file_name + '.css')
    content = css_file.read()
    css_file.close()
    return content


def get_javascript(file_name):
    js_file = open('static/js/' + file_name + '.js')
    content = js_file.read()
    js_file.close()
    return content


# ## Helper function to fetch javascript files
def get_js_general():
    get_javascript("header")
    get_javascript("hero")
    get_javascript("dash-nav")
    get_javascript("view-item")

    get_javascript("main")
    get_javascript("script-dash-general")
    get_javascript("script-login")
    get_javascript("script-req")
    get_javascript("script-view")


# ===================================== #
# # Main Routes
# ===================================== #


@app.route('/')
def home_route():
    html = get_html("index")
    get_css("style")
    get_js_general()

    return html


@app.route('/dashboard')
def dashboard_route():
    html = get_html("dashboard")
    get_css("style")
    get_js_general()

    return html


@app.route('/login')
def login_route():
    html = get_html("login")
    get_css("style")
    get_js_general()

    return html


@app.route('/request')
def request_route():
    html = get_html("request")
    get_css("style")
    get_js_general()

    return html


@app.route('/view')
def view_route():
    html = get_html("view")
    get_css("style")
    get_js_general()

    return html


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
@app.route('/api/v1', methods=['POST'])
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


@app.route('/api/v1', methods=["GET"])
def get_all():
    records = read_records()
    return jsonify({"result": records})


# ------------------------------------- #
# # Read "GET" get single record functionality:
# ------------------------------------- #
@app.route('/api/v1/<int:incoming_id>', methods=["GET"])
def get_one(incoming_id):

    records = read_records()
    target = []

    for record in records:
        if record["id"] == incoming_id:
            target.append(record)

    # Check guard : no match found (404)
    target_not_found(target)

    return jsonify({"result": target[0], "message": "Found!", "success": True})


# ===================================== #
# # Update record (PUT) functionality:
# ## Add Update DB file helper function
# ===================================== #
def rebuild_records(new_record):
    with open(db_path, "a+") as db_file:
        db_file.write(f"{json.dumps(new_record)} \n")


@app.route('/api/v1/<int:incoming_id>', methods=['PUT'])
def update_record(incoming_id):
    # Check guard : JSON data only
    # is_json()

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
@app.route('/api/v1/<int:incoming_id>', methods=["DELETE"])
def del_record(incoming_id):
    # Check guard : JSON data only
    # is_json()

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
