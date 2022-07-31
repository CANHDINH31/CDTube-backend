import e from "express";
import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can update only your account"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can update only your account"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });

    res.status(200).json("Subscription successfull");
  } catch (error) {
    next(error);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });

    res.status(200).json("UnSubscription successfull");
  } catch (error) {
    next(error);
  }
};

export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;

  try {
    const video = await Video.findOne({ _id: videoId });
    if (req.body.isLike === false && req.body.isDislike === false) {
      await Video.findByIdAndUpdate(videoId, {
        $addToSet: { likes: id },
      });
      await User.findByIdAndUpdate(video.userId, { $inc: { totalLikes: 1 } });
    } else if (req.body.isLike === false && req.body.isDislike === true) {
      await Video.findByIdAndUpdate(videoId, {
        $addToSet: { likes: id },
        $pull: { dislikes: id },
      });
      await User.findByIdAndUpdate(video.userId, { $inc: { totalLikes: 1 } });
    } else {
      await Video.findByIdAndUpdate(videoId, {
        $pull: { likes: id },
      });
      await User.findByIdAndUpdate(video.userId, { $inc: { totalLikes: -1 } });
    }

    res.status(200).json("The video has been liked");
  } catch (error) {
    next(error);
  }
};

export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    const video = await Video.findOne({ _id: videoId });
    if (req.body.isDislike === false && req.body.isLike === false) {
      await Video.findByIdAndUpdate(videoId, {
        $addToSet: { dislikes: id },
      });
    } else if (req.body.isDislike === false && req.body.islike === true) {
      await Video.findByIdAndUpdate(videoId, {
        $addToSet: { dislikes: id },
        $pull: { likes: id },
      });
      await User.findByIdAndUpdate(video.userId, { $inc: { totalLikes: -1 } });
    } else {
      await Video.findByIdAndUpdate(videoId, {
        $pull: { dislikes: id },
      });
    }
    res.status(200).json("The video has been disliked");
  } catch (error) {
    next(error);
  }
};
