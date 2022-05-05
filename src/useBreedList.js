import { useEffect, useState } from "react";
const localCache = {};

function useBreedList(animal) {
  const [breedsList, setBreedsList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedsList([]);
    } else if (localCache[animal]) {
      setBreedsList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedsList([]);
      setStatus("loading");

      const json = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      ).then(res => res.json());

      localCache[animal] = json.breeds || [];
      setBreedsList(localCache[animal]);
      setStatus("loadded");
    }
  }, [animal]);

  return [breedsList, status];
}

export default useBreedList;
