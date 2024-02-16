import User from "../schemas/userSchema.mjs";

const register = async (req,res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        res.status(201).json({ message: "User registered successfully", user});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

export default register;

