import { styles } from '@/src/style';
import { AccordionItemPros } from '@/src/types';
import * as React from 'react';
import { List } from 'react-native-paper';

const AccordianView = ({ children, title, descriptions }: AccordionItemPros): JSX.Element => (

  <List.Accordion
    title={title}
    description={descriptions}
    descriptionStyle={styles.shortDescription}
    style={styles.accodianHeaderContainer2}
    titleStyle={styles.accordTitle}>
    {children}
  </List.Accordion>
);

export default AccordianView;