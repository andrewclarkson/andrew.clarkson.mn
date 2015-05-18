from google.appengine.ext import ndb

from app.admin import crypto


class User(ndb.Model):
    """
    The model for a user object
    """
    username = ndb.StringProperty(required=True)
    admin = ndb.BooleanProperty(default=False)
    hash = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=True)

    @classmethod
    def authenticate(User, username, password):
        """
        Returns the user key if the user is properly authenticated,
        otherwise None
        """
        user = User.query(User.username == username).get()
        if user and crypto.verify(password, user.hash):
            if crypto.needs_update(user.hash):
                user.hash = crypto.encrypt(password)
                user.put()
            return user.id
        else:
            return None
