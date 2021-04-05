import React, { useState } from 'react';
import AsyncSelect, {
  LoadOptionCallback,
} from './Components/Select/AsyncSelect.component';
import './App.scss';
import { Options, Value } from './Components/Select/Select.component';

const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

function App(): JSX.Element {
  const [value, setValue] = useState<Value>();
  const [inputValue, setInputValue] = useState('');

  const filterColors = (inputValue: string): Options => {
    return colourOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue: string, callback: LoadOptionCallback) => {
    setTimeout(() => {
      callback(filterColors(inputValue));
    }, 1000);
  };

  return (
    <div className="App">
      Input value: {inputValue}
      <AsyncSelect
        value={value}
        onChange={setValue}
        defaultOptions
        loadOptions={loadOptions}
        onInputChange={setInputValue}
      />
    </div>
  );
}

export default App;
