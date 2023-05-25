import { useState } from "react";
import "./App.css";
import FormDate from "./components/FormDate";

function App() {
  const [dateBirth, setDateBirth] = useState(new Date());

  return (
    <main>
      <FormDate
        name="birthdate"
        id="birthdate"
        label="Date de naissance"
        value={dateBirth}
        onChange={(newValue) => setDateBirth(newValue)}
      />
      <p>Date : {dateBirth.toISOString()}</p>
      <FormDate
        name="birthdate"
        id="birthdate"
        label="Date de naissance erronée"
        isError
        errorMessage="erreur dans la date"
      />
      <FormDate
        name="minmax"
        id="minmax"
        label="entre 01/04/2012 et 08/10/2017"
        defaultValue={new Date("2012-04-01")}
        minDate={new Date("2012-04-01")}
        maxDate={new Date("2017-10-08")}
      />
      <FormDate name="birthdate" id="birthdate" label="disabled" isDisabled />
      <FormDate
        name="birthdate"
        id="birthdate"
        label="read only"
        isReadOnly
        value={new Date("2012-04-01")}
      />
    </main>
  );
}

export default App;
