import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../components/Contexts/UserContext';

const isAuth = (InnerComponent) => {

    const Component = (props) => {
        const [userToken] = useContext(UserContext);
        const history = useHistory();

        if (!userToken) {
            history.push('/login')

            return null;
        }

        return <InnerComponent {...props} />
    }

    return Component;
};

export default isAuth;