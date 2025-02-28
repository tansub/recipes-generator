import Post from "../models/Post.js";
// import User from "../models/User.js";

// create post
export const createPost = async (req, res) => {
    try {
      const { title, description, ingredients, instructions } = req.body;
      const userId = req.userId; 
  
      if (!title || !description || !ingredients || !instructions) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const newPost = new Post({
        title,
        description,
        ingredients,
        instructions,
        userId, 
      });
  
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

// Get All Posts
// export const getAll = async (req, res) => {
//   try {
//     const posts = await Post.find().sort("-createdAt");
//     const popularPosts = await Post.find().limit(5).sort("-views");

//     if (!posts) {
//       return res.json({ message: "There are no posts" });
//     }

//     res.json({ posts, popularPosts });
//   } catch (error) {
//     res.json({ message: "Something went wrong" });
//   }
// };

// get post by id
export const getById = async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        { $inc: { views: 1 } },
        { new: true }
      );
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

// get posts
export const getMyPosts = async (req, res) => {
    try {
      const userId = req.userId; 
      const posts = await Post.find({ userId }).sort("-createdAt");
  
      if (!posts.length) {
        return res.json({ message: "You have no posts" });
      }
  
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

// remmove post
export const removePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: "Post does not exist" });
  
      if (post.userId.toString() !== req.userId) {
        return res.status(403).json({ message: "You can only delete your own posts" });
      }
  
      await Post.findByIdAndDelete(req.params.id);
      res.json({ message: "Post was deleted" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

// update post
export const updatePost = async (req, res) => {
    try {
      console.log("Received update request for ID:", req.params.id);
      console.log("Request Body:", req.body);
  
      const { title, description, ingredients, instructions } = req.body;
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error("Invalid ID:", id);
        return res.status(400).json({ message: "Invalid post ID format" });
      }
  
      const post = await Post.findById(id);
      if (!post) {
        console.error("Post not found with ID:", id);
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Ensure only the owner can update
      if (post.userId.toString() !== req.userId) {
        console.error("Unauthorized update attempt by user:", req.userId);
        return res.status(403).json({ message: "You can only update your own posts" });
      }
  
      // Update the post
      post.title = title || post.title;
      post.description = description || post.description;
      post.ingredients = ingredients || post.ingredients;
      post.instructions = instructions || post.instructions;
  
      await post.save();
  
      console.log("Post updated successfully:", post);
      res.status(200).json(post);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  