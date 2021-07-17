import styles from '../styles/components/CasePanel.module.scss';
import { Case } from '../interfaces/case.interface';
import { Input } from 'antd';

export interface CasePanelProps {
  case: Case;
}

export const CasePanel: React.FC<CasePanelProps> = ({ case: current }: CasePanelProps) => {
  return (
    <section
      className={styles.panelContent}
      style={{ width: '100%' }}
    >
      <div>
        <Input disabled value={current.code} bordered={false} style={{ display: 'none' }} />
        <div className={styles.row}>
          <p className={`${styles.label} ${styles.refLabel}`}># Ref.:</p>
          <p className={`${styles.value} ${styles.refValue}`}>
            { current.code }
          </p>
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Description:</p>
          <p className={styles.value}>{current.description}</p>
        </div>
      </div>
    </section>
  );
};
