import { position } from "./dummy-data";

const educationScore = {
  "Associate degree": 10,
  "Bachelor degree": 20,
  "Master degree": 30,
  Phd: 40,
};

export const scoreCalculation = ({ education, experience }) => {
  const userScore = educationScore[education] + 2 * experience;
  let sumOfDifference = 0;
  position.forEach(
    (item) =>
      (sumOfDifference =
        sumOfDifference + 100 - Math.abs(item.score - userScore))
  );

  const positionWithPossibility = position.map((item) => {
    return {
      ...item,
      possibility: Math.round(
        ((100 - Math.abs(item.score - userScore)) * 100) / sumOfDifference
      ),
    };
  });

  return positionWithPossibility;
};
