import { Container, Spinner } from 'react-bootstrap';

function LoaderSpinner() {

    return (
        <Container fluid className='full-detail-page' >
            <div className="d-flex justify-content-center h-100">
                <div className="d-flex justify-content-center flex-column">
                    <Spinner animation="border" role="status" className="d-flex justify-content-center">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </div>
        </Container>
    );
}

export default LoaderSpinner;