import PropTypes from 'prop-types';
import Header from '~/layouts/components/Header';
function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}
HeaderOnly.propTypes = {
    children: PropTypes.object.isRequired,
};

export default HeaderOnly;
