import { User } from "../features/models/User";
import ImgSnow from "../assets/snow.jpg";
import ImgLeaf from "../assets/leaf.jpg";
import ImgTyler from "../assets/tyler.jpg";

export const sortedUsers = (users: User[]) => {
  return users.sort((userA, userB) => {
    const questionsLengthDiff =
      (userB.questions?.length ?? 0) - (userA.questions?.length ?? 0);
    if (questionsLengthDiff !== 0) {
      return questionsLengthDiff;
    }

    const answerUserA = Object.values(userA.answers);
    const answerUserB = Object.values(userB.answers);
    const answerLengthDiff =
      (answerUserB.length ?? 0) - (answerUserA.length ?? 0);

    if (answerLengthDiff !== 0) {
      return answerLengthDiff;
    }

    return answerLengthDiff > questionsLengthDiff
      ? answerLengthDiff
      : questionsLengthDiff;
  });
};

export const showImageUser = (avatarURL: string | null | undefined) => {
  if (avatarURL) {
    const filename = avatarURL.substring(avatarURL.lastIndexOf("/") + 1);
    switch (filename) {
      case "leaf.jpg":
        return ImgLeaf;
      case "tyler.jpg":
        return ImgTyler;
      default:
        return ImgSnow;
    }
  }
  return ImgSnow;
};
