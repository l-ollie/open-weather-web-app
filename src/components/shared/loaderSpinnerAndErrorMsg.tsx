import { Alert, Container, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import IWeather from '../../models/IWeather';

function LoaderSpinner(props: IMapStateToProps): JSX.Element {
    const isLoading: string | null = props.weather.loading === true ? null : "d-none";
    const hasError: string | null = props.weather.error !== null ? null : "d-none";

    return (
        <Container fluid className='full-detail-page' >
            <Alert variant="danger" className={`${hasError}`}>
                {props.weather.error?.message}
            </Alert>
            <div className={`d-flex justify-content-center h-100 ${isLoading}`}>
                <div className="d-flex justify-content-center flex-column">
                    <Spinner animation="border" role="status" className="d-flex justify-content-center">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </div>
        </Container>
    );
}

interface IMapStateToProps {
    weather: IWeather;
}
const mapStateToProps = (state: IMapStateToProps) => {
    return {
        weather: state.weather
    };
}

export default connect(mapStateToProps)(LoaderSpinner);
