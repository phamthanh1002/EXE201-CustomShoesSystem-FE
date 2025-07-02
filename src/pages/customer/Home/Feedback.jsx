import React from 'react';
import { Carousel, Row, Col, Typography } from 'antd';
import ProductCard from '../../../components/common/ProductCard';
import { chunkArray } from '../../../utils/chunkArray';
import ReviewCard from '../../../components/common/ReviewCard';
import RevealOnScroll from '../../../utils/RevealOnScroll';
import useFeedback from '../../../hooks/useFeedback';

const { Title } = Typography;

export default function Feedback() {
  const { feedbacks, loading, error } = useFeedback();

  // console.log(feedbacks);

  const slides = chunkArray(feedbacks, 4);

  return (
    <RevealOnScroll>
      <div style={{ padding: '1rem' }}>
        <Title level={3} style={{ textAlign: 'center', fontWeight: 600 }}>
          Feedback
        </Title>
        <div
          style={{
            width: 80,
            height: 4,
            backgroundColor: 'black',
            margin: '0 auto 2rem auto',
          }}
        />

        <Carousel
          dotPosition="bottom"
          autoplay={{ dotDuration: true }}
          autoplaySpeed={5000}
          dots={true}
          style={{
            // backgroundColor: "rgb(224, 224, 224)",
            boxShadow: 'revert 0px 0px 20px rgba(0, 0, 0, 0.5) ',
            borderRadius: '1rem',
          }}
        >
          {slides.map((group, index) => (
            <div key={index}>
              <Row
                gutter={[24, 32]}
                style={{ padding: '1.5rem 2rem 1.5rem 2.5rem' }}
                justify="center"
              >
                {feedbacks.map((review, idx) => (
                  <Col
                    key={idx}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <ReviewCard review={review} />
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Carousel>
      </div>
    </RevealOnScroll>
  );
}
