from app.blog import blog

@blog.route('/', methods=['GET'])
def index(page=0):
    """
    Returns a page of posts in reverse chronological order
    """
    return 'TODO'

@blog.route('/new', methods=['GET'])
def new():
    """
    Returns the new post form
    """
    return 'TODO'

@blog.route('/', methods=['POST'])
def create():
    """
    Creates a post
    """
    return 'TODO'

@blog.route('/<string:slug>', methods=['GET'])
def show(slug):
    """
    Returns a single post
    """
    return 'TODO'

@blog.route('/<string:slug>/edit', methods=['GET'])
def edit(slug):
    """
    Returns the edit form for a specific post
    """
    return 'TODO'

@blog.route('/<string:slug>', methods=['POST', 'PATCH', 'PUT'])
def update(slug):
    """
    Updates a post
    """
    return 'TODO'

@blog.route('/<string:slug>', methods=['DELETE'])
@blog.route('/<string:slug>/delete', methods=['POST'])
def destroy(slug):
    """
    Removes a single post
    """
    return 'TODO'

