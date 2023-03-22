const dashLogForm = `              
<form class="form">
<div class="form-wrapper">
  <input
    type="text"
    name="username"
    id="username"
    value=""
    placeholder="Enter Username"
    autofocus
    required
  />

  <input
    type="password"
    name="password"
    id="password"
    class="form-input"
    value=""
    placeholder="Enter Password"
    required
  />

  <input type="submit" name="send" id="send" value="Log In" />
  <div class="form-hint"></div>

  <div id="from-notify"></div>

  <div class="form-hint">
    <div>Not so secret HINT:</div>
    <div>User: demo</div>
    <div>Password: 1234</div>
  </div>
</div>
</form>
`;
