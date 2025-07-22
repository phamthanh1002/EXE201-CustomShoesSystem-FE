import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Tag } from 'antd';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import Routing from '../../../components/common/Routing';

// Import hình ảnh marker đúng cách
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Cấu hình lại icon mặc định của Leaflet để tránh lỗi 404
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const { Title, Text } = Typography;

// Component để thay đổi vị trí trung tâm của bản đồ
const ChangeMapCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center);
  }, [center, map]);
  return null;
};

export default function Maps() {
  const [userPosition, setUserPosition] = useState(null);
  const shopPosition = [10.875405, 106.800702];
  const mapCenter = userPosition || shopPosition;

  // Lấy vị trí người dùng
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
      () => setUserPosition(null),
    );
  }, []);

  return (
    <Row justify="center" style={{ margin: '3rem 0' }}>
      <Col xs={23} md={23} lg={23}>
        <Card
          bordered={false}
          style={{
            borderRadius: 20,
            backgroundColor: '#000',
            color: '#fff',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          }}
          bodyStyle={{ padding: 0 }}
        >
          <div style={{ height: 450, borderRadius: '20px 20px 0 0', overflow: 'hidden' }}>
            <MapContainer
              center={mapCenter}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ChangeMapCenter center={mapCenter} />

              <Marker position={shopPosition}>
                <Popup>📍 DesignMyKicks - Dĩ An, Bình Dương</Popup>
              </Marker>

              {userPosition && (
                <Marker position={userPosition}>
                  <Popup>📍 Vị trí của bạn</Popup>
                </Marker>
              )}

              {userPosition && <Routing from={userPosition} to={shopPosition} />}
            </MapContainer>
          </div>

          <div style={{ padding: '24px' }}>
            <Title level={3} style={{ color: '#fff', marginBottom: 8 }}>
              🏪 DesignMyKicks - Custom Sneaker Hub
            </Title>
            <Text style={{ color: '#d9d9d9', fontSize: 16 }}>
              Tạo nên đôi giày của riêng bạn tại cửa hàng của chúng tôi!
            </Text>
            <div style={{ marginTop: 8 }}>
              <Tag color="white" style={{ fontSize: 14, padding: '2px 8px', color: 'black' }}>
                Địa chỉ: VRG2+37 Dĩ An, Bình Dương, Việt Nam
              </Tag>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
}
