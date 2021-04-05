import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import Select, { DefaultSelectProps, Options, Value } from './Select.component';
import debounce from 'lodash.debounce';

export type LoadOptionCallback = (options: Options) => void;

export type AsyncSelectProps = {
  defaultOptions?: boolean;
  loadOptions: (value: string, callback: LoadOptionCallback) => void;
  onInputChange?: (value: string) => void;
};

export type Props = DefaultSelectProps & AsyncSelectProps;

const AsyncSelect: React.FC<Props> = ({
  loadOptions,
  onInputChange,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const [loadedOptions, setLoadedOptions] = useState<Options>([]);
  const [defaultOptions, setDefaultOptions] = useState<Options>([]);

  useLayoutEffect(() => {
    if (props.defaultOptions) {
      setLoading(true);
      handleLoadOptions(inputValue, (options: Options) => {
        setLoading(false);
        setDefaultOptions(options);
      });
    }
  }, [props.defaultOptions]);

  const handleInputChange = (newValue: string): void => {
    onInputChange?.(newValue);
    setInputValue(newValue);

    if (!newValue) {
      return;
    }

    setLoading(true);

    handleLoadOptions(newValue, (newOptions: Options) => {
      setLoading(false);
      setLoadedOptions(newOptions);
    });
  };

  const handleLoadOptions = useCallback(
    debounce((newValue, callback) => loadOptions(newValue, callback), 300),
    []
  );

  const options = useMemo(
    () => (inputValue ? loadedOptions : defaultOptions || []),
    [defaultOptions, loadedOptions, inputValue]
  );

  return (
    <Select
      {...props}
      options={options}
      onInputChange={handleInputChange}
      isLoading={loading}
    />
  );
};

export default AsyncSelect;
