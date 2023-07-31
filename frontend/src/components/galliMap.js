import AsyncSelect from "react-select/async";
import { useRef } from "react";
import axios from "axios";
import { useMutate } from "../hooks/useMutateData";

const GALLI_MAPS_ACCESS_TOKEN = process.env.REACT_APP_GALLI_MAPS_ACCESS_TOKEN;

const GalliMap = () => {
  const timeout = useRef();
  const locationMutation = useMutate();
  console.log(locationMutation?.data?.data?.data, "=========line 13");

  const loadOptions = (inputValue, callback) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      axios
        .get(
          `https://route-init.gallimap.com/api/v1/search/autocomplete?accessToken=${GALLI_MAPS_ACCESS_TOKEN}&word=${inputValue}`
        )
        .then((res) => {
          console.log(res, res.data.data, "=== line 21");
          return res.data.data.map((location) => ({
            value: location.name,
            label: location.name,
          }));
        })
        .then((options) => {
          console.log(options, "options");
          callback(options);
        });
    }, 500);
  };

  const changeHandler = (selectedOptions) => {
    const selectedLocations = selectedOptions.map((option) => ({
      value: option.value,
      label: option.label,
    }));
    locationMutation.mutate(["location", selectedLocations]);
  };

  return (
    <div className="m-0 h-1/2 w-1/2 border-gray-500/50 p-0">
      <AsyncSelect
        placeholder="Search the location"
        loadOptions={loadOptions}
        cacheOptions={true}
        isClearable
        onChange={changeHandler}
        isMulti={true}
      />
    </div>
  );
};

export default GalliMap;
