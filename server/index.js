const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const multer = require('multer')
const dotenv = require("dotenv")
const upload = multer({
    dest: 'uploads/'
})
const fs = require('fs');

const User = require("./models/UserModel")
const Post = require("./models/Post")

dotenv.config()

const app = express();
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8scihlg.mongodb.net/users`)

const salt = bcrypt.genSaltSync(10);
const secret = "fjakbfkjaksjnfsjkbdfeihaonhuifhisshncua"

app.post("/register", async (req, res) => {
    const {
        username,
        password
    } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
})

app.post("/login", async (req, res) => {
    const {
        username,
        password
    } = req.body;
    const user = await User.findOne({
        username
    })

    if (!user) {
        res.status(400).json("User Not Found!")
    } else {
        const passCheck = bcrypt.compareSync(password, user.password)
        if (passCheck) {
            jwt.sign({
                username,
                id: user._id
            }, secret, {}, (err, token) => {
                if (err) {
                    console.log(err);
                };
                res.cookie('token', token).json({
                    id: user._id,
                    username,
                });
            })
        } else {
            res.status(400).json("Wrong Credentials!")
        }
    }
})

app.get("/profile", (req, res) => {
    const {
        token
    } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
})

app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok")
})

app.post("/post", upload.single('file'), async (req, res) => {
    const {
        originalname,
        path
    } = req.file;
    const parts = originalname.split(".")
    const extension = parts[parts.length - 1]
    const newPath = path + "." + extension
    fs.renameSync(path, newPath)

    const {
        token
    } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const {
            title,
            summary,
            content
        } = req.body;
        const post = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id
        })
        res.json(post);
    });
})

app.get('/post', async (req, res) => {
    res.json(
        await Post.find()
        .populate('author', ['username'])
        .sort({
            createdAt: -1
        })
        .limit(20)
    );
});

app.put('/post', upload.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const {
            originalname,
            path
        } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const {
        token
    } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const {
            id,
            title,
            summary,
            content
        } = req.body;
        const post = await Post.findById(id);
        const isAuthor = JSON.stringify(post.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('you are not the author');
        }
        await post.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : post.cover,
        });

        res.json(post);
    });

});

app.get("/post/:id", async (req, res) => {
    const {
        id
    } = req.params;
    const post = await Post.findById(id).populate("author", ["username"])
    res.json(post)
})

app.listen(4000, (req, res) => {
    console.log("Server Running");
})

// /mongodb+srv://hridyanshverma:helloworld69@cluster0.8scihlg.mongodb.net/