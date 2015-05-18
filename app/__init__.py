from flask import Flask

from app.blog import blog
from app.admin import admin

app = Flask("Andrew Clarkson", template_folder="app/templates")
app.register_blueprint(blog)
app.register_blueprint(admin, url_prefix='/admin')
