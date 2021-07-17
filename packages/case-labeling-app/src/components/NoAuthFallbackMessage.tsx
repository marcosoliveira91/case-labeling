import styles from '../styles/components/NoAuthFallbackMessage.module.scss';

export const NoAuthFallbackMessage:  React.FC = () => (
  <div className={styles.messageContainer}>
    <h2 className={styles.title}>Welcome to the <b>Case Labeling</b> App 👋 </h2>
    <p className={styles.text}>Let's get you signed in!</p>
  </div>
);
