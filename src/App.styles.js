import { create } from './stylesheet';
import { vars, mixins } from './theme';

export default create({
  '.main': {
    color: '#f00',
    backgroundColor: vars.primary,
    ...mixins.applyPadding,
    '.inner': {
      color: 'green'
    }
  },
});
