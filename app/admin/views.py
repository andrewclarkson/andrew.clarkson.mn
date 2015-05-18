from flask import request, redirect, url_for

from app.admin import admin
from app.admin.models import User
from app.admin.forms import LoginForm, LogoutForm

@admin.route('/login', methods=["GET", "POST"])
def login():
    """
    Either returns a login form if it's a GET or the handles the form
    if it's a POST request.
    """
    if request.method == 'POST':
        
        
        id = User.authenticate(username, password)
        if id:
            session['id'] = id
            return redirect('/')
        else:
            return render_template('login.html')
    else:
        return render_template('login.html')


@admin.route('/logout', methods=["POST"])
def logout():
    """
    Log the user out
    """
       
