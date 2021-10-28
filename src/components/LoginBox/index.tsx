import { useContext } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';

import { AuthContext } from '../../contexts/auth';

import styles from './styles.module.scss';

const LoginBox: React.FC = () => {
  const { signInURL, user } = useContext(AuthContext);

  console.log(user);

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInURL} className={styles.signInWithGithub}>
        <VscGithubInverted size="24" />
        Entrar com Github
      </a>
    </div>
  );
};

export { LoginBox };
