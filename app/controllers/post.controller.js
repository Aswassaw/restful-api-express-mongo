const db = require('../models');

const Post = db.posts;

exports.findAll = (req, res) => {
    Post.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Terjadi suatu kesalahan saat mengambil data.",
            status: 500,
        })
    });
}

exports.create = (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        published: req.body.published ? req.body.published : false,
    })

    post.save(post).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Terjadi suatu kesalahan saat menyimpan data.",
            status: 409,
        });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Post.findById(id).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Terjadi suatu kesalahan saat mengambil data.",
            status: 500,
        })
    });
}

exports.update = (req, res) => {
    const id = req.params.id;

    Post.findByIdAndUpdate(id, req.body).then((result) => {
        if (!result) {
            res.status(404).send({
                message: "Post Not Found.",
            })
        } else {
            res.send({
                message: "Post berhasil diupdate."
            })
        }
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Terjadi suatu kesalahan saat mengubah data.",
            status: 409,
        });
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Post.findByIdAndRemove(id).then((result) => {
        if (!result) {
            res.status(404).send({
                message: "Post Not Found.",
            })
        } else {
            res.send({
                message: "Post berhasil dihapus."
            })
        }
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Terjadi suatu kesalahan saat menghapus data.",
            status: 409,
        });
    });
}