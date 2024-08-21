const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort( {createdAt: -1})
    .then((result) => {
        res.render('pages/index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
        console.log(err);
    })
}

const blog_details = (req, res) => {

    console.log("Here!");
    
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('pages/details', { blog: result, title: 'Blog Details' });
        console.log("Blog Found:", id, result)
    })
    .catch((err) => {
        res.status(404).render('404', { title: 'Blog not found' })
    });
};



const blog_create_get =  (req, res) => {
    res.render('pages/create', { title: 'Create New Blog Post' });
};

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
    })
};

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({ redirect: '/' });
    })
    .catch((err) => {
        console.log(err);
    })
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
};