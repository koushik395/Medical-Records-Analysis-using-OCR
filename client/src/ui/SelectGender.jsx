import Select from "./Select";

function SelectGender({ options, setGender, gender }) {
  function handleChange(e) {
    setGender(e.target.value);
  }
  return (
    <Select
      options={options}
      type="white"
      value={gender}
      onChange={handleChange}
    />
  );
}

export default SelectGender;
