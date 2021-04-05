import React, { useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside.hook';
import styles from './Select.component.module.scss';
import Icon from '../Icon/Icon.component';
import classNames from 'classnames';

export type DefaultOption = {
  [key: string]: any;
};

export type Option = DefaultOption & {
  label: string;
  value: string;
};

export type Options = Option[];

export type Value = Option | null | void;

export type DefaultSelectProps = {
  value: Value;
  onChange: (value: Value) => void;
};

export type SelectProps = {
  options: Options;
  isLoading?: boolean;
  onInputChange?: (inputValue: string) => void;
};

export type Props = SelectProps & DefaultSelectProps;

const Select: React.FC<Props> = ({
  options,
  onInputChange,
  isLoading,
  value,
  onChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const closeOptions = () => {
    setShowOptions(false);
    handleInputChange('');
  };

  useClickOutside(ref, closeOptions);

  const handleInputChange = (searchValue: string): void => {
    setInputValue(searchValue);
    onInputChange?.(searchValue);
  };

  const handleClickOption = (newValue: Option): void => {
    handleInputChange('');
    onChange(newValue);
    setShowOptions(false);
  };

  return (
    <div ref={ref} className={styles.selectComponent}>
      <div
        className={styles.selectInput}
        onClick={() => setShowOptions((prevState) => !prevState)}
      >
        {!inputValue && (
          <div className={styles.display}>{value ? value.label : ''}</div>
        )}
        <input
          role={'search_input'}
          value={inputValue}
          placeholder={!value ? 'Select value' : ''}
          onChange={(event) => handleInputChange(event.target.value)}
          className={classNames(styles.field, {
            [styles.fieldWithOptions]: showOptions,
          })}
        />
        <button className={classNames('icon-btn', styles.toggle)}>
          <Icon icon={showOptions ? 'arrow_up' : 'arrow_down'}></Icon>
        </button>
      </div>

      {showOptions && (
        <div className={styles.options}>
          {!isLoading &&
            options.map((option) => (
              <div
                className={classNames(styles.option, {
                  [styles.optionSelected]: option === value,
                })}
                key={option.value}
                onClick={() => handleClickOption(option)}
              >
                {option.label}
              </div>
            ))}

          {!isLoading && !options.length && (
            <div className={classNames(styles.option, styles.optionEmpty)}>
              No options
            </div>
          )}

          {isLoading && (
            <div className={classNames(styles.option, styles.optionEmpty)}>
              Loading
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
