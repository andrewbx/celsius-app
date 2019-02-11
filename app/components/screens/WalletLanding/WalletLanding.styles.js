import { getThemedStyle } from '../../../utils/styles-util';
import { FONT_SCALE } from "../../../config/constants/style";


const base = {
    container: {
        flex: 1,
        backgroundColor: '#DDDDDD',

    },
    balance: {
        flex: 1,

    },
    text: {
        fontSize: FONT_SCALE * 18,
        color: '#737A82',

    },
    interest: {
        flex: 1,
        marginLeft: 10
    },
    usd: {
        fontSize: FONT_SCALE * 28,
        paddingBottom: 5,
        fontWeight: 'bold',

    

    },
   
}

const themed = {
    light: {
    },

    dark: {
    },

    celsius: {
    }
}

const WalletLandingStyle = () => getThemedStyle(base, themed);

export default WalletLandingStyle