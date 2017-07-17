import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const ITEMS_PER_ROW = Math.floor(WIDTH / 115);
const TOTAL_MARGIN = (15 * 2) + (ITEMS_PER_ROW * 1);
const IMAGE_WIDTH = (WIDTH - TOTAL_MARGIN) / (ITEMS_PER_ROW);

export default styles = {
  sectionHeaderText: {
    fontFamily: 'SourceSansPro-Bold',
    color: 'black',
    fontSize: 18,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  comingSoonText: {
    fontFamily: 'Source Sans Pro',
    fontSize: 14,
    color: 'red',
  },
  removeIconContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 22,
    width: 22,
    borderRadius: 11,
    marginRight: 3,
    marginBottom: 3,
  },
  smallImageStyle: {
    height: IMAGE_WIDTH,
    width: IMAGE_WIDTH,
    justifyContent: 'flex-end',
  },
};
