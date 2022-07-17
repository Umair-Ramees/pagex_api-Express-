const userDeo = require('../../daos/userDao/userDao');
const passionDeo = require('../../daos/passionDao/pasionDao');
const { deleteFile, isUserAuthorized } = require('../../utils/utils');

const getUserInfo = async (req, userId, res) => {
  const user = await userDeo.getUserById(userId);

  if (user != null) {
    // const passion = await passionDeo.getPassionById(user.passion);
    return res.status(200).json({
      success: true,
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        fullname: user.fullname,
        email: user.email,
        profilePhoto: user.profilePhoto,
        bio: user.bio,
        headline: user.headline,
        location: user.location,
        passion: {
          title: "",
          description: "",
          image: "",
        },
        isAffiliated: user.isAffiliated || null,
        organization: user.organization || null,
        currentCategory: user.currentCategory || null,
      },
      code: 200,
    });
  }

  return res.status(200).json({
    success: false,
    data: null,
    code: 404,
  });
};

const editUserInfo = async (req, data, res) => {
  if (isUserAuthorized(req, data.userId, res)) {
    try {
      const user = await userDeo.getUserById(data.userId);
      if (user != null) {
        const photo = req.files && req.files.length > 0 ? req.files[0].path : user.profilePhoto;

        const updatedUserInfo = await userDeo.editUserInfo(data.userId, {
          bio: data.bio || user.bio,
          headline: data.headline || user.headline,
          location: data.location || user.location,
          profilePhoto: photo,
          dateOfLastUpdate: Date.now(),
        });

        // deleting old file
        if (!(updatedUserInfo.profilePhoto === user.profilePhoto)) {
          deleteFile(user.profilePhoto);
        }

        const passion = await passionDeo.getPassionById(updatedUserInfo.passion);

        return res.status(200).json({
          success: true,
          data: {
            firstname: updatedUserInfo.firstname,
            lastname: updatedUserInfo.lastname,
            fullname: updatedUserInfo.fullname,
            email: updatedUserInfo.email,
            profilePhoto: updatedUserInfo.profilePhoto,
            bio: updatedUserInfo.bio,
            headline: updatedUserInfo.headline,
            location: data.location,
            passion: {
              title: passion.passionTitle,
              description: passion.passionDescription,
              image: passion.passionImage,
            },
          },
          code: 200,
        });
      } else {
        return res.status(404).json({
          success: false,
          data: {
            msg: 'Invalid user Id',
          },
          code: 404,
        });
      }
    } catch (error) {
      console.error('Error occured while saving updated data ', error);
      return res.status(500).json({
        success: false,
        data: {
          msg: 'Error occured while saving data Or request body is not correct',
        },
        code: 500,
      });
    }
  }
};

module.exports = { getUserInfo, editUserInfo };
