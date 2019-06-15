import { connect } from 'react-redux';
import InitialScreen from '../screens/InitialScreen';

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitialScreen);
