import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import MarineDataCard from '../MarineDataCard/MarineDataCard.js'

storiesOf('MarineDataCard', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withInfo()(() => (
      <MarineDataCard
      />
    )),
  );
