import User from "../models/User.js";
import bcrypt from "bcryptjs";


export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "Benutzer existiert bereits." });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashed });
    await newUser.save();
    res.status(201).json({ message: "Registrierung erfolgreich!" });
  } catch (error) {
    res.status(500).json({ message: "Fehler bei der Registrierung.", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden." });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Falsches Passwort." });

    res.status(200).json({ message: "Login erfolgreich!" });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Login.", error });
  }
};
