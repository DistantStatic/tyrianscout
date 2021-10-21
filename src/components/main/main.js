import { Container} from 'react-bootstrap';
import Daily from '../../containers/achievements/daily/daily-view';
import ModularDaily from '../../containers/achievements/modular-daily/modular-daily';

export default function MainView() {

    return(
        <Container>
            <ModularDaily />
        </Container>
    )
}
