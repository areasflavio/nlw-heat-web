import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg';

const MessageList: React.FC = () => {
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            temporibus minus neque iste, eligendi asperiores illum accusantium,
            numquam, illo autem ex quisquam ab cupiditate quibusdam
            reprehenderit pariatur vel inventore dolorem.
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/areasflavio.png"
                alt="Flávio Arêas"
              />
            </div>
            <span>Flávio Arêas</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export { MessageList };
