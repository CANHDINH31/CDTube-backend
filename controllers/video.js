import { createError } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  const arrayImg = [
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(1).jpg?alt=media&token=abc4f33f-14b0-4e3b-937b-5042828ec840",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(2).jpg?alt=media&token=09520736-2518-42c3-a174-7f3043fd7317",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(3).jpg?alt=media&token=d4223a62-732f-47e9-a805-dcb34f10cb7d",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(4).jpg?alt=media&token=6f840f71-b478-4acd-bada-e1025d789f3d",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(5).jpg?alt=media&token=1a202d38-e158-4573-8ff1-0bea731b9cb7",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(6).jpg?alt=media&token=098625b1-8ce7-4ce6-a50c-4dea8f14ca31",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(7).jpg?alt=media&token=192395e5-84bd-410e-9ee6-71fc64480e7b",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images%20(8).jpg?alt=media&token=4bdd4f3a-15e3-45af-8eae-2bc5bf09eb78",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/images.jpg?alt=media&token=4ed87797-3006-47e7-821e-71d26a9233da",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/t%E1%BA%A3i%20xu%E1%BB%91ng%20(1).jpg?alt=media&token=b736cd23-0984-4167-88c3-f50b0862be44",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/t%E1%BA%A3i%20xu%E1%BB%91ng%20(2).jpg?alt=media&token=42ac4a94-0802-4c7c-9c49-1592c4792be1",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/t%E1%BA%A3i%20xu%E1%BB%91ng.jpg?alt=media&token=600dafef-eb6d-41f8-b297-aef3cfe4ac8f",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-19.jpg?alt=media&token=6d10fed4-b83b-4196-8db7-359c40c0bb7d",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-18.jpg?alt=media&token=533ddb87-ad24-4953-b639-b952fa980fa30",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-17.jpg?alt=media&token=4f6dd639-8d76-4c75-a977-ed4edd99bc40",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-16.jpg?alt=media&token=4077cd27-05bf-4170-86e8-1af13a19d7cb",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-15.jpg?alt=media&token=3237b745-8657-479d-a2db-ac7836e34cc8",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-14.jpg?alt=media&token=f3e9bd56-d997-493e-8160-6cdee4483376",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-13.jpg?alt=media&token=d0fd569a-980d-48e7-a360-547108ae0021",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-12.jpg?alt=media&token=f75ef620-d8c0-440d-9dc3-242fe39c79c6",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-11.jpg?alt=media&token=2c4ba3ab-4820-46dc-adaf-2081273476c0",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-10.jpg?alt=media&token=beff5900-3ae4-4ad1-a6be-450a56aa1cb1",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-1.jpg?alt=media&token=6963b674-2ead-4667-838b-588b209887c6",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-4.jpg?alt=media&token=a6de3de0-7b00-4509-8a0d-6dc51bef5616",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-2.jpg?alt=media&token=bf8f0f97-91b0-4998-94a5-5e70647884f3",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-20.jpg?alt=media&token=f39a49ae-9e9a-40db-9d86-4196ad8a17f9",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-21.jpg?alt=media&token=d85a67e7-a8a2-4281-acc6-5b7682abd943",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-22.jpg?alt=media&token=25741bb1-71ef-4c26-ab86-76287c62daae",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-23.jpg?alt=media&token=6a022087-7b40-401f-b542-6960fa8c28ff",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-24.jpg?alt=media&token=86a644a5-213f-4181-b697-61db993d792f",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-25.jpg?alt=media&token=9e8642fc-8cb4-4d3b-b2f4-8fb4a912387f",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-26.jpg?alt=media&token=734d5e02-6942-40e3-b8b5-173591e64d57",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-27.jpg?alt=media&token=3988ce19-f328-4a49-adab-73d18dcb94f5",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-28.jpg?alt=media&token=d910f346-5cf2-483f-adf0-78c4df61fe15",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-29.jpg?alt=media&token=99405e08-03fa-46ac-b70d-59d10bf82d3d",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-3.jpg?alt=media&token=4ed63936-8cfd-4624-89e8-8e9de014229b",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-30.jpg?alt=media&token=843e473b-78dc-4a5c-b421-c129341139ff",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-31.jpg?alt=media&token=472e7848-a103-4aee-a481-1abb145b908e",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-32.jpg?alt=media&token=f5e17b6f-0846-4d25-bf49-eecaf71881cc",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-33.jpg?alt=media&token=e0c3b7c8-da48-4956-ab9e-957c6899a5c0",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-34.jpg?alt=media&token=dd85d6c8-368c-4e48-8038-3bcd9267a459",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-35.jpg?alt=media&token=85b244eb-4e4e-4fd2-97af-9c4110dd8a24",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-36.jpg?alt=media&token=eb972397-9e26-4bc7-98a1-0080a1262ad8",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-37.jpg?alt=media&token=76dc2b57-6461-46b7-a4ae-803b10d399ab",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-38.jpg?alt=media&token=b846f49f-bdf7-41e5-b172-2c98d93742e9",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-39.jpg?alt=media&token=8254d9d5-1e74-4a0b-83eb-14faf7a58ba2",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-40.jpg?alt=media&token=8863f5b0-7f87-42fc-b182-845e2d9b19b4",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-41.jpg?alt=media&token=6aa36960-05f4-4025-a47f-41422025e5f4",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-42.jpg?alt=media&token=6dfba01b-1725-4f25-bc2b-5dd92b9bd442",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-43.jpg?alt=media&token=ccff1097-46f0-4a12-b9cc-266d8a113e77",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-44.jpg?alt=media&token=b663cf65-36ba-4c92-a333-f68371581b53",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-45.jpg?alt=media&token=7b3bd5b7-5d9c-4c16-801d-300fe57f54b9",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-46.jpg?alt=media&token=d816ca2d-4d2a-4887-8c45-5f894451891a",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-47.jpg?alt=media&token=19da9a2e-ba9e-47f6-8506-d9b1ce092749",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-48.jpg?alt=media&token=7e4eb9d9-4926-48c2-9ee5-e8e42de808d1",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-49.jpg?alt=media&token=046dcb28-7315-4785-af10-2c80ee6d1da6",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-5.jpg?alt=media&token=07add8e6-d8c7-49ab-879c-11649665a76f",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-50.jpg?alt=media&token=20eb7532-cda7-4a7b-9174-19f53827f3ff",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-6.jpg?alt=media&token=d30173cb-4388-47c0-9e98-0eb771a5a456",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-7.jpg?alt=media&token=6887d153-6fc9-4e8a-8dd5-556e9f1be342",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-8.jpg?alt=media&token=fcacace8-6679-41a5-b98b-a200c885c4f7",
    "https://firebasestorage.googleapis.com/v0/b/videosharing-160a6.appspot.com/o/imagedefault%2Fhinh-nen-cho-may-tinh-9%5D.jpg?alt=media&token=745e8ca7-8e70-4bce-9a63-21fe2382abfd",
  ];
  if (!req.body.imgUrl) {
    newVideo.imgUrl =
      arrayImg[Math.round(Math.random() * (arrayImg.length - 1))];
  }
  if (req.body.title === "") {
    newVideo.title = "Không có tiêu đề";
  }
  if (req.body.desc === "") {
    newVideo.desc = "Không có mô tả";
  }
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can update only your video"));
    }
  } catch (error) {
    next(error);
  }
};
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));

    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);

      res.status(200).json("The video has been deleted");
    } else {
      return next(createError(403, "You can delete only your video"));
    }
  } catch (error) {
    next(error);
  }
};
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const getVideoChannel = async (req, res, next) => {
  try {
    const count = await Video.countDocuments({ userId: req.params.id });
    const videos = await Video.aggregate([
      { $match: { userId: req.params.id } },
      { $sample: { size: 30 } },
      { $sort: { createdAt: 1 } },
    ]);
    res.status(200).json({ videos, count });
  } catch (error) {
    next(error);
  }
};

export const addView = async (req, res, next) => {
  try {
    const video = await Video.findOne({ _id: req.params.id });
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    await User.findByIdAndUpdate(video.userId, {
      $inc: { totalViews: 1 },
    });
    res.status(200).json("The view has been increased.");
  } catch (error) {
    next(error);
  }
};

export const random = async (req, res, next) => {
  try {
    const count = await Video.countDocuments();
    const videos = await Video.aggregate([{ $sample: { size: 30 } }]);
    res.json({ videos, count });
  } catch (error) {
    next(error);
  }
};

export const recommend = async (req, res, next) => {
  try {
    const count = await Video.countDocuments();
    const videos = await Video.aggregate([{ $sample: { size: 30 } }]);
    res.json({ videos, count });
  } catch (error) {
    next(error);
  }
};

export const trend = async (req, res, next) => {
  try {
    const count = await Video.countDocuments();
    const videos = await Video.aggregate([{ $sample: { size: 30 } }]).sort({
      views: -1,
    });
    res.status(200).json({ videos, count });
  } catch (error) {
    next(error);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    const videos = list.flat().sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json({ count: videos.length, videos });
  } catch (error) {
    next(error);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  console.log(tags);
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
