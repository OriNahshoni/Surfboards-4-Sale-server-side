import { Router } from "express";
import { ILogin, IUser } from "../@types/user";
import { User } from "../database/model/user";
import { validateLogin, validateRegistration } from "../middleware/validation";
import { createUser, validateUser } from "../service/user-service";
import { isAdmin } from "../middleware/is-admin";
import { isAdminOrUser } from "../middleware/is-admin-or-user";
import { Logger, logger } from "../logs/logger";
import { validateToken } from "../middleware/validate-token";
import { error } from "winston";

const router = Router();

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find();

    res.json(allUsers);
  } catch (e) {
    logger.error("Unauthorized: You must be an Admin user.", 401, error);
    next(e);
  }
});


router.patch("/:id", validateToken, isAdminOrUser, async (req, res, next) => {
  try {
    // Extract the user ID from the request path
    const userIdFromPath = req.params.id;

    // Extract the isBusiness field from the request body
    const { isBusiness } = req.body;

    // If isBusiness is not provided in the request body, return 400 Bad Request
    if (isBusiness === undefined) {
      return res
        .status(400)
        .json({ error: "Missing required parameter: isBusiness" });
    }

    // Find the user by ID and update their isBusiness field
    const user = await User.findByIdAndUpdate(
      { _id: userIdFromPath },
      { $set: { isBusiness } },
      { new: true }
    );

    // If the user is not found, return 404 Not Found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the updated user
    return res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
});


router.get("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = (await User.findById(id).lean()) as IUser;

    const { password, ...rest } = user;
    return res.json({ user: rest });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", isAdminOrUser, validateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findOneAndDelete({ _id: id });
    Logger.verbose("deleted the user");
    return res.json(deleteUser);
  } catch (e) {
    next(e);
  }
});

router.post("/", validateRegistration, async (req, res, next) => {
  try {
    const saved = await createUser(req.body as IUser);
    res.status(201).json({ message: "Saved", user: saved });
  } catch (err) {
    next(err);
  }
});

const fetchUserData = async (email: string) => {
  // Fetch additional user data from your data source
  const userData = await User.findOne({ email }, { isAdmin: 1, isBusiness: 1 });
  // Return the fetched user data
  return userData;
};
router.post("/login", validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const jwt = await validateUser(email, password);
    const userData = await fetchUserData(email);

    const responsePayload = {
      ...jwt,
      ...userData,
    };
    res.json(responsePayload);
  } catch (error) {
    Logger.error("Login failed", 500, error);
    next(error);
  }
});
export { router as usersRouter };
