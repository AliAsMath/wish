import BasicInformation from "../components/basicInformation/BasicInformation";
import { useEffect, useState } from "react";
import FindPosition from "../components/findPosition/FindPosition";
import ConfirmDetails from "../components/confirmDetails/ConfirmDetails";
import SubmitedResult from "../components/submitedResult/SubmitedResult";
import { getAllCountries } from "./../util/api";

export default function Home({ countriesList }) {
  const [page, setTranslate] = useState(0);
  const [countries, setCountries] = useState(countriesList);

  useEffect(() => {
    const getCountriesList = async () => {
      const result = await getAllCountries();
      const countriesList = result.data.map((item) => {
        return { label: item.name, id: item._id };
      });

      setCountries(countriesList);
    };
    getCountriesList();
  }, []);

  const nextSlide = () => setTranslate((prev) => prev + 1);
  const prevSlide = () => setTranslate((prev) => prev - 1);

  return (
    <div className="h-full overflow-hidden">
      <div
        className="flex w-full h-full transition-transform "
        style={{ transform: `translateX(calc(-${page}*100%))` }}
      >
        <BasicInformation nextSlide={nextSlide} countries={countries} />
        <FindPosition prevSlide={prevSlide} nextSlide={nextSlide} />
        <ConfirmDetails prevSlide={prevSlide} nextSlide={nextSlide} />
        <SubmitedResult />
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  let countriesList = [];
  try {
    const result = await getAllCountries();
    countriesList = result.data.map((item) => {
      return { label: item.name, id: item._id };
    });
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      countriesList,
    },
    revalidate: 10,
  };
}
