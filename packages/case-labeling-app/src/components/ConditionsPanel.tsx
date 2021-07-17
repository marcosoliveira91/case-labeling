import styles from '../styles/components/ConditionsPanel.module.scss';
import { Select } from 'antd';
import { Condition } from '../interfaces/condition.interface';

export interface ConditionsPanelProps {
  conditions: Condition[];
  onChange(value: string): void;
  value: string;
}

export const ConditionsPanel: React.FC<ConditionsPanelProps> = ({ conditions, value, onChange }: ConditionsPanelProps) => (
  <Select
    showSearch
    style={{ width: '100%' }}
    placeholder='Search for ICD-10 diagnosis codes'
    optionFilterProp='children'
    defaultActiveFirstOption={false}
    filterOption={(input, option) => (option?.children as string).toLowerCase().includes(input?.toLowerCase())}
    onChange={onChange}
    value={value}
  >
    { conditions.map(condition => (
      <Select.Option key={condition.code} value={condition.code} >{`${condition.description} (${ condition.code })`}</Select.Option>
    ))}
  </Select>
);
