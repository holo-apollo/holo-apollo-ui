// @flow
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'ramda';

import GoodCard from 'common/components/molecules/GoodCard';
import type { GoodWithInfo } from 'containers/Entities/Goods/types';
import Layout from 'containers/Layout';
import { getCategoryPageLink, getGoodPageLink } from 'helpers/urls';
import GoodDetails from './GoodDetails';
import {
  MainCont,
  LeftCont,
  RightCont,
  BottomCont,
  Image,
  WhatElseCont,
  SimilarGoodsCont,
} from './styled';
import messages from './messages';

type Props = {
  good: GoodWithInfo,
  similarGoods: GoodWithInfo[],
  onPurchase: number => void,
};

const PureGoodPage = ({ good, similarGoods, onPurchase }: Props) => (
  <Layout
    withSearch={true}
    crumbs={[
      ...good.categories.map(category => ({
        message: category.name,
        link: getCategoryPageLink(category.slug),
      })),
      { message: good.name, link: getGoodPageLink(good.id) },
    ]}
  >
    <Helmet>
      <title>Holo Apollo Art | {good.name}</title>
      <meta name="description" content={good.description} />
    </Helmet>
    <MainCont>
      <LeftCont>
        {good.images.map(image => (
          <Image src={image.imageUrl} key={image.imageUrl} />
        ))}
      </LeftCont>
      <RightCont>
        <GoodDetails good={good} onPurchase={onPurchase} />
      </RightCont>
    </MainCont>
    {!isEmpty(similarGoods) && (
      <BottomCont>
        <WhatElseCont>
          <FormattedMessage {...messages.whatElse} />
        </WhatElseCont>
        <SimilarGoodsCont>
          {similarGoods.map(sGood => (
            <GoodCard key={sGood.id} {...sGood} onPurchase={onPurchase} />
          ))}
        </SimilarGoodsCont>
      </BottomCont>
    )}
  </Layout>
);

export default PureGoodPage;
