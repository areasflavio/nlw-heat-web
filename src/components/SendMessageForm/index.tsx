import { FormEvent, useCallback, useContext, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';

import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/api';

import styles from './styles.module.scss';

const SendMessageForm: React.FC = () => {
  const { user, signOut } = useContext(AuthContext);

  const [message, setMessage] = useState('');

  const handleSendMessage = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (!message.trim()) return;

      try {
        await api.post('/messages', { message });

        setMessage('');
      } catch (error) {
        console.log(error);
      }
    },
    [message]
  );

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>

        <strong className={styles.userName}>{user?.name}</strong>

        <span className={styles.userGithub}>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual a sua expectativa para o evento?"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />

        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  );
};

export { SendMessageForm };
