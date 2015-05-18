from google.appengine.ext import ndb

class Post(ndb.Model):
    """
    The model for a post object
    """
    title = ndb.StringProperty(required=True)
    published = ndb.DateTimeProperty(auto_now_add=True)
    content = ndb.TextProperty(required=True)
